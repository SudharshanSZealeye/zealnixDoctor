import React, {useCallback, useState} from 'react';
import {
  Flex,
  Text,
  Image,
  getColors,
  StyleSheet,
  Status,
  Button,
  Switch,
  Loader,
} from 'squashapps-react-native-uikit';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusBar from '../../common/CustomStatusBar';
import LogoHeader from '../../common/LogoHeader';
import {APP_THEME, USER_PROFILE} from '../../utils/constants';
import {AppDispatch, RootState} from '../../redux/store';
import TitleWithValue from '../../common/TitleWithValue';
import {logOut} from '../LoginModule/store/loginReducer';
import {getUserMiddleWare} from './store/profileMiddleware';

const {PRIMARY_COLOR_50} = getColors(APP_THEME);

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR_50,
    marginTop: 20,
    marginBottom: 30,
  },
  nameContainer: {
    marginLeft: 24,
  },
  profileImg: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  btnStyle: {
    marginTop: 30,
    marginBottom: 40,
  },
  mainContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  profileContainer: {
    marginBottom: 30,
  },
});

const ProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const [notification, setNotification] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserMiddleWare());
    }, []),
  );

  const {isLoading, data} = useSelector(({profileReducers}: RootState) => {
    return {
      isLoading: profileReducers.isLoading,
      data: profileReducers.data,
    };
  });

  const handleNotification = () => {
    setNotification(!notification);
  };
  const handleLogout = () => {
    dispatch(logOut(null));
  };
  const handleProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  return (
    <>
      {isLoading && <Loader />}
      <CustomStatusBar barStyle="dark-content" />
      <Flex flex={1}>
        <LogoHeader title="Profile" />
        <Flex overrideStyle={styles.mainContainer}>
          <Flex row overrideStyle={styles.profileContainer}>
            <Image
              src={data?.profileImageUrl ? data?.profileImageUrl : USER_PROFILE}
              overrideStyle={styles.profileImg}
            />
            <Flex middle overrideStyle={styles.nameContainer}>
              <Text type="heading600">{data?.name}</Text>
              <Button onClick={handleProfile} type="link">
                <Text type="heading200" color="link">
                  Edit Profile
                </Text>
              </Button>
            </Flex>
          </Flex>
          <TitleWithValue
            between
            title="Set Availability"
            value={<Status           overrideStyle={{textTransform:'capitalize'}}
            color="theme" label={data.status} size={10} />}
          />
          <View style={styles.borderBottom} />
          <TitleWithValue
            between
            title="Notification"
            value={
              <Switch checked={notification} onClick={handleNotification} />
            }
          />
        </Flex>
        <Flex flex={1} bottom overrideStyle={styles.mainContainer}>
          <Button
            onClick={handleLogout}
            type="secondary"
            overrideStyle={styles.btnStyle}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileScreen;
