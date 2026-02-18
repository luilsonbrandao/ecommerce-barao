import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorcategoriaComponent } from './editorcategoria.component';

describe('EditorcategoriaComponent', () => {
  let component: EditorcategoriaComponent;
  let fixture: ComponentFixture<EditorcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorcategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
