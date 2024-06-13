import bcrypt from "bcryptjs";

export const cryptoPassword = (pass: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

export const  comaprePassword = (pass: string,hash: string): boolean => {
    return bcrypt.compareSync(pass, hash); // true
}