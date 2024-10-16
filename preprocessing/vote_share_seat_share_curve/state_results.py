import sys
import csv

# Converts the raw election results to results by state. Works for 2012-2016

outputFolder = "data/results-by-state/2022"
states = [{"name": "Alabama", "abbrev": "AL", "districts": []}]

stateNum = 0
currentAbbrev = states[stateNum]["abbrev"]
districtNum = 1

def includes(str):
    for state in states:
        if str == state["abbrev"]:
            return True
    return False

rep = 0
dem = 0

with open("data/raw-election-results/2022.csv", "rU") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        state = row["STATE ABBREVIATION"]
        district = row["D"]
        votes = row["GENERAL VOTES"]
        party = row["PARTY"]
        if len(state) > 0 and len(district) > 0 and len(votes) > 0 and len(party) > 0 and includes(state) and district.isdigit(): #Make sure row is actually for a general election candidate

            #global rep
            #global dem

            votes = votes.replace(",", "")

            district = int(district)

            if state != currentAbbrev: # Increment state
                states[stateNum]["districts"].append(str(rep) + "," + str(dem))
                stateNum += 1
                currentAbbrev = states[stateNum]["abbrev"]
                districtNum = district
                rep = 0
                dem = 0

            if district != districtNum: # Increment district
                districtNum += 1
                states[stateNum]["districts"].append(str(rep) + "," + str(dem))
                rep = 0
                dem = 0

            if votes == "Unopposed" or votes == "#":
                votes = -1

            if party == "R":
                rep += int(votes)
            elif party == "D" or party == "DFL":
                dem += int(votes)

states[49]["districts"].append(str(rep) + "," + str(dem))

# Set uncontested districts as 75% and 25%
for state in states:
    for i in range(0, len(state["districts"])):
        votingResults = state["districts"][i].split(",")
        if int(votingResults[0]) == -1 and int(votingResults[1]) == 0:
            state["districts"][i] = "75,25"
        elif int(votingResults[0]) == 0 and int(votingResults[1]) == -1:
            state["districts"][i] = "25,75"
        elif int(votingResults[0]) == 0:
            state["districts"][i] = str(int(votingResults[1]) / 3) + "," + votingResults[1]
        elif int(votingResults[1]) == 0:
            state["districts"][i] = votingResults[0] + "," + str(int(votingResults[0]) / 3)

# Push to individual folder
for state in states:
    outputFile = open(outputFolder + "/" + state["abbrev"] + ".csv","w")
    for district in state["districts"]:
        outputFile.write(district + "\n")
    outputFile.close()