export const createPostPath = {
    post: {
        security: [
            {
                apiKeyAuth: [] as any
            }
        ],
        tags: ['Post'],
        summary: 'API Create Post Path',
        description: 'This route can be run by **authenticated user**',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/createPostParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {}
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
