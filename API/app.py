from flask import Flask, request
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from datetime import datetime
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
forum=db.get_collection('forum')


# ---------------------------------------------------------------------------------------------------- #
# ----------------------------------------- Defining the API ----------------------------------------- #
# ---------------------------------------------------------------------------------------------------- #

# --- Student Account CRUD Operations ----------------------------- #

# Create a new student Account
@app.route('/api/student-register', methods=['POST'])
def create_student_account():
    firstName = request.args['firstName']
    lastName = request.args['lastName']
    photoURL = request.args['photoURL']
    username = request.args['username']
    password = request.args['password']

    if(student_records.count_documents({'username': username}) == 1):
        return ({"success": False})

    student_records.insert({'firstname': firstName, 'lastname': lastName, 'username': username, 'password': password, 'photoURL': photoURL})
    return ({"success": True})

# Check if a student's username exists
@app.route('/api/check-student-username', methods=['GET'])
def check_student_username():
    username = request.args['username']

    success = student_records.count_documents({'username': username}) == 1
    return ({"success": success})

# Authenticate student Login
@app.route('/api/student-login', methods=['GET'])
def authenticate_student_login():
    username = request.args['username']
    password = request.args['password']
    
    success = student_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

# Delete a student Account
@app.route('/api/student-delete', methods=['DELETE'])
def delete_student_account():
    username = request.args['username']

    if(student_records.count_documents({'username': username}) == 1):
        student_records.delete_one({'username': username})
        return ({"success": True})
    
    return ({"success": False})

# --- Professor Account CRUD Operations --------------------------- #

# Create a new professor Account
@app.route('/api/professor-register', methods=['POST'])
def create_professor_account():
    firstName = request.args['firstName']
    lastName = request.args['lastName']
    photoURL = request.args['photoURL']
    username = request.args['username']
    password = request.args['password']

    if(professor_records.count_documents({'username': username}) == 1):
        return ({"success": False})

    professor_records.insert({'firstname': firstName, 'lastname': lastName, 'username': username, 'password': password, 'photoURL': photoURL})
    return ({"success": True})

# Check if a professor's username exists
@app.route('/api/check-professor-username', methods=['GET'])
def check_professor_username():
    username = request.args['username']

    success = professor_records.count_documents({'username': username}) == 1
    return ({"success": success})

# Authenticate professor Login
@app.route('/api/professor-login', methods=['GET'])
def authenticate_professor_login():
    username = request.args['username']
    password = request.args['password']
    
    success = professor_records.count_documents({'username': username, 'password': password}) == 1
    return ({"success": success})

# Delete a professor Account
@app.route('/api/professor-delete', methods=['DELETE'])
def delete_professor_account():
    username = request.args['username']

    if(professor_records.count_documents({'username': username}) == 1):
        professor_records.delete_one({'username': username})
        return ({"success": True})
    
    return ({"success": False})

# --- Profiles ------------------------------------- #

@app.route('/api/student-profile', methods=['POST'])
def studentprofile():
    username = request.args['username']
    student_json = []
    if student_records.find({}):
        for student in student_records.find({"username":username}):
            student_json.append({"firstname": student['firstname'], "lastname": student['lastname'], "username": student['username'], "password": student['password'],"photoURL":student['photoURL']})
    return json.dumps(student_json)

@app.route('/api/professor-profile', methods=['POST'])
def professorprofile():
    username = request.args['username']
    professor_json = []
    if professor_records.find({}):
        for professor in professor_records.find({"username":username}):
            professor_json.append({"firstname": professor['firstname'], "lastname": professor['lastname'], "username": professor['username'], "password": professor['password'],"photoURL":professor['photoURL']})
    return json.dumps(professor_json)

# --- Course Creation & Deletion ------------------- #

@app.route('/api/create-course', methods=['POST'])
def createcourse():
    name = request.args['name']
    professor = request.args['professor']
    description = request.args['description']
    courses.insert_one({"name":name, "description": description, "students": [], "professor": professor})
    return ({"success": True})

@app.route('/api/delete-course', methods=['POST'])
def deletecourse():
    name = request.args['name']
    courses.delete_one({"name": name})
    return ({"success": True})

# --- Course Enrollment & Unenrollment ------------- #

@app.route('/api/enroll-course', methods=['GET'])
def enrollcourse():
   username = request.args['username']
   name = request.args['name']
   courses.update_one({"name":name}, {'$push': {"students": username}})
   return ({"success": True})

@app.route('/api/unenroll-course', methods=['GET'])
def unenrollcourse():
    username = request.args['username']
    name = request.args['name']
    courses.update_one({"name":name}, {'$pull': {"students": username}})
    return ({"success": True})

# --- Accessing Courses ---------------------------- #

@app.route('/api/available-course', methods=['POST'])
def getavailablecourses():
    username = request.args['username']
    courses_json = []
    enrolled_json= []
   
    if courses.find({}):
        for course in courses.find({}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})

    for course in courses.find({"students":username}).sort("name"):
            enrolled_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})

    unenrolled_json = [course for course in courses_json if course not in enrolled_json]

    return json.dumps(unenrolled_json)

@app.route('/api/enrolled-courses', methods=['POST'])
def getenrolledcourses():
    username = request.args['username']
    courses_json = []

    if courses.find({}):
        for course in courses.find({"students":username}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students":course['students'], "professor": course['professor']})
    
    return json.dumps(courses_json)

@app.route('/api/created-courses', methods=['POST'])
def getcreatedcourses():
    name = request.args['name']
    courses_json = []

    if courses.find({}):
        for course in courses.find({"professor":name}).sort("name"):
            courses_json.append({"name": course['name'], "description": course['description'], "students": course['students'], "professor": course['professor']})
    
    return json.dumps(courses_json)
    
@app.route('/api/created-post', methods=['POST'])
def createpost():
   username = request.args['username']
   name = request.args['name']
   details = request.args['details']
   dateTimeObj = datetime.now()
   forum.insert_one({"name":name, "details": details, "username": username,"time":dateTimeObj})
   return ({"success": True})
    
@app.route('/api/view-post', methods=['POST'])
def viewallpost():
    name = request.args['name']
    forum_json = []
    if forum.find({}):
        for forums in forum.find({"name":name}):
            forum_json.append({"name":forums['name'], "details": forums['details'], "username": forums['username'],"time":forums['dateTimeObj']})
    return json.dumps(forum_json)
    
@app.route('/api/delete-post', methods=['DELETE'])
def deletepost():
   username = request.args['username']
   forum.remove_one({"name":name, "username": username})
   return ({"success": True})
    
if __name__ == "__main__":
    app.run(debug=True)