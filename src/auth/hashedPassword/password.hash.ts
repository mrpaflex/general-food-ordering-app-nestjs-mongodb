import * as bcrypt from 'bcrypt';

export const HashedPassword = async (password: string)=>{
    const salt = 10;
    return await bcrypt.hash(password, salt)
}

export const comparedPassword = async (password: string, hashed: string): Promise<boolean>=>{
    return await bcrypt.compare(password, hashed);
}