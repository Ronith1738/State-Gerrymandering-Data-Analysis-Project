import sys
import csv

# Gets details such as partisan bias, symmetry, and responsiveness from a seats votes curve and writes to a master csv

states = ["AL"]

outputFile = open("data/seats-votes-scores/2022.csv","w")
inputFolder = "data/seats-votes/2022"

outputFile.write("state,gk_bias,symmetry,responsiveness\n")

repLowerLimit = 0
demLowerLimit = 0
repUpperLimit = 0
demUpperLimit = 0

for state in states:
    inputFile = open(inputFolder + "/" + state + ".csv", "r")
    csv = inputFile.read().split("\n")
    repAtFifty = 0
    demAtFifty = 0

    #global repLowerLimit
    #global demLowerLimit
    #global repUpperLimit
    #global demUpperLimit

    repLowerLimit = 0
    demLowerLimit = 0
    repUpperLimit = 0
    demUpperLimit = 0
    starting = 0

    symmetry = 0
    numNumbers = 0
    responsiveness = 0

    y0 = 0

    for lineStr in csv:

        if len(lineStr) > 0:
            line = lineStr.split(",")
            if line[0] != "votes":

                if float(line[0]) <= 50:
                    repLowerLimit = float(line[1])
                    starting = float(line[0])
                    demLowerLimit = float(line[2])
                if float(line[0]) >= 50 and repUpperLimit == 0 and demUpperLimit == 0:
                    repUpperLimit = float(line[1])
                    demUpperLimit = float(line[2])
                if float(line[0]) < 45:
                    y0 = float(line[1])
                if float(line[0]) >= 45 and float(line[0]) <= 55:
                    symmetry += float(line[1]) - float(line[2])
                    numNumbers += 1
                    responsiveness += (float(line[1]) - y0) / 1
                    y0 = float(line[1])

    symmetry = symmetry / numNumbers
    responsiveness = responsiveness / numNumbers

    partisan_bias = ((repUpperLimit - repLowerLimit) * (50 - starting) + repLowerLimit) - 50

    outputFile.write(state + "," + str(partisan_bias) + "," + str(symmetry) + "," + str(responsiveness) + "\n")

outputFile.close()