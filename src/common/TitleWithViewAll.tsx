import React from 'react';
import {Flex, Text, StyleSheet, Button} from 'squashapps-react-native-uikit';

const styles = StyleSheet.create({
  overAll: {
    paddingVertical: 30,
  },
  appointMentConatiner: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  appointmentFlatList: {
    paddingHorizontal: 20,
  },
});

type Props = {
  title: string;
  hanldeView?: () => void;
  marginTop?: number;
  viewTitle?: string;
};
const TitleWithViewAll = ({
  title,
  hanldeView,
  marginTop = 30,
  viewTitle = 'View All',
}: Props) => {
  return (
    <Flex
      row
      center
      between
      overrideStyle={[styles.appointMentConatiner, {marginTop}]}>
      <Text type="heading500">{title}</Text>
      <Button type="link" onClick={hanldeView}>
        <Text color="theme">{viewTitle}</Text>
      </Button>
    </Flex>
  );
};

export default TitleWithViewAll;
