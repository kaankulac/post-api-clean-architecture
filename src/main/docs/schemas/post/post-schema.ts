export const postSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        author: {
            type: 'string'
        }
    }
};

export const postsSchema = {
    type: 'object',
    properties: {
        posts: {
            type: 'array',
            items: postSchema
        },
        totalCount: {
            type: 'number'
        }
    }
};
