import csv
import json
index = 0
jsonData = []

def getIngredients(data):
    ingredients = []
    ingedientsData = data.split(",")
    for i in ingedientsData:
        i = i.strip()
        try:
            if(int(i.split(' ')[0])):
                ingredients.append({
                    "name": ' '.join(i.split(' ')[1:]).title(),
                    "quantity": int(i.split(' ')[0]),
                })
        except:
            ingredients.append({
                "name": i.title(),
                "quantity": 1,
            })
    return ingredients


# read Cleaned_Indian_Food_Dataset.csv file as a list of lists
with open('Cleaned_Indian_Food_Dataset.csv', 'r',encoding="utf-8") as f:
    reader = csv.reader(f)
    print(reader)
    for i in reader:
        data = {
            "name": i[0],
            "ingredients": getIngredients(i[1]),
            "totalTime":i[2],
            "cuisine":i[3],
            "instructions":i[4].split('\n'),
            "url":i[5],
            "images":[i[6]]
        }
        jsonData.append(data)
        index += 1
        print(index)
print(jsonData)
# write to a file
with open('data.json', 'w') as f:
    json.dump(jsonData, f, indent=4)



# # remove the header
# data = data[1:]
# # print the first 5 rows
# print(data[:9])
