import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import useIsDarkMode from '../../hooks/useIsDarkMode';
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

const PokemonCard = memo(({itemKey}: Props) => {
  const isDarkMode = useIsDarkMode();
  const navigation = useNavigation<RouteScreenNavigationProp>();

  const {contentContainerStyle} = useStyles();
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

  const containerStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.containerDark;
    } else {
      return styles.containerLight;
    }
  }, [isDarkMode]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pokemonPress}
      style={[styles.container, containerStyle]}>
      <View style={styles.illustrationContainer}>
        <Illustration
          width={'80%'}
          align={'center'}
          source={pokemonSource}
          aspectRatio={1}
        />
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
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
                  <PokemonTypePill key={item} type={item} />
                )}
                numColumns={3}
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
    borderRadius: getSize(24),
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
    marginHorizontal: getSize(10),
    marginBottom: getSize(10),
    padding: getSize(15),
    borderRadius: getSize(15),
  },
  typeContainer: {
    marginHorizontal: -getSize(4),
  },
});

export default PokemonCard;
