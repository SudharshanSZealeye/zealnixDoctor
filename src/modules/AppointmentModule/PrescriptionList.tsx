import {
  Card,
  Flex,
  Button,
  StyleSheet,
  getColors,
} from 'squashapps-react-native-uikit';
import React from 'react';
import { View } from 'react-native';
import { APP_THEME } from '../../utils/constants';
import PrescriptionCard from '../PrescribeModule/PrescriptionCard';
import { PresciptionList } from '../PrescribeModule/store/prescribe.types';

const { SUCCESS_500 } = getColors(APP_THEME);

const styles = StyleSheet.create({
  overAllCard: {
    borderLeftWidth: 8,
    borderRadius: 12,
    borderLeftColor: SUCCESS_500,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginHorizontal: 1,
  },
  bottomContainer: {
    marginVertical: 16,
  },
  listContainer: {
    marginBottom: 16,
  },
});

type Props = {
  handleDetailedScreen: () => void;
  items: any[];
};
const PrescriptionList = ({ handleDetailedScreen, items }: Props) => {
  return (
    <Card align="stretch" overrideStyle={styles.overAllCard}>
      <Flex>
        {items.map(item => {
          return (
            <View style={styles.listContainer} key={item.id}>
              <PrescriptionCard
                imageHeight={40}
                imageWidth={40}
                title={item.name}
                manufacturer={"ass"}
                quantity={10}
                image={"12"}
              />
            </View>
          );
        })}
        <Flex center overrideStyle={styles.bottomContainer}>
          <Button type="link" onClick={handleDetailedScreen}>
            View Detailed Prescription
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
export default PrescriptionList;
