import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import Colors from '../../constants/Colors';
import getSize from '../../utils/getSize';
import Illustration from '../Illustration';
import {isEmpty} from 'lodash';
import Divider from '../Divider';
import PokemonTypePill from './PokemonTypePill';
import LoadingFill from '../LoadingFill';
import usePokemon from '../../hooks/usePokemon';
import {useNavigation} from '@react-navigation/native';
import useStyles from '../../hooks/useStyles';

type Props = {
  itemKey: number | string;
};

const PokemonSnippet = memo(({itemKey}: Props) => {
  const navigation = useNavigation<RouteScreenNavigationProp>();

  const {txtDisableStyle} = useStyles();
  const {
    pokemonSource,
    pokemonName,
    pokemonCode,
    pokemonTypes,
    pokemonIsLoading,
  } = usePokemon(itemKey);

  const pokemonPress = useCallback(() => {
    navigation.push('Pokemon', {itemKey});
  }, [itemKey, navigation]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pokemonPress}
      style={[styles.container]}>
      <Illustration
        width={'30%'}
        align={'center'}
        source={pokemonSource}
        aspectRatio={1}
      />
      <View
        style={[styles.contentContainer, {borderColor: txtDisableStyle.color}]}>
        <Text variant={'secondary'} size={'subhead'} weight={'bold'}>
          {pokemonCode}
        </Text>
        <Divider size={'small'} />
        <Text weight={'bold'} size={'heading2'}>
          {pokemonName}
        </Text>
        {!isEmpty(pokemonTypes) && (
          <>
            <Divider size={'small'} />
            <View>
              <FlatList
                data={pokemonTypes}
                style={styles.typeContainer}
                renderItem={({item}) => (
                  <PokemonTypePill numCols={2} key={item} type={item} />
                )}
                numColumns={2}
              />
            </View>
          </>
        )}
      </View>
      {pokemonIsLoading && <LoadingFill borderRadius={getSize(24)} />}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerDark: {
    backgroundColor: Colors.blackLighter,
  },
  containerLight: {
    backgroundColor: Colors.white,
  },
  illustrationContainer: {
    marginTop: getSize(25),
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: getSize(10),
    marginVertical: getSize(10),
    paddingHorizontal: getSize(15),
    borderLeftWidth: 1,
  },
  typeContainer: {
    marginHorizontal: -getSize(4),
  },
});

export default PokemonSnippet;
