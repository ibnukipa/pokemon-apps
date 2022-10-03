import React, {useCallback, useRef, useState} from 'react';
import HeaderWithMenu from '../components/HeaderWithMenu';
import Illustration from '../components/Illustration';
import PokemonGroups from '../assets/illustrations/pokemonGroups.png';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Text from '../components/Text';
import Divider from '../components/Divider';
import getSize from '../utils/getSize';
import Button from '../components/Button';
import useContainer from '../hooks/useContainer';
import PokemonCard from '../components/Pokemon/PokemonCard';
import useInfiniteList from '../hooks/useInfiniteList';
import getPokemons from '../sevices/getPokemons';
import useStyles from '../hooks/useStyles';
import bgPrimaryLight from '../assets/illustrations/backgroundPrimaryLight.png';
import bgPrimaryDark from '../assets/illustrations/backgroundPrimaryDark.png';
import useIsDarkMode from '../hooks/useIsDarkMode';

const DashboardScreen = () => {
  const isDarkMode = useIsDarkMode();
  const [pokedexLayout, setPokedexLayout] = useState<
    Partial<LayoutChangeEvent['nativeEvent']['layout']>
  >({});
  const [headerLayout, setHeaderLayout] = useState<
    Partial<LayoutChangeEvent['nativeEvent']['layout']>
  >({});
  const pokedexScroller = useRef<FlatList>(null);
  const dashboardScroller = useRef<ScrollView>(null);

  const {txtPrimaryStyle, bgPrimaryColor} = useStyles();
  const {
    containerStyle,
    containerContentStyle,
    statusBarStyle,
    statusBarAnimated,
    statusBarBackgroundColor,
  } = useContainer(true);

  const {
    data,
    dataTotal,
    refresh,
    isLoading,
    isFetching,
    fetchMore,
    isLastPage,
  } = useInfiniteList({
    fetcher: getPokemons,
    model: 'pokemons',
  });

  const goToPokedexPress = useCallback(() => {
    dashboardScroller.current?.scrollTo({
      y: (pokedexLayout?.height || 0) + (headerLayout?.height || 0),
      animated: true,
    });
  }, [pokedexLayout, headerLayout]);

  const onPokedexLayout = useCallback((event: LayoutChangeEvent) => {
    setPokedexLayout(event.nativeEvent.layout);
  }, []);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderLayout(event.nativeEvent.layout);
  }, []);

  const renderPokemon = useCallback(({item}: any) => {
    return <PokemonCard id={item} />;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.pokedexHeader}>
        <Text size={'extra-heading'} weight={'bold'}>
          PokèDex
        </Text>
        <Divider />
        <Text size={'heading3'} align={'center'}>
          All Generation totaling{'\n'}
          {dataTotal} Pokemon
        </Text>
      </View>
    );
  }, [dataTotal]);

  return (
    <>
      <HeaderWithMenu onLayout={onHeaderLayout} />
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        animated={statusBarAnimated}
      />
      <ScrollView
        ref={dashboardScroller}
        scrollEnabled={false}
        style={containerStyle}
        showsVerticalScrollIndicator={false}
        onLayout={onPokedexLayout}>
        <View
          style={[styles.contentContainer, {backgroundColor: bgPrimaryColor}]}>
          <Illustration
            source={PokemonGroups}
            width={'80%'}
            align={'right'}
            aspectRatio={1058 / 1252}
          />
          <Divider />
          <View style={styles.contentDescription}>
            <Text weight={'bold'} size={'extra-heading'}>
              All the Pokémon data you'll ever need in one place!
            </Text>
            <Divider />
            <Text variant={'secondary'} size={'heading3'}>
              Thousands of data compiled into one place
            </Text>
            <Divider size={'extra-large'} />
            <Button
              align={'left'}
              text={'Check PokèDex'}
              onPress={goToPokedexPress}
            />
          </View>
        </View>
        <ImageBackground
          source={isDarkMode ? bgPrimaryDark : bgPrimaryLight}
          style={styles.pokedexImageBg}
          resizeMode={'contain'}>
          <FlatList
            ref={pokedexScroller}
            style={[containerStyle, styles.pokedexContainer]}
            contentContainerStyle={[
              containerContentStyle,
              {
                paddingTop: (headerLayout.height || 0) + 20,
                paddingBottom: headerLayout.height,
              },
              styles.pokedexContentContainer,
            ]}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderPokemon}
            refreshing={isLoading}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            }
            onEndReached={!isLoading && !isFetching ? fetchMore : null}
            ListFooterComponent={
              !isLastPage ? (
                <View style={styles.loaderContainer}>
                  <Text style={styles.loaderText}>Load More</Text>
                  <ActivityIndicator color={txtPrimaryStyle.color} />
                </View>
              ) : null
            }
            ListHeaderComponent={renderHeader}
            ItemSeparatorComponent={() => <Divider size={'large'} />}
          />
        </ImageBackground>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: getSize(24),
    paddingVertical: getSize(40),
  },
  contentDescription: {},
  pokedexContainer: {
    backgroundColor: 'transparent',
  },
  pokedexContentContainer: {
    paddingHorizontal: 24,
  },
  pokedexImageBg: {
    width: '100%',
    height: undefined,
    aspectRatio: 512 / 1143,
  },
  pokedexHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  loaderContainer: {
    flexDirection: 'row',
    paddingVertical: getSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginRight: getSize(6),
  },
});

export default DashboardScreen;
