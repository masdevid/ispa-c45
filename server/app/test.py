from app import app
from app.models import Test, TestSchema
from flask import jsonify, request

@app.route('/test',methods=["GET"])
def TestGetAll():
    page = request.args.get('page') or 1
    limit = request.args.get('limit') or 10
    test_object = Test.query\
        .paginate(page=int(page), per_page=int(limit), error_out=False).items if int(limit) > 0 else Test.query.filter_by().all()
    schema = TestSchema(many=True)  
    test = schema.dump(test_object)
    return jsonify(test),200

@app.route('/test/<id>',methods=["GET"])
def TestGetById(id):
    test_object = Test.query.filter_by(id=id).first()
    schema = TestSchema(many=False)  
    test = schema.dump(test_object)
    return jsonify(test),200
    
@app.route('/test/count',methods=["GET"])
def TestCount():
    data = Test.query.filter_by().count()
    return jsonify({'count': data}),200

@app.route('/test/<id>',methods=["PUT"])
def TestUpdateById(id):    
   
    found = Test.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'test with id {id} not found'}), 404
    
    body = request.get_json()
    label = body['label']
    timestamp = body['timestamp']
    accuracy = body['accuracy']
    Test.query.filter_by(id=id).update(dict(label=label, timestamp=timestamp, accuracy=accuracy))
    Test.query.session.commit()
    
    schema = TestSchema(many=False)  
    test = schema.dump(found.first())
    return jsonify(test),200

@app.route('/test',methods=["POST"])
def TestCreate():
    body = request.get_json()
    
    label = body['label']
    timestamp = body['timestamp']
    accuracy = body['accuracy']

    row = Test(None, label, timestamp, accuracy)
    Test.query.session.add(row)
    Test.query.session.commit()

    test_object = Test.query.filter_by(label=label).first()
    schema = TestSchema(many=False)  
    test = schema.dump(test_object)
    return jsonify(test),200

@app.route('/test/<id>',methods=["DELETE"])
def TestRemoveById(id):
    found = Test.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'test with id {id} not found'}), 404
    found.delete()
    found.session.commit()
    return jsonify(found.first()),200


