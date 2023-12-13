import { Types } from 'mongoose';

export interface LogDocument {
    id?: Types.ObjectId | string;
    stack: string;
}
