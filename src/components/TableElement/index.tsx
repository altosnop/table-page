import cls from './styles.module.css';

interface Person {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface TableElementProps {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
  data: Person;
  onData: (data: Person) => void;
  onModal: () => void;
}

const TableElement = ({
  name,
  email,
  birthday_date,
  phone_number,
  address,
  data,
  onData,
  onModal,
}: TableElementProps) => {
  return (
    <>
      <tr className={cls.tr}>
        <th scope='row' className={cls.th}>
          {name}
        </th>
        <td className={cls.td}>{email}</td>
        <td className={cls.td}>{birthday_date}</td>
        <td className={cls.td}>{phone_number}</td>
        <td className={cls.td}>{address}</td>
        <td className={cls.tdRight}>
          <button
            className={cls.editBtn}
            onClick={() => {
              onModal();
              onData(data);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableElement;
