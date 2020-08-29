import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PaymentService } from 'src/app/service/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private userService: UserServiceService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  getWindow() {
    return window as any;
  }

  async buy(amount, credits) {

    const user = this.userService.getCurrentUser();
    this.spinner.show('loading');
    const order: any = await this.paymentService.generateOrder(amount);
    this.spinner.hide('loading');

    const options = {
      key: "rzp_test_tm8X6QFyi0Jh4L",
      order_id: order.orderId,
      amount: amount,
      currency: "INR",
      name: "Welingayt.in",
      description: "Add " + credits + " Credits",
      handler: function (response) {
        this.updateUserCredits(credits);
      }.bind(this),
      prefill: {
        "name": user.firstName + " " + user.lastName,
        "email": user.email,
        "contact": user.contact
      }
    }

    options.handler.bind(this);

    var rzpay = this.getWindow().Razorpay(options)

    rzpay.open();

  }



  updateUserCredits(credits) {
    let user = this.userService.getCurrentUser();
    user.credits = user.credits + credits;
    this.userService.setCurrentUser(user);
    this.loginService.changeLoginState(true);
  }

}
