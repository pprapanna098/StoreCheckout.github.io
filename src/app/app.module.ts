import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreCheckoutHomepageComponent } from "./store-checkout-homepage/store-checkout-homepage.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentConfirmationComponent, CashPaymentComponentCashDialog, ConfirmPaymentComponentDialog } from "./payment-confirmation/payment-confirmation.component";
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThermalPrintModule } from 'ng-thermal-print';

@NgModule({
  declarations: [
    AppComponent,
    StoreCheckoutHomepageComponent,
    PaymentConfirmationComponent,
    CashPaymentComponentCashDialog,
    ConfirmPaymentComponentDialog

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    ThermalPrintModule
  ],
  entryComponents: [PaymentConfirmationComponent, CashPaymentComponentCashDialog, ConfirmPaymentComponentDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
