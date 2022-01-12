from app import db
from marshmallow import Schema, fields

class User(db.Model):   
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
    

class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    password = fields.Str()

class KategoriUsia(db.Model):   
    id = db.Column(db.Integer(), primary_key=True)
    kategori = db.Column(db.String())
    min = db.Column(db.Integer())
    max = db.Column(db.Integer())
    satuan = db.Column(db.String())

    def __init__(self,id, kategori, min, max, satuan):
        self.id = id
        self.kategori = kategori
        self.min = min
        self.max = max
        self.satuan = satuan
    
class KategoriUsiaSchema(Schema):
    id = fields.Number()
    kategori = fields.Str()
    min = fields.Number()
    max = fields.Number()
    satuan = fields.Str()



class Train(db.Model):   
    id = db.Column(db.Integer(), primary_key=True)
    label = db.Column(db.String())
    timestamp = db.Column(db.DateTime())
    accuracy = db.Column(db.Integer())
    def __init__(self, id, label, timestamp, accuracy):
        self.id = id
        self.label = label
        self.timestamp = timestamp
        self.accuracy = accuracy
    
class TrainSchema(Schema):
    id = fields.Number()
    label = fields.Str()
    timestamp = fields.DateTime()
    accuracy = fields.Number()

class Pasien(db.Model):   
    id = db.Column(db.Integer(), primary_key=True)
    nama = db.Column(db.String())
    alamat = db.Column(db.String())
    umur = db.Column(db.Integer())
    jenis_kelamin = db.Column(db.String())
    satuan_umur = db.Column(db.String())
    suhu = db.Column(db.Float())
    is_batuk = db.Column(db.Boolean())
    is_sesak = db.Column(db.Boolean())
    is_data_training = db.Column(db.Boolean())
    tahun = db.Column(db.Integer())
    bulan = db.Column(db.Integer())
    result = db.Column(db.Boolean())
    
    kategori_usia = db.Column(db.Integer(), db.ForeignKey('kategori_usia.id'))
    kategori_usia_rel = db.relationship('KategoriUsia', backref='Pasien')
    def __init__(self, id, nama, alamat, umur, jenis_kelamin, satuan_umur, kategori_usia, is_batuk, is_sesak, is_data_training, suhu, result, tahun, bulan):
        self.id = id
        self.nama = nama
        self.alamat = alamat
        self.umur = umur
        self.satuan_umur = satuan_umur
        self.kategori_usia = kategori_usia
        self.jenis_kelamin = jenis_kelamin
        self.is_batuk = is_batuk
        self.is_sesak = is_sesak
        self.is_data_training = is_data_training
        self.suhu = suhu
        self.result = result
        self.tahun = tahun
        self.bulan = bulan
            
class PasienSchema(Schema):
    id = fields.Number()
    nama = fields.Str()
    alamat = fields.Str()
    umur = fields.Number()
    satuan_umur = fields.Str()
    jenis_kelamin = fields.Str()
    is_batuk = fields.Boolean()
    is_sesak = fields.Boolean()
    is_data_training = fields.Boolean()
    result = fields.Boolean()
    suhu = fields.Number()
    kategori_usia = fields.Number()
    kategori_usia_rel = fields.Nested(KategoriUsiaSchema)
    tahun = fields.Number()
    bulan = fields.Number()

class Test(db.Model):   
    id = db.Column(db.Integer(), primary_key=True)
    label = db.Column(db.String())
    timestamp = db.Column(db.DateTime())
    accuracy = db.Column(db.Integer())
    id_pasien = db.Column(db.Integer(),  db.ForeignKey('pasien.id'))
    pasien = db.relationship('Pasien', backref='Test')
    def __init__(self, id, label, timestamp, accuracy, id_pasien):
        self.id = id
        self.label = label
        self.timestamp = timestamp
        self.accuracy = accuracy
        self.id_pasien = id_pasien  
    
class TestSchema(Schema):
    id = fields.Number()
    label = fields.Str()
    timestamp = fields.DateTime()
    accuracy = fields.Number()
    id_pasien = fields.Integer()
    kategori_usia_rel = fields.Nested(PasienSchema)