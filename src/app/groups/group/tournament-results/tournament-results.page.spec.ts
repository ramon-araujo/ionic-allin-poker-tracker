import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentResultsPage } from './tournament-results.page';

describe('TournamentResultsPage', () => {
  let component: TournamentResultsPage;
  let fixture: ComponentFixture<TournamentResultsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
