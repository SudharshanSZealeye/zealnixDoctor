import React from 'react';
import {
  Colors,
  Flex,
  Icons,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import RecordStatus from '../../common/RecordStatus';
import {Vital} from './store/appointment.types';

const {SvgTemperature, SvgWeight, SvgBloodDrop, SvgBloodPressure} = Icons;

const styles = StyleSheet.create({
  svgText: {
    marginLeft: 8,
  },
  margin: {
    marginTop: 20,
    marginBottom: 8,
  },
  marginTop: {
    marginVertical: 8,
    marginHorizontal: 60,
  },
});

type Props = {
  isData: Vital;
};

const RecordVitalsData = ({isData}: Props) => {
  return (
    <Flex>
      <Flex row overrideStyle={styles.margin}>
        <RecordStatus
          between
          isRight
          icon={
            <Flex row center>
              <SvgTemperature />
              <Text size={12} overrideStyle={styles.svgText}>
                Body Temp
              </Text>
            </Flex>
          }
          value={isData.temperature}
          color="orange"
          des=" F"
        />
        <RecordStatus
          between
          isRight
          icon={
            <Flex row center>
              <SvgWeight fill={Colors.YELLOW_500} />
              <Text size={12} overrideStyle={styles.svgText}>
                Weight
              </Text>
            </Flex>
          }
          value={isData.weight}
          color="yellow"
          des=" Kg"
        />
      </Flex>
      <Flex row>
        <RecordStatus
          between
          isRight
          icon={
            <Flex row center>
              <SvgBloodPressure />
              <Text size={12} overrideStyle={styles.svgText}>
                Blood Pressure
              </Text>
            </Flex>
          }
          value={`${isData.systolicBloodPressure}-${isData.diastolicBloodPressure}`}
          color="success"
        />
        <RecordStatus
          between
          isRight
          icon={
            <Flex row center>
              <SvgBloodDrop />
              <Text size={12} overrideStyle={styles.svgText}>
                Blood Sugar
              </Text>
            </Flex>
          }
          value={isData.bloodSugar}
          color="error"
          des=" mg /DL"
        />
      </Flex>
      <Flex row overrideStyle={styles.marginTop} center>
        <RecordStatus
          between
          isRight
          icon={
            <Flex row center>
              <SvgTemperature />
              <Text size={12} overrideStyle={styles.svgText}>
                Body Height
              </Text>
            </Flex>
          }
          value={isData.height}
          color="orange"
          des=" cm"
        />
      </Flex>
    </Flex>
  );
};

export default RecordVitalsData;
