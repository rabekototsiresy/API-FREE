import { ERole } from "common/enums/ERole";

export interface IUser {
    id: number;
    email: string;
    firstName: string; 
    lastName: string; 
    role: ERole
}