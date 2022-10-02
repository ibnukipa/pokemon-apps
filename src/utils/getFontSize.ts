import {Dimensions, StatusBar} from 'react-native';

export function getFontSize(fontSize: number, standardScreenHeight = 760) {
  const {height, width} = Dimensions.get('window');
  const standardLength = width > height ? width : height;
  const offset: number = width > height ? 0 : StatusBar.currentHeight || 0;

  const deviceHeight = standardLength - offset;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
