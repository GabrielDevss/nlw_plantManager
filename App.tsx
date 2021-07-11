import React from 'react';
import AppLoanding from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';


import Routes from './src/routes';

export default function App() {
  const [ fontLoanded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  }); 

    if(!fontLoanded) 
    return  <AppLoanding />

  return (
    <Routes />
  )

};