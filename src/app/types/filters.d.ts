export interface Filters{
  firstName?: string,
  lastName?: string,
  minHeightInCms?: number,
  maxHeightInCms?: number,
  minDob?: number,
  maxDob?:number,
  monthlyIncome?: number,
  qualification?: string[],
  jobType?: string[],
  currentAddressCity?: string,
  currentCityPin?:number
}
