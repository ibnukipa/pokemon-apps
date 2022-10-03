import React, {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

type Props = {
  source: any;
  aspectRatio: number;
  height?: number;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
};

const Illustration = ({
  width = '100%',
  source,
  align,
  aspectRatio = 1,
}: Props) => {
  const alignStyle = useMemo(() => {
    switch (align) {
      case 'center':
        return styles.center;
      case 'right':
        return styles.right;
      default:
        return styles.left;
    }
  }, [align]);

  const isUriSvg = useMemo(() => {
    const uri = source?.uri;
    let ext = '';
    if (uri) {
      ext = uri.substring(uri.lastIndexOf('.'));
    }

    return ext === '.svg';
  }, [source]);

  if (isUriSvg) {
    return (
      <View style={[{width, aspectRatio}, alignStyle]}>
        <SvgUri width={'100%'} height={'100%'} uri={source?.uri} />
      </View>
    );
  }

  return (
    <View style={[{width, aspectRatio}, alignStyle]}>
      <Image resizeMode={'contain'} source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  center: {
    alignSelf: 'center',
  },
});

export default Illustration;
