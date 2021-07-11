import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDatePicker, setSelectedDatePicker] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const route = useRoute();
  const { plant } = route.params as Params
  const navigation = useNavigation();


  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDatePicker(new Date());
      return Alert.alert('Escolha uma data no futuro! 🕰️');
    }

    if (dateTime)
      setSelectedDatePicker(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
      setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDatePicker
      });

      navigation.navigate('Confirmation',{
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlant',
    });
    }catch {
      Alert.alert('Não foi possível cadastrar seu planta. 😢');
    }
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          width={150}
          height={150}
        />
        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}

        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            source={waterdrop}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Ecolha o melhor horário para ser lembrado:
        </Text>

        { showDatePicker &&
          <DataTimePicker
          value={selectedDatePicker}
          mode="time"
          display="spinner"
          onChange={handleChangeTime}
        />
        }
        {
          Platform.OS === "android" && (
            <TouchableOpacity 
              style={styles.dataTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
            <Text style={styles.dataTimePickerText}>
             { `Mudar ${format(selectedDatePicker, 'HH:mm')}`}
            </Text>
            </TouchableOpacity>
          )
          
        }

        <Button 
        title="Cadastrar planta"
        onPress={handleSave}
        />
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    marginBottom: 20
  },

  plantName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 15,
    fontSize: 24
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 70
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },

  dataTimePickerButton: {
      width: '100%',
      height: 40,
      paddingVertical: 40,
      alignItems: 'center',
      marginBottom: 10
  },

  dataTimePickerText: {
      color: colors.heading,
      fontSize: 20,
      fontFamily: fonts.text
  }
})