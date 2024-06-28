import { Injectable } from '@angular/core';
import { Tournament } from '../model/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private _tournaments = [];

  constructor() { }
}
