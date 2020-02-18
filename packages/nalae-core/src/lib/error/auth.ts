export class AuthenticationError extends Error {
  constructor(m: string) {
      super(m);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
