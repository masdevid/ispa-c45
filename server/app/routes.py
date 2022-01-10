from app import app
from app.models import User, UserSchema
from flask import jsonify, request
from hashlib import md5

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/login',methods=["POST"])
def login():
    body = request.get_json()
    username = body['username']
    password = body['password'] = md5(body['password'].encode()).hexdigest()
    found_user = User.query.filter_by(username=username, password=password).first()
    if (found_user):
        schema = UserSchema(many=False)  
        users = schema.dump(found_user)
        return jsonify(users),200
    else:
        return jsonify({'message':'Username & password tidak cocok'}), 401

# USERS ENDPOINT 
@app.route('/users',methods=["GET"])
def userGetAll():
    page = request.args.get('page')
    limit = request.args.get('limit')
    user_object = User.query.paginate(page=int(page), per_page=int(limit), error_out=False).items
    schema = UserSchema(many=True)  
    users = schema.dump(user_object)
    return jsonify(users),200

@app.route('/users/<id>',methods=["GET"])
def userGetById(id):
    user_object = User.query.filter_by(id=id).first()
    schema = UserSchema(many=False)  
    users = schema.dump(user_object)
    return jsonify(users),200

@app.route('/users/<id>',methods=["PUT"])
def userUpdateById(id):
   
    found = User.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'User with id {id} not found'}), 404
    
    body = request.get_json()
    username = body['username']
    password = md5(body['password'].encode()).hexdigest()

    found.username = username
    found.password = password
    found.session.commit()
    
    schema = UserSchema(many=False)  
    users = schema.dump(found.first())
    return jsonify(users),200

@app.route('/users',methods=["POST"])
def userCreate():
    body = request.get_json()
    found = User.query.filter_by(username=body['username'])
    username = body['username']
    password = body['password']

    if found.first(): 
        return jsonify({ 'message': f'User {username} already exist'}), 422

    data = User(None, username, md5(password.encode()).hexdigest())
    found.session.add(data)
    found.session.commit()
    schema = UserSchema(many=False)  
    users = schema.dump(data)
    return jsonify(users),200

@app.route('/users/<id>',methods=["DELETE"])
def userRemoveById(id):
    found = User.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'User with id {id} not found'}), 404
    found.delete()
    found.session.commit()
    return jsonify(found.first()),200


