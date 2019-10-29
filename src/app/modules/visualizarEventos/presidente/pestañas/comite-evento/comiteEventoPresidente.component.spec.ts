import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteEventoVer } from './comiteEventoPresidente.component';

describe('ComiteEventoVer', () => {
  let component: ComiteEventoVer;
  let fixture: ComponentFixture<ComiteEventoVer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteEventoVer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteEventoVer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
