import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretesComponent } from './fretes.component';

describe('FretesComponent', () => {
  let component: FretesComponent;
  let fixture: ComponentFixture<FretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
