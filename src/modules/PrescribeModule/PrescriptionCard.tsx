import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Colors,
  Flex,
  Image,
  StyleSheet,
  Text,
  Icons,
} from 'squashapps-react-native-uikit';
import TitleWithValue from '../../common/TitleWithValue';
// import {PrescriptionsList} from './store/prescribe.types';

const {SvgTrash} = Icons;

const styles = StyleSheet.create({
  flexRight: {
    marginLeft: 8,
  },
  flexRightList: {
    marginLeft: 24,
  },
  circule: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: Colors.TEXT_GREY_500,
    marginHorizontal: 6,
  },
  des: {
    marginBottom: 10,
  },
  desList: {
    marginBottom: 2,
  },
});

type Props = {
  isTime?: Boolean;
  handleTrash?: () => void;
  imageHeight?: number;
  imageWidth?: number;
  title: string;
  manufacturer: string;
  quantity: number;
  dosageTimes?: string[];
  dosage?: number;
  image: string;
};

const PrescriptionCard = ({
  isTime,
  handleTrash,
  imageHeight = 70,
  imageWidth = 70,
  title,
  manufacturer,
  quantity,
  dosageTimes,
  dosage,
  image,
}: Props) => {
  const desStyle = isTime ? styles.des : styles.desList;
  const marginStyle = isTime ? styles.flexRight : styles.flexRightList;
  return (
    <Flex row between>
      <Flex middle>
        <Image src={image} height={imageHeight} width={imageWidth} />
      </Flex>
      <Flex flex={1} overrideStyle={marginStyle}>
        <TitleWithValue
          titleSize="heading400"
          between
          title={title}
          value={
            isTime && (
              <TouchableOpacity onPress={handleTrash}>
                <SvgTrash />
              </TouchableOpacity>
            )
          }
        />
        <Flex row center overrideStyle={desStyle}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color="gray"
            type="body100"
            overrideStyle={{maxWidth: '70%'}}>
            {manufacturer}
          </Text>
          <View style={styles.circule} />
          <Text color="gray" type="body100">
            {quantity} strip
          </Text>
        </Flex>
        {isTime && (
          <>
            <Flex row>
              <Text type="body100">Timings :</Text>
              <Text
                color="gray"
                type="body100"
                numberOfLines={2}
                overrideStyle={{
                  width: '80%',
                }}>
                {dosageTimes?.toString()}
              </Text>

              {/* <TitleWithValue
                marginBottom={5}
                valueColor="gray"
                valueSize="body100"
                titleSize="body100"
                title="Timings : "
                // valueLines={2}
                value={dosageTimes?.toString()}
              /> */}
            </Flex>

            <Flex row center>
              <TitleWithValue
                marginBottom={0}
                valueColor="gray"
                valueSize="body100"
                titleSize="body100"
                title="Dosage : "
                value={`${dosage} Tablet `}
              />
              {/* <TitleWithValue
                marginBottom={0}
                valueColor="gray"
                valueSize="body100"
                titleSize="body100"
                title="Order : "
                value={order?.toString()}
              /> */}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default PrescriptionCard;
