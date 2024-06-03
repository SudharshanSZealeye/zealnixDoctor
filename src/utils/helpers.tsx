/* eslint-disable */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {getColors, Icons} from 'squashapps-react-native-uikit';
import {APP_THEME} from './constants';
import moment from 'moment';

const {SvgEye} = Icons;

export const useVisibilityIcon = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleOne, setVisibleOne] = useState(false);
  const {PRIMARY_COLOR_500, NEUTRAL_500} = getColors(APP_THEME);

  const hanldeToggle = () => {
    setVisible(!isVisible);
  };
  const hanldeToggleOne = () => {
    setVisibleOne(!isVisibleOne);
  };
  const visibleIcon = () => {
    return (
      <TouchableOpacity
        onPress={hanldeToggle}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgEye fill={!isVisible ? NEUTRAL_500 : PRIMARY_COLOR_500} />
      </TouchableOpacity>
    );
  };
  const visibleIconOne = () => {
    return (
      <TouchableOpacity
        onPress={hanldeToggleOne}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgEye fill={!isVisibleOne ? NEUTRAL_500 : PRIMARY_COLOR_500} />
      </TouchableOpacity>
    );
  };

  return {visibleIcon, isVisible, visibleIconOne, isVisibleOne};
};

export const urlEncode = (data: any) => {
  const encodedData = encodeURIComponent(JSON.stringify(data));
  return encodedData;
};

export const getStatusBackground = (data: string) => {
  if (data === 'upcoming') {
    return 'success';
  }
  if (data === 'ongoing') {
    return 'inprogress';
  }
  if (data === 'completed') {
    return 'theme';
  }
  if (data === 'rescheduled') {
    return 'error';
  }
  if (data === 'cancelled') {
    return 'error';
  }
};
export const getCurentMini = () => {
  var currentDate = new Date();
  // Get the current hours and minutes
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  // Convert hours to minutes and add current minutes
  var totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

export const getCurrentTime = (minutes: number): string | undefined => {
  if (minutes === undefined) return;
  return moment().startOf('day').set({minutes: minutes}).format('hh:mm a');
};

export function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}hours ${minutes}minutes`;
}

export function extractFileNameFromURL(url: string) {
  const splitUrl = url.split('/');
  const fileName = splitUrl[splitUrl.length - 1];
  return fileName;
}
