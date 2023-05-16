/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import { useSelector } from 'react-redux';
import { styles } from './eventprofile_style';
import { show_eventCreater_event } from '../../../redux/APIs'
import eventContext from '../eventContext';
import FastImage from 'react-native-fast-image'
import { Colors } from '../../../config';
import ImageURL from '../../../config/Common';
import DummyURL from '../../../config/Common';
import Icons from '../../../assets/Icons'
import postApi from '../../../redux/RequestTypes/post';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const EventProfile = (props) => {

  
  const { showEvents, UserPost } = useContext(eventContext);
  const [fetchEvents, setfetchEvents] = useState([]);
  



  const userData = useSelector((state) => state?.reducer?.user)

  const DateReadbleFunction = (dateIn) => {
    const date = dateIn
    const dates = new Date(date);
    return dates?.toLocaleDateString();
  }

  const Event_data = async () => {
    const events = await show_eventCreater_event(userData?.id);
    console.log('userData' ,userData, 'events',events )
    setfetchEvents(events?.events)
  }



  const Delete_Event = async (item) => {
    const id = item.id
   
    const params = {
      id : id
    }
    const data = await  postApi('delete-event',params);
    if(data.status == 1){
      setfetchEvents(fetchEvents.filter((fetchEvent) => console.log(fetchEvent)));
    }
   
  }

  
console.log('fetchEvents',fetchEvents)

  return (

    <AppBackground gear title={'User Profile'} home back>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <Mainprofile
        txt
        center
        name={userData?.name}
        subtitle={userData?.email}
        edit
      />
      <View style={styles.content}>
        <View
          style={styles.container}>
          <View>
            <Text
              style={styles.hd1}>
              Joining Date
            </Text>

          </View>
          <View>
            <Text style={styles.txt}>{DateReadbleFunction(userData?.created_at || 'now')}</Text>
            <View style={styles.hdcontent}>
              {/* <Text style={styles.txt}>{showEvents?.length}</Text>
                <Text style={styles.txt}>{UserPost?.length}</Text> */}
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30

        }}>
          <Text
            style={styles.hd2}>
            No. of Events
          </Text>
          <Text
            style={styles.hd3}>
            No. of Attendance
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15

        }}>
          <View style={{
            padding: 10,
            width: 160,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.purple
          }}>
            <Text style={styles.txt}>{showEvents?.length}</Text>
          </View>
          <View style={{
            padding: 10,
            width: 170,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.purple
          }}>
            <Text style={styles.txt}>{UserPost?.length}</Text>
          </View>
        </View>

        <View style={{
          marginTop: 20,
          borderBottomWidth: 1.5, borderBottomColor: Colors.grey,
        }}>
          <Text style={{ color: Colors.black, fontWeight: '700', fontSize: 18, marginBottom: 10 }}>
            Event History
          </Text>
        </View>
        {
          showEvents?.length > 0 ?
            (
              <View style={{ marginBottom: 20, }}>
                <FlatList
                  data={showEvents}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={{
                      marginTop: 20,
                      borderBottomWidth:1,
                      borderBottomColor:Colors.grey,
                      height:260
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text
                          style={{ fontSize: 19, color: Colors.black, 
                          fontWeight: 'bold', textTransform: 'capitalize', }}>
                          {item?.event_title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 5,
                          }}>
                          <Image source={Icons.starFilled} style={{ width: 13, height: 13 }} />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 18,
                              color: Colors.black,
                              fontWeight: 'bold',
                              marginRight: 5
                            }}>
                            {item?.rating_avg.map((data) => data.rating_count) || 0}{" "} Reviews
                          </Text>
                        </View>
                      </View>
                      {item?.images?.map((data, index) => (
                       <TouchableOpacity>
                        <FastImage
                          key={index}
                          source={{ uri: `${ImageURL?.ImageURL}${data?.event_images}` }}
                          style={{ width: '100%', height: 170, marginTop: 10, borderRadius: 10 }}
                          
                          imageStyle={styles.img}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 12, left: 5, }}>
                            <Image source={Icons.location} resizeMode="contain" style={{ tintColor: Colors.white, width: 20, height: 20, }} />
                            <Text style={{ color: Colors.white, fontWeight: 'bold', textTransform: 'capitalize', fontSize: 17, width: 250 }} numberOfLines={1}>{' '}{item.event_location}</Text>
                          </View>
                        </FastImage>
                       </TouchableOpacity>
                    ))}
                      <TouchableOpacity style={{alignItems:'center',marginTop:10}} onPress={() => Delete_Event(item)} >
                      <Image  source={Icons.bin} style={{width:30,height:30,tintColor:Colors.purple}} resizeMode='contain'/>

                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>

            ) :
            (
              <View style={styles.container1}>
                <Text style={styles.txtheadersty}>No Events Available</Text>
              </View>
            )
        }
      </View>
      </ScrollView>
    </AppBackground>

  );
};

export default React.memo(EventProfile);