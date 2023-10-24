import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTableData } from '../../store/table/tableSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  dataSelector,
  loadingSelector,
} from '../../store/table/tableSelectors';
import TableElement from '../../components/TableElement';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import cls from './styles.module.css';
import PersonForm from '../../components/PersonForm';
import ChangeForm from '../../components/ChangeForm';

interface Person {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

const TablePage = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: '',
    email: '',
    birthday_date: '',
    phone_number: '',
    address: '',
  });

  const data = useAppSelector(dataSelector);
  const loading = useAppSelector(loadingSelector);

  const handleModal = () => {
    setIsOpen(prev => !prev);
  };

  const handleChangeModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const onGetPersonData = (data: Person) => {
    setModalData(data);
  };

  useEffect(() => {
    dispatch(
      setTableData('https://technical-task-api.icapgroupgmbh.com/api/table/')
    );
  }, [dispatch]);

  return (
    <div className={cls.wrapper}>
      <button className={cls.button} onClick={handleModal}>
        Add person
      </button>
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
                data={person}
                onData={onGetPersonData}
                onModal={handleChangeModal}
              />
            ))}
        </tbody>
      </table>
      <Pagination />
      {isOpen && (
        <Modal onClose={handleModal}>
          <PersonForm />
        </Modal>
      )}
      {isModalOpen && (
        <Modal onClose={handleChangeModal}>
          <ChangeForm data={modalData} />
        </Modal>
      )}
      {loading && <h1>Loading...</h1>}
    </div>
  );
};

export default TablePage;
