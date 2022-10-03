import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps,
  TextStyle,
} from 'react-native';
import useStyles from '../hooks/useStyles';
import {getFontSize} from '../utils/getFontSize';

type Wight =
  | 'thin'
  | 'lighter'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semi-bold'
  | 'bold'
  | 'bolder'
  | 'black';

type Size =
  | 'extra-heading'
  | 'heading0'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption1'
  | 'caption2';

type Variant = 'primary' | 'secondary';

type Align = 'center' | 'left' | 'right';

type Props = {
  variant?: Variant;
  weight?: Wight;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<TextStyle> | undefined;
  align?: Align;
} & TextProps;

const Text = ({
  variant = 'primary',
  weight = 'regular',
  size = 'body',
  align = 'left',
  disabled,
  style,
  ...props
}: Props) => {
  const {txtPrimaryStyle, txtSecondaryStyle, txtDisableStyle} = useStyles();

  const themeStyle = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return txtSecondaryStyle;
      default:
        return txtPrimaryStyle;
    }
  }, [variant, txtPrimaryStyle, txtSecondaryStyle]);

  const wightStyle = useMemo(() => {
    switch (weight) {
      case 'thin':
        return styles.thin;
      case 'lighter':
        return styles.lighter;
      case 'light':
        return styles.light;
      case 'regular':
        return styles.regular;
      case 'medium':
        return styles.medium;
      case 'semi-bold':
        return styles.semiBold;
      case 'bold':
        return styles.bold;
      case 'bolder':
        return styles.bolder;
      case 'black':
        return styles.black;
      default:
        return styles.regular;
    }
  }, [weight]);

  const sizeStyle = useMemo(() => {
    switch (size) {
      case 'extra-heading':
        return styles.extraHeading;
      case 'heading0':
        return styles.heading0;
      case 'heading1':
        return styles.heading1;
      case 'heading2':
        return styles.heading2;
      case 'heading3':
        return styles.heading3;
      case 'body':
        return styles.body;
      case 'callout':
        return styles.callout;
      case 'subhead':
        return styles.subhead;
      case 'footnote':
        return styles.footnote;
      case 'caption1':
        return styles.caption1;
      case 'caption2':
        return styles.caption2;
      default:
        return styles.body;
    }
  }, [size]);

  const alignStyle = useMemo(() => {
    switch (align) {
      case 'center':
        return styles.center;
      case 'right':
        return styles.right;
      default:
        return styles.left;
    }
  }, [align]);

  return (
    <RNText
      style={[
        themeStyle,
        wightStyle,
        sizeStyle,
        alignStyle,
        disabled && txtDisableStyle,
        style,
      ]}
      disabled={disabled}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  thin: {
    fontFamily: 'Poppins-Thin', //100
  },
  lighter: {
    fontFamily: 'Poppins-ExtraLight', //200
  },
  light: {
    fontFamily: 'Poppins-Light', //300
  },
  regular: {
    fontFamily: 'Poppins-Regular', //400
  },
  medium: {
    fontFamily: 'Poppins-Medium', //500
  },
  semiBold: {
    fontFamily: 'Poppins-SemiBold', //600
  },
  bold: {
    fontFamily: 'Poppins-Bold', //700
  },
  bolder: {
    fontFamily: 'Poppins-ExtraBold', //800
  },
  black: {
    fontFamily: 'Poppins-Black', //900
  },
  extraHeading: {
    fontSize: getFontSize(36),
    lineHeight: getFontSize(40),
  },
  heading0: {
    fontSize: getFontSize(34),
  },
  heading1: {
    fontSize: getFontSize(28),
  },
  heading2: {
    fontSize: getFontSize(22),
  },
  heading3: {
    fontSize: getFontSize(20),
    lineHeight: getFontSize(30),
  },
  body: {
    fontSize: getFontSize(17),
  },
  callout: {
    fontSize: getFontSize(16),
  },
  subhead: {
    fontSize: getFontSize(15),
  },
  footnote: {
    fontSize: getFontSize(13),
  },
  caption1: {
    fontSize: getFontSize(12),
  },
  caption2: {
    fontSize: getFontSize(11),
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
});

export default Text;
