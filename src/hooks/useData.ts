import {isEmpty, omit} from 'lodash';
import useAppDispatch from './useAppDispatch';
import {useCallback, useState} from 'react';
import {insertModel} from '../states/reducers/db';

type Props = {
  fetcher: any;
  model: string;
  modelKey?: string;
  id: string | number;
  omitKeys?: string[];
};

const useData = ({fetcher, model, id, omitKeys, modelKey = 'name'}: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNoResult, setIsNoResult] = useState<boolean>(false);

  const fetch = useCallback(() => {
    const doFetch = async () => {
      const response = await fetcher({id});
      const responseData = response.data;

      if (!responseData || isEmpty(responseData)) {
        setIsNoResult(true);
        setIsLoading(false);
        return;
      } else {
        //DB Update
        let newData = responseData;
        if (omitKeys) {
          newData = omit(responseData, omitKeys);
        }
        dispatch(
          insertModel({
            model,
            id: responseData[modelKey],
            data: newData,
          }),
        );
        setIsLoading(false);
      }
    };
    if (id) {
      doFetch();
    }
  }, [dispatch, fetcher, id, model, omitKeys, modelKey]);

  const refresh = useCallback(() => {
    setIsLoading(true);

    fetch();
  }, [fetch]);

  return {
    refresh,
    isLoading,
    isNoResult,
  };
};

export default useData;
