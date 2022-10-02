import {Dimensions, Platform, PixelRatio} from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const scale = width / 375;

const getSize = (size: number): number => {
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export default getSize;
