import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBadges } from './type-badges';

describe('TypeBadges', () => {
  let component: TypeBadges;
  let fixture: ComponentFixture<TypeBadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeBadges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeBadges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
