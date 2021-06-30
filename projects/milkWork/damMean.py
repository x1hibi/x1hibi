# all calf by year in order SIAE

y1=[8,7,7,7,8,9,9,9]
y2=[7,8,8,9,10,7,10,8]
y3=[9,9,9,9,9,8,10,9,9,8,9,10,10,10,8,9,10,9,7,10,9,10,9,9]
y4=[8,9,9,9,10,10,9,9,10,10,10,8,10,9]
y5=[8,10]

allYears=[y1,y2,y3,y4,y5]

# Gobal parameters
numOfSubjects=0
sumOfCalfs=0
i=0
j=0

# #Sum iterarion

for i in range(5) :
    for j in range(len(allYears[i])):
        print("j",j,"calf",allYears[i][j])
        # add one for each calf
        numOfSubjects+=1
        # sum current calf
        sumOfCalfs+=allYears[i][j]

print("numOfSubjects",numOfSubjects,"sumOfCalfs",sumOfCalfs)

mean = sumOfCalfs / numOfSubjects

print("your mean is ", mean)