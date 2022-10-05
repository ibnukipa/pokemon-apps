import React, {useCallback, useMemo} from 'react';
import HeaderWithMenu from '../components/HeaderWithMenu';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import useContainer from '../hooks/useContainer';
import useStyles from '../hooks/useStyles';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {selectMenu} from '../states/reducers/menu';
import useAppDispatch from '../hooks/useAppDispatch';
import Colors from '../constants/Colors';
import Background from '../assets/illustrations/backgroundPokemonType.svg';
import Text from '../components/Text';
import {startCase} from 'lodash';
import getSize from '../utils/getSize';
import Divider from '../components/Divider';
import Container from '../components/Container';
import PokemonSnippet from '../components/Pokemon/PokemonSnippet';
import usePokemonType from '../hooks/usePokemonType';
import PokemonTypePagination from '../components/Pokemon/PokemonTypePagination';
import usePagination from '../hooks/usePagination';

const PokemonTypeScreen = () => {
  const route = useRoute<RouteProp<RouteList, 'PokemonType'>>();
  const dispatch = useAppDispatch();

  const {contentBackgroundStyle} = useStyles();
  const {containerStyle} = useContainer(true);

  const {pokemons, pokemonsIsLoading} = usePokemonType(route.params.type);
  const {
    displayedData,
    page,
    setPage,
    perPage,
    totalPage,
    totalData,
    setPerPage,
  } = usePagination(pokemons);

  const typeColor = useMemo(() => {
    // @ts-ignore
    return Colors[route.params.type];
  }, [route.params.type]);

  const renderPokemon = useCallback(({item: itemKey}: any) => {
    return <PokemonSnippet itemKey={itemKey} />;
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(selectMenu({value: route.params.type}));
    }, [dispatch, route.params.type]),
  );

  return (
    <View style={[containerStyle, styles.container]}>
      <Background
        fill={containerStyle.backgroundColor}
        fillSecondary={typeColor}
        width={'100%'}
        height={undefined}
        style={styles.background}
      />
      <HeaderWithMenu />
      <Container transparent withHeader={true} mode={'scroll'}>
        <View style={styles.contentHeaderContainer}>
          <Text size={'extra-heading'} weight={'bold'}>
            Pokemon with
          </Text>
          <Divider />
          <Text size={'extra-heading'} weight={'bold'}>
            {startCase(route.params?.type)}
          </Text>
        </View>
        <View style={[styles.contentContainer, contentBackgroundStyle]}>
          <FlatList
            scrollEnabled={true}
            contentContainerStyle={[pokemonsIsLoading && styles.content]}
            data={displayedData}
            renderItem={renderPokemon}
            ItemSeparatorComponent={() => (
              <Divider size={'small'} variant={'line'} />
            )}
            ListEmptyComponent={
              pokemonsIsLoading ? <ActivityIndicator /> : <Text>no data</Text>
            }
          />
          <PokemonTypePagination
            color={typeColor}
            page={page}
            setPage={setPage}
            perPage={perPage}
            totalData={totalData ?? 0}
            totalPage={totalPage}
            setPerPage={setPerPage}
          />
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  background: {
    aspectRatio: 360 / 601,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  contentHeaderContainer: {
    paddingHorizontal: getSize(24),
    paddingVertical: getSize(30),
  },
  contentContainer: {
    borderRadius: getSize(24),
    marginHorizontal: getSize(24),
    marginBottom: getSize(24),
    padding: getSize(20),
  },
  content: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default PokemonTypeScreen;
