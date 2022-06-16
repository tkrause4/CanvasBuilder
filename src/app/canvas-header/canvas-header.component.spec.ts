import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasHeaderComponent } from './canvas-header.component';

describe('CanvasHeaderComponent', () => {
  let component: CanvasHeaderComponent;
  let fixture: ComponentFixture<CanvasHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
