import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlientComponent } from './klient.component';

describe('KlientComponent', () => {
  let component: KlientComponent;
  let fixture: ComponentFixture<KlientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlientComponent]
    });
    fixture = TestBed.createComponent(KlientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
