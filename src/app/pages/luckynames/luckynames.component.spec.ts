import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckynamesComponent } from './luckynames.component';

describe('LuckynamesComponent', () => {
  let component: LuckynamesComponent;
  let fixture: ComponentFixture<LuckynamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuckynamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckynamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
