import {isEmpty, union} from 'lodash';
import useAppDispatch from './useAppDispatch';
import {useCallback, useEffect, useState} from 'react';
import {insertCollection} from '../states/reducers/db';

type Props = {
  fetcher: any;
  model: string;
  query?: any;
};

const useInfiniteList = ({fetcher, query, model}: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const fetch = useCallback(
    (
      currentOffset: number,
      currentIsLastPage: boolean,
      currentLimit: number,
    ) => {
      if (currentIsLastPage) {
        setIsLoading(false);
        setIsFetching(false);
        return;
      } else {
        const doFetch = async () => {
          const response = await fetcher?.({
            ...query,
            offset: currentOffset,
            limit: currentLimit,
          });

          const responseData = response.data;

          if (!responseData.next || isEmpty(responseData.results)) {
            setIsLastPage(true);
            setIsLoading(false);
            setIsFetching(false);
            return;
          } else {
            const responseResult = responseData.results;
            const newData: any = [];
            const mappedData = responseResult.reduce(
              (result: any, item: any) => {
                const parts = item.url.split('/');
                const id = parts[parts.length - 2];
                result[id] = {
                  ...item,
                  id,
                };
                newData.push(id);
                return result;
              },
              {},
            );

            //DB Update
            dispatch(
              insertCollection({
                model,
                data: mappedData,
              }),
            );

            //list state update
            setData(oldData => {
              if (currentOffset === 0) {
                return newData;
              }
              return union(oldData, newData);
            });
            setDataTotal(responseData.count);
            setIsLoading(false);
            setIsFetching(false);
          }
        };
        doFetch();
      }
    },
    [dispatch, fetcher, model, query],
  );

  const refresh = useCallback(() => {
    setIsLoading(true);
    setOffset(0);
    setIsLastPage(false);

    fetch(0, false, limit);
  }, [fetch, limit]);

  const fetchMore = useCallback(() => {
    const nextOffset = offset + limit;
    setIsFetching(true);
    setOffset(nextOffset);

    fetch(nextOffset, isLastPage, limit);
  }, [limit, fetch, offset, isLastPage]);

  useEffect(() => {
    refresh();
  }, [limit, refresh]);

  return {
    data,
    dataTotal,
    isLoading,
    isFetching,
    isLastPage,
    refresh,
    fetchMore,
    setLimit,
  };
};

export default useInfiniteList;
