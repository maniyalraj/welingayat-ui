import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  localUrl = "https://bb69f7316393.ngrok.io/welingayat/us-central1/payments"
  prodUrl = "https://us-central1-welingayat.cloudfunctions.net/payments"

  constructor(
    private http: HttpClient,
    private userService: UserServiceService) { }

  ngOnInit() {
  }

  getWindow() {
    return window as any;
  }

  async generateOrder(amount) {
    const user = this.userService.getCurrentUser();
    const data = {
      "amount": amount*100,
      "uid":user.uid
    }

    const url = this.localUrl + "/generateOrder";

    const order_id = await this.http.post(url, data).toPromise();
    return order_id;
  }

  async buy(amount) {

    const user = this.userService.getCurrentUser();
    const order:any = await this.generateOrder(amount);
    console.log(order.orderId)

    const options = {
      key: "rzp_test_tm8X6QFyi0Jh4L",
      order_id: order.orderId,
      amount: amount,
      currency: "INR",
      name: "Welingayt.in",
      description: "Add Credits",
      handler: function (response) {
        window.location.reload();
      },
      prefill: {
        "name": user.firstName + " " + user.lastName,
        "email": user.email,
        "contact": user.contact
      }
    }

    var rzpay = this.getWindow().Razorpay(options)

    rzpay.open();

  }

}
