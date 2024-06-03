import React from 'react';
import {
  Card,
  Flex,
  Text,
  StyleSheet,
  Icons,
} from 'squashapps-react-native-uikit';
import {FlatList, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import TitleWithValue from '../../common/TitleWithValue';
import {LabReoprtType} from './store/appointment.types';
import {extractFileNameFromURL} from '../../utils/helpers';

const {SvgDocument, SvgFileDownload} = Icons;

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
    marginBottom: 20,
  },
  marginLeft20: {
    marginLeft: 20,
    marginBottom: 4,
  },
});

type DocumentListProp = {
  data: LabReoprtType[];
};
const downloadFile = async (url: string) => {
  try {
    const {dirs} = RNFetchBlob.fs;
    console.log(dirs, 'dir');
    const path = `${dirs.DownloadDir}/${extractFileNameFromURL(url)}`; // Replace 'filename.ext' with the desired file name and extension

    const res = await RNFetchBlob.config({
      path,
    }).fetch('GET', url);

    // Check the response status
    if (res.info().status === 200) {
      console.log('File downloaded successfully');
    } else {
      console.log('Failed to download file');
    }
  } catch (error) {
    console.log('Error downloading file:', error);
  }
};

const DocumentList = ({data}: DocumentListProp) => {
  return (
    <Flex>
      <TitleWithValue title="Reports" />

      <FlatList
        data={data}
        keyExtractor={(item, index) => (1 + index).toString()}
        renderItem={({item}) => (
          <Flex>
            <Text type="heading400" overrideStyle={styles.marginLeft20}>
              {item?.lab?.name}
            </Text>
            {item?.reportFileUrl &&
              item?.reportFileUrl.map(url => (
                <Card outline align="stretch" overrideStyle={styles.overAll}>
                  <Flex row middle between>
                    <Flex row>
                      <SvgDocument />
                      <Text type="body300" overrideStyle={styles.marginLeft20}>
                        {extractFileNameFromURL(url)}
                      </Text>
                    </Flex>
                    <TouchableOpacity onPress={() => downloadFile(url)}>
                      <SvgFileDownload />
                    </TouchableOpacity>
                  </Flex>
                </Card>
              ))}
          </Flex>
        )}
      />
    </Flex>
  );
};
export default DocumentList;
