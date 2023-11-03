import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorosiListComponent } from './porosi-list.component';

describe('PorosiListComponent', () => {
  let component: PorosiListComponent;
  let fixture: ComponentFixture<PorosiListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorosiListComponent]
    });
    fixture = TestBed.createComponent(PorosiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
