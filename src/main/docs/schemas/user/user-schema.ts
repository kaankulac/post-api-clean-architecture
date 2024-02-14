export const userLoginSchema = {
    type: 'object',
    properties: {
        accessToken: {
            type: 'string'
        },
        username: {
            type: 'string'
        }
    }
};
