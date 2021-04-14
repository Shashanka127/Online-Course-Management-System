from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://admin:scube@scube.5egfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.get_database("user_db")

@app.route('/login', methods=['GET'])
def login():
    credentials = request.get_json()
    return(credentials)

    # username = credentials['username']
    # password = credentials['password']

    # return(username, password)
    
    # records = db.student_records

    # valid = records.count_documents({'username':username, 'password':password})

    # if (valid == 1):
    #     return ("success")
    # else:
    #     return ("failure")