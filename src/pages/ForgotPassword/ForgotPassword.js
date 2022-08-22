import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../../utils/api/api.js";
import styles from "../ForgotPassword/ForgotPassword.module.css";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const token = useSelector((store) => store.userReducer.accessToken);
  const location = {
    pathname: "/reset-password",
    state: { fromForgotPassword: true },
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onClick = () => {
    forgotPassword(value);
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={"text text_type_main-medium mb-6"}>
        Восстановление пароля
      </h2>
      <div className="mb-6 inputWrapper">
        <EmailInput value={value} onChange={handleChange} />
      </div>
      <div className="mb-6">
        <Link to={location}>
          <Button onClick={onClick}>Восстановить</Button>
        </Link>
      </div>
      <p className={`${styles.disc} text text_type_main-small`}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          &nbsp;Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
