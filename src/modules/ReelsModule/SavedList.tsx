import React from 'react';
import {FlatList} from 'react-native';
import SortsCard from './SortsCard';

type Props = {
  data: any;
  handleViewVideo: () => void;
};
const SavedList = ({data, handleViewVideo}: Props) => {
  return (
    <FlatList
      numColumns={3}
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({item, index}) => (
        <SortsCard
          index={index}
          item={item}
          handleViewVideo={handleViewVideo}
        />
      )}
    />
  );
};

export default SavedList;
