import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AutoCompleteService } from 'ionic2-auto-complete';
/*
  Generated class for the CompleteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompleteServiceProvider implements AutoCompleteService {
  labelAttribute = "postcode";
  // formValueAttribute = "postcode";
  constructor(public http: Http) {
    console.log('Hello CompleteServiceProvider Provider');
  }
  getResults(keyword: string) {
    // console.log(keyword.toString().length);
    if(keyword.toString().length >= 4){
      return this.http.get("./assets/json/postcode.json")
      .map(
      result => {
        return result.json()
          .filter(item => item.postcode.toLowerCase().startsWith(keyword.toLowerCase()))
      });
    }else{
      return [];
    }
  }

  getItemLabel(country: any) {
    return country.postcode;
  }
}
