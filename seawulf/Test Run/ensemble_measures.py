import pandas as pd
import json


def winner_per_district(df):
    df['winner'] = df.apply(lambda row: 'Democrat' if row['Democrat'] > row['Republican'] else 'Republican', axis=1)
    result_df = df[['plan', 'district', 'winner']]
    return result_df


def ensemble_partisan_splits(data):
    results = []

    for i, partition in enumerate(data["plans"]):
        plan_id = partition["id"]

        for district in partition["districts"]:
            democratic_votes = district["democratic_votes"]
            republican_votes = district["republican_votes"]
            district_number = district["district"]

            results.append({
                "plan": plan_id,
                "district": district_number,
                "Democrat": democratic_votes,
                "Republican": republican_votes
            })

    results_df = pd.DataFrame(results)
    return results_df


def calc_opportunity_districts(data):
    thresholds = [0.37, 0.45, 0.50]

    results = []

    for partition in data["plans"]:
        plan_id = partition["id"]

        for district in partition["districts"]:
            black_percentage = district["black_population"] / district["population"]
            hispanic_percentage = district["hispanic_population"] / district["population"]
            asian_percentage = district["asian_population"] / district["population"]

            for threshold in thresholds:
                if (black_percentage > threshold) or (hispanic_percentage > threshold) or (
                        asian_percentage > threshold):
                    results.append({
                        "plan_id": plan_id,
                        "threshold": threshold,
                        "opportunity_districts": 1
                    })

    if results:
        results_df = pd.DataFrame(results)
        results_df = results_df.groupby(['plan_id', 'threshold']).sum().reset_index()
    else:
        results_df = pd.DataFrame(columns=["plan_id", "threshold", "opportunity_districts"])

    return results_df


def ensemble_measures(data):
    number_of_plans = len(data)
    num_of_opportunity_districts = calc_opportunity_districts(data)
    partisan_splits = ensemble_partisan_splits(data)
    winners = winner_per_district(partisan_splits)
    results = {
        "number_of_plans": number_of_plans,
        "number_of_opportunity_districts": num_of_opportunity_districts.to_dict(orient='records'),
        "partisan_splits": partisan_splits.to_dict(orient='records'),
        "winners": winners.to_dict(orient='records')
    }

    with open('ensemble_measures.json', 'w') as outfile:
        json.dump(results, outfile)


file_path = './chain_output.json'
chain_data = pd.read_json(file_path)
ensemble_measures(chain_data)
