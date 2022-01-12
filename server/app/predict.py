from app import app
from app.models import Pasien, Test, Train
from flask import jsonify, request
import numpy as np
from c45 import C45
from sklearn.model_selection import train_test_split

from datetime import datetime

features = ['suhu', 'is_batuk', 'is_sesak']
def parseSuhu(suhu):
    return 0 if (suhu < 36) else 1 if (suhu >= 36 and suhu <=37.5) else 2 if (suhu > 37.5 and suhu < 39) else 3

@app.route('/predict',methods=["POST"])
def predict():
    
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
    tahun = body['tahun']
    bulan = body['bulan']
    
    data = []
    target = []
    pasien = Pasien.query.filter_by(is_data_training=True).all()
    for p in pasien:
        x = [parseSuhu(p.suhu), 1 if p.is_batuk else 0, 1 if p.is_sesak else 0]
        y = 1 if p.result else 0
        data.append(x)
        target.append(y)
    clf = C45(attrNames=features)

    X_train, X_test, y_train, y_test = train_test_split(np.array(data), target, test_size=0.5)
    clf.fit(X_train, y_train)
    C45(attrNames=features)
    acc = clf.score(X_test, y_test)
    predict_test = [[parseSuhu(suhu), 1 if is_batuk else 0, 1 if is_sesak else 0]]

   
    predict = clf.predict(np.array(predict_test))

    test_result = Pasien(None, nama, alamat,  umur, jenis_kelamin, satuan_umur, kategori_usia, is_batuk, is_sesak, is_data_training, suhu,  bool(predict[0]), tahun, bulan)
    Pasien.query.session.add(test_result)
    Pasien.query.session.commit()

    test_log = Test(None, f'{len(target)} training data', datetime.now(),  acc, test_result.id)
    Test.query.session.add(test_log)
    Test.query.session.commit()
    print({"predict":predict})
    
    return jsonify({"accuracy": acc, "predict": int(predict[0])}),200

@app.route('/retrain',methods=["GET"])
def retrain():
    data = []
    target = []
    pasien = Pasien.query.filter_by(is_data_training=True).all()
    for p in pasien:
        data.append([parseSuhu(p.suhu),  1 if p.is_batuk else 0, 1 if p.is_sesak else 0])
        target.append(1 if p.result else 0)
        
    clf = C45(attrNames=features)

    X_train, X_test, y_train, y_test = train_test_split(np.array(data), target, test_size=0.5)
    clf.fit(X_train, y_train)
    C45(attrNames=features)
    acc = clf.score(X_test, y_test)
    train_log = Train(None, f'{len(target)} training data', datetime.now(),  acc)
    Train.query.session.add(train_log)
    Train.query.session.commit()
    return jsonify({"accuracy": acc}),200


@app.route('/trend',methods=["POST"])
def trend():
    body = request.get_json()
    bulan = body['bulan']
    tahun = body['tahun']
    data = []
    target = []
    pasien = Pasien.query.filter(Pasien.is_data_training ==True, Pasien.tahun == tahun, Pasien.bulan <= bulan).all()
    if len(pasien) < 10:
        return jsonify({ 'message': f'Data training kurang dari 10'}), 404
    for p in pasien:
        t = 1 if p.result else 0
        d = [p.tahun, p.bulan]
        data.append(d)
        target.append(t)

    clf = C45(attrNames=['year','month'])

    X_train, X_test, y_train, y_test = train_test_split(np.array(data), target, test_size=0.5)
    clf.fit(X_train, y_train)
    C45(attrNames=['year','month'])
    acc = clf.score(X_test, y_test)
    predict = clf.predict([[int(tahun),int(bulan)]])
    print(acc, predict)
    return jsonify({"accuracy": acc,"predict": int(predict[0])}),200
