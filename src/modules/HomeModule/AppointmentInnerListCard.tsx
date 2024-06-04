import React from 'react';
import {
  Card,
  Flex,
  getColors,
  Icons,
  Image,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import { APP_THEME, USER_PROFILE } from '../../utils/constants';

const { WHITE, NEUTRAL_500, PRIMARY_COLOR_50 } = getColors(APP_THEME);
const { SvgMessage } = Icons;

const styles = StyleSheet.create({
  inlineCard: {
    paddingRight: 24,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR_50,
  },
  nameContainer: {
    marginLeft: 10,
  },
  cardListContainer: {
    marginTop: 20,
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});

type Props = {
  item: {
    profile: string;
    name: string;
    age: string;
    gender: string;
  };
  index: number;
  totalLength: number;
};

const AppointmentInnerListCard = ({ item, index, totalLength }: Props) => {
  const containerStyle = [
    styles.inlineCard,
    {
      borderTopEndRadius: index === 0 ? 15 : 0,
      borderTopStartRadius: index === 0 ? 15 : 0,
      borderBottomEndRadius: totalLength - 1 === index ? 15 : 0,
      borderBottomStartRadius: totalLength - 1 === index ? 15 : 0,
    },
  ];
  return (
    <Card disabled align="stretch" overrideStyle={containerStyle}>
      <Flex row center between>
        <Flex row center>
          <Card>
            <Image
              src={item.profile ? item.profile : USER_PROFILE}
              overrideStyle={styles.profile}
            />
          </Card>
          <Flex between overrideStyle={styles.nameContainer}>
            <Text type="heading400">{item.name}</Text>
            <Text type="heading200" color="gray" transform="capitalize">
              30yrs, Male
            </Text>
          </Flex>
        </Flex>
        <SvgMessage
          strokeFill={NEUTRAL_500}
          strokeFillOne={NEUTRAL_500}
          fill={WHITE}
        />
      </Flex>
    </Card>
  );
};

export default AppointmentInnerListCard;
