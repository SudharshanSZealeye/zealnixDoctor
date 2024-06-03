import React from 'react';
import {View} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {
  Card,
  Flex,
  Image,
  StyleSheet,
  Text,
  Icons,
} from 'squashapps-react-native-uikit';

const {SvgStar} = Icons;
const styles = StyleSheet.create({
  profile: {
    height: 50,
    width: 50,
    borderRadius: 16,
  },
  overAll: {
    padding: 16,
    borderRadius: 26,
    marginVertical: 3,
    marginRight: 24,
    marginLeft: 2,
  },
  nameContainer: {
    paddingVertical: 4,
    marginLeft: 12,
  },
  des: {
    marginTop: 8,
  },
  starContainer: {
    marginLeft: 12,
    marginRight: 4,
  },
});

const RecentReviewList = () => {
  const {width} = useSafeAreaFrame();
  return (
    <Card
      disabled
      align="stretch"
      overrideStyle={[styles.overAll, {width: width * 0.8}]}>
      <Flex>
        <Flex row>
          <Image
            overrideStyle={styles.profile}
            src="https://i.ibb.co/bRbhw8R/doctor1.png"
          />
          <Flex between overrideStyle={styles.nameContainer}>
            <Flex row center>
              <Text>John Corner</Text>
              <View style={styles.starContainer}>
                <SvgStar height={8} width={10} />
              </View>
              <Text size={10} color="gray">
                4,5
              </Text>
            </Flex>
            <Text size={12} color="gray">
              1 day ago
            </Text>
          </Flex>
        </Flex>
        <Text
          size={14}
          numberOfLines={2}
          color="gray"
          overrideStyle={styles.des}>
          Many thanks to Dr. Hashimoto! He is professional, competent doctor...
        </Text>
      </Flex>
    </Card>
  );
};

export default RecentReviewList;
