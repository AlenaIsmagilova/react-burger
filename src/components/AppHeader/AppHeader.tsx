import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AppHeader.module.css";
import { FC } from "react";

const AppHeader: FC = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.itemsList}>
          <NavLink
            exact
            to="/"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <BurgerIcon
                  type={location.pathname === "/" ? "primary" : "secondary"}
                />
              </div>
              Конструктор
            </li>
          </NavLink>
          <NavLink
            exact
            to="/feed"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <ListIcon
                  type={location.pathname === "/feed" ? "primary" : "secondary"}
                />
              </div>
              Лента заказов
            </li>
          </NavLink>
          <li className={styles.logo}>
            <NavLink to="/" exact>
              <Logo></Logo>
            </NavLink>
          </li>
          <NavLink
            to="/profile"
            exact
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <ProfileIcon
                  type={
                    location.pathname === "/profile" ||
                    location.pathname === "/profile/orders"
                      ? "primary"
                      : "secondary"
                  }
                />
              </div>
              Личный кабинет
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
