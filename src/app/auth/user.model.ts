export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationData: Date
  ) {}

  get token() {
    if (!this._tokenExpirationData || this._tokenExpirationData < new Date())
      return null;
    return this._token;
  }
}
