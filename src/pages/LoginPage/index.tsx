import Form from '../../components/Form';
import cls from './styles.module.css';

const LoginPage = () => {
  return (
    <div className={cls.wrapper}>
      <h3 className={cls.title}>Login to your account</h3>
      <div className={cls.formWrapper}>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
