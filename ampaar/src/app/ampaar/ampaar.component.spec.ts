import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpaarComponent } from './ampaar.component';

describe('AmpaarComponent', () => {
  let component: AmpaarComponent;
  let fixture: ComponentFixture<AmpaarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmpaarComponent]
    });
    fixture = TestBed.createComponent(AmpaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
