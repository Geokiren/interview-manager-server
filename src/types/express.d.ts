export { };

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      },
      interview: {
        id: string
      }
    }

    interface Response {
      user: {
        id: string
      },
      interview: {
        id: string
      }
    }
  }
}
