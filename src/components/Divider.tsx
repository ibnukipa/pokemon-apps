import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import getSize from '../utils/getSize';
import useStyles from '../hooks/useStyles';

type Size = 'small' | 'regular' | 'large' | 'extra-large';
type Variant = 'line' | 'margin';

type Props = {
  size?: Size;
  variant?: Variant;
};

const Divider = ({size, variant = 'margin'}: Props) => {
  const {txtSecondaryStyle} = useStyles();

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

  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'line':
        return styles.line;
      default:
        return styles.margin;
    }
  }, [variant]);

  return (
    <View
      style={[sizeStyle, variantStyle, {borderColor: txtSecondaryStyle.color}]}
    />
  );
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
  line: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  margin: {},
});

export default Divider;
