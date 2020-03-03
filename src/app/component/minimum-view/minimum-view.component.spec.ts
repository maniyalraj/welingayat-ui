import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumViewComponent } from './minimum-view.component';

describe('MinimumViewComponent', () => {
  let component: MinimumViewComponent;
  let fixture: ComponentFixture<MinimumViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
