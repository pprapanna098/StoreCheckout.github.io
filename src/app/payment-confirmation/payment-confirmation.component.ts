import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';

declare var epson: any;

export interface DialogData {
  cash: number;
}

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  epson: any;
  printerOptions = true;
  selectedCash = true;
  cash: number= 0;
  subtotal: any;
  totalAmount: any;
  dataTable: any;
  buttonDisable = true;
  differenceCash = 0;

  ngOnInit() {
    let localAmountsData = JSON.parse(sessionStorage.getItem('localAmountsData'));
    if (localAmountsData !== null && localAmountsData !== undefined) {
      this.subtotal = localAmountsData["subtotal"];
      this.totalAmount = localAmountsData["totalAmount"];
    }
    let testObject = JSON.parse(sessionStorage.getItem('testObject'));
    this.dataTable = testObject == null ? [] : testObject;
  }

  constructor(public dialog: MatDialog,
              private printService: PrintService,
              private router: Router) {
  }

  printerType() {
    this.printerOptions = !this.printerOptions;
  }
  cashMethod(): void {
    this.selectedCash = !this.selectedCash;
    const dialogRef = this.dialog.open(CashPaymentComponentCashDialog, {
      width: '590px',
      height: '385px',
      data: {cash: this.cash}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cash =+ result.cash;
      if (this.cash >= this.totalAmount) {
        this.buttonDisable = false;
      }
    });
    this.differenceCash = this.totalAmount - this.cash;
  }
  confirmPayment() {
    const dialogRef = this.dialog.open(ConfirmPaymentComponentDialog, {
      width: '615px',
      height: '370px',
      data: {cash: this.cash}
    });
    var builder = new epson.ePOSBuilder();
    builder.addPulse(builder.DRAWER_1, builder.PULSE_100);
    var request = builder.toString();
    var address = 'http://10.21.32.226/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000';
    var epos = new epson.ePOSPrint(address);
    epos.ondraweropen = function () {
      // alert('draweropen');
      };
    epos.open();
    epos.send(request);
  }
  voidTransaction(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['returnHomepage']);
  }
  goBack(): void {
    this.router.navigate(['returnHomepage']);
  }
}

// --------------------Cash Popup-------------------------------
@Component({
  selector: 'cash-dialog-popup',
  templateUrl: 'cash-dialog-popup.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class CashPaymentComponentCashDialog {

  constructor(
    public dialogRef: MatDialogRef<CashPaymentComponentCashDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// -------------------Confirm Payment Popup----------------------
@Component({
  selector: 'confirm-dialog-popup',
  templateUrl: 'confirm-payment-dialog.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class ConfirmPaymentComponentDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ConfirmPaymentComponentDialog>,
    private router: Router) {
      dialogRef.disableClose = true;
    }

    frontPrint() {
    var builder = new epson.ePOSBuilder();
    // Create a print document
    builder.addTextLang('en')
    builder.addTextSmooth(true);
    builder.addTextFont(builder.FONT_A);
    builder.addTextSize(2, 2);
    builder.addText('Hello,\tComcast!\n');
    builder.addTextSize(1, 1);
    builder.addText('Front Printer\tused!\n');
    builder.addCut(builder.CUT_FEED);
    builder.addPulse(builder.DRAWER_2, builder.PULSE_100);

    // Acquire the print document
    var request = builder.toString();

    // var address = '';
    var address = 'http://10.21.32.226/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000';

    // Create an ePOS-Print object
    var epos = new epson.ePOSPrint(address);
    epos.send(request);
    console.log('printer Working');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['returnHomepage']);
  }
  backPrint() {
    var builder = new epson.ePOSBuilder();
    // Create a print document
    builder.addTextLang('en')
    builder.addTextSmooth(true);
    builder.addTextFont(builder.FONT_A);
    builder.addTextSize(2, 2);
    builder.addText('Hello,\tComcast!\n');
    builder.addTextSize(1, 1);
    builder.addText('Back Printer\tused!\n');
    builder.addCut(builder.CUT_FEED);
    // builder.addPulse(builder.DRAWER_2, builder.PULSE_100);

    // Acquire the print document
    var request = builder.toString();

    // var address = '';
    var address = 'http://10.21.32.131/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000';

    // Create an ePOS-Print object
    var epos = new epson.ePOSPrint(address);
    epos.send(request);
    console.log('Back Printer Used');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['returnHomepage']);
  }
  noneClick(){
    this.dialogRef.close();
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['returnHomepage']);
  }
}

