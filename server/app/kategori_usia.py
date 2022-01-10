from app import app
from app.models import KategoriUsia, KategoriUsiaSchema
from flask import jsonify, request

@app.route('/kategori-usia',methods=["GET"])
def KategoriUsiaGetAll():
    page = request.args.get('page') or 1
    limit =  request.args.get('limit')
    kategori_usia_object = KategoriUsia.query.paginate(page=int(page), per_page=int(limit), error_out=False).items if int(limit) > 0 else KategoriUsia.query.filter_by().all()
    schema = KategoriUsiaSchema(many=True)  
    kategori_usia = schema.dump(kategori_usia_object)
    return jsonify(kategori_usia),200

@app.route('/kategori-usia/count',methods=["GET"])
def KategoriUsiaCount():
    data = KategoriUsia.query.filter_by().count()
    return jsonify({'count': data}),200
    

@app.route('/kategori-usia/<id>',methods=["GET"])
def KategoriUsiaGetById(id):
    kategori_usia_object = KategoriUsia.query.filter_by(id=id).first()
    schema = KategoriUsiaSchema(many=False)  
    kategori_usia = schema.dump(kategori_usia_object)
    return jsonify(kategori_usia),200

@app.route('/kategori-usia/<id>',methods=["PUT"])
def KategoriUsiaUpdateById(id):
   
    found = KategoriUsia.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'kategori_usia with id {id} not found'}), 404
    
    body = request.get_json()
    kategori = body['kategori']
    min = body['min']
    max = body['max']
    satuan = body['satuan']

    KategoriUsia.query.filter_by(id=id).update(dict(kategori=kategori, min=min, max=max, satuan=satuan))
    KategoriUsia.query.session.commit()
    
    schema = KategoriUsiaSchema(many=False)  
    kategori_usia = schema.dump(found.first())
    return jsonify(kategori_usia),200

@app.route('/kategori-usia',methods=["POST"])
def KategoriUsiaCreate():
    body = request.get_json()
    
    kategori = body['kategori']
    min = body['min']
    max = body['max']
    satuan = body['satuan']
    row = KategoriUsia(None, kategori, min, max, satuan)
    KategoriUsia.query.session.add(row)
    KategoriUsia.query.session.commit()

    kategori_usia_object = KategoriUsia.query.filter_by(kategori=kategori).first()
    schema = KategoriUsiaSchema(many=False)  
    kategori_usia = schema.dump(kategori_usia_object)
    return jsonify(kategori_usia),200

@app.route('/kategori-usia/<id>',methods=["DELETE"])
def KategoriUsiaRemoveById(id):
    found = KategoriUsia.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'kategori_usia with id {id} not found'}), 404
    found.delete()
    found.session.commit()
    return jsonify(found.first()),200


