import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

type Props = {
  onPress: () => void;
  progress: number;
  style: any;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    width: 80,
    height: 80,
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: '#FFF',
  },
});

const CircularProgressBarButton = ({onPress, progress, style}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <ProgressCircle
        style={styles.progress}
        progress={progress}
        strokeWidth={8}
        progressColor="red"
      />
      <View style={styles.button} />
    </TouchableOpacity>
  );
};

export default CircularProgressBarButton;
