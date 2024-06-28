import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterResultPage } from './register-result.page';

describe('RegisterResultPage', () => {
  let component: RegisterResultPage;
  let fixture: ComponentFixture<RegisterResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
