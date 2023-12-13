import { Schema, model } from 'mongoose';
import { LogDocument } from '@domain/models';

const LogSchema = new Schema(
    {
        stack: { type: String, required: true }
    },
    { timestamps: true }
);

export const Log = model<LogDocument>('Log', LogSchema);
