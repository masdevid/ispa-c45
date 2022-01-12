from app import app
from app.models import Pasien, PasienSchema, KategoriUsia
from flask import jsonify, request
import re
import sqlalchemy as sa


@app.route('/pasien',methods=["GET"])
def pasienGetAll():
    page = request.args.get('page') or 1
    limit = request.args.get('limit') or 10
    filter = request.args.to_dict(flat=False) or None
    filters = dict()
    for key in filter:
        if key != 'limit' or key != 'offset':
            k = re.search(r"where\[([a-z_]+)]", key)
            if k :
                filters[k.group(1)] = filter[key][0]
    pasien_object = Pasien.query.filter_by(is_data_training=filters['is_data_training']).paginate(page=int(page), per_page=int(limit), error_out=False).items if int(limit) > 0 else Pasien.query.filter_by().all()
    schema = PasienSchema(many=True)  
    pasien = schema.dump(pasien_object)
    return jsonify(pasien),200

@app.route('/pasien/<id>',methods=["GET"])
def pasienGetById(id):
    pasien_object = Pasien.query.filter_by(id=id).first()
    schema = PasienSchema(many=False)  
    pasien = schema.dump(pasien_object)
    return jsonify(pasien),200
    
@app.route('/pasien/count',methods=["GET"])
def pasienCount():
    filter = request.args.to_dict(flat=False) or None
    filters = dict()
    for key in filter:
        if key != 'limit' or key != 'offset':
            k = re.search(r"where\[([a-z_]+)]", key)
            if k :
                filters[k.group(1)] = filter[key][0]

    data = Pasien.query.filter_by(is_data_training=filters['is_data_training']).count()
    return jsonify({'count': data}),200


@app.route('/pasien/set-train/<id>',methods=["PUT"])
def pasienSetTrainById(id):    
   
    found = Pasien.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'pasien with id {id} not found'}), 404
    
    is_data_training = True
    Pasien.query.filter_by(id=id).update(dict(is_data_training = is_data_training))
    Pasien.query.session.commit()
    
    schema = PasienSchema(many=False)  
    pasien = schema.dump(found.first())
    return jsonify(pasien),200

@app.route('/pasien/<id>',methods=["PUT"])
def pasienUpdateById(id):    
   
    found = Pasien.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'pasien with id {id} not found'}), 404
    
    body = request.get_json()
    nama = body['nama']
    alamat = body['alamat']
    jenis_kelamin = body['jenis_kelamin']
    umur = body['umur']
    satuan_umur = body['satuan_umur']
    suhu = body['suhu']
    is_batuk = body['is_batuk']
    is_sesak = body['is_sesak']
    is_data_training = body['is_data_training']
    kategori_usia = body['kategori_usia']
    result = body['result']
    tahun = body['tahun']
    bulan = body['bulan']
    Pasien.query.filter_by(id=id).update(dict(nama=nama, alamat=alamat, umur=umur, jenis_kelamin=jenis_kelamin, satuan_umur=satuan_umur, kategori_usia=kategori_usia, is_batuk=is_batuk, is_sesak=is_sesak, is_data_training=is_data_training, suhu=suhu, result=result, tahun=tahun, bulan=bulan))
    Pasien.query.session.commit()
    
    schema = PasienSchema(many=False)  
    pasien = schema.dump(found.first())
    return jsonify(pasien),200



@app.route('/pasien',methods=["POST"])
def pasienCreate():
    body = request.get_json()
    
    nama = body['nama']
    alamat = body['alamat']
    jenis_kelamin = body['jenis_kelamin']
    umur = body['umur']
    satuan_umur = body['satuan_umur']
    suhu = body['suhu']
    is_batuk = body['is_batuk']
    is_sesak = body['is_sesak']
    is_data_training = body['is_data_training']
    kategori_usia = body['kategori_usia']
    result = body['result']
    tahun = body['tahun']
    bulan = body['bulan']
    row = Pasien(None, nama, alamat,  umur, jenis_kelamin, satuan_umur, kategori_usia, is_batuk, is_sesak, is_data_training, suhu,  result, tahun, bulan)
    Pasien.query.session.add(row)
    Pasien.query.session.commit()

    pasien_object = Pasien.query.filter_by(nama=nama).first()
    schema = PasienSchema(many=False)  
    pasien = schema.dump(pasien_object)
    return jsonify(pasien),200

@app.route('/pasien/<id>',methods=["DELETE"])
def pasienRemoveById(id):
    found = Pasien.query.filter_by(id=id)
    if not found.first():
        return jsonify({ 'message': f'pasien with id {id} not found'}), 404
    found.delete()
    found.session.commit()
    return jsonify(found.first()),200


