import { Pasien } from "./pasien";

export interface Testing {
  id?: number;
  label?: string;
  timestamp?: Date;
  accuracy?: number;
  id_pasien?: number;
  pasien_rel?: Pasien
}
