import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCheckoutHomepageComponent } from './store-checkout-homepage.component';

describe('StoreCheckoutHomepageComponent', () => {
  let component: StoreCheckoutHomepageComponent;
  let fixture: ComponentFixture<StoreCheckoutHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCheckoutHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
