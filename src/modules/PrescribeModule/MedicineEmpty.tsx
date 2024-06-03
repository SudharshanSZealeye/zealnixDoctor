import React from 'react';
import {Flex, Image, Text} from 'squashapps-react-native-uikit';

const MedicineEmpty = () => {
  return (
    <Flex center middle overrideStyle={{marginTop: 100}}>
      <Image
        height={250}
        width={250}
        src="https://i.ibb.co/xJpGQKP/2010-i121-1.png"
      />
      <Text size={14} color="gray">
        Start Adding Medicines by Clicking “Prescribe”
      </Text>
    </Flex>
  );
};

export default MedicineEmpty;
