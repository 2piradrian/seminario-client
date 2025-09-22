import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";

export interface GetUserByIdRes {
  id: string;
  name: string;
  surname: string;
  email: string;
  memberSince: string;   
  lastLogin: string;     
  portraitImage: string;
  profileImage: string;
  shortDescription: string;
  longDescription: string;
  styles: Style[];
  instruments: Instrument[];
}