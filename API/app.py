from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongoClient = MongoClient("mongodb+srv://admin:scube@scube.5egfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = mongoClient.get_database('user_db')
names_col = db.get_collection('names_col')
student_records = db.get_collection('student_records')
professor_records = db.get_collection('professor_records')
courses=db.get_collection('courses')


@app.route('/addname/<name>/')
def addname(name):
    names_col.insert_one({"name": name.lower()})
    return redirect(url_for('getnames'))

@app.route('/getnames/')
def getnames():
    names_json = []
    if names_col.find({}):
        for name in names_col.find({}).sort("name"):
            names_json.append({"name": name['name'], "id": str(name['_id'])})
    return json.dumps(names_json)

@app.route('/api/studentlogin/<username>&<password>/')
def login(username, password):
    success = student_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

@app.route('/api/register/<photourl>&<firstname>&<lastname>&<username>&<password>')
def register(firstname,lastname,photourl,username, password):
    student_records.insert({'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password,'photourl':photourl})
    return ({"success": True})

@app.route('/api/professorlogin/<username>&<password>/')
def loginp(username, password):
    success = professor_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

@app.route('/api/registerp/<photourl>&<firstname>&<lastname>&<username>&<password>')
def registerp(firstname,lastname,photourl,username, password):
    professor_records.insert({'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password,'photourl':photourl})
    return ({"success": True})

@app.route('/api/getavailablecourses/')
def getavailablecourses():
    courses_json = []
    if courses.find({}):
        for course in courses.find({}).sort("name"):
            courses_json.append({"name": course['name'], "description":course['description'],"students":course['students'],"professor":course['professor']})
    return json.dumps(courses_json)

@app.route('/api/getenrolledcourses/<username>')
def getenrolledcourses(username):
    courses_json = []
    if courses.find({}):
        for course in courses.find({"students":username}).sort("name"):
            courses_json.append({"name": course['name'], "description":course['description'],"students":course['students'],"professor":course['professor']})
    return json.dumps(courses_json)

@app.route('/api/studentprofile/<username>')
def studentprofile(username):
    student_json = []
    if student_records.find({}):
        for student in student_records.find({"username":username}):
            student_json.append({"firstname": student['firstname'], "lastname": student['lastname'], "username": student['username'], "password": student['password'],"photourl":student['photourl']})
    return json.dumps(student_json)

@app.route('/api/enrollcourse/<username>&<name>')
def enrollcourse(username, name):
   courses.update_one({"name":name},{'$push':{"students":username}})
   return ({"success": True})

@app.route('/api/unenrollcourse/<username>&<name>')
def unenrollcourse(username,name):
    courses.update_one({"name":name},{'$pop':{"students":username}})
    return ({"success": True})

@app.route('/api/createcourse/<professor>&<name>&<details>')
def createcourse(professor,name,details):
    courses.insert_one({"name":name,"professor": professor,"details":details})
    return ({"success": True})

@app.route('/api/deletecourse/<name>')
def deletecourse(name):
    courses.remove({"name":name})
    return ({"success": True})

if __name__ == "__main__":
    app.run(debug=True)