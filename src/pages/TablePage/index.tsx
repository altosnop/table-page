import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTableData } from '../../store/table/tableSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  dataSelector,
  loadingSelector,
} from '../../store/table/tableSelectors';
import TableElement from '../../components/TableElement';
import Pagination from '../../components/Pagination';
import cls from './styles.module.css';

const TablePage = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(dataSelector);
  const loading = useAppSelector(loadingSelector);

  useEffect(() => {
    dispatch(
      setTableData('https://technical-task-api.icapgroupgmbh.com/api/table/')
    );
  }, [dispatch]);

  return (
    <div className={cls.wrapper}>
      <table className={cls.table}>
        <thead className={cls.thead}>
          <tr>
            <th scope='col' className={cls.th}>
              Name
            </th>
            <th scope='col' className={cls.th}>
              <div className='flex items-center'>Email</div>
            </th>
            <th scope='col' className={cls.th}>
              <div className='flex items-center'>Birthday</div>
            </th>
            <th scope='col' className={cls.th}>
              <div className='flex items-center'>Phone</div>
            </th>
            <th scope='col' className={cls.th}>
              <div className='flex items-center'>Address</div>
            </th>
            <th scope='col' className={cls.th}>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(person => (
              <TableElement
                key={person.id}
                name={person.name}
                email={person.email}
                birthday_date={person.birthday_date}
                phone_number={person.phone_number}
                address={person.address}
              />
            ))}
        </tbody>
      </table>
      <Pagination />
      {loading && <h1>Loading...</h1>}
    </div>
  );
};

export default TablePage;
