import {FormikHelpers, useFormik} from 'formik';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {
  Button,
  Flex,
  InputText,
  Text,
  validators,
} from 'squashapps-react-native-uikit';
import CustomStatusBar from '../../common/CustomStatusBar';
import {useLanguage} from '../../utils/useLanguage';
import TitleWithValue from '../../common/TitleWithValue';
import {AuthScreenNavigationProp} from '../../navigation/types';

const loginMask = require('../../assets/images/loginBackground.png');

const {isEmpty} = validators;
const {EMAIL_REQUIRED} = useLanguage;

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 30,
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
    paddingHorizontal: 40,
    marginTop: 32,
    marginBottom: 60,
  },
  btnRegister: {
    marginLeft: 4,
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
  otp: string;
};
interface OTPVerificationScreenProps {
  navigation: AuthScreenNavigationProp;
}

const initialValues: formType = {
  otp: '',
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.otp)) {
    errors.otp = EMAIL_REQUIRED;
  }
  return errors;
};
const OTPVerificationScreen = ({navigation}: OTPVerificationScreenProps) => {
  const {width, height} = useSafeAreaFrame();

  const handleSubmit = (value: formType, formikHelper: FormikHelpers<any>) => {
    formikHelper.resetForm;
    navigation.navigate('LoginScreen');
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  return (
    <Flex flex={1}>
      <ImageBackground style={{width, height}} source={loginMask}>
        <Flex overrideStyle={styles.overAll}>
          <CustomStatusBar />
          <Text overrideStyle={styles.welcomeText} type="heading700">
            OTP Verification
          </Text>
          <Text color="gray">
            Please check your email/phone to see the verification code 📨
          </Text>
          <Flex overrideStyle={styles.inputContainer}>
            <InputText
              value={formik.values.otp}
              onChange={formik.handleChange('otp')}
              label="Otp"
              placeholder="Enter your Otp"
              autoCapitalize="none"
              keyboardType="phone-pad"
              name="otp"
              formikTouched={formik.touched}
              formikErrors={formik.errors}
              error={formik.touched.otp && formik.errors.otp}
            />
          </Flex>
          <Button onClick={formik.handleSubmit} overrideStyle={styles.btnStyle}>
            Verify
          </Button>
          <TitleWithValue
            between
            title="Resend code in"
            titleColor="gray"
            titleSize="body200"
            value="03:23"
          />
          <Flex row center middle>
            <Text>Wrong email address?</Text>
            <Button type="link">
              <Text color="primary">Change Email</Text>
            </Button>
          </Flex>
        </Flex>
      </ImageBackground>
    </Flex>
  );
};

export default OTPVerificationScreen;
