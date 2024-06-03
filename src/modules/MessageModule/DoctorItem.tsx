import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Flex, getColors, Text, Icons} from 'squashapps-react-native-uikit';
import ProfileWithStatus from '../../common/ProfileWithStatus';
import {APP_THEME} from '../../utils/constants';

const {ERROR_500} = getColors(APP_THEME);
const {SvgDot} = Icons;
const styles = StyleSheet.create({
  overAll: {
    marginTop: 20,
  },

  textName: {
    marginRight: 4,
    marginBottom: 8,
  },

  nameContainer: {
    marginVertical: 4,
  },
  nameFlex: {
    marginLeft: 8,
  },
});

type Props = {
  item: any;
  handleChat: () => void;
};

const DoctorItem = ({item, handleChat}: Props) => {
  return (
    <TouchableOpacity onPress={handleChat}>
      <Flex row overrideStyle={styles.overAll}>
        <ProfileWithStatus
          height={50}
          width={50}
          borderRadius={20}
          src={item.img}
          icon={<SvgDot />}
        />
        <Flex flex={1} row center between overrideStyle={styles.nameFlex}>
          <Flex flex={1} between overrideStyle={styles.nameContainer}>
            <Text type="heading400" overrideStyle={styles.textName}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              type="body100"
              color="gray">
              {item.message}
            </Text>
          </Flex>
          {item.newMessage && (
            <View style={{marginRight: 8}}>
              <SvgDot fill={ERROR_500} />
            </View>
          )}
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
};

export default DoctorItem;
