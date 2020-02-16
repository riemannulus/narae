export class Authentication extends Error {
  constructor(m: string) {
      super(m);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, Authentication.prototype);
  }
}
