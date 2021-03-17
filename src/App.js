import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout.js'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Credential/Login'),
  loading
});
const Module = Loadable({
  loader: () => import('./views/Module'),
  loading
});


const Page404 = Loadable({
  loader: () => import('./views/Credential/Page404.js'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Credential/Page500.js'),
  loading
});




const App = ()=>{

  
  
    return (
      <HashRouter>
          <Switch>
            <Route  exact path="/Login" name="Login Page" component={Login} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route exact path="/module" name="Module Page" component={Module} /> 
            <Route path="/" name="Home" component={DefaultLayout} /> 
          </Switch>
      </HashRouter>
    );
  
}

export default App;
