import React, {useMemo} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import getSize from '../../utils/getSize';
import useStyles from '../../hooks/useStyles';
import Illustration from '../Illustration';

type Props = {
  source: ImageSourcePropType;
};

const PokemonSpritePill = ({source}: Props) => {
  const {txtSecondaryStyle, contentContainerStyle} = useStyles();

  const containerStyle = useMemo(() => {
    return {
      ...styles.container,
      borderColor: txtSecondaryStyle.color,
    };
  }, [txtSecondaryStyle]);

  return (
    <View style={[containerStyle, contentContainerStyle]}>
      <Illustration source={source} aspectRatio={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    borderWidth: StyleSheet.hairlineWidth,
    padding: getSize(10),
    margin: getSize(4),
  },
});

export default PokemonSpritePill;
