import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cls from './styles.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logIn } from '../../store/user/userSlice';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  isAuthenticatedSelector,
  loadingSelector,
  statusSelector,
} from '../../store/user/userSelectors';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import LoadingButton from '../LoadingButton';

interface FormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is a required field')
    .min(1)
    .max(150),
  password: yup
    .string()
    .required('Password is a required field')
    .min(1)
    .max(128),
});

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(statusSelector);
  const loading = useAppSelector(loadingSelector);
  const isAuth = useAppSelector(isAuthenticatedSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onFormSubmit = (data: FormInput) => {
    dispatch(logIn(data));
  };

  useEffect(() => {
    if (isAuth && status === 200) {
      navigate('/');
    }
  }, [isAuth, navigate, status]);

  return (
    <form className='w-full' onSubmit={handleSubmit(onFormSubmit)}>
      <div className={cls.inputWrapper}>
        <label
          className={errors.username ? cls.labelError : cls.label}
          htmlFor='username'
        >
          Username
        </label>
        <input
          id='username'
          type='text'
          className={errors.username ? cls.inputError : cls.input}
          {...register('username')}
        />
        {errors.username && (
          <p className={cls.errorMsg}>{errors.username.message}</p>
        )}
      </div>
      <div className={cls.inputWrapper}>
        <label
          className={errors.password ? cls.labelError : cls.label}
          htmlFor='password'
        >
          Password
        </label>
        <input
          id='password'
          type='password'
          className={errors.password ? cls.inputError : cls.input}
          {...register('password')}
        />
        {errors.password && (
          <p className={cls.errorMsg}>{errors.password.message}</p>
        )}
      </div>

      {loading ? <LoadingButton /> : <Button type='submit' text='Login' />}
    </form>
  );
};

export default Form;
