module.exports = {
    mongoDbMemoryServer: {
        version: 'latest'
    },
    mongoDbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '6.0.9',
            skipMD5: true
        },
        autoStart: false
    }
}