import React, { FC, useCallback, useEffect, useState } from 'react'
import { getListOfUsers } from '../../api.auth';
import Pagination from '../Paginator/Paginator';


const UsersList : FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total_pages, setTotal_pages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getListOfUsers(page);
        setData(response.data.data);
        setTotal_pages(response.data.total_pages)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown Error: api.get.data'
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? total_pages : current;

    setPage(next <= total ? next : current);
  }, [page, data, total_pages]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

    return (
        <div className='App'>
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{`${item.first_name}`}</li>
          ))}
        </ul>
      ) : (
        'no data'
      )}
      {data && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === total_pages,
          }}
          nav={{ current: page, total: total_pages }}
        />
      )}
    </div>
  );
}

export default UsersList