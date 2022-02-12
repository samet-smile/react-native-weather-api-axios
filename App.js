import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';
import SearchableDropdown from 'react-native-searchable-dropdown';




const App = () => {
  const [country, setCountry] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [selectCity, setSelectCity] = useState('');
  const getWeather = (param1) => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?lang=tr&appid=884955bc4bb53d0a0824facb3e567430&q=${param1.name}&units=metric`,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    })
      .then((response) => {
        setCurrentWeather([response.data])
      })
      .catch((e) => {
        console.log('Hata ' + e);
      })
  }

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((response) => {
        let countryObj = response.data.data.map((i) => {
          const obj = (JSON.parse(`{ "key" : "${i.city}" , "name" :  "${i.city}" }`))
          return obj;
        })
        setCountry(countryObj)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>


      <ImageBackground
        source={{uri:("https://wallpaperaccess.com/full/2507919.jpg")}}
        resizeMode={'cover'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

          <View>
            <SearchableDropdown
              onTextChange={(text) => setSelectCity(text)}
              onItemSelect={(country) => { getWeather(country); }}
              containerStyle={{ padding: 5 }}
              textInputStyle={{
                marginHorizontal: 26,
                padding: 15,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                marginHorizontal: 26,
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                color: '#000',
              }}
              itemsContainerStyle={{
                maxHeight: 150,
              }}
              items={country}
              defaultIndex={0}
              placeholder="Şehir Seçin"
              resetValue={false}
              underlineColorAndroid="transparent"
            />


            {
              currentWeather.map((i) => {
                return (
                  <View
                    key={i.id}
                    style={styles.infoCard}
                  >
                    <Text style={styles.infoText}>Konum : {i.name} , {i.sys.country}</Text>
                    <Text style={styles.infoText}>Sıcaklık : {Math.round(i.main.temp)} C&#176;</Text>
                    <Text style={styles.infoText}>Hissedilen Sıcaklık : {Math.round(i.main.feels_like)} C&#176;</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.infoText}>Gökyüzü : {(i.weather[0].description)}
                      </Text>
                      <Image
                        source={{ uri: 'http://openweathermap.org/img/wn/' + i.weather[0].icon + '@2x.png' }}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                )
              })
            }

          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center'
  },
  infoCard: {
    width: 350,
    maxHeight: 350,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#ffffff9f',
    shadowColor: "#000",
  }
});

export default App;
