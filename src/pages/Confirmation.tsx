import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis ={
  hug: '🤗',
  smile: '😍'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen)

  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
          </Text>

        <Text style={styles.title}>
          {title}
            </Text>

        <Text style={styles.subtitle}>
          {subtitle}
            </Text>
        <View style={styles.footer}>
          <Button 
          title={buttonTitle} 
          onPress={handleMoveOn}
          />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%'
  },
  emoji: {
    fontSize: 85,
    
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 30,
    
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 30
  }
})