import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  maritalStatusMap = {
    "MARITAL_STATUS_SINGLE": "Single"
  }

  inverseMaritalStatusMap = {
    "MARITAL_STATUS_SINGLE": "Single"
  }

  qualtificationMap = [{ "key": "QUALIFICATION_TENTH", "value": "10th" }, { "key": "QUALIFICATION_TWELTH", "value": "12th" }, { "key": "QUALIFICATION_BSC", "value": "BSc" }, { "key": "QUALIFICATION_MSC", "value": "Msc" }, { "key": "QUALIFICATION_BCOM", "value": "BCom" }, { "key": "QUALIFICATION_MCOM", "value": "MCom" }, { "key": "QUALIFICATION_BA", "value": "BA" }, { "key": "QUALIFICATION_MA", "value": "MA" }, { "key": "QUALIFICATION_PHD", "value": "PHD" }, { "key": "QUALIFICATION_MBBS", "value": "MBBS" }, { "key": "QUALIFICATION_BE", "value": "BE" }, { "key": "QUALIFICATION_BTECH", "value": "BTECH" }, { "key": "QUALIFICATION_ME", "value": "ME" }, { "key": "QUALIFICATION_MTECH", "value": "MTECH" }, { "key": "QUALIFICATION_ITI", "value": "ITI" }, { "key": "QUALIFICATION_MD", "value": "MD" }, { "key": "QUALIFICATION_BPHARM", "value": "BPHARM" }, { "key": "QUALIFICATION_MPHARM", "value": "MPHARM" }, { "key": "QUALIFICATION_BED", "value": "B.Ed" }, { "key": "QUALIFICATION_MED", "value": "M.Ed" }, { "key": "QUALIFICATION_BARCH", "value": "B.Arch" }, { "key": "QUALIFICATION_MARCH", "value": "M.ARch" }, { "key": "QUALIFICATION_OTHER", "value": "Other" }]

  getMaritalStatusString(maritalStatus) {
    return this.maritalStatusMap[maritalStatus]
  }


  constructor() { }
}
