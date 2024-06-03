import {
  appoinmentDetailsReducers,
  appoinmentListReducers,
  vitalListReducers,
  patchVitalReducers,
  postVitalReducers,
  patchAppoinmentDetailsReducers,
  appoinmentListHistoryReducers,
  patchAppoinmentTokenReducers,
  labReportReducers
} from '../modules/AppointmentModule/store/appoinmentReducer';
import {
  todaysAppointmentReducers,
  recentAppointmentReducers,
} from '../modules/HomeModule/store/homeReducer';
import {
  loginReducers,
  userReducers,
  branchReducers,
  signupReducers,
} from '../modules/LoginModule/store/loginReducer';
import {
  medicinesListReducers,
  prescriptionsListReducers,
  postPrescriptionsReducers,
  getMedicineReducers,
  deletePrescriptionReducers,
  patchPrescriptionsReducers,
} from '../modules/PrescribeModule/store/prescribeReducer';
import {
  profileReducers,
  patchProfileReducers,
} from '../modules/ProfileModule/store/profileReducer';
import {
  feedListReducers,
  feedsProfileListReducers,
  feedsSavedReducers,
} from '../modules/ReelsModule/store/reelsReducer';

export const reducers = {
  userReducers,
  loginReducers,
  branchReducers,
  signupReducers,
  appoinmentListReducers,
  appoinmentDetailsReducers,
  todaysAppointmentReducers,
  recentAppointmentReducers,
  medicinesListReducers,
  prescriptionsListReducers,
  profileReducers,
  postPrescriptionsReducers,
  getMedicineReducers,
  deletePrescriptionReducers,
  patchPrescriptionsReducers,
  vitalListReducers,
  postVitalReducers,
  patchVitalReducers,
  patchProfileReducers,
  patchAppoinmentDetailsReducers,
  feedListReducers,
  feedsProfileListReducers,
  feedsSavedReducers,
  appoinmentListHistoryReducers,
  patchAppoinmentTokenReducers,
  labReportReducers,
};
