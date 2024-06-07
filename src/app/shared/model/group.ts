import { Player } from "./player";

export class Group {

    constructor(
        public name: string, 
        public players: Player[]
    ) { }
}