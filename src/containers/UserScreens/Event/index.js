import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground, TouchableOpacity
} from 'react-native';
import { categoryevents} from '../../../redux/APIs/index'
import React,{useEffect,useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import { Evntdata } from '../../../config/Dummydata/Dummydata';
import { Colors, NavService } from '../../../config';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useSelector } from 'react-redux';
import Icons from '../../../assets/Icons';
const Event = (props) => {
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const api_token = useSelector(state => state.reducer.user.api_token);
  const [cat,Setcat] = useState([]);
  const id = props.route.params;
  
  const Id = id.filter((data) => { 
    if(data.category_id !== null) {
      return data.category_id;
    }else{
      console.log("loading")
    }})

  useEffect(() => {
    categoryevents(api_token,Id)
    .then((res) => Setcat(res?.Data))
  },[])
 

  console.log("catcatcat",cat)

  return (
    <AppBackground title={'Events'} home back filter>
      <FlatList
        data={cat}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text
                style={{ fontSize: 16, color: Colors.black, fontWeight: 'bold' }}>
                {item.event_title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 5,
                }}>
                <Image source={Icons.starFilled} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '600',
                  }}>
                  {item.rating_count+" "+"Reviews"}
                </Text>
              </View>
            </View>
            <RNBounceable onPress={() => NavService.navigate('Review',item )}>
              <ImageBackground
                source={{ uri : `${BaseUrl}${item.event_image}`}}
                style={{ width: '100%', height: 150, marginTop: 10 }}
                imageStyle={{ borderRadius: 10 }}>



                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 2,  }}>
                  <View style={{
                    width: 38,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                    <Image source={Icons.location} resizeMode="contain" style={{
                      tintColor: Colors.white, width: 22,
                      height: 22,
                    }} />
                  </View>

                  <Text style={{ color: Colors.white, fontWeight: 'bold' }}>{' '}{item.event_location}</Text>
                </View>

              </ImageBackground>

            </RNBounceable>
          </View>
        )}
      />
    </AppBackground>
  );
};

export default Event;

const styles = StyleSheet.create({});
