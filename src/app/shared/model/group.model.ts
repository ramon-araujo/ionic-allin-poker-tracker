import { Player } from "./player.model";
import { Tournament } from "./tournament.model";

export class Group {

    constructor(
        public id: string | null,
        public name: string,
        public description: string,
        public imagePath: string,
        public players: Player[],
        public tournaments: Tournament[]
    ) {        
    }    
}