import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../services/actions/authActions.js";
import { setCookie } from "../../utils/helpers/index.js";
import styles from "../SignIn/SignIn.module.css";

const SignIn = () => {
  const [form, setValue] = useState({ email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userReducer.accessToken);

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    dispatch(signIn(form))
      .then((data) => {
        setCookie("accessToken", data.payload.accessToken);
        setCookie("refreshToken", data.payload.refreshToken);
        history.replace({ pathname: "/" });
      })
      .catch((err) => console.error("my error ", err));
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={"text text_type_main-medium mb-6"}>Вход</h2>
      <div className={`mb-6 inputWrapper`}>
        <EmailInput onChange={handleChange} value={form.email} name="email" />
      </div>
      <div className={`mb-6 inputWrapper`}>
        <Input
          onChange={handleChange}
          value={form.password}
          name="password"
          placeholder={"Пароль"}
          icon={"HideIcon"}
        />
      </div>

      <div className="mb-20">
        <Button onClick={onClick}>Войти</Button>
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
    </div>
  );
};

export default SignIn;
