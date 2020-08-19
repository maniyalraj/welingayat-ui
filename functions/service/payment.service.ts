import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/service/user-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    private userService: UserServiceService) { }

    async generateOrder(amount) {
      const user = this.userService.getCurrentUser();
      const data = {
        "amount": amount*100,
        "uid":user.uid
      }

      const url = environment.paymentUrl + "/generateOrder";

      const order_id = await this.http.post(url, data).toPromise();
      return order_id;
    }

}
