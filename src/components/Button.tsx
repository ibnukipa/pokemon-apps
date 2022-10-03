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
type Align = 'left' | 'center' | 'right' | 'full';

type Props = {
  size?: Size;
  variant?: Variant;
  onPress?: TouchableOpacityProps['onPress'];
  disabled?: boolean;
  text?: string;
  mode?: Mode;
  align?: Align;
};

const Button = ({
  size,
  variant,
  onPress,
  disabled = false,
  text,
  align = 'full',
}: Props) => {
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

  const alignStyle = useMemo(() => {
    switch (align) {
      case 'left':
        return styles.left;
      case 'center':
        return styles.center;
      case 'right':
        return styles.regular;
      default:
        return styles.full;
    }
  }, [align]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, sizeStyle, variantStyle, alignStyle]}>
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
    minWidth: '80%',
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
    backgroundColor: DarkColors.yellowTosca,
  },
  primaryLight: {
    backgroundColor: LightColors.yellowTosca,
  },
  secondaryDark: {
    backgroundColor: DarkColors.grey,
  },
  secondaryLight: {
    backgroundColor: LightColors.grey,
  },
  left: {
    alignSelf: 'flex-start',
  },
  center: {
    alignSelf: 'flex-end',
  },
  right: {
    alignSelf: 'center',
  },
  full: {},
});

export default Button;
