import { loginPath, signUpPath, followPath, createPostPath, loadPostsPath } from './paths/';

export default {
    '/login': loginPath,
    '/signup': signUpPath,
    '/user/follow': followPath,
    '/post/create': createPostPath,
    '/posts': loadPostsPath
};
