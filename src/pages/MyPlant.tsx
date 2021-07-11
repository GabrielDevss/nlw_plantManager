import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert
 } from 'react-native';

import { PlantCardSeconds } from '../components/PlantCardSeconds';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { Header } from '../components/Header';
import { formatDistance } from 'date-fns';
import { Load } from '../components/Load';
import { pt } from 'date-fns/locale';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';



 export function MyPlant() {
  const [myPlants, setMyPlants ] = useState<PlantProps[]>([]);
  const [loanding, setLoanding ] = useState(true);
  const [nextWatered, setNextWatered ] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try{
              await removePlant(plant.id);
              setMyPlants((oldData) => 
                  oldData.filter((item) => item.id !== plant.id)
              );

          }catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStorage = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} á ${nextTime} horas.`
      )
      setMyPlants(plantsStorage);
      setLoanding(false);
    }
    loadStorageDate();
  }, [])

   if (loanding)
   return <Load />


   return(
      <View style={styles.container}>
       <Header />

        <View style={styles.sportlight}>
          <Image
            source={waterdrop}
            style={styles.sportlightImage}
          />
          <Text style={styles.sportlightText}>
          {nextWatered}
          </Text>
        </View>

        <View style={styles.plants}>
              <Text style={styles.plantsTitle}>
                Próximas regadas
              </Text>

              <FlatList
              data={myPlants}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item }) => (
                <PlantCardSeconds
                 data={item} 
                  handleRemove={() => {handleRemove(item)}}
                 />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flex: 1}}
              />
            </View>
      </View>
    )
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
    
  },
  sportlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  sportlightImage: {
      width: 60,
      height: 60
  },
  sportlightText:  {
      flex: 1,
      color: colors.blue,
      paddingHorizontal: 20,
      textAlign: 'justify',
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
 })
