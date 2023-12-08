import { useMemo, useState } from "react";

const usePagination = (data, volume = 10) => {
  const totalPages = useMemo(
    () => Math.ceil(data.length / volume),
    [volume, data.length]
  );
  const [page, setPage] = useState(0);
  /** Data representing one single page. */
  const slicedData = useMemo(
    () => data.slice(page * volume, page * volume + volume),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [volume, page, data]
  );

  return { data: slicedData, page, totalPages, setPage, volume };
};

export default usePagination;
