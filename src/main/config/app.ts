import setupMiddlewares from '@main/config/middlewares';
import setupRoutes from '@main/config/routes';
import setupStaticFiles from '@main/config/static-file';
import { expressMiddleware } from '@apollo/server/express4';
import { setupApolloServer } from '@main/graphql/apollo';

import express, { Express } from 'express';

export const setupApp = async (): Promise<Express> => {
    const app = express();
    setupStaticFiles(app);
    setupMiddlewares(app);
    setupRoutes(app);
    const server = setupApolloServer();
    await server.start();
    app.use(
        '/api',
        expressMiddleware(server, {
            context: async ({ req }) => ({ req })
        })
    );
    return app;
};
