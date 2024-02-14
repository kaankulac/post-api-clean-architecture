export const signUpPath = {
    post: {
        tags: ['Authentication'],
        summary: 'API to create a user account',
        description: 'This route can be run by **any user**',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signUpParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/userSchema'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
};
