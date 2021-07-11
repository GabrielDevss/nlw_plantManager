import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification')
  }
  useEffect(() => {
    async function loadData(){
            const data = await AsyncStorage.getItem('@plantmanager:plants');
           console.log(data);
    }
    
    loadData()
    },[])

  return (

    
    <View style={styles.container}>
        <Text style={styles.title}>
          Gerencie {'\n'}
        suas plantas de forma fácil
        </Text>
        <Image
          source={wateringImg}
          style={styles.Image}
          resizeMode="contain"
        />
        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>
        <TouchableOpacity style={styles.button}>

          <Feather
            name="chevron-right"
            style={styles.buttonIcon}
            onPress={handleStart}
          />

        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },

  title: {
    margin: 50,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  Image: {
    height: Dimensions.get('window').width * 0.7,
  },

  subTitle: {
    textAlign: 'center',
    color: colors.heading,
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
    marginTop: 30
  },

  button: {
    margin: 20,
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonIcon: {
    fontSize: 24,
    color: colors.white,
  }
})