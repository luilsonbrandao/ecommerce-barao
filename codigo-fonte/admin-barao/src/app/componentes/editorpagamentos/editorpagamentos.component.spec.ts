import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorpagamentosComponent } from './editorpagamentos.component';

describe('EditorpagamentosComponent', () => {
  let component: EditorpagamentosComponent;
  let fixture: ComponentFixture<EditorpagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorpagamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorpagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
