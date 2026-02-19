import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficovendasComponent } from './graficovendas.component';

describe('GraficovendasComponent', () => {
  let component: GraficovendasComponent;
  let fixture: ComponentFixture<GraficovendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficovendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficovendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
