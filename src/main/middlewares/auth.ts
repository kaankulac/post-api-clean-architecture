import { adoptMiddleware } from '@main/adapters';
import { makeAuthMiddleware } from '@main/factories';

export const auth = adoptMiddleware(makeAuthMiddleware());
