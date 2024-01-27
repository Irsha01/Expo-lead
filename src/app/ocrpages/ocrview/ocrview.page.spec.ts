import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcrviewPage } from './ocrview.page';

describe('OcrviewPage', () => {
  let component: OcrviewPage;
  let fixture: ComponentFixture<OcrviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OcrviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
