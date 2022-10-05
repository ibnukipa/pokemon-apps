import {useEffect, useMemo, useState} from 'react';
import {slice} from 'lodash';

const usePagination = (data: any) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    if (data.length >= 0) {
      setPage(1);
      setTotalData(data.length);
    }
  }, [data.length]);

  useEffect(() => {
    if (totalData !== null) {
      setTotalPage(Math.floor((totalData - 1) / perPage + 1));
    }
  }, [totalData, perPage]);

  const displayedData = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return slice(data, startIndex, startIndex + perPage);
  }, [data, page, perPage]);

  return {
    page,
    perPage,
    totalPage,
    totalData,
    displayedData,
    setPerPage,
    setPage,
  };
};

export default usePagination;
