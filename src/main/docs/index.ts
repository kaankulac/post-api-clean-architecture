import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
    openapi: '3.0.0',
    info: {
        title: 'Post API Clean Architecture',
        description: 'Post API Clean Architecture',
        version: '1.0.0'
    },
    servers: [
        {
            url: '/api',
            description: 'Main Server'
        }
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'APIs related to Authentication'
        },
        {
            name: 'User',
            description: 'APIs related to Profile'
        },
        {
            name: 'Post',
            description: 'APIs related to Advertisement'
        }
    ],
    explorer: true,
    paths,
    schemas,
    components
};
