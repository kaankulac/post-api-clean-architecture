import mongoose, { Mongoose } from 'mongoose';

export const MongoHelper = {
    client: null as Mongoose | null,
    uri: null as string | null,

    async connect(uri: string): Promise<void> {
        this.uri = uri;
        this.client = await mongoose.connect(uri);
    },

    async disconnect(): Promise<void> {
        await this.client!.disconnect();
        this.client = null;
    },

    map: (data: any): any => {
        const { _id, ...rest } = data;
        return { ...rest._doc, id: _id.toHexString() };
    },

    mapCollection: (collection: any[]): any[] => {
        return collection.map(c => MongoHelper.map(c));
    }
};
