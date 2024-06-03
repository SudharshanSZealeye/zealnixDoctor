import {fetchUrl} from '../utils/apiConfig';

export const loginApi = fetchUrl('users/login');
export const signupApi = fetchUrl('users');
export const branchApi = fetchUrl('branches');

export const appointmentsListApi = fetchUrl(`appointments`);

export const appoinmentDetailsApi = (id: string) => {
  const result = fetchUrl(`appointments/${id}`);
  return result;
};
export const appoinmentTokenApi = fetchUrl(`agora/token`);
export const prescriptionsListApi = fetchUrl(`prescriptions`);
export const prescrtionDeleteApi = (id: string) => {
  const result = fetchUrl(`prescriptions/${id}`);
  return result;
};

export const medicinesListApi = fetchUrl(`pharmacy/drugs/stocks`);
export const medicineDetailsApi = (id: string) => {
  const result = fetchUrl(`pharmacy/drugs/stocks/${id}`);
  return result;
};

export const userApi = (id: string) => {
  const result = fetchUrl(`users/${id}`);
  return result;
};

export const currentUser = fetchUrl('current-user');
export const vitalsListApi = fetchUrl(`vitals`);
export const vitalsDetailsApi = (id: string) => {
  const result = fetchUrl(`vitals/${id}`);
  return result;
};

export const fileUploadApi = fetchUrl('files');
export const feedsApi = fetchUrl('feeds');
export const labReportsApi = fetchUrl('lab-reports');
export const feedsReactionsApi = fetchUrl(`feed-reactions`);
export const feedsSavedApi = fetchUrl(`feeds/saved`);
