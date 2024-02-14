export const followUserParams = {
    type: 'object',
    properties: {
        followedBy: {
            type: 'string'
        },
        followed: {
            type: 'string'
        }
    },
    required: ['followedBy', 'followed']
};
