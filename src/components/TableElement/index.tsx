import cls from './styles.module.css';

interface TableElementProps {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

const TableElement = ({
  name,
  email,
  birthday_date,
  phone_number,
  address,
}: TableElementProps) => {
  return (
    <tr className={cls.tr}>
      <th scope='row' className={cls.th}>
        {name}
      </th>
      <td className={cls.td}>{email}</td>
      <td className={cls.td}>{birthday_date}</td>
      <td className={cls.td}>{phone_number}</td>
      <td className={cls.td}>{address}</td>
      <td className={cls.tdRight}>
        <a href='/' className={cls.editBtn}>
          Edit
        </a>
      </td>
    </tr>
  );
};

export default TableElement;
