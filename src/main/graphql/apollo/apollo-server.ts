import typeDefs from '@main/graphql/type-defs';
import resolvers from '@main/graphql/resolvers';
import { authDirectiveTransformer } from '../directives';

import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

const checkError = (error: GraphQLError, errorName: string): boolean => {
    return [error.name, error.originalError?.name].some(name => name === errorName);
};

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
    errors?.forEach(error => {
        response.data = undefined;
        if (checkError(error, 'UserInputError')) {
            response.http.status = 400;
        } else if (checkError(error, 'AuthenticationError')) {
            response.http.status = 401;
        } else if (checkError(error, 'ForbiddenError')) {
            response.http.status = 403;
        } else {
            response.http.status = 500;
        }
    });
};

let schema = makeExecutableSchema({ resolvers, typeDefs });
schema = authDirectiveTransformer(schema);

interface Context {
    req?: any;
}

export const setupApolloServer = (): ApolloServer =>
    new ApolloServer<Context>({
        typeDefs: schema,
        resolvers,
        plugins: [
            {
                requestDidStart: async () => ({
                    willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
                })
            }
        ]
    });
