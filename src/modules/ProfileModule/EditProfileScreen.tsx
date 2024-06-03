import React, {useEffect, useState} from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {View} from 'react-native';
import {
  Flex,
  InputText,
  StyleSheet,
  validators,
  Button,
  DocumentPicker,
  Loader,
  Toast,
} from 'squashapps-react-native-uikit';
import {useDispatch, useSelector} from 'react-redux';
import ProfileWithStatus from '../../common/ProfileWithStatus';
import {useLanguage} from '../../utils/useLanguage';
import {AppDispatch, RootState} from '../../redux/store';
import {
  getUserMiddleWare,
  patchUserMiddleWare,
} from './store/profileMiddleware';
import {USER_PROFILE} from '../../utils/constants';
import SvgEditRound from '../../icons/SvgEditRound';
import {fileUploadMiddleWare} from '../ReelsModule/store/reelsMiddleware';

const {isEmpty, isValidEmail} = validators;
const {
  EMAIL_REQUIRED,
  INVALID_EMAIL_ENTERED,
  PHONE_REQUIRED,
  THIS_FIELD_REQUIRED,
} = useLanguage;

const styles = StyleSheet.create({
  overAll: {
    margin: 30,
  },
  welcomeText: {
    marginTop: 100,
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 24,
  },
  btnStyle: {
    marginTop: 30,
    marginBottom: 40,
  },
  passwordInput: {
    marginTop: 24,
  },
  bottomTextContainer: {
    marginTop: 32,
    marginBottom: 60,
  },
  imgContainer: {
    marginTop: 20,
    marginBottom: 32,
  },
  socialContainer: {
    marginTop: 20,
  },
  googleImg: {
    marginRight: 28,
  },
});

type formType = {
  name: string;
  email: string;
  phone: string;
  profileImageUrl: string;
};

const initialValues: formType = {
  name: '',
  email: '',
  phone: '',
  profileImageUrl: USER_PROFILE,
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.name)) {
    errors.name = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.email)) {
    errors.email = EMAIL_REQUIRED;
  } else if (!isValidEmail(values.email)) {
    errors.email = INVALID_EMAIL_ENTERED;
  }
  if (isEmpty(values.phone)) {
    errors.phone = PHONE_REQUIRED;
  }

  return errors;
};

const EditProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isDoc, setDoc] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const {data, loading} = useSelector(({profileReducers}: RootState) => {
    return {
      data: profileReducers.data,
      loading: profileReducers.isLoading,
    };
  });

  const handleOpenDoc = () => {
    setDoc(true);
  };

  const handleCloseDoc = () => {
    setDoc(false);
  };
  /* eslint-disable no-param-reassign */

  function removeCreatedAt(jsonObj: any) {
    delete jsonObj['createdAt'];
    return jsonObj;
  }
  /* eslint-enable no-param-reassign */

  const handleSubmit = (value: formType, formikHelper: FormikHelpers<any>) => {
    const modifiedJson = removeCreatedAt(data);
    dispatch(
      patchUserMiddleWare({
        ...modifiedJson,
        name: value.name,
        email: value.email,
        phone: value.phone,
        profileImageUrl: value.profileImageUrl,
      }),
    ).then(res => {
      if (res) {
        dispatch(getUserMiddleWare()).then(response => {
          if (response) {
            Toast.success({message: 'Changes saved successfully'});
            formikHelper.resetForm;
          }
        });
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  useEffect(() => {
    formik.setFieldValue('name', data?.name);
    formik.setFieldValue('email', data?.email);
    formik.setFieldValue('phone', data?.phone);
    formik.setFieldValue('profileImageUrl', data?.profileImageUrl);
  }, [data]);

  const handleCoverUpload = (image: any) => {
    const formData: any = new FormData();
    formData.append('file', {
      type: 'image/jpeg',
      name: 'photo.jpg',
      uri: image?.path,
    });
    dispatch(fileUploadMiddleWare({formData}))
      .then(res => {
        if (
          Array.isArray(res.payload) &&
          res.payload.length > 0 &&
          res.payload[0]
        ) {
          formik.setFieldValue('profileImageUrl', res.payload[0]);
        } else {
          setLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {isLoader || (loading && <Loader />)}
      <DocumentPicker
        open={isDoc}
        close={handleCloseDoc}
        onChange={handleCoverUpload}
      />
      <Flex overrideStyle={styles.overAll}>
        <Flex center row middle>
          <ProfileWithStatus
            height={100}
            width={100}
            borderRadius={100}
            src={
              formik.values.profileImageUrl
                ? formik.values.profileImageUrl
                : USER_PROFILE
            }
            icon={
              <Button type="link" onClick={handleOpenDoc}>
                <SvgEditRound />
              </Button>
            }
          />
        </Flex>
        <Flex overrideStyle={styles.inputContainer}>
          <InputText
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            label="Name"
            placeholder="Enter your Name"
            autoCapitalize="none"
            name="name"
            formikTouched={formik.touched}
            formikErrors={formik.errors}
            error={formik.touched.name && formik.errors.name}
          />
          <View style={styles.passwordInput}>
            <InputText
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              label="Email"
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              formikTouched={formik.touched}
              formikErrors={formik.errors}
              error={formik.touched.email && formik.errors.email}
            />
          </View>
          <View style={styles.passwordInput}>
            <InputText
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              label="Phone"
              placeholder="Enter your phone Number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              name="phone"
              formikTouched={formik.touched}
              formikErrors={formik.errors}
              error={formik.touched.phone && formik.errors.phone}
            />
          </View>
          <Button
            overrideStyle={styles.bottomTextContainer}
            onClick={formik.handleSubmit}>
            Save
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default EditProfileScreen;
