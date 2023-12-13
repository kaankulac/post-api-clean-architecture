import { adaptRoute } from '@main/adapters';
import { makeCraetePostController } from '@main/factories';
import { auth } from '@main/middlewares';
import { Router } from 'express';

export default (router: Router): void => {
    router.post('/post/create', [auth], adaptRoute(makeCraetePostController()));
};
