from app import app
from app.models import Train, TrainSchema
from flask import jsonify, request

@app.route('/train',methods=["GET"])
def TrainGetAll():
    page = request.args.get('page') or 1
    limit = request.args.get('limit') or 10
    train_object = Train.query\
        .paginate(page=int(page), per_page=int(limit), error_out=False).items if int(limit) > 0 else Train.query.filter_by().all()
    schema = TrainSchema(many=True)  
    train = schema.dump(train_object)
    return jsonify(train),200

@app.route('/train/<id>',methods=["GET"])
def TrainGetById(id):
    train_object = Train.query.filter_by(id=id).first()
    schema = TrainSchema(many=False)  
    train = schema.dump(train_object)
    return jsonify(train),200
    
@app.route('/train/count',methods=["GET"])
def TrainCount():
    data = Train.query.filter_by().count()
    return jsonify({'count': data}),200

@app.route('/train/<id>',methods=["PUT"])
def TrainUpdateById(id):    
   
    found = Train.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'train with id {id} not found'}), 404
    
    body = request.get_json()
    label = body['label']
    timestamp = body['timestamp']
    accuracy = body['accuracy']
    Train.query.filter_by(id=id).update(dict(label=label, timestamp=timestamp, accuracy=accuracy))
    Train.query.session.commit()
    
    schema = TrainSchema(many=False)  
    train = schema.dump(found.first())
    return jsonify(train),200

@app.route('/train',methods=["POST"])
def TrainCreate():
    body = request.get_json()
    
    label = body['label']
    timestamp = body['timestamp']
    accuracy = body['accuracy']

    row = Train(None, label, timestamp, accuracy)
    Train.query.session.add(row)
    Train.query.session.commit()

    train_object = Train.query.filter_by(label=label).first()
    schema = TrainSchema(many=False)  
    train = schema.dump(train_object)
    return jsonify(train),200

@app.route('/train/<id>',methods=["DELETE"])
def TrainRemoveById(id):
    found = Train.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'train with id {id} not found'}), 404
    found.delete()
    found.session.commit()
    return jsonify(found.first()),200


