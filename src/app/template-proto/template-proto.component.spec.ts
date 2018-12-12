import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProtoComponent } from './template-proto.component';

describe('TemplateProtoComponent', () => {
  let component: TemplateProtoComponent;
  let fixture: ComponentFixture<TemplateProtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateProtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
