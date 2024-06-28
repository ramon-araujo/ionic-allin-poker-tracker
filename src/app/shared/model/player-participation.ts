import { Player } from "./player.model";

export class PlayerParticipation {

    constructor(
        public player: Player,
        public position: number,
        public rebuys: number,
        public eliminationTime: Date | undefined
    ) {

    }
}