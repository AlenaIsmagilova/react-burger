import { Link, Redirect } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../SignUp/SignUp.module.css";
import { signUp } from "../../services/actions/authActions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [form, setValue] = useState({ email: "", password: "", name: "" });
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userReducer.accessToken);

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    dispatch(signUp(form));
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={"text text_type_main-medium mb-6"}>Регистрация</h2>
        <div className="mb-6">
          <Input
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder={"Имя"}
            icon={"EditIcon"}
          />
        </div>
        <div className="mb-6">
          <EmailInput name="email" onChange={handleChange} value={form.email} />
        </div>
        <div className="mb-6">
          <Input
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder={"Пароль"}
            icon={"HideIcon"}
          />
        </div>
        <div className="mb-20">
          <Button onClick={onClick}>Зарегистрироваться</Button>
        </div>
        <p className={`${styles.disc} text text_type_main-small`}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            &nbsp;Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
