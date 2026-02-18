import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorprodutosComponent } from './editorprodutos.component';

describe('EditorprodutosComponent', () => {
  let component: EditorprodutosComponent;
  let fixture: ComponentFixture<EditorprodutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorprodutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
