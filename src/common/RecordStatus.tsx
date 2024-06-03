import React, {ReactChild} from 'react';
import {Card, Flex, Text, StyleSheet} from 'squashapps-react-native-uikit';

const styles = StyleSheet.create({
  valueText: {
    marginLeft: 4,
  },
  statusCard: {
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

type StatusCardProps = {
  color: 'success' | 'error' | 'yellow' | 'orange';
  icon: ReactChild;
  value: string | number;
  isRight?: boolean;
  des?: string;
  between?: boolean;
};

const RecordStatus = ({
  color,
  icon,
  value,
  isRight,
  des,
  between,
}: StatusCardProps) => {
  return (
    <Card
      align={between ? 'stretch' : 'center'}
      disabled
      type={color}
      overrideStyle={[styles.statusCard, {marginRight: isRight ? 8 : 0}]}>
      <Flex row center between={between}>
        {icon}
        <Flex row center>
          <Text overrideStyle={styles.valueText} type="heading200">
            {value}
          </Text>
          {des && <Text size={10}>{des}</Text>}
        </Flex>
      </Flex>
    </Card>
  );
};

export default RecordStatus;
