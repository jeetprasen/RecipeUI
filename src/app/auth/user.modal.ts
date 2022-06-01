export class User {
    constructor(
        public userId: string,
        public _email: string, 
        private _token: string,
        public expiresIn: Date
    ) {}

    get token() {
        if(!this.expiresIn || new Date() > this.expiresIn) return null;
        return this._token;
    }
}