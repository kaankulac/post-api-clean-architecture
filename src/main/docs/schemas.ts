import {
    loginParamsSchema,
    errorSchema,
    signUpParamsSchema,
    followUserParams,
    postsSchema,
    createPostSchema,
    userLoginSchema
} from './schemas/';

export default {
    loginParams: loginParamsSchema,
    userSchema: userLoginSchema,
    signUpParams: signUpParamsSchema,
    followUserParams: followUserParams,
    createPostParams: createPostSchema,
    postsSchema: postsSchema,
    error: errorSchema
};
