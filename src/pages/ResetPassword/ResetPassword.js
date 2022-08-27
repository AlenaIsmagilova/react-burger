import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { resetPassword } from "../../utils/api/api";
import styles from "../ResetPassword/ResetPassword.module.css";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const token = useSelector((store) => store.userReducer.accessToken);
  const history = useHistory();
  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(values);
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
          <form className={styles.mainContainer} onSubmit={handleSubmit}>
            <h2 className={"text text_type_main-medium mb-6"}>
              Восстановление пароля
            </h2>
            <div className="mb-6 inputWrapper">
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                placeholder={"Введите новый пароль"}
                icon={"ShowIcon"}
              />
            </div>
            <div className="mb-6 inputWrapper">
              <Input
                value={values.token}
                onChange={handleChange}
                name="token"
                placeholder={"Введите код из письма"}
              />
            </div>
            <div className="mb-20">
              <Button>Сохранить</Button>
            </div>
            <p className={`${styles.disc} text text_type_main-small`}>
              Вспомнили пароль?
              <Link to="/login" className={styles.link}>
                &nbsp;Войти
              </Link>
            </p>
          </form>
        </>
      )}
    </>
  );
};

export default ResetPassword;
