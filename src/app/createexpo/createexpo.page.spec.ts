import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateexpoPage } from './createexpo.page';

describe('CreateexpoPage', () => {
  let component: CreateexpoPage;
  let fixture: ComponentFixture<CreateexpoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateexpoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
