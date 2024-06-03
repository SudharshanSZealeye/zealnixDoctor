import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Colors,
  Flex,
  Image,
  StyleSheet,
  Text,
  getColors,
  Icons,
  Button,
} from 'squashapps-react-native-uikit';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {APP_THEME, USER_PROFILE} from '../../utils/constants';
import SavedList from './SavedList';

const {PRIMARY_COLOR_500, TEXT_GREY_500} = getColors(APP_THEME);
const {SvgShortsVideo, SvgShortsSave} = Icons;

const styles = StyleSheet.create({
  profile: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  editSvg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    marginTop: 10,
    marginBottom: 4,
  },
  overAll: {},
  followersContainer: {
    paddingHorizontal: 20,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.TEXT_GREY_200,
  },
  infoContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
});

const ReelsProfileScreen = () => {
  const navigation = useNavigation();
  const [isTab, setTab] = useState(false);
  const {shortsList, profileData, savedList} = useSelector(
    ({
      feedsProfileListReducers,
      feedsSavedReducers,
      profileReducers,
    }: RootState) => {
      return {
        shortsList: feedsProfileListReducers.data,
        profileData: profileReducers.data,
        savedList: feedsSavedReducers.data,
      };
    },
  );

  const formatData = (data: any[], numColumns: number) => {
    let getData = data;
    const numberOfFullRow = Math.floor(getData.length / numColumns);
    let numberOfElementsLastRow = getData.length - numberOfFullRow * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      getData = [...getData, {empty: true}];
      numberOfElementsLastRow += 1;
    }
    return getData;
  };

  const shortsData = useMemo(() => {
    return formatData(shortsList ? shortsList : [], 3);
  }, [shortsList]);

  const savedData = useMemo(() => {
    return formatData(savedList ? savedList : [], 3);
  }, [savedList]);

  const handleViewVideo = () => {
    navigation.navigate('ReelsScreen');
  };

  return (
    <ScrollView
      style={styles.overAll}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled>
      <Flex center overrideStyle={{marginTop: 20}}>
        <Flex center overrideStyle={{position: 'relative'}}>
          <Image
            overrideStyle={styles.profile}
            src={
              profileData?.profileImageUrl
                ? profileData?.profileImageUrl
                : USER_PROFILE
            }
          />
        </Flex>
        <Text overrideStyle={styles.name} size={24} bold>
          {profileData.name}
        </Text>
        <Text size={16} bold>
          {profileData.type}
        </Text>
      </Flex>
      <Flex row center middle overrideStyle={styles.infoContainer}>
        <Flex center middle overrideStyle={{marginRight: 10}}>
          <Text bold size={24}>
            {shortsList?.length}
          </Text>
          <Text bold color="gray">
            Posts
          </Text>
        </Flex>
      </Flex>
      <Flex row between>
        <Button
          overrideStyle={{
            borderBottomColor: !isTab ? PRIMARY_COLOR_500 : TEXT_GREY_500,
            borderBottomWidth: !isTab ? 3 : 0,
            height: 50,
            flex: 1,
            borderRadius: 0,
            alignItems: 'center',
          }}
          type="link"
          onClick={() => setTab(false)}>
          <Flex row center>
            <View style={{marginTop: 4, marginRight: 8}}>
              <SvgShortsVideo
                fill={!isTab ? PRIMARY_COLOR_500 : TEXT_GREY_500}
                height={22}
                width={22}
              />
            </View>
            <Text bold size={20} color={!isTab ? 'theme' : 'primary'}>
              Shorts
            </Text>
          </Flex>
        </Button>
        <Button
          overrideStyle={{
            borderBottomColor: isTab ? PRIMARY_COLOR_500 : TEXT_GREY_500,
            borderBottomWidth: isTab ? 3 : 0,
            height: 50,
            flex: 1,
            alignItems: 'center',
            borderRadius: 0,
          }}
          type="link"
          onClick={() => setTab(true)}>
          <Flex row center>
            <View style={{marginTop: 4, marginRight: 8}}>
              <SvgShortsSave
                fill={isTab ? PRIMARY_COLOR_500 : TEXT_GREY_500}
                height={18}
                width={20}
              />
            </View>
            <Text bold size={20} color={isTab ? 'theme' : 'primary'}>
              Saved
            </Text>
          </Flex>
        </Button>
      </Flex>
      {isTab ? (
        <SavedList data={shortsData} handleViewVideo={handleViewVideo} />
      ) : (
        <SavedList data={savedData} handleViewVideo={handleViewVideo} />
      )}
    </ScrollView>
  );
};

export default ReelsProfileScreen;
