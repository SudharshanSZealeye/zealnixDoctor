import React from 'react';
import {FormikProps} from 'formik';
import {
  Modal,
  Icons,
  Colors,
  Text,
  StyleSheet,
  Flex,
  Button,
  InputText,
} from 'squashapps-react-native-uikit';
import {formTypePrescribe} from './AllMedicineListScreen';

const {SvgClose} = Icons;
const styles = StyleSheet.create({
  overAll: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  inputMarignBottom: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 24,
  },
  saveBtn: {
    marginTop: 12,
  },
});

type Props = {
  formik: FormikProps<formTypePrescribe>;
  open: boolean;
  close: () => void;
};
const CustomQuantityPopUp = ({open, formik, close}: Props) => {
  return (
    <Modal isVisible={open}>
      <Flex overrideStyle={styles.overAll}>
        <Flex row center between overrideStyle={styles.title}>
          <Text align="center" type="heading500">
            Add Custom Quantity
          </Text>
          <Button onClick={close} type="link">
            <SvgClose />
          </Button>
        </Flex>
        <Text color="gray">Add Tablet Quantity</Text>
        <Flex overrideStyle={styles.inputMarignBottom}>
          <InputText
            value={formik.initialValues.quantity}
            onChange={formik.handleChange('quantity')}
            label="Quantity"
          />
        </Flex>
        <Button onClick={close} overrideStyle={styles.saveBtn}>
          Add Quantity
        </Button>
      </Flex>
    </Modal>
  );
};

export default CustomQuantityPopUp;
