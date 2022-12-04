import { useEffect, useState } from "react";

export const useLocalPagination = (initialData) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(0);

  const [filteredData, setFilteredData] = useState(
    initialData.slice(currentPage, currentPage + 8)
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setFilteredData(data.slice(currentPage, currentPage + 8));
  }, [data, currentPage]);

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 8);
    }
  };
  const nextPage = () => {
    if (data.length > currentPage + 8) {
      setCurrentPage(currentPage + 8);
    }
  };

  return {
    currentPage,
    setCurrentPage,
    filteredData,
    setFilteredData,
    prevPage,
    nextPage,
  };
};
