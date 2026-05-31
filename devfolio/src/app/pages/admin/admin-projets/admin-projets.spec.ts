import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjets } from './admin-projets';

describe('AdminProjets', () => {
  let component: AdminProjets;
  let fixture: ComponentFixture<AdminProjets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjets],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProjets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
