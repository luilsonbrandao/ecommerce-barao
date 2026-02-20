import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorfreteComponent } from './editorfrete.component';

describe('EditorfreteComponent', () => {
  let component: EditorfreteComponent;
  let fixture: ComponentFixture<EditorfreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorfreteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorfreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
