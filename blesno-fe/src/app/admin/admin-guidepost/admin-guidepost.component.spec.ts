import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuidepostComponent } from './admin-guidepost.component';

describe('AdminGuidepostComponent', () => {
  let component: AdminGuidepostComponent;
  let fixture: ComponentFixture<AdminGuidepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGuidepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuidepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
