import React, {useCallback, useMemo, useRef, useState} from 'react';
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
import useStyles from '../hooks/useStyles';
import bgPrimaryLight from '../assets/illustrations/backgroundPrimaryLight.png';
import bgPrimaryDark from '../assets/illustrations/backgroundPrimaryDark.png';
import useIsDarkMode from '../hooks/useIsDarkMode';
import getPokemonSpecies from '../sevices/getPokemonSpecies';
import {deviceHeight, deviceWidth} from '../utils/getDeviceDimensions';
import {useFocusEffect} from '@react-navigation/native';
import {selectMenu} from '../states/reducers/menu';
import useAppDispatch from '../hooks/useAppDispatch';
import Menu from '../constants/Menu';

const BG_WIDTH_RATIO = 512;
const BG_HEIGHT_RATIO = 1143;

const DashboardScreen = () => {
  const dispatch = useAppDispatch();
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
  const {containerStyle, containerContentStyle, insets} = useContainer(true);

  const {
    data,
    dataTotal,
    refresh,
    isLoading,
    isFetching,
    fetchMore,
    isLastPage,
  } = useInfiniteList({
    fetcher: getPokemonSpecies,
    model: 'pokemonSpecies',
  });

  const goToPokedexPress = useCallback(() => {
    dashboardScroller.current?.scrollTo({
      y: pokedexLayout?.height || 0,
      animated: true,
    });
  }, [pokedexLayout]);

  const onPokedexLayout = useCallback((event: LayoutChangeEvent) => {
    setPokedexLayout(event.nativeEvent.layout);
  }, []);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderLayout(event.nativeEvent.layout);
  }, []);

  const renderPokemon = useCallback(({item: itemKey}: any) => {
    return <PokemonCard itemKey={itemKey} />;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.pokedexHeader}>
        <Text size={'extra-heading'} weight={'bold'}>
          Pok??Dex
        </Text>
        <Divider />
        <Text size={'heading3'} align={'center'}>
          All Generation totaling{'\n'}
          {dataTotal} Pokemon
        </Text>
      </View>
    );
  }, [dataTotal]);

  const bgPokedexHeight = useMemo(() => {
    return (deviceWidth / BG_WIDTH_RATIO) * BG_HEIGHT_RATIO;
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(selectMenu({value: Menu.HOME}));
    }, [dispatch]),
  );

  return (
    <>
      <HeaderWithMenu onLayout={onHeaderLayout} />
      <ScrollView
        ref={dashboardScroller}
        scrollEnabled={false}
        style={containerStyle}
        showsVerticalScrollIndicator={false}
        onLayout={onPokedexLayout}>
        <View
          style={[
            styles.contentContainer,
            {
              height:
                deviceHeight -
                (headerLayout.height || 0) -
                (StatusBar.currentHeight || 0),
              backgroundColor: bgPrimaryColor,
              paddingBottom: insets.bottom + getSize(20),
            },
          ]}>
          <Illustration
            source={PokemonGroups}
            width={'80%'}
            align={'right'}
            aspectRatio={1058 / 1252}
          />
          <Divider />
          <View style={styles.contentDescription}>
            <Text weight={'bold'} size={'extra-heading'}>
              All the Pok??mon data you'll ever need in one place!
            </Text>
            <Divider />
            <Text variant={'secondary'} size={'heading3'}>
              Thousands of data compiled into one place
            </Text>
            <Divider size={'extra-large'} />
            <Button
              align={'left'}
              text={'Check Pok??Dex'}
              onPress={goToPokedexPress}
            />
          </View>
        </View>
        <ImageBackground
          source={isDarkMode ? bgPrimaryDark : bgPrimaryLight}
          style={[
            styles.pokedexImageBg,
            {
              paddingBottom:
                bgPokedexHeight -
                (deviceHeight -
                  ((headerLayout.height || 0) +
                    (StatusBar.currentHeight || 0))),
            },
          ]}
          resizeMode={'contain'}>
          <FlatList
            ref={pokedexScroller}
            style={[containerStyle, styles.pokedexContainer]}
            contentContainerStyle={[
              containerContentStyle,
              styles.pokedexContentContainer,
              {padddingBottom: insets.bottom},
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
    justifyContent: 'space-between',
    paddingHorizontal: getSize(24),
  },
  contentDescription: {},
  pokedexContainer: {
    backgroundColor: 'transparent',
  },
  pokedexContentContainer: {
    paddingHorizontal: getSize(24),
  },
  pokedexImageBg: {
    width: '100%',
    height: undefined,
    aspectRatio: BG_WIDTH_RATIO / BG_HEIGHT_RATIO,
  },
  pokedexHeader: {
    alignItems: 'center',
    marginVertical: getSize(25),
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
