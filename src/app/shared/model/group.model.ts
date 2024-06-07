import { Player } from "./player.model";

export class Group {

    constructor(
        public id: string,
        public name: string,
        public imagePath: string,
        public players: Player[]
    ) { }
}