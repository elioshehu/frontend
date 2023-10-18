import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitesComponent } from './shites.component';

describe('ShitesComponent', () => {
  let component: ShitesComponent;
  let fixture: ComponentFixture<ShitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShitesComponent]
    });
    fixture = TestBed.createComponent(ShitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
