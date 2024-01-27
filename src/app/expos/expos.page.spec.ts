import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExposPage } from './expos.page';

describe('ExposPage', () => {
  let component: ExposPage;
  let fixture: ComponentFixture<ExposPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
