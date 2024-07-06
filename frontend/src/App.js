import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Send from "./component/Send";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import AddMoney from "./component/AddMoney";
import SearchUser from "./component/SearchUser";
import FirstLogin from "./component/FirstLogin";
import Sendmoney from "./component/Sendmoney";
import Transections from "./component/Transections";
import { reducer, initialState } from "./reducers/userReducers";

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  useEffect(
    () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: "USER", payload: user });
        if (user.FirstLogin) {
          history("/firstlogin");
        }
      } else {
        if (!location.pathname.startsWith("/register")) {
          history("/login");
        }
      }
    },
    [
      dispatch,
      history,
      location.pathname,
    ] /* if any issue arrived undo text dispatch, history, location.pathname*/
  );
  return (
    <Routes>
      {<Route path="/" element={<Home />} />}
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/AddMoney" element={<AddMoney />} />
      <Route path="/SearchUser" element={<SearchUser />} />
      <Route
        path="/FirstLogin"
        element={state && !state.firstLogin ? <Send /> : <FirstLogin />}
      />
      <Route path="/user/:userphoneNum/transfer" element={<Sendmoney />} />
      <Route path="/Transections" element={<Transections />} />
      {/* {state && state.firstLogin ? (
        <Route path="/FirstLogin" element={<FirstLogin />} />
      ) : (
        ""
      )} */}
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
