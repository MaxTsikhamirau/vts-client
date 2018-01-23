import React from 'react';

import MainLayout from './layout/MainLayout';
import Routes from './Routes';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

import './App.css';

const app = () => (
  <MainLayout>
    <Routes />
  </MainLayout>
);

export default app;
