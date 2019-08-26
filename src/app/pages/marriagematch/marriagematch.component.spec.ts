import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriagematchComponent } from './marriagematch.component';

describe('MarriagematchComponent', () => {
  let component: MarriagematchComponent;
  let fixture: ComponentFixture<MarriagematchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriagematchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriagematchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
