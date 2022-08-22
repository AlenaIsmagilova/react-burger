import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  // const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.itemsList}>
          <NavLink
            exact
            to="/"
            style={(isActive) => ({
              color: isActive ? "#f2f2f3" : "#8585ad",
            })}
            // to="/"
            // className={pathname === "/" ? styles.activeLink : styles.link}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <BurgerIcon type="primary" />
              </div>
              Конструктор
            </li>
          </NavLink>
          <NavLink
            exact
            to="/feed"
            style={(isActive) => ({
              color: isActive ? "#f2f2f3" : "#8585ad",
            })}
            // to="/feed"
            // style={(isActive) => {
            //   console.log(isActive);
            //   return {
            //     color: isActive ? "#f2f2f3" : "#8585ad",
            //   };
            // }}
            // className={styles.link}
            // activeClassName={styles.activeLink}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <ListIcon type="secondary" />
              </div>
              Лента заказов
            </li>
          </NavLink>

          <li className={styles.logo}>
            <Logo></Logo>
          </li>
          <NavLink
            exact
            to="/profile"
            style={(isActive) => ({
              color: isActive ? "#f2f2f3" : "#8585ad",
            })}
            // className={styles.link}
            // className={isActive ? styles.activeLink : ""}
          >
            <li
              className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
            >
              <div className="mr-2">
                <ProfileIcon type="secondary" />
              </div>
              Личный кабинет
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
