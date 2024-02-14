export const loadPostsPath = {
    get: {
        tags: ['Post'],
        summary: 'API Load Posts Path',
        description: 'This route can be run by **any user**',
        parameters: [
            {
                name: 'page',
                in: 'query',
                required: true,
                description: 'Page',
                type: 'string'
            },
            {
                name: 'per',
                in: 'query',
                required: true,
                description: 'Data Per Request',
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/postsSchema'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            401: {
                $ref: '#/components/unauthorized'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
};
