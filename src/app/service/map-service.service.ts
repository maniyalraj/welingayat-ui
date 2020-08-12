import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  maritalStatusMap = {
    "SINGLE": "Single"
  }

  inverseMaritalStatusMap = {
    "SINGLE": "Single"
  }

  qualtificationMap = [{ "key": "TENTH", "value": "10th" }, { "key": "TWELTH", "value": "12th" }, { "key": "BSC", "value": "BSc" }, { "key": "MSC", "value": "Msc" }, { "key": "BCOM", "value": "BCom" }, { "key": "MCOM", "value": "MCom" }, { "key": "MBA", "value": "MBA" }, { "key": "BA", "value": "BA" }, { "key": "MA", "value": "MA" }, { "key": "PHD", "value": "PHD" }, { "key": "MBBS", "value": "MBBS" }, { "key": "BE", "value": "BE" }, { "key": "BTECH", "value": "BTECH" }, { "key": "ME", "value": "ME" }, { "key": "MTECH", "value": "MTECH" }, { "key": "ITI", "value": "ITI" }, { "key": "MD", "value": "MD" }, { "key": "BPHARM", "value": "BPHARM" }, { "key": "MPHARM", "value": "MPHARM" }, { "key": "BED", "value": "B.Ed" }, { "key": "MED", "value": "M.Ed" }, { "key": "BARCH", "value": "B.Arch" }, { "key": "MARCH", "value": "M.ARch" }, { "key": "OTHER", "value": "Other" }]

  jobTypeMap = [{ "key": "SALARIED", "value": "Salaried" },
  { "key": "BUSINESS", "value": "Business" },
  { "key": "PROFESSIONAL", "value": "Professional" },
  { "key": "GOVERNMENT", "value": "Government" }]

  getMaritalStatusString(maritalStatus) {
    return this.maritalStatusMap[maritalStatus]
  }


  constructor() { }
}
