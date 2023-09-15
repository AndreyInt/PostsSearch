import React from 'react';
import cls from './App.module.scss';
import {AppRoutes} from "src/app/routes/AppRoutes";

function App() {
  return (
    <div className={cls.app}>
        <AppRoutes/>
    </div>
  );
}

export default App;
