import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData} from "./redux/actions/userActions";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

//Components
import Navbar from "./components/layout/Navbar";
//Util
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
import Axios from "axios";

const theme = createMuiTheme(themeObject);
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch(getUserData());
    Axios.defaults.headers.common['Authorization'] = token;
  }
}
class App extends Component {
  componentDidMount() {
    store.dispatch(getUserData());
    Axios.defaults.headers.common['Authorization'] = token;
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                />
                <Route exact path="/users/:handle" component={user} />
                <Route exact path="/users/:handle/scream/:screamId" component={user} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
