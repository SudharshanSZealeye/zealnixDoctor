export interface LoginReducerState {
  isLoading: boolean;
  error: string;
  token: string;
}

export interface SignUp {
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
  updatedAt: string;
  additionalProp1: {};
}
export interface SignUpReducerState {
  isLoading: boolean;
  error: string;
  data: SignUp;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  branchId: string;
  phone: string;
  type?: string;
  dateOfBirth?: string;
  employeeId?: string;
  dutyInTime?: number;
  dutyOutTime?: number;
  status?: string;
  hospitalId?: string;
  departmentId?: string;
  designationId?: string;
  additionalProp1?: {};
  createdBy?: string;
}

export interface BranchResponseProp {
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
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export interface BranchReducerInitailState {
  isLoading: boolean;
  error: string;
  branch: BranchResponseProp[];
}

export interface BranchListPayload {
  offset?: number;
  limit?: number;
  skip?: number;
  hospitalId: string;
  id?: boolean;
  branchID?: boolean;
  name?: boolean;
  address?: boolean;
  pinCode?: boolean;
  city?: boolean;
  state?: boolean;
  country?: boolean;
  status?: boolean;
  email?: boolean;
  phone?: boolean;
  isMainBranch?: boolean;
  hospitalIdBool?: boolean;
  createdBy?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
}
export interface UserFilterType {
  id: boolean;
  branchID: boolean;
  name: boolean;
  address: boolean;
  pinCode: boolean;
  city: boolean;
  state: boolean;
  country: boolean;
  status: boolean;
  email: boolean;
  phone: boolean;
  isMainBranch: boolean;
  hospitalId: boolean;
  createdBy: boolean;
  createdAt: boolean;
  updatedAt: boolean;
}
