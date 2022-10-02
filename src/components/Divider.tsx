import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import getSize from '../utils/getSize';

type Size = 'small' | 'regular' | 'large' | 'extra-large';

type Props = {
  size?: Size;
};

const Divider = ({size}: Props) => {
  const sizeStyle = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      case 'extra-large':
        return styles.extraLarge;
      default:
        return styles.regular;
    }
  }, [size]);

  return <View style={[sizeStyle]} />;
};

const styles = StyleSheet.create({
  small: {
    marginVertical: getSize(4),
  },
  regular: {
    marginVertical: getSize(8),
  },
  large: {
    marginVertical: getSize(12),
  },
  extraLarge: {
    marginVertical: getSize(16),
  },
});

export default Divider;
