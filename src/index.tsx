import ReactDOM from "react-dom/client";
import "./index.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../src/services/reducers/index.js";
import { Provider } from "react-redux";
import socketMiddleware from "./services/middleware/socketMiddleware";
import { wsActions } from "./services/actions/wsActions";

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
