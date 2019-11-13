import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentConfirmationComponent } from '../app/payment-confirmation/payment-confirmation.component';
import { StoreCheckoutHomepageComponent } from '../app/store-checkout-homepage/store-checkout-homepage.component';

const routes: Routes = [
  { path: 'checkout',component: StoreCheckoutHomepageComponent },
  { path: 'payment',component: PaymentConfirmationComponent },
  { path: '', redirectTo: '/checkout', pathMatch: 'full' },
  { path: 'returnHomepage', component: StoreCheckoutHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StoreCheckoutHomepageComponent, PaymentConfirmationComponent]
