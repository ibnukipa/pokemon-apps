import React from 'react';
import Container from '../components/Container';
import HeaderWithMenu from '../components/HeaderWithMenu';
import Illustration from '../components/Illustration';
import PokemonGroups from '../assets/illustrations/pokemonGroups.png';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import Divider from '../components/Divider';
import getSize from '../utils/getSize';
import Button from '../components/Button';

const DashboardScreen = () => {
  return (
    <>
      <HeaderWithMenu />
      <Container mode={'scroll'}>
        <View style={styles.contentContainer}>
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
            <Button text={'Check PokèDex'} />
          </View>
        </View>
      </Container>
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
});

export default DashboardScreen;
