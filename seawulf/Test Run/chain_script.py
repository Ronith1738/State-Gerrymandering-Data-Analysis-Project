import json
import multiprocessing
from functools import partial
import pandas as pd
from gerrychain import (GeographicPartition, Graph, MarkovChain, Election)
from gerrychain.proposals import recom
from gerrychain.updaters import cut_edges, Tally, perimeter
from gerrychain.constraints import UpperBound, within_percent_of_ideal_population
from gerrychain.accept import always_accept


def cut_edges_length(p):
    return len(p["cut_edges"])


def get_updaters():
    my_updaters = {"population": Tally("Total", alias="population"),
                   "white_population": Tally("White", alias="population"),
                   "black_population": Tally("Blk/AfrAm", alias="black_population"),
                   "hispanic_population": Tally("Hisp/Lat", alias="hispanic_population"),
                   "asian_population": Tally("Asian", alias="asian_population"),
                   "democratic_votes": Tally("G20PREDBID", alias="democratic_votes"),
                   "republican_votes": Tally("G20PRERTRU", alias="republican_votes"),
                   "cut_edges": cut_edges,
                   "perimeter": perimeter,

                   }
    elections = [
        Election("PRES20", {"Democratic": "G20PREDBID", "Republican": "G20PRERTRU"}),
        Election("SEN20", {"Democratic": "G20USSDLUJ", "Republican": "G20USSRRON"}),
    ]
    election_updaters = {election.name: election for election in elections}
    my_updaters.update(election_updaters)
    return my_updaters


def load_and_sort_districts(json_string):
    data = json.loads(json_string)
    for plan in data:
        if 'plans' in plan and 'districts' in plan['plans']:
            plan['plans']['districts'] = sorted(plan['plans']['districts'], key=lambda x: x['district'])

    return data


def run_chain(partition, start_index, plans_per_process):
    ideal_population = sum(partition["population"].values()) / len(partition)
    proposal = partial(
        recom,
        pop_col="Total",
        pop_target=ideal_population,
        epsilon=0.12,
        node_repeats=2
    )
    compactness_bound = UpperBound(
        cut_edges_length,
        2 * len(partition["cut_edges"])
    )

    pop_constraint = within_percent_of_ideal_population(initial_partition=partition, percent=0.12)

    chain = MarkovChain(
        proposal=proposal,
        constraints=[compactness_bound, pop_constraint],
        accept=always_accept,
        initial_state=partition,
        total_steps=plans_per_process
    )

    data = []
    for i, partition in enumerate(chain):
        for district, pop in partition.subgraphs.items():
            district_data = {
                "plan": start_index + i,
                "district": district,
                "population": partition["population"][district],
                "white_population": partition["white_population"][district],
                "black_population": partition["black_population"][district],
                "hispanic_population": partition["hispanic_population"][district],
                "asian_population": partition["asian_population"][district],
                "democratic_votes": partition["democratic_votes"][district],
                "republican_votes": partition["republican_votes"][district],
                "cut_edges": len(partition["cut_edges"]),

            }

            data.append(district_data)

    data = pd.DataFrame(data)
    return data


def parallel_run_chain(output, graph, start_index, plans_per_process):
    partition = GeographicPartition(graph, "district", get_updaters())
    try:
        results = run_chain(partition, start_index, plans_per_process)
        if isinstance(results, pd.DataFrame):
            output.put(results)
    except Exception as e:
        print("An error occurred:", e)
    finally:
        output.put(None)


def main():
    graph = Graph.from_file("./nm_precinct_data.geojson")
    num_processes = 2
    total_plans = 6
    output = multiprocessing.Queue()
    processes = []
    plans_per_process = total_plans // num_processes
    for i in range(num_processes):
        start_index = i * plans_per_process
        p = multiprocessing.Process(target=parallel_run_chain, args=(output, graph, start_index, plans_per_process))
        processes.append(p)
    for p in processes:
        p.start()
    results = []
    finished_processes = 0

    while finished_processes < num_processes:
        item = output.get()
        if item is None:
            finished_processes += 1
        elif isinstance(item, pd.DataFrame):
            results.append(item)
        else:
            results.extend(item)

    for p in processes:
        p.join()
    results = pd.concat(results)
    out = pd.DataFrame(results)
    formatted_data = {
        "plans": [
            {
                "id": plan_id,
                "districts": group.drop(columns='plan').to_dict(orient='records')
            }
            for plan_id, group in out.groupby("plan")
        ]
    }

    unsorted_data_frame = pd.DataFrame(formatted_data)
    json_string = unsorted_data_frame.to_json(orient='records')
    sorted_data_frame = load_and_sort_districts(json_string)
    with open("./chain_output.json", "w") as outfile:
        json.dump(sorted_data_frame, outfile)


if __name__ == "__main__":
    main()
