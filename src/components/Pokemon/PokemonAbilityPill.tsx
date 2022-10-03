import React from 'react';
import {StyleSheet, View} from 'react-native';
import getSize from '../../utils/getSize';
import Colors from '../../constants/Colors';
import Text from '../Text';
import {startCase} from 'lodash';

type Props = {
  ability: string;
  disabled: boolean;
};

const PokemonAbilityPill = ({ability, disabled}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text
        size={'subhead'}
        variant={disabled ? 'secondary' : 'primary'}
        weight={'medium'}>
        {startCase(ability)}
      </Text>
      {disabled && (
        <Text variant={'secondary'} size={'footnote'}>
          (hidden)
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: getSize(25),
    marginVertical: getSize(4),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.white,
  },
});

export default PokemonAbilityPill;
