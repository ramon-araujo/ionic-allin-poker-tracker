import { Tournament } from "./tournament.model";
import { User } from "./user.model";

export class Player {

    constructor(
        public id: string | undefined,
        public name: string,
        public groupId: string | undefined,
        public user: User | null) { }
    
}