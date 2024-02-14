export const signUpParamsSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        passwordConfirmation: {
            type: 'string'
        }
    },
    required: ['username', 'password', 'passwordConfirmation']
};
