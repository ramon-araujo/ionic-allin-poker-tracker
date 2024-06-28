import { Player } from "./player.model";

export class Position {

    constructor(        
        public player: Player,
        public presences: number,
        public victories: number,
        public headUps: number,
        public itms: number,
        public positiveSessions: number,
        public points:number,
        public rebuys: number,
        public balance:number,        
        public winningRate: number
    ) {}
}