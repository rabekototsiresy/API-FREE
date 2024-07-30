import { number } from "joi";

export interface IPilotage {
  id?: number;
  status: number;
  filename: string;
  createdAt: Date;
}

export interface IFile {
  id?: number;
  TypeProd: string;
  NumCompteur: string;
  Activite: string;
  Depot: string;
  DateLivraison: string;
  IdProd: string;
  Adresse1: string;
  Adresse2: string;
  Adresse3: string;
  Adresse4: string;
  Adresse5: string;
  Adresse6: string;
  CodeArticle: string;
  CodePostal: string;
  Commune: string;
  Smartdata: string;
  NomPDF: string;
  Portabilite: string;
  PosteOffre: string;
  PosteOption: string;
  AlliagePremium: string;
  CodeError: string;
  status: number; //0: ko,1: ok,2: encours
}

export interface IRetourMSP {
  IdProd: string;
  NomPDF: string;
  DateFinTraitement: Date;
  Statut: string | number;
  CodeErreur: string;
  Utilisateur: string;
}
