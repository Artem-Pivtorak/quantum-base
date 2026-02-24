import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form, Field } from 'formik';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    console.log('➡️ Login payload:', values);
    const resultAction = await dispatch(logIn(values));
    console.log('⬅️ Login resultAction:', resultAction);

    if (logIn.fulfilled.match(resultAction)) {
      // Успішний логін
      resetForm();
      navigate('/contacts');
    } else {
      // Логін провалився — виведемо помилку
      const message =
        resultAction.payload?.message ||
        resultAction.error?.message ||
        'Something went wrong';
      alert(`Login failed: ${message}`);
    }
  };

  return (
    <div className={css.container}>
      <h2>Login</h2>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label>
            Email:
            <Field type="email" name="email" required />
          </label>
          <label>
            Password:
            <Field type="password" name="password" required />
          </label>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
