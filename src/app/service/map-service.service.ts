import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  maritalStatusMap = {
    "MARITAL_STATUS_SINGLE":"Single"
  }

  inverseMaritalStatusMap = {
    "MARITAL_STATUS_SINGLE":"Single"
  }

  getMaritalStatusString(maritalStatus)
  {
    return this.maritalStatusMap[maritalStatus]
  }

  constructor() { }
}
