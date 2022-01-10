import { KategoriUsia } from "./kategori-usia";

export interface Pasien {
  id?: number;
  nama?: string;
  alamat?: string;
  umur?: number;
  kategori_usia?: number;
  suhu?: number;
  is_batuk?: boolean;
  is_sesak?: boolean;
  is_data_training?: boolean;
  kategori_usia_rel?: KategoriUsia;
  result?: string;
}
