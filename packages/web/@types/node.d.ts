declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        FAKETTER_SERVER_URL: string;
      }
    }
  }
}
