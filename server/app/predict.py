from app import app
from app.models import Pasien, Test, Train
from flask import jsonify, request
import numpy as np
from c45 import C45
from sklearn.model_selection import train_test_split

from datetime import datetime

features = ['suhu', 'is_batuk', 'is_sesak', 'kategori_usia']

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

    data = []
    target = []
    pasien = Pasien.query.filter_by(is_data_training=True).all()
    for p in pasien:
        data.append([p.suhu, p.is_batuk,p.is_sesak,p.kategori_usia])
        target.append(p.result)
        
    clf = C45(attrNames=features)

    X_train, X_test, y_train, y_test = train_test_split(np.array(data), target, test_size=0.5)
    clf.fit(X_train, y_train)
    C45(attrNames=features)
    acc = clf.score(X_test, y_test)
    predict_test = [[suhu, is_batuk, is_sesak, kategori_usia]]

   
    predict = clf.predict(np.array(predict_test))

    test_result = Pasien(None, nama, alamat,  umur, jenis_kelamin, satuan_umur, kategori_usia, is_batuk, is_sesak, is_data_training, suhu,  bool(predict[0]))
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
        data.append([p.suhu, p.is_batuk,p.is_sesak,p.kategori_usia])
        target.append(p.result)
        
    clf = C45(attrNames=features)

    X_train, X_test, y_train, y_test = train_test_split(np.array(data), target, test_size=0.5)
    clf.fit(X_train, y_train)
    C45(attrNames=features)
    acc = clf.score(X_test, y_test)
    train_log = Train(None, f'{len(target)} training data', datetime.now(),  acc)
    Train.query.session.add(train_log)
    Train.query.session.commit()
    return jsonify({"accuracy": acc}),200