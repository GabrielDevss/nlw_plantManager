import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isFilled, setIsFilled ] = useState(false);
  const [ name, setName ] = useState<string>();
  const navigation = useNavigation();


  function handleInputblur() {
    setIsFocused(false);
    setIsFilled(!!name);

  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
      setIsFilled(!!value);
      setName(value);
  }

  async  function handleSubmit() {
    if(!name)
      return Alert.alert('Me diz como chamar você 😢');
    try{
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation',{
        title: 'Prontinho',
        subtitle: ' Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
    });
    }catch{
      Alert.alert('Não foi possível salvar seu nome. 😢');
    }
    
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.emoji}>
            { isFilled ? '😘' : '😄' }
            </Text>
          <Text style={styles.Title}>
            Como podemos
            chamar você?
            </Text>
          <TextInput 
          style={[
            styles.textInput,
            (isFocused || isFilled) && 
            {borderColor: colors.green}
          ]}
          placeholder="Digite seu nome"
          onBlur={handleInputblur}
          onFocus={handleInputFocus}  
          onChangeText={handleInputChange}
          />
          <View 
          style={styles.footer}>
          <Button
          title={'Confirmar'}
          onPress={handleSubmit} 
          />
          </View>
        </View>
        
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  Title: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    textAlign: 'center',
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
    fontFamily: fonts.text
  },
  footer: {
    width: '100%',
    marginTop: 40,

  }
})