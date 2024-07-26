import { UserCredential } from "firebase/auth";

export class User {

    constructor(
        public id: string | null,
        public email: string,
        public name: string,        
        public birthDate: Date,
        private _token: string | null
        ) {            
    }

    get token() {
        return this._token;
    }
}