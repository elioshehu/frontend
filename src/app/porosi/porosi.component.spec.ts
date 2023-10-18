import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorosiComponent } from './porosi.component';

describe('PorosiComponent', () => {
  let component: PorosiComponent;
  let fixture: ComponentFixture<PorosiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorosiComponent]
    });
    fixture = TestBed.createComponent(PorosiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
