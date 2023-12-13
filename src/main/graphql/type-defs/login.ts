import { gql } from 'graphql-tag';

export default gql`
    extend type Query {
        login(email: String!, password: String!): User!
    }

    extend type Mutation {
        signUp(username: String!, password: String!, passwordConfirmation: String!): User!
    }

    type User {
        accessToken: String!
        username: String!
    }
`;
