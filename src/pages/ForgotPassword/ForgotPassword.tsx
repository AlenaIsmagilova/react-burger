import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { forgotPassword } from "../../utils/api/api";
import styles from "../ForgotPassword/ForgotPassword.module.css";
import { IResetPassword, useSelector } from "../../utils/types";
import { useForm } from "../../hooks/useForm";
import { FC } from "react";

const ForgotPassword: FC = () => {
  const token = useSelector((store) => store.userReducer.accessToken);
  const location = {
    pathname: "/reset-password",
    state: { fromForgotPassword: true },
  };

  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit = () => {
    forgotPassword(values as string);
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit}>
      <h2 className={"text text_type_main-medium mb-6"}>
        Восстановление пароля
      </h2>
      <div className="mb-6 inputWrapper">
        <EmailInput
          name="email"
          value={values.email!}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <Link to={location}>
          <Button disabled={!values.email} htmlType="button">
            Восстановить
          </Button>
        </Link>
      </div>
      <p className={`${styles.disc} text text_type_main-small`}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          &nbsp;Войти
        </Link>
      </p>
    </form>
  );
};

export default ForgotPassword;
