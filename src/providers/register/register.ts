import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from '../../app/app.contant';
import { RegisterModel } from '../../pages/register/register.model';

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: Http) {
    console.log('Hello RegisterProvider Provider');
  }

  regisAndAddress(data): Promise<any> {
    return this.http.post(Constants.URL + 'auth/signupbytel/', data)
      .toPromise()
      .then((response) => {
        let res = response.json();
        window.localStorage.setItem('token', res.loginToken);
        window.localStorage.setItem('thamappbuyer', JSON.stringify(res));
        return res;
      })
      .catch(this.handleError);
  };
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
