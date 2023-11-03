import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitesListComponent } from './shites-list.component';

describe('ShitesListComponent', () => {
  let component: ShitesListComponent;
  let fixture: ComponentFixture<ShitesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShitesListComponent]
    });
    fixture = TestBed.createComponent(ShitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
