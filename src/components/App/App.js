import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import styles from "../../index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredientsItems } from "../../services/actions/actions.js";
import SignUp from "../../pages/SignUp/SignUp.js";
import SignIn from "../../pages/SignIn/SignIn.js";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword.js";
import ResetPassword from "../../pages/ResetPassword/ResetPassword.js";
import Profile from "../../pages/Profile/Profile.js";
import { authUser } from "../../services/actions/authActions.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import Modal from "../Modal/Modal.js";
import { SET_INGREDIENTS_MODAL_INACTIVE } from "../../services/actions/actions";
import Feed from "../../pages/Feed/Feed.js";
import Orders from "../../pages/Profile/Orders.js";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );
  const modalActive = useSelector(
    (store) => store.burgerIngredientsReducer.isIngredientsModalOpen
  );
  const currentIngredient = useSelector(
    (store) => store.ingredientsItemReducer.currentIngredient
  );
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(authUser());
  }, []);

  //отправляю санки(экшн-функцию)
  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
  }, [dispatch]);

  const closeModalWithDispatch = () => {
    dispatch({ type: SET_INGREDIENTS_MODAL_INACTIVE });
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          <div className={styles.mainContainer}>
            <Switch location={location || background}>
              <Route path="/register" exact>
                <SignUp />
              </Route>
              <Route path="/login" exact>
                <SignIn />
              </Route>
              <Route path="/forgot-password" exact>
                <ForgotPassword />
              </Route>
              <Route path="/reset-password" exact>
                <ResetPassword />
              </Route>
              <ProtectedRoute path="/profile" exact={true}>
                <Profile />
              </ProtectedRoute>
              <Route path="/ingredients/:id" exact={true}>
                <IngredientDetails />
              </Route>
              <Route path="/feed">
                <Feed />
              </Route>
              <Route path="/profile/orders" exact>
                <Orders />
              </Route>
              <Route>
                <BurgerIngredients />
                <BurgerConstructor />
              </Route>
            </Switch>
            {background && (
              <Route path="/ingredients/:id">
                <Modal
                  title="Детали ингредиента"
                  open={modalActive}
                  handleClose={closeModalWithDispatch}
                >
                  <IngredientDetails currIngr={currentIngredient} />
                </Modal>
              </Route>
            )}
          </div>
        </main>
      </DndProvider>
    </>
  );
};

export default App;
