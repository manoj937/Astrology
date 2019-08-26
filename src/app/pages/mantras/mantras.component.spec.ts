import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantrasComponent } from './mantras.component';

describe('MantrasComponent', () => {
  let component: MantrasComponent;
  let fixture: ComponentFixture<MantrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
