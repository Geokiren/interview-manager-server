export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      JWT_SECRET: string,
      MONGO_URI: string,
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}
