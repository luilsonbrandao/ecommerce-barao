import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestaquesComponent } from './destaques.component';

describe('DestaquesComponent', () => {
  let component: DestaquesComponent;
  let fixture: ComponentFixture<DestaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestaquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
