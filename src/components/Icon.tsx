import React, {useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import useStyles from '../hooks/useStyles';
import getSize from '../utils/getSize';

type Variant = 'primary' | 'secondary';

type Props = {
  Svg: React.FC<SvgProps>;
  variant?: Variant;
  disabled?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  color?: string;
};

const Icon = ({variant, disabled, Svg, onPress, color}: Props) => {
  const {txtPrimaryStyle, txtSecondaryStyle, txtDisableStyle} = useStyles();
  const variantStyle = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return txtSecondaryStyle;
      default:
        return txtPrimaryStyle;
    }
  }, [txtPrimaryStyle, txtSecondaryStyle, variant]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}>
      <Svg
        fill={
          color ? color : disabled ? txtDisableStyle.color : variantStyle.color
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getSize(20), // TODO move this padding to icon.size
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;
