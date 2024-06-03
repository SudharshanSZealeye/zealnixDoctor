import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SearchBar from '../../common/SearchBar';
import DoctorItem from './DoctorItem';
import {doctorListJson} from './mock';

const styles = StyleSheet.create({
  doctorList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

const DoctorList = () => {
  const navigation = useNavigation();
  const handleChat = () => {
    navigation.navigate('ChatScreen');
  };
  return (
    <FlatList
      style={styles.doctorList}
      data={doctorListJson}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({item}) => (
        <DoctorItem handleChat={handleChat} item={item} />
      )}
      ListHeaderComponent={<SearchBar placeholder="Search doctor" />}
    />
  );
};

export default DoctorList;
