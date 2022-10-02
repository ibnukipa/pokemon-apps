import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';
import useStyles from '../hooks/useStyles';

type Variant = 'primary' | 'secondary';

type Props = {
  Svg: React.FC<SvgProps>;
  variant?: Variant;
  disabled?: boolean;
};

const Icon = ({variant, disabled, Svg}: Props) => {
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
    <TouchableOpacity activeOpacity={0.7}>
      <Svg fill={disabled ? txtDisableStyle.color : variantStyle.color} />
    </TouchableOpacity>
  );
};

export default Icon;
