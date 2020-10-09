import React, { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
import * as auth from "../utils/utils";

function Header() {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  const [email, setEmail] = useState("");

  const getEmail = () => {
    let jwt = localStorage.getItem("jwt");
    return auth.getContent(jwt).then((res) => {
      setEmail(res.data.email);
    });
  };

  React.useEffect(() => {
    getEmail();
  }, []);

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__title">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__title">
            Регистрация
          </Link>
        </Route>
        <Route path="/profile">
          <div>
            <span className="header__title-email">{email}</span>
            <button className="header__button" onClick={signOut}>
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
