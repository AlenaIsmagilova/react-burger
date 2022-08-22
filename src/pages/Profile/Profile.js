import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { logOut, updateUser } from "../../services/actions/authActions";
import { deleteCookie } from "../../utils/helpers";
import styles from "../Profile/Profile.module.css";

const Profile = () => {
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const refreshToken = useSelector((store) => store.userReducer.refreshToken);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logOut(refreshToken)).then(() => {
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      history.replace({ pathname: "/login" });
    });
  };

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSaveClick = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.navLinkContainer} mr-15`}>
          <NavLink
            to="/profile"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            Профиль
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            История заказов
          </NavLink>
          <NavLink
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
        <div className={styles.formContainer}>
          <div className="inputWrapper mb-6">
            <Input
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder={"Имя"}
              icon={"EditIcon"}
            />
          </div>
          <div className="mb-6 inputWrapper">
            <EmailInput
              value={form.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 inputWrapper">
            <Input
              value={form.password}
              name="password"
              onChange={handleChange}
              placeholder={"Пароль"}
              icon={"EditIcon"}
            />
          </div>

          <div className={styles.buttonsContainer}>
            <Button type="secondary" size="small">
              Отмена
            </Button>
            <Button type="primary" size="small" onClick={onSaveClick}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
