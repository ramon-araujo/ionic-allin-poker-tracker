import { User } from "./user.model";

export class Player {

    constructor(
        public name: string, 
        public user: User | undefined) { }
    
}