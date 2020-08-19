import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getWindow() {
    return window as any;
  }

  async generateOrder(amount) {
    const data = {
      "amount": amount
    }

    const url = "https://us-central1-welingayat.cloudfunctions.net/payments/generateOrder"
    // const url = "http://localhost:5001/welingayat/us-central1/payments/generateOrder"

    const order_id = await this.http.post(url, data).toPromise();
    return order_id;
  }

  async buy(amount) {
    const order_id = await this.generateOrder(amount);
    console.log(order_id)

    const options = {
      key: "rzp_test_tm8X6QFyi0Jh4L",
      order_id: order_id,
      amount: (amount * 100),
      currency: "INR",
      name: "Welingayt.in",
      description: "Add Credits",
      handler: function (response) {
        console.log(response);
      },
    }

    var rzpay = this.getWindow().Razorpay(options)

    rzpay.open();

  }

}
