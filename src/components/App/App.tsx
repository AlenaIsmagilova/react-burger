import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "../../index.module.css";
import { useDispatch } from "../../utils/types";
import { useSelector } from "../../utils/types";
import { getBurgerIngredientsItems } from "../../services/actions/actions";
import SignUp from "../../pages/SignUp/SignUp";
import SignIn from "../../pages/SignIn/SignIn";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import { authUser } from "../../services/actions/authActions";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {
  SET_INGREDIENTS_MODAL_INACTIVE,
  SET_ORDER_MODAL_INACTIVE,
  RESET_CONSTRUCTOR_AFTER_ORDER,
} from "../../services/actions/actions";
import Feed from "../../pages/Feed/Feed";
import FeedDetails from "../FeedDetails/FeedDetails";
import Orders from "../../pages/Profile/Orders";
import OrderDetails from "../OrderDetails/OrderDetails";
import Spinner from "../Spinner/Spinner";
import { ILocation, IHistoryLocation } from "../../utils/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<IHistoryLocation>();

  const orderModalActive = useSelector(
    (store) => store.burgerIngredientsReducer.isOrderModalOpen
  );

  const order = useSelector((store) => store.orderDetailsReducer.orderNumber);

  const currentIngredient = useSelector(
    (store) => store.ingredientsItemReducer.currentIngredient
  );
  const location = useLocation<ILocation>();
  let background = location.state?.background;

  const { isLoading: userLoader } = useSelector((store) => store.userReducer);

  useEffect(() => {
    dispatch(authUser());
    dispatch(getBurgerIngredientsItems());
  }, [dispatch]);

  //отправляю санки(экшн-функцию)
  // useEffect(() => {
  //   dispatch(getBurgerIngredientsItems());
  // }, [dispatch]);

  const closeModalWithDispatch = () => {
    dispatch({ type: SET_INGREDIENTS_MODAL_INACTIVE });
    history.goBack();
  };

  const handleClose = () => {
    dispatch({ type: SET_ORDER_MODAL_INACTIVE });
    dispatch({ type: RESET_CONSTRUCTOR_AFTER_ORDER });
  };

  return (
    <>
      {userLoader ? (
        <Spinner />
      ) : (
        <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main>
              <div className={styles.mainContainer}>
                <Switch location={background || location}>
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
                  <ProtectedRoute path="/profile" exact>
                    <Profile />
                  </ProtectedRoute>
                  <ProtectedRoute path="/profile/orders/:id">
                    <FeedDetails />
                  </ProtectedRoute>
                  <Route path="/ingredients/:id" exact>
                    <IngredientDetails />
                  </Route>
                  <Route path="/feed" exact>
                    <Feed />
                  </Route>
                  <Route path="/feed/:id">
                    <FeedDetails />
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
                      handleClose={closeModalWithDispatch}
                    >
                      <IngredientDetails currIngr={currentIngredient} />
                    </Modal>
                  </Route>
                )}
                {background && (
                  <Route path="/feed/:id">
                    <Modal handleClose={closeModalWithDispatch}>
                      <FeedDetails />
                    </Modal>
                  </Route>
                )}
                {background && (
                  <Route path="/profile/orders/:id">
                    <Modal handleClose={closeModalWithDispatch}>
                      <FeedDetails />
                    </Modal>
                  </Route>
                )}
                {orderModalActive && (
                  <Modal open={orderModalActive} handleClose={handleClose}>
                    <OrderDetails orderNumber={order} />
                  </Modal>
                )}
              </div>
            </main>
          </DndProvider>
        </>
      )}
    </>
  );
};

export default App;
