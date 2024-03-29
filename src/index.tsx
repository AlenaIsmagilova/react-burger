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
import { rootReducer } from "../src/services/reducers/index";
import { Provider } from "react-redux";
import socketMiddleware from "./services/middleware/socketMiddleware";
import { wsActions } from "./services/actions/wsActions";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
