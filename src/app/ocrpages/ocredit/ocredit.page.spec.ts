import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcreditPage } from './ocredit.page';

describe('OcreditPage', () => {
  let component: OcreditPage;
  let fixture: ComponentFixture<OcreditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OcreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
