import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import Button from '../Button';
import LoadingButton from '../LoadingButton';
import { loadingSelector } from '../../store/person/personSelector';
import cls from './styles.module.css';
import { putPerson } from '../../store/person/personSlice';

interface FormInput {
  id?: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface FormProps {
  data?: FormInput;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field').min(1).max(255),
  email: yup
    .string()
    .email()
    .required('Email is a required field')
    .min(1)
    .max(254),
  birthday_date: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  phone_number: yup
    .string()
    .required('Phone is a required field')
    .min(1)
    .max(20),
  address: yup.string().required('Address is a required field').min(1),
});

const ChangeForm = ({ data }: FormProps) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(loadingSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      birthday_date: data?.birthday_date,
      phone_number: data?.phone_number,
      address: data?.address,
    },
  });

  const onFormSubmit = (inputsData: FormInput) => {
    dispatch(
      putPerson({
        id: data?.id,
        ...inputsData,
      })
    );
    window.location.reload();
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onFormSubmit)}>
      <div className={cls.inputWrapper}>
        <label
          className={errors.name ? cls.labelError : cls.label}
          htmlFor='name'
        >
          Name
        </label>
        <input
          id='name'
          type='text'
          className={errors.name ? cls.inputError : cls.input}
          {...register('name')}
        />
        {errors.name && <p className={cls.errorMsg}>{errors.name.message}</p>}
      </div>
      <div className={cls.inputWrapper}>
        <label
          className={errors.email ? cls.labelError : cls.label}
          htmlFor='email'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          className={errors.email ? cls.inputError : cls.input}
          {...register('email')}
        />
        {errors.email && <p className={cls.errorMsg}>{errors.email.message}</p>}
      </div>
      <div className={cls.inputWrapper}>
        <label
          className={errors.birthday_date ? cls.labelError : cls.label}
          htmlFor='birthday_date'
        >
          Birthday date
        </label>
        <input
          id='birthday_date'
          type='birthday_date'
          className={errors.birthday_date ? cls.inputError : cls.input}
          {...register('birthday_date')}
        />
        {errors.birthday_date && (
          <p className={cls.errorMsg}>{errors.birthday_date.message}</p>
        )}
      </div>
      <div className={cls.inputWrapper}>
        <label
          className={errors.phone_number ? cls.labelError : cls.label}
          htmlFor='phone_number'
        >
          Phone number
        </label>
        <input
          id='phone_number'
          type='phone_number'
          className={errors.phone_number ? cls.inputError : cls.input}
          {...register('phone_number')}
        />
        {errors.phone_number && (
          <p className={cls.errorMsg}>{errors.phone_number.message}</p>
        )}
      </div>
      <div className={cls.inputWrapper}>
        <label
          className={errors.address ? cls.labelError : cls.label}
          htmlFor='address'
        >
          Address
        </label>
        <input
          id='address'
          type='address'
          className={errors.address ? cls.inputError : cls.input}
          {...register('address')}
        />
        {errors.address && (
          <p className={cls.errorMsg}>{errors.address.message}</p>
        )}
      </div>

      {loading ? <LoadingButton /> : <Button type='submit' text='Change' />}
    </form>
  );
};

export default ChangeForm;
