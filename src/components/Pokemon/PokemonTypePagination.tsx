import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import React, {useCallback, useMemo, useState} from 'react';
import getSize from '../../utils/getSize';
import Colors from '../../constants/Colors';
import getPagination from '../../utils/getPagination';

type Props = {
  color: string;
  page: number;
  perPage: number;
  totalData: number;
  totalPage: number;
  setPerPage: Function;
  setPage: Function;
};

const PokemonTypePagination = ({
  color,
  page,
  setPage,
  perPage,
  totalData,
  totalPage,
  setPerPage,
}: Props) => {
  const [perPageOptionShown, setPerPageOptionShown] = useState(false);

  const perPageOptionPress = useCallback(() => {
    setPerPageOptionShown(active => !active);
  }, []);

  const onItemPress = useCallback(
    (value: any) => {
      setPage(1);
      setPerPage(value);
      perPageOptionPress();
    },
    [perPageOptionPress, setPage, setPerPage],
  );

  const renderDropdownItem = useCallback(
    ({item}: any) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onItemPress(item)}
        style={[
          styles.pageDropdownItem,
          item === perPage && styles.pageDropdownItemActive,
        ]}>
        <Text size={'subhead'} style={styles.pageDropdownItemText}>
          {item}
        </Text>
      </TouchableOpacity>
    ),
    [onItemPress, perPage],
  );

  const renderPaginationItem = useCallback(
    (value: any, isPlain: boolean = false, disabled: boolean = false) => {
      const isActive = Number(value) === page;
      const onPress = () => {
        if (!isPlain || value !== '>' || value !== '<') {
          setPage(Number(value));
        } else if (value === '>') {
          setPage(page + 1);
        } else if (value === '<') {
          setPage(page - 1);
        }
      };
      return (
        <TouchableOpacity
          disabled={disabled || totalData === 0}
          activeOpacity={0.7}
          onPress={onPress}
          style={[
            styles.paginationItem,
            {borderColor: color},
            isPlain && styles.paginationItemPlain,
            isActive && {backgroundColor: color},
          ]}>
          <Text
            weight={isActive ? 'bolder' : 'regular'}
            size={'caption2'}
            style={{color: isActive ? Colors.white : color}}>
            {value}
          </Text>
        </TouchableOpacity>
      );
    },
    [page, color, setPage, totalData],
  );

  const pages = useMemo(() => {
    return getPagination(page, totalPage);
  }, [page, totalPage]);

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>
        <View style={styles.page}>
          <Text style={{color}} size={'caption2'} weight={'bold'}>
            Per Page:
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={totalData === 0}
            onPress={perPageOptionPress}
            style={[styles.pageDropdown, {borderColor: color}]}>
            <Text style={{color}} size={'caption2'} weight={'bold'}>
              {perPage}
            </Text>
            <ChevronDown style={styles.pageDropdownIcon} fill={color} />
            {perPageOptionShown && (
              <FlatList
                style={[
                  styles.pageDropdownList,
                  {
                    backgroundColor: color,
                  },
                ]}
                data={[5, 10, 20, 40, 80, 100]}
                renderItem={renderDropdownItem}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.totalData}>
          <Text style={{color}} size={'caption2'} weight={'bold'}>
            Total Data: {totalData}
          </Text>
        </View>
      </View>
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationGroup, styles.paginationNav]}>
          {renderPaginationItem('<', false, page === 1)}
        </View>
        <View style={[styles.paginationGroup, styles.paginationPages]}>
          {pages.map((item: any) => renderPaginationItem(item, item === '...'))}
        </View>
        <View style={[styles.paginationGroup, styles.paginationNav]}>
          {renderPaginationItem('>', false, page === totalPage)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getSize(10),
    padding: getSize(5),
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  page: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalData: {},
  pageDropdown: {
    padding: getSize(5),
    marginLeft: getSize(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    width: getSize(50),
  },
  pageDropdownIcon: {},
  pageDropdownList: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: getSize(3),
    borderRadius: 8,
    marginBottom: getSize(25),
  },
  pageDropdownItem: {
    padding: getSize(4),
    paddingVertical: getSize(0),
    marginVertical: getSize(2),
    borderRadius: 4,
  },
  pageDropdownItemActive: {
    backgroundColor: Colors.black30,
  },
  pageDropdownItemText: {
    color: Colors.white,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: getSize(20),
    marginHorizontal: -getSize(4),
    justifyContent: 'space-between',
  },
  paginationGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationPages: {
    flex: 1,
  },
  paginationNav: {
    flex: 0.2,
  },
  paginationItem: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: getSize(4),
    justifyContent: 'center',
    paddingVertical: getSize(2),
  },
  paginationItemPlain: {
    borderColor: 'transparent',
  },
});

export default PokemonTypePagination;
