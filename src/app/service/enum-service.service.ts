import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class EnumServiceService {

  baseUrl = environment.serverUrl + "api/enumValues"

  constructor(private httpClient: HttpClient) { }

  getEnumValues(enumName) {
    let url = this.baseUrl + "?enumName=" + enumName;

    return this.get(url)

  }

  get(url) {
    return this.httpClient.get(url);
  }
}
