import { adoptResolver } from '@main/adapters';
import { makeLoginController, makeSignUpController } from '@main/factories';

export default {
    Query: {
        login: async (parent: any, args: any) => adoptResolver(makeLoginController(), args)
    },

    Mutation: {
        signUp: async (parent: any, args: any) => adoptResolver(makeSignUpController(), args)
    }
};
