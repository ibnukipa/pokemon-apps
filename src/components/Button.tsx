import React, {useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors, {DarkColors, LightColors} from '../constants/Colors';
import useIsDarkMode from '../hooks/useIsDarkMode';
import Text from './Text';
import getSize from '../utils/getSize';

type Size = 'small' | 'regular' | 'large' | 'extra-large';
type Variant = 'primary' | 'secondary';
type Mode = 'full';

type Props = {
  size?: Size;
  variant?: Variant;
  onPress?: TouchableOpacityProps['onPress'];
  disabled?: boolean;
  text?: string;
  mode?: Mode;
};

const Button = ({size, variant, onPress, disabled = false, text}: Props) => {
  const isDarkMode = useIsDarkMode();

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
      case 'secondary':
        return isDarkMode ? styles.secondaryDark : styles.secondaryLight;
      default:
        return isDarkMode ? styles.primaryDark : styles.primaryLight;
    }
  }, [variant, isDarkMode]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, sizeStyle, variantStyle]}>
      <Text style={styles.text} size={'heading3'} weight={'bold'}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: getSize(16),
    borderRadius: getSize(14),
  },
  small: {
    paddingVertical: getSize(10),
  },
  regular: {
    paddingVertical: getSize(12),
  },
  large: {
    paddingVertical: getSize(14),
  },
  extraLarge: {
    paddingVertical: getSize(16),
  },
  primaryDark: {
    backgroundColor: DarkColors.redTosca,
  },
  primaryLight: {
    backgroundColor: LightColors.redTosca,
  },
  secondaryDark: {
    backgroundColor: DarkColors.grey,
  },
  secondaryLight: {
    backgroundColor: LightColors.grey,
  },
});

export default Button;
