import { Link, Redirect } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../SignUp/SignUp.module.css";
import { signUp } from "../../services/actions/authActions";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "../../utils/types";
import { useDispatch } from "../../utils/types";
import { FC } from "react";

const SignUp: FC = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userReducer.accessToken);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signUp(values));
  };

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <h2 className={"text text_type_main-medium mb-6"}>Регистрация</h2>
        <div className="mb-6">
          <Input
            name="name"
            onChange={handleChange}
            value={values.name!}
            placeholder={"Имя"}
            icon={"EditIcon"}
          />
        </div>
        <div className="mb-6">
          <EmailInput
            name="email"
            onChange={handleChange}
            value={values.email!}
          />
        </div>
        <div className="mb-6">
          <Input
            name="password"
            onChange={handleChange}
            value={values.password!}
            placeholder={"Пароль"}
            icon={"HideIcon"}
          />
        </div>
        <div className="mb-20">
          <Button htmlType="submit">Зарегистрироваться</Button>
        </div>
        <p className={`${styles.disc} text text_type_main-small`}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
