export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  profileImageUrl?: string,
  displayName?: string;
  myCustomData?: string;
  firstName?: string,
  middleName?: string,
  lastName?: string,
  gender?: string,
  dob?: number,
  placeOfBirth?: string,
  heightInCms?: string,
  weightInKgs?: string,
  complexion?: string,
  maritalStatus? : string,
  familyType?: string,
  qualification?: string,
  otherQualification?: string,
  institute?: string,
  jobType?: string,
  jobRole?: string,
  monthlyIncome?: number,
  jobLocation?: string,
  jobIndustry?: string,
  familyDetails?: Family[],
  bloodGroup?: string,
  isDifferentlyAbled?: boolean,
  typeOfDisability?: string,



}

export interface Family {
  title?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  relation?: string,
  profession?: string,
  additionalDescription?: string
}

export interface LibraryImages {
  imageUrl: string,
  path?: string
}

export interface UserSharedPrivateData {
  uid?:string;
  contact?: number;
  libraryImages?: LibraryImages[];

}

export interface UserPrivateData {
  uid?:string;
  credits?: number;
  currentAddressCity?: string;
  currentAddressPin?: number;
  currentAddressLine1?: string;
  currentAddressLine2?: string;
  permanentAddressCity?: string;
  permanentAddressPin?: number;
  permanentAddressLine1?: string;
  permanentAddressLine2?: string;
  unlockedUsers?: string[];
  favouriteUsers?: string[];
}
