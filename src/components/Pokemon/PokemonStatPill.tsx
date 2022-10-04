import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import getSize from '../../utils/getSize';
import Colors from '../../constants/Colors';
import Text from '../Text';
import {startCase} from 'lodash';
import useStyles from '../../hooks/useStyles';

type Type =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'
  | 'accuracy'
  | 'evasion';

type Props = {
  statValue: number | string;
  statName: Type;
};

const PokemonStatPill = ({statValue, statName}: Props) => {
  const {contentContainerStyle} = useStyles();

  const stateNameShort = useMemo(() => {
    let newStateName: string = statName;

    if (statName === 'special-attack') {
      newStateName = 'sp.att';
    } else if (statName === 'special-defense') {
      newStateName = 'sp.def';
    }

    return newStateName;
  }, [statName]);

  return (
    <View
      style={[
        styles.container,
        {borderColor: Colors[statName]},
        contentContainerStyle,
      ]}>
      <Text weight={'bold'} style={{color: Colors[statName]}}>
        {statValue}
      </Text>
      <Text size={'caption2'} weight={'medium'}>
        {startCase(stateNameShort)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: getSize(4),
    borderRadius: 100,
    margin: getSize(4),
  },
});

export default PokemonStatPill;
