import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Colors,
  Flex,
  Loader,
  Text,
  getColors,
} from 'squashapps-react-native-uikit';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { APP_THEME } from '../../utils/constants';
import MedicineEmpty from './MedicineEmpty';
import PrescriptionCard from './PrescriptionCard';
import { AppDispatch, RootState } from '../../redux/store';

import {
  deletePrescriptionMiddleWare,
  prescriptionsListMiddleWare,
} from './store/prescribeMiddleware';
import { tabletList } from '../AppointmentModule/mock';

const { PRIMARY_COLOR_500 } = getColors(APP_THEME);
type ParamListBase = {
  sample: { appointmentId: string };
};
interface SampleRouteProp extends RouteProp<ParamListBase, 'sample'> { }

const styles = StyleSheet.create({
  btnContainer: {
    margin: 20,
  },
  overAll: {
    backgroundColor: Colors.WHITE,
  },
  cardOverAll: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  addBtn: {
    backgroundColor: PRIMARY_COLOR_500 + 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  search: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
});

const PrescribeMedicineScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const route = useRoute<SampleRouteProp>();
  const { appointmentId } = route.params;

  // useEffect(() => {
  //   dispatch(
  //     prescriptionsListMiddleWare({
  //       where: {
  //         appointmentId,
  //       },
  //     }),
  //   );
  // }, []);

  const { data, isLoading } = useSelector(
    ({ prescriptionsListReducers }: RootState) => {
      return {
        data: prescriptionsListReducers.data,
        isLoading: prescriptionsListReducers.isLoading,
      };
    },
  );

  const handleAddMore = () => {
    navigation.navigate('AllMedicineListScreen', {
      appointmentId,
    });
  };
  const handleClose = () => {
    navigation.navigate('BottomTab', {
      screen: 'AppointmentTab',
    });
  };

  const handleDelete = () => {
    // dispatch(deletePrescriptionMiddleWare({ prescriptionId: id })).then(res => {
    //   if (res) {
    //     dispatch(
    //       prescriptionsListMiddleWare({
    //         where: {
    //           appointmentId: '647f11525b32fe2cb85784c8',
    //         },
    //       }),
    //     );
    //   }
    // });
  };
  return (
    <>
      {isLoading && <Loader />}
      <Flex flex={1} overrideStyle={styles.overAll}>
        <FlatList
          data={[{}, {}, {}]}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card align="stretch" overrideStyle={styles.cardOverAll}>
              <PrescriptionCard
                manufacturer={"Sun Pharama"}
                quantity={3}
                isTime
                title={"Parcetamol"}
                dosageTimes="10"
                dosage="10"
                image={"https://i.ibb.co/2YRh8Nw/Rectangle-3318-2.png"}
                handleTrash={handleDelete}
              />
            </Card>
          )}
          ListEmptyComponent={<MedicineEmpty />}
          ListFooterComponent={
            data.length > 0 ? (
              <Button overrideStyle={styles.addBtn} onClick={handleAddMore}>
                <Text color="theme" size={14}>
                  + Add More
                </Text>
              </Button>
            ) : (
              <View />
            )
          }
        />
        <Flex bottom overrideStyle={styles.btnContainer}>
          <Button onClick={data.length > 0 ? handleClose : handleAddMore}>
            {data.length > 0 ? 'Prescribe' : '+ Add More'}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default PrescribeMedicineScreen;
