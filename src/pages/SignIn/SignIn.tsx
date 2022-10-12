import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { ILocation, useSelector } from "../../utils/types";
import { useDispatch } from "../../utils/types";
import { signIn } from "../../services/actions/authActions";
import styles from "../SignIn/SignIn.module.css";

const SignIn: FC = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogedIn = useSelector((store) => store.userReducer.isLogedIn);

  const location = useLocation<ILocation>();

  useEffect(() => {
    if (isLogedIn) {
      history.replace({ pathname: "/" });
    }
  }, [isLogedIn, history]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signIn(values));
  };

  if (isLogedIn) {
    return <Redirect to={{ pathname: location?.state?.from || "/" }} />;
  }

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit}>
      <h2 className={"text text_type_main-medium mb-6"}>Вход</h2>
      <div className={`mb-6 inputWrapper`}>
        <EmailInput
          onChange={handleChange}
          value={values.email!}
          name="email"
        />
      </div>
      <div className={`mb-6 inputWrapper`}>
        <Input
          onChange={handleChange}
          value={values.password!}
          name="password"
          placeholder={"Пароль"}
          icon={"HideIcon"}
        />
      </div>

      <div className="mb-20">
        <Button htmlType="button">Войти</Button>
      </div>
      <p className={`${styles.disc} text text_type_main-small mb-4`}>
        Вы — новый пользователь?
        <Link to="/register" className={styles.link}>
          &nbsp;Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.disc} text text_type_main-small`}>
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          &nbsp;Восстановить пароль
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
