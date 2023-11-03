import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlientListComponent } from './klient-list.component';

describe('KlientListComponent', () => {
  let component: KlientListComponent;
  let fixture: ComponentFixture<KlientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlientListComponent]
    });
    fixture = TestBed.createComponent(KlientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
