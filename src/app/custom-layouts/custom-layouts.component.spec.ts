import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLayoutsComponent } from './custom-layouts.component';

describe('CustomLayoutsComponent', () => {
  let component: CustomLayoutsComponent;
  let fixture: ComponentFixture<CustomLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
