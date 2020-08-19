import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PaymentService } from 'functions/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private userService: UserServiceService) { }

  ngOnInit() {
  }

  getWindow() {
    return window as any;
  }

  async buy(amount) {

    const user = this.userService.getCurrentUser();
    const order: any = await this.paymentService.generateOrder(amount);

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
