from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

# Initializing App parameters
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Connecting to the database and geting required databases
mongoClient = MongoClient("mongodb+srv://admin:scube@scube.5egfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = mongoClient.get_database('user_db')

# Getting required collections from the databases
student_records = db.get_collection('student_records')
professor_records = db.get_collection('professor_records')
courses=db.get_collection('courses')


# -------------------------------------------------- #
# ---------------- Defining the API ---------------- #
# -------------------------------------------------- #

# --- Login & Register ----------------------------- #

# Authenticate Student Login
@app.route('/api/student-login/<username>&<password>/')
def login(username, password):
    success = student_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

# Create a new Student Account
@app.route('/api/student-register/<firstname>&<lastname>&<photourl>&<username>&<password>')
def register(firstname,lastname,photourl,username, password):
    if(student_records.count_documents({'username': username}) == 1):
	    return ({"success": False})
    student_records.insert({'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password, 'photourl': photourl})
    return ({"success": True})

# Authenticate Professor Login
@app.route('/api/professor-login/<username>&<password>/')
def loginp(username, password):
    success = professor_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

# Create a new Professor Account
@app.route('/api/professor-register/<firstname>&<lastname>&<photourl>&<username>&<password>')
def registerp(firstname,lastname,photourl,username, password):
    if(professor_records.count_documents({'username': username}) == 1):
	    return ({"success": False})
    professor_records.insert({'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password, 'photourl': photourl})
    return ({"success": True})

# --- Profiles ------------------------------------- #

@app.route('/api/student-profile/<username>')
def studentprofile(username):
    student_json = []
    if student_records.find({}):
        for student in student_records.find({"username":username}):
            student_json.append({"firstname": student['firstname'], "lastname": student['lastname'], "username": student['username'], "password": student['password'],"photourl":student['photourl']})
    return json.dumps(student_json)

@app.route('/api/professor-profile/<username>')
def professorprofile(username):
    professor_json = []
    if professor_records.find({}):
        for professor in professor_records.find({"username":username}):
            professor_json.append({"firstname": professor['firstname'], "lastname": professor['lastname'], "username": professor['username'], "password": professor['password'],"photourl":professor['photourl']})
    return json.dumps(professor_json)

# --- Course Creation & Deletion ------------------- #

@app.route('/api/create-course/<professor>&<name>&<description>')
def createcourse(professor,name,description):
    courses.insert_one({"name":name, "description": description, "students": [],"forum":[], "professor": professor})
    return ({"success": True})

@app.route('/api/delete-course/<name>')
def deletecourse(name):
    courses.delete_one({"name": name})
    return ({"success": True})

# --- Course Enrollment & Unenrollment ------------- #

@app.route('/api/enroll-course/<username>&<name>')
def enrollcourse(username, name):
   courses.update_one({"name":name}, {'$push': {"students": username}})
   return ({"success": True})

@app.route('/api/unenroll-course/<username>&<name>')
def unenrollcourse(username,name):
    courses.update_one({"name":name}, {'$pull': {"students": username}})
    return ({"success": True})

# --- Accessing Courses ---------------------------- #

@app.route('/api/available-courses/<username>')
def getavailablecourses(username):
    courses_json = []
    enrolled_json= []
   
    if courses.find({}):
        for course in courses.find({}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})

    for course in courses.find({"students":username}).sort("name"):
            enrolled_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})

    unenrolled_json = [course for course in courses_json if course not in enrolled_json]

    return json.dumps(unenrolled_json)

@app.route('/api/enrolled-courses/<username>')
def getenrolledcourses(username):
    courses_json = []

    if courses.find({}):
        for course in courses.find({"students":username}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students":course['students'], "professor": course['professor']})
    
    return json.dumps(courses_json)

@app.route('/api/created-courses/<name>')
def getcreatedcourses(name):
    courses_json = []

    if courses.find({}):
        for course in courses.find({"professor":name}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})
    
    return json.dumps(courses_json)
	
@app.route('/api/created-post/<details>&<username>&<name>')
def createpost(details,username,name):
   courses.update_one({"name":name}, {'$push': {"forum":{"username":username,"details":details}}})
   return ({"success": True})
	
@app.route('/api/view-post/<name>')
def viewallpost(name):
    post_json = []

    if courses.find({}):
        for post in courses.find({"name":name}):
            post_json.append({post['forum']})
    return json.dumps(post_json)
	
@app.route('/api/delete-post/<username>')
def deletepost(username):
   courses.update_one({"name":name}, {'$pull': {"forum":{"username":username}}})
   return ({"success": True})
    
if __name__ == "__main__":
    app.run(debug=True)