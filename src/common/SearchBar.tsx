import * as React from 'react';
import {View} from 'react-native';
import {
  InputText,
  Icons,
  Colors,
  Flex,
  Button,
} from 'squashapps-react-native-uikit';
import {OverrideStyle} from 'squashapps-react-native-uikit/Flex';

const {SvgSearch, SvgFilter} = Icons;
const SearchIcon = () => <SvgSearch fill={Colors.NEUTRAL_500} />;

type Props = {
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  onClickFilter?: () => void;
  isFilter?: boolean;
  overrideStyle?: OverrideStyle;
};
const SearchBar = ({
  placeholder,
  value,
  onChange,
  isFilter,
  onClickFilter,
  overrideStyle,
}: Props) => {
  return (
    <Flex row center between overrideStyle={overrideStyle}>
      <View style={{width: isFilter ? '90%' : '100%'}}>
        <InputText
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          actionRight={SearchIcon}
        />
      </View>
      {isFilter && (
        <Button type="link" onClick={onClickFilter}>
          <SvgFilter />
        </Button>
      )}
    </Flex>
  );
};
export default SearchBar;
