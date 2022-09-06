import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { logOut, updateUser } from "../../services/actions/authActions";
import styles from "../Profile/Profile.module.css";
import { useForm } from "../../hooks/useForm";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const refreshToken = useSelector((store) => store.userReducer.refreshToken);
  const isLogedIn = useSelector((store) => store.userReducer.isLogedIn);
  const name = useSelector((store) => store.userReducer.currentUser.name);
  const email = useSelector((store) => store.userReducer.currentUser.email);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLogedIn) {
      setValues({ ...values, name, email });
    }
  }, [isLogedIn, history, email, name, values, setValues]);

  useEffect(() => {
    if (!isLogedIn) {
      history.replace({ pathname: "/login" });
    }
  }, [isLogedIn, history]);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logOut(refreshToken));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setValues({ ...values, name, email });
  };

  return (
    <>
      <div className={styles.mainContainer} onSubmit={handleSubmit}>
        <div className={`${styles.navLinkContainer} mr-15`}>
          <NavLink
            exact
            to="/profile"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            Профиль
          </NavLink>

          <NavLink
            exact
            to="/profile/orders"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            История заказов
          </NavLink>
          <NavLink
            exact
            to="/profile/exit"
            className={`${styles.navProfile} text text_type_main-small mb-20`}
            activeClassName={styles.activeNavProfile}
            onClick={onClick}
          >
            Выход
          </NavLink>
          <p className={`${styles.navProfile} text text_type_main-small`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.formContainer}>
          <div className="inputWrapper mb-6">
            <Input
              type={"text"}
              value={values.name}
              name="name"
              onChange={handleChange}
              placeholder={"Имя"}
              icon={"EditIcon"}
            />
          </div>
          <div className="mb-6 inputWrapper">
            <EmailInput
              value={values.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 inputWrapper">
            <Input
              type={"password"}
              value={values.password}
              name="password"
              onChange={handleChange}
              placeholder={"Пароль"}
              icon={"EditIcon"}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button type="secondary" size="small" onClick={handleResetForm}>
              Отмена
            </Button>
            <Button type="primary" size="small" onClick={handleSubmit}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
