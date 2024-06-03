import React, {useEffect, useMemo, useState} from 'react';
import {
  Button,
  Colors,
  Flex,
  Loader,
  Text,
} from 'squashapps-react-native-uikit';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import CustomStatusBar from '../../common/CustomStatusBar';
import {AppDispatch, RootState} from '../../redux/store';
import {
  feedsListMiddleWare,
  feedsProfileListMiddleWare,
  feedsSavedMiddleWare,
} from './store/reelsMiddleware';
import ReelsEmpty from './ReelsEmpty';
import ReelsList from './ReelsList';

const styles = StyleSheet.create({
  overAll: {
    position: 'relative',
    zIndex: 0,
    flex: 1,
  },
  header: {
    position: 'absolute',
    zIndex: 99,
    left: 0,
    right: 0,
    backgroundColor: Colors.BLACK + 40,
    height: 50,
    justifyContent: 'center',
  },
});

const ReelsScreen = () => {
  const navigation = useNavigation();
  const [isCurrentIndex, setCurrentIndex] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(feedsListMiddleWare({}));
    }
  }, [isFocused]);

  const {data, isLoading, useId} = useSelector(
    ({feedListReducers, profileReducers}: RootState) => {
      return {
        data: feedListReducers.data,
        isLoading: feedListReducers.isLoading,
        useId: profileReducers.data.id,
      };
    },
  );

  const handleProfileNavigate = () => {
    setLoader(true);
    dispatch(feedsProfileListMiddleWare({createdById: useId})).then(() => {
      dispatch(feedsSavedMiddleWare()).then(() => {
        setLoader(false);
        navigation.navigate('ReelsProfileScreen');
      });
    });
  };

  const onChangeIndex = ({index}: any) => {
    setCurrentIndex(index);
  };

  const result = useMemo(() => {
    return data;
  }, [data]);

  return (
    <>
      {(isLoading || isLoader) && <Loader />}
      <CustomStatusBar />
      <Flex overrideStyle={styles.overAll}>
        <View style={styles.header}>
          <Flex row between>
            <Flex flex={1} center>
              <Button onClick={handleProfileNavigate} type="link">
                <Text bold color="white">
                  Shorts
                </Text>
              </Button>
            </Flex>
            <View
              style={{height: '100%', width: 2, backgroundColor: Colors.WHITE}}
            />
            <Flex flex={1} center>
              <Button
                type="link"
                onClick={() => navigation.navigate('ReelsRecord')}>
                <Text bold color="white">
                  Create
                </Text>
              </Button>
            </Flex>
          </Flex>
        </View>

        <SwiperFlatList
          vertical
          index={0}
          data={result}
          renderItem={({item, index}) => (
            <ReelsList
              isCurrentIndex={isCurrentIndex}
              handleProfileNavigate={handleProfileNavigate}
              item={item}
              index={index}
            />
          )}
          ListEmptyComponent={<ReelsEmpty />}
          keyExtractor={(_item, index) => index.toString()}
          onChangeIndex={onChangeIndex}
          style={{flex: 1}}
        />
      </Flex>
    </>
  );
};

export default ReelsScreen;
