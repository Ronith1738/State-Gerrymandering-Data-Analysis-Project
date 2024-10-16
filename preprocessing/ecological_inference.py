import seaborn as sns
import json
import numpy as np
import io
import pymc as pm
import pandas as pd
from pyei.r_by_c import RowByColumnEI

df = pd.read_csv('NewMexico.csv')
group_fractions_rbyc = np.array(df[['Hispanic', 'White', 'Native', 'Other']]).T
votes_fractions_rbyc = np.array(df[['Biden', 'Trump', 'Other_Candidates']]).T
precinct_names = df['NAME20']
candidate_names_rbyc = ["Biden", "Trump", "Other"]
demographic_group_names_rbyc = ['Hispanic', 'White', 'Native', 'Other']
precinct_pops = np.array(df['Total'])
ei_rbyc = RowByColumnEI(
    model_name='multinomial-dirichlet-modified', pareto_shape=100, pareto_scale=100)

ei_rbyc.fit(group_fractions_rbyc,
            votes_fractions_rbyc,
            precinct_pops,
            demographic_group_names=demographic_group_names_rbyc,
            candidate_names=candidate_names_rbyc,
            )
ei_rbyc.plot_kdes(plot_by="candidate")

filename = 'NewMexico_ei_data.json'
samples = ei_rbyc.sampled_voting_prefs
data = {}
data["hispanic_biden"] = samples[:, 0, 0].tolist()
data["hispanic_trump"] = samples[:, 0, 1].tolist()
data["hispanic_other"] = samples[:, 0, 2].tolist()
data["white_biden"] = samples[:, 1, 0].tolist()
data["white_trump"] = samples[:, 1, 1].tolist()
data["white_other"] = samples[:, 1, 2].tolist()
data["native_biden"] = samples[:, 2, 0].tolist()
data["native_trump"] = samples[:, 2, 1].tolist()
data["native_other"] = samples[:, 2, 2].tolist()
data["other_biden"] = samples[:, 3, 0].tolist()
data["other_trump"] = samples[:, 3, 1].tolist()
data["other_other"] = samples[:, 3, 2].tolist()

interval = np.arange(0, 1.01, 0.01)
new_data = {}
for category, samples in data.items():
    counts, _ = np.histogram(samples, bins=interval)
    percentage_counts = counts / len(ei_rbyc.sampled_voting_prefs) * 100
    new_data[category] = percentage_counts.tolist()
    new_data[category] = percentage_counts.tolist()

with open('NewMexico_hist.json', 'w') as f:
    json.dump(new_data, f)
