/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import { useSelector } from 'react-redux';
import { styles } from './eventprofile_style';
import { show_eventCreater_event } from '../../../redux/APIs'
import eventContext from '../eventContext';
import FastImage from 'react-native-fast-image'
import { Colors, NavService } from '../../../config';
import ImageURL from '../../../config/Common';
import DummyURL from '../../../config/Common';
import Icons from '../../../assets/Icons';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video'
import postApi from '../../../redux/RequestTypes/post';
const EventProfile = () => {
  const { showEvents, UserPost } = useContext(eventContext);
  const [fetchEvents, setfetchEvents] = useState([]);
  const { userProfile } = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`


  const userData = useSelector((state) => state?.reducer?.user)

  const DateReadbleFunction = (dateIn) => {
    const date = dateIn
    const dates = new Date(date);
    return dates?.toLocaleDateString();
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

  return (

    <AppBackground gear title={'User Profile'} home back>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <View style={{ alignItems: 'center' }}>
            <View>
              <Image
                source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: Colors.purple,
                  marginBottom: 10,

                }}
              />
              <TouchableOpacity
                onPress={() => NavService.navigate('EditProfile')}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  borderRadius: 40,
                  top: -35,
                  left: 47,
                  backgroundColor: Colors.purple
                }}>
                <Image
                  source={Icons.edit}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>

            <Text style={{
              fontSize: 19,
              fontWeight: '700',
              color: Colors.black,
              // textAlign: row ? null : 'center',
              textTransform: 'capitalize',
            }}>{userData?.name}</Text>
            <Text style={{
              fontSize: 18,
              color: Colors.darkGray,
              fontWeight: '400',

            }}>{userData?.email}</Text>
          </View>
        </View>

        {/* <Mainprofile
        txt
        center
        name={userData?.name}
        subtitle={userData?.email}
        edit
      /> */}
        <View style={styles.content}>
          <View
            style={styles.container}>
            <View>
              <Text
                style={styles.hd1}>
                Joining Date
              </Text>

            </View>
            <View style={{ marginRight: 15 }}>
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
            marginTop: 30,
            marginRight: 10


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
            marginTop: 15,
            marginRight: 10

          }}>
            <View style={{
              padding: 10,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.purple,
              width: '40%'
            }}>
              <Text style={styles.txt}>{showEvents?.length}</Text>
            </View>
            <View style={{
              padding: 10,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.purple,
              width: '50%'

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
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.grey,
                        height: 260,
                      }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                          <Text
                            style={{
                              fontSize: 19, color: Colors.black,
                              fontWeight: 'bold', textTransform: 'capitalize',
                            }}>
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
                              }}>
                              {item?.rating_avg.map((data) => data.rating_count) || 0}{" "} Reviews
                            </Text>
                          </View>
                        </View>
                        {item?.images?.length > 0 ? (
                      <Swiper
                        style={{ height: 180 }}
                        activeDotColor="transparent"
                        dotColor="transparent">
                        {item?.images.map((data, index) => (
                          <TouchableOpacity >
                            {
                              data?.event_images?.split('.')[1] == 'mp4' ?
                                (
                                  
                                    <Video
                                      source={{ uri: `${ImageURL?.ImageURL}+${data?.event_images}` }}
                                      volume={0}      
                                      style={styles.imgback}
                                      resizeMode="cover"
                                      //  controls={true}
                                    />
                                   
                                  
                                )
                                :
                                (
                                  <FastImage
                                    key={index}
                                    source={{
                                      uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                                    }}
                                    style={{ width: '100%', height: 170, marginTop: 10, borderRadius: 10 }}
                                    imageStyle={styles.img}>
                                    <View style={styles.loc}>
                                      <Image
                                        source={Icons.location}
                                        resizeMode="contain"
                                        style={styles.location}
                                      />
                                      <Text style={styles.loctxt} numberOfLines={1}>
                                        {' '}
                                        {item.event_location}
                                      </Text>
                                    </View>
                                  </FastImage>
                                )
                            }
                          </TouchableOpacity>
                        ))}
                      </Swiper>
                    ) : null}
                        <TouchableOpacity style={{ position: 'absolute', right: 2, bottom: 10 }} onPress={() => Delete_Event(item)}>
                          <Image source={Icons.bin} style={{ width: 30, height: 30, tintColor: Colors.purple }} resizeMode='contain' />

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