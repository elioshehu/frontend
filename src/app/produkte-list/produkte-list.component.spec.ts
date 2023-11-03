import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukteListComponent } from './produkte-list.component';

describe('ProdukteListComponent', () => {
  let component: ProdukteListComponent;
  let fixture: ComponentFixture<ProdukteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdukteListComponent]
    });
    fixture = TestBed.createComponent(ProdukteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
