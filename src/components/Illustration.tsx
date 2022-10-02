import React, {useMemo} from 'react';
import {Image, StyleSheet, ImageProps} from 'react-native';

type Props = {
  source: ImageProps['source'];
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

  return (
    <Image
      resizeMode={'contain'}
      source={source}
      style={[
        styles.image,
        {
          aspectRatio,
          width,
        },
        alignStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: undefined,
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
