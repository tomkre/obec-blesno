import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidepostComponent } from './guidepost.component';

describe('GuidepostComponent', () => {
  let component: GuidepostComponent;
  let fixture: ComponentFixture<GuidepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
