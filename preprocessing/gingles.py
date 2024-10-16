import pandas as pd
import numpy as np
import io
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
import json


def sin_function(x, a, b, c):
    return a * np.sin(b * x + c)


df = pd.read_csv('al_vest_20.csv')
popt_biden, pcov_biden = curve_fit(
    sin_function, df['Black'], df['Biden'], maxfev=5000)
popt_trump, pcov_trump = curve_fit(
    sin_function, df['Black'], df['Trump'], maxfev=5000)
plt.scatter(df['Black'], df['Biden'], label="Biden")
plt.scatter(df['Black'], df['Trump'], label="Trump")
plt.plot(df['Black'], sin_function(df['Black'], *popt_biden), color="blue")
plt.plot(df['Black'], sin_function(df['Black'], *popt_trump), color="red")
plt.legend()
plt.show()

biden_data = []
trump_data = []
labels = []
biden_fit = []
trump_fit = []
for i in range(len(df)):
    biden_data.append({"x": df["Black"][i], "y": df["Biden"][i]})
    trump_data.append({"x": df["Black"][i], "y": df["Trump"][i]})

samples_x = np.linspace(0, 1, len(df))
for i, x in enumerate(samples_x):
    labels.append(x)
    biden_fit.append(sin_function(x, *popt_biden))
    trump_fit.append(sin_function(x, *popt_trump))

datasets = {"datum": {"labels": labels, "datasets": [{"type": "line", "label": "trump_fit", borderColor: "rgb(255, 99, 132)", backgroundColor: "rgba(255, 99, 132, 0.2)", "xAxisID": "x2", "datas": trump_fit}, {
    "type": "line", "label": "biden_fit", borderColor: "rgb(53, 162, 235)", backgroundColor: "rgba(53, 162, 235, 0.2)", "xAxisID": "x2", "datas": biden_fit}, {"label": "Biden", borderColor: "rgb(53, 162, 235)", backgroundColor: "rgba(53, 162, 235, 0.2)", "datan": biden_data}, {"label": "Trump", borderColor: "rgb(255, 99, 132)", backgroundColor: "rgba(255, 99, 132, 0.2)", "datan": trump_data}]}}

with open("Alabama_gingles.json", "w") as json_file:
    json.dump(datasets, json_file)
