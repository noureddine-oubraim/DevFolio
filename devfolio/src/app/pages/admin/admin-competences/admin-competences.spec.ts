import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompetences } from './admin-competences';

describe('AdminCompetences', () => {
  let component: AdminCompetences;
  let fixture: ComponentFixture<AdminCompetences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCompetences],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCompetences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
