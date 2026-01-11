import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateToken = (payload: { id: any }, res: any) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' })
    res.cookie('token', token, {
        httpOnly: false,
        sameSite: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
    })
}