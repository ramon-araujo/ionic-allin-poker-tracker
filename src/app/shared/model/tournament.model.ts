import { PlayerParticipation } from "./player-participation";
import { TournamentSettings } from "./tournament-settings";

export class Tournament {

    constructor(
        public id: string,
        public date: Date,
        public players: PlayerParticipation[],
        public startingTime: Date | undefined,
        public endingTime: Date | undefined,
        public settings: TournamentSettings) {}
}