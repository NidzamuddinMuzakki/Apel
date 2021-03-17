import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.scss';
import './style/global.css'
import './style/FloatLoading.css'
import './style/tailwind.css'
import './style/bootstrap.css'
import './style/Capthca.css'
import './style/PopCap.css'
import './style/Module.css'
import './style/CustomCheckbox.css'
import './style/CustomCalender.css'
import './style/Header.css'

import './style/Corousel.css'
import './i18n';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {LoginAttempt} from './Redux/Login/maxLoginAttempt'
import {SelectedRow, Paging, SelectedRowPage} from './Redux/Table/Store'
import { ChangeFilterRedux} from './Redux/Filter/Store'
import {LoveMenu,ColorTheme,Param,RoleSelected,ModuleSelected,BranchSelected,PeriodSelected,DateSelected,BranchData,MenuData,DateData,UserData, RoleData,PeriodData,UserSetting  } from "./Redux/Profile/Store";
const rootReducer =createStore(combineReducers({
  ChangeFilterRedux,SelectedRowPage,Paging,SelectedRow,LoveMenu,ColorTheme,Param,LoginAttempt,RoleSelected,ModuleSelected,BranchSelected,PeriodSelected,DateSelected,BranchData,MenuData,DateData,UserData, RoleData,PeriodData,UserSetting
  
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  
  <Provider store={rootReducer}><App /></Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
