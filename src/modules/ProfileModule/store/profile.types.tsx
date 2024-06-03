export interface User {
  id: string;
  employeeId: string;
  name: string;
  type: string;
  dateOfBirth: string;
  email: string;
  dutyInTime: number;
  dutyOutTime: number;
  status: string;
  phone: string;
  hospitalId: string;
  branchId: string;
  departmentId: string;
  designationId: string;
  createdBy: string;
  createdAt: string;
  additionalProp1: AdditionalProp1;
  branch?: Branch;
  department?: Department;
  hospital?: Hospital;
  profileImageUrl: string;
  updatedAt?: string;
  salt?: any;
}
export interface AdditionalProp1 {}
export interface Branch {
  id: string;
  branchID: string;
  name: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  status: string;
  email: string;
  phone: string;
  isMainBranch: boolean;
  hospitalId: string;
  createdAt: string;
  updatedAt: string;
}
export interface Department {
  id: string;
  name: string;
  status: string;
  hospitalId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}
export interface Hospital {
  id: string;
  name: string;
  profilePicUrl: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  additionalProp1: AdditionalProp1;
  profileImageUrl: string;
}

export interface UserReducerState {
  isLoading: boolean;
  error: string;
  data: User;
}
