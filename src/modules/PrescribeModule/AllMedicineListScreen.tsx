import React, {useEffect, useMemo, useState} from 'react';
import {useFormik} from 'formik';
import {filter} from 'lodash';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {
  Flex,
  StyleSheet,
  Colors,
  Loader,
  validators,
} from 'squashapps-react-native-uikit';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../redux/store';
import SearchBar from '../../common/SearchBar';
import PrescribeMedicinePopup from './PrescribeMedicinePopUp';
import PrescriptionCard from './PrescriptionCard';
import {
  getMedicineMiddleWare,
  medicinesListMiddleWare,
  patchPresciptionMiddleWare,
  postPresciptionMiddleWare,
  prescriptionsListMiddleWare,
} from './store/prescribeMiddleware';
import {useLanguage} from '../../utils/useLanguage';

const {isEmpty} = validators;
const {THIS_FIELD_REQUIRED} = useLanguage;
const styles = StyleSheet.create({
  overAll: {
    marginLeft: 20,
    marginTop: 24,
  },
  statusBar: {
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  overAllContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});
export type formTypePrescribe = {
  quantity: string;
  timing: string[];
  dosage: string;
  autoReOrder: boolean;
  medicineId: string;
};
const initialValues: formTypePrescribe = {
  quantity: '',
  timing: [],
  dosage: '',
  autoReOrder: false,
  medicineId: '',
};
type ParamListBase = {
  sample: {appointmentId: string};
};
interface SampleRouteProp extends RouteProp<ParamListBase, 'sample'> {}

const validate = (values: formTypePrescribe) => {
  const errors: Partial<formTypePrescribe> = {};
  if (isEmpty(values.quantity)) {
    errors.quantity = THIS_FIELD_REQUIRED;
  }
  if (values.timing.length === 0) {
    errors.timing = [THIS_FIELD_REQUIRED];
  }
  if (isEmpty(values.dosage)) {
    errors.dosage = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.medicineId)) {
    errors.medicineId = THIS_FIELD_REQUIRED;
  }
  return errors;
};

const AllMedicineListScreen = () => {
  const [isAddData, setAddData] = useState(false);
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const route = useRoute<SampleRouteProp>();
  const {appointmentId} = route.params;

  const [search, setSearch] = useState<string>('');
  const handleNameChange = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    dispatch(medicinesListMiddleWare());
  }, []);

  const {data, isLoading, listData, appointmentDetails} = useSelector(
    ({
      medicinesListReducers,
      prescriptionsListReducers,
      appoinmentDetailsReducers,
    }: RootState) => {
      return {
        appointmentDetails: appoinmentDetailsReducers.data,
        data: medicinesListReducers.data,
        isLoading: medicinesListReducers.isLoading,
        listData: prescriptionsListReducers.data,
      };
    },
  );

  const handleAddDataClose = () => setAddData(false);

  const handleSave = (val: formTypePrescribe) => {
    const appointments = listData.find(
      appointment => appointment.medicineId === val.medicineId,
    );
    if (appointments) {
      dispatch(
        patchPresciptionMiddleWare({
          quantity: parseInt(val.quantity, 10),
          id: appointments.id,
          dosageTimes: val.timing,
          dosage: val.dosage,
          autoReorder: val.autoReOrder,
          appointmentId: appointmentDetails.id,
          medicineId: val.medicineId,
        }),
      ).then(res => {
        if (res) {
          dispatch(
            prescriptionsListMiddleWare({
              where: {
                appointmentId,
              },
            }),
          ).then(response => {
            if (response) {
              navigation.navigate('PrescribeMedicineScreen', {
                appointmentId,
              });
            }
          });
        }
      });
    } else {
      dispatch(
        postPresciptionMiddleWare({
          quantity: parseInt(val.quantity, 10),
          dosageTimes: val.timing,
          dosage: val.dosage,
          autoReorder: val.autoReOrder,
          appointmentId: appointmentDetails.id,
          medicineId: val.medicineId,
        }),
      ).then(res => {
        if (res.payload) {
          console.log(res.payload, 'as');
          dispatch(
            prescriptionsListMiddleWare({
              where: {
                appointmentId,
              },
            }),
          ).then(response => {
            if (response) {
              navigation.navigate('PrescribeMedicineScreen', {
                appointmentId,
              });
            }
          });
        }
      });
    }
    handleAddDataClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSave,
    validate,
  });

  const handleAddDataOpen = (val: string) => {
    dispatch(getMedicineMiddleWare({medicineId: val})).then(res => {
      if (res.payload?.id) {
        setAddData(true);
        formik.setFieldValue('medicineId', res.payload.id);
      }
    });
  };

  const searchByDrugName = (input: string) => {
    const searchTerm = input.toLowerCase();

    const filteredData = filter(data, item =>
      item.name.toLowerCase().includes(searchTerm),
    );

    return filteredData;
  };
  const result = useMemo(() => {
    const output = search ? searchByDrugName(search) : data;
    return output;
  }, [search, data]);

  return (
    <>
      {isLoading && <Loader />}
      <PrescribeMedicinePopup
        open={isAddData}
        formik={formik}
        close={handleAddDataClose}
      />
      <Flex overrideStyle={styles.overAllContainer}>
        <Flex overrideStyle={styles.statusBar}>
          <SearchBar
            placeholder="Search Medicines"
            value={search}
            onChange={handleNameChange}
          />
        </Flex>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={result}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleAddDataOpen(item.id)}
              disabled={item.totalStock === 0}>
              <Flex overrideStyle={styles.overAll}>
                <PrescriptionCard
                  image={item.image}
                  imageHeight={50}
                  imageWidth={50}
                  manufacturer={item.manufacturer}
                  quantity={item.totalStock}
                  title={item.name}
                />
              </Flex>
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{height: 100}} />}
        />
      </Flex>
    </>
  );
};
export default AllMedicineListScreen;
