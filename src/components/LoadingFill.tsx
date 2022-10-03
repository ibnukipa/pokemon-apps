import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import useIsDarkMode from '../hooks/useIsDarkMode';

type Props = {
  borderRadius?: number;
};

const LoadingFill = ({borderRadius = 0}: Props) => {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = useMemo(() => {
    if (isDarkMode) {
      return Colors.black70;
    } else {
      return Colors.white70;
    }
  }, [isDarkMode]);

  return (
    <View style={[styles.container, {backgroundColor, borderRadius}]}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default LoadingFill;
