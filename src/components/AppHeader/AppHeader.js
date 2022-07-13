import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.itemsList}>
          <li
            className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
          >
            <div className="mr-2">
              <BurgerIcon type="primary" />
            </div>
            Конструктор
          </li>
          <li
            className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
          >
            <div className="mr-2">
              <ListIcon type="secondary" />
            </div>
            Лента заказов
          </li>
          <li className={styles.logo}>
            <Logo></Logo>
          </li>
          <li
            className={`pl-5 pt-4 pr-2 pb-4 ${styles.item} text text_type_main-small`}
          >
            <div className="mr-2">
              <ProfileIcon type="secondary" />
            </div>
            Личный кабинет
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
