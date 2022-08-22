import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { resetPassword } from "../../utils/api/api";
import styles from "../ResetPassword/ResetPassword.module.css";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [form, setValue] = useState({ password: "", token: "" });
  const token = useSelector((store) => store.userReducer.accessToken);
  const history = useHistory();

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    resetPassword(form);
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      {history.action === "POP" ? (
        <Redirect to={{ pathname: "/forgot-password" }} />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <h2 className={"text text_type_main-medium mb-6"}>
              Восстановление пароля
            </h2>
            <div className="mb-6 inputWrapper">
              <Input
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder={"Введите новый пароль"}
                icon={"ShowIcon"}
              />
            </div>
            <div className="mb-6 inputWrapper">
              <Input
                value={form.token}
                onChange={handleChange}
                name="token"
                placeholder={"Введите код из письма"}
              />
            </div>
            <div className="mb-20">
              <Button onClick={onClick}>Сохранить</Button>
            </div>
            <p className={`${styles.disc} text text_type_main-small`}>
              Вспомнили пароль?
              <Link to="/login" className={styles.link}>
                &nbsp;Войти
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
