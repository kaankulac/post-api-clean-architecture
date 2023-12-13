export interface CreateUser {
    create: (data: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
    export type Params = {
        username: string;
        password: string;
    };

    export type Result = boolean;
}
