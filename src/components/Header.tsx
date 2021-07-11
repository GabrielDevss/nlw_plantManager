import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
} from 'react-native';

import colors from '../styles/colors';
import profileImg from '../assets/gabriel.png';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header() {
   const [ userName, setUserName ] = useState<string>();

   useEffect(() => {
    async function loadStorageUserName() {
         const user = await AsyncStorage.getItem('@plantmanager:user');
         setUserName(user || '');
    } 
    loadStorageUserName();
   }, [])

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.title}>
               Olá,
      </Text>
            <Text style={styles.userName}>
               {userName}
         </Text>
         </View>
         <Image
            source={profileImg}
            style={styles.image}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%', 
      paddingHorizontal: 20,
      marginTop: 50
   },
   image: {
      height: 60,
      width: 60,
      borderRadius: 30,
   },
   title: {
      fontFamily: fonts.text,
      fontSize: 32,
      color: colors.heading,
   },
   userName: {
      fontFamily: fonts.heading,
      fontSize: 32,
      color: colors.heading,
      lineHeight: 40
   }

})
