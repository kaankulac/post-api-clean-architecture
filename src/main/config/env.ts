export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/post-api-clean-architecture',
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || 'asf2_qsa7Y='
};
