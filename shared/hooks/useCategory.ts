import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { ICategory } from '../apis';
import { CATEGORY_URI } from '../enums/category';

export const useCategory = (initialData?: ICategory[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingTimeout = () => {
    setIsLoading(false);
  };

  const { data, error, isValidating, mutate } = useSWR<ICategory[]>(`${CATEGORY_URI.BASE}`, {
    dedupingInterval: 1500,
    initialData
  });

  useEffect(() => {
    if (isValidating) {
      setIsLoading(true);
      return;
    }
    const timer = setTimeout(loadingTimeout, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [isValidating]);

  const memoizedData = useMemo(() => (!isEmpty(data) ? data : ([] as ICategory[])), [data]);

  return {
    data: memoizedData,
    error,
    isLoading,
    mutate
  };
};
