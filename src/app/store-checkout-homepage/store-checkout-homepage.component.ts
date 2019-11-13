import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-store-checkout-homepage',
  templateUrl: './store-checkout-homepage.component.html',
  styleUrls: ['./store-checkout-homepage.component.css']
})
export class StoreCheckoutHomepageComponent implements OnInit {

  @ViewChild('mtable', { static: false }) table: MatTable<any>;

  // public dataItems: any;
  public dataTable: any;
  textValue:        string;
  isSelected:       boolean = false;
  totalAmount:      number = 0;
  amount:           number = 0;
  tax:              number = 2.00;
  subtotal:         number = 0;
  disableButton:    boolean = true;
  selectedItem:     string;
  dataItems:        any;
  displayedColumns: string[] = ['itemNumber', 'name', 'price', 'Actions'];

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataItems = [
      { itemNumber: 1, name: 'Iphone Charger', price: '50.99' },
      { itemNumber: 2, name: 'Phone case', price: '12.00' },
      { itemNumber: 3, name: 'Phone Cover', price: '30.00' },
      { itemNumber: 4, name: 'Ear phones', price: '30.00' },
      { itemNumber: 5, name: 'Screen gaurd', price: '9.99' },
      { itemNumber: 6, name: 'HDMI Cable', price: '4.77' },
      { itemNumber: 7, name: 'Wifi Router', price: '500.99' },
      { itemNumber: 1, name: 'Iphone', price: '1099.99' },
      { itemNumber: 8, name: 'Digital Clock', price: '50.99' },
      { itemNumber: 9, name: 'Phone Chager', price: '79.99' },
      { itemNumber: 10, name: 'Samsung Phone', price: '700.99' }
    ];
    this.dataTable = [{ itemNumber: 1, name: "asd", price: "12" }];
    let testObject = JSON.parse(sessionStorage.getItem('testObject'));
    this.dataTable = testObject == null ? [] : testObject;
    if (testObject != null) {
      this.isSelected = true;
      this.disableButton = false;
    }
    else  {
      this.disableButton = true;
    }
    let localAmountsData = JSON.parse(sessionStorage.getItem('localAmountsData'));
    if (localAmountsData != null && localAmountsData != undefined) {
      this.subtotal = localAmountsData["subtotal"];
      this.totalAmount = localAmountsData["totalAmount"];
    }
  }
  onChange(): void {
    // debugger;
    let item = this.selectedItem;
    this.tax = 2;
    this.dataTable.push(this.dataItems.filter(t => t.name == item)[0]);
    let amnt = this.dataItems.filter(t => t.name == item)[0]["price"]
    this.isSelected = true;
    this.disableButton = false;
    this.subtotal = +((parseFloat)(amnt) + (+this.subtotal.toFixed(2))).toFixed(2);
    this.totalAmount = +this.subtotal.toFixed(2) + this.tax;
    let cloned = [...this.dataTable]
    this.dataTable = cloned
    let localAmountsData = {
      subtotal: this.subtotal,
      totalAmount: this.totalAmount
    };
    //this.table.renderRows();
    sessionStorage.setItem('testObject', JSON.stringify(this.dataTable));
    sessionStorage.setItem('localAmountsData', JSON.stringify(localAmountsData));
    if (this.dataTable.length < 1) {
      this.disableButton = true;
    }
  }
  delete(itemNumber, i): void {
    let count = 0;
    let amnt = this.dataItems.filter(t => t.itemNumber == itemNumber)[0]["price"]

    this.subtotal = +(+this.subtotal.toFixed(2) - parseFloat(amnt)).toFixed(2);
    this.totalAmount = +(+this.subtotal.toFixed(2) + this.tax).toFixed(2);

    this.dataTable.splice(i, 1);
    if (this.dataTable.length < 1) {
      this.totalAmount = 0.00;
      this.tax = 0.00;
    }
    if (this.dataTable.length < 1) {
      this.disableButton = true;
    }
    let localAmountsData = {
      subtotal: this.subtotal,
      totalAmount: this.totalAmount
    }
    let cloned = [...this.dataTable]
    this.dataTable = cloned
    sessionStorage.setItem('testObject', JSON.stringify(this.dataTable));
    sessionStorage.setItem('localAmountsData', JSON.stringify(localAmountsData));
  }
  paymentConfirmation(): void {
    this.router.navigate(['payment']);
  }
}

