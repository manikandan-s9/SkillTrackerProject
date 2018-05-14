import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilldashboardComponent } from './skilldashboard.component';

describe('SkilldashboardComponent', () => {
  let component: SkilldashboardComponent;
  let fixture: ComponentFixture<SkilldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkilldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
