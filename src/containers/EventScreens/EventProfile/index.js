import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import { useSelector } from 'react-redux';
import { styles } from './eventprofile_style';
import eventContext from '../eventContext';
import FastImage from 'react-native-fast-image'
import { Colors, NavService } from '../../../config';
import ImageURL from '../../../config/Common';
import DummyURL from '../../../config/Common';
import Icons from '../../../assets/Icons'
import { themes } from '../../../config/globalFonts/globalFonts';
import postApi from '../../../redux/RequestTypes/post';
const EventProfile = () => {
  const { showEvents, UserPost } = useContext(eventContext);

  const { userProfile } = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`


  const userData = useSelector((state) => state?.reducer?.user)

  const DateReadbleFunction = (dateIn) => {
    const date = dateIn
    const dates = new Date(date);
    return dates?.toLocaleDateString();
  }

  const Delete_Event = async (item) => {
    console.log("jjjj",item)
    const id = item.id
    const params = {
      id : id
    }
    const data = await  postApi('delete-event',params);
    if(data.status == 1){
      NavService.navigate('EventHome')
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
              fontSize: themes?.fontSize?.large,
              fontFamily: themes?.font?.extraBold,
              color: Colors.black,
              // textAlign: row ? null : 'center',
              textTransform: 'capitalize',
            }}>{userData?.name}</Text>
            <Text style={{
              fontSize: themes?.fontSize?.extraVSmall,
              fontFamily: themes?.font?.regular,
              color: Colors.darkGray,
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
            marginRight: 10,


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
              <Text style={[styles.txt, { color: Colors.purple }]}>{showEvents?.length}</Text>
            </View>
            <View style={{
              padding: 10,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.purple,
              width: '50%'

            }}>
              <Text style={[styles.txt, { color: Colors.purple }]}>{UserPost?.length}</Text>
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
                              fontFamily: themes?.font?.black,
                              fontSize: themes?.fontSize?.medium, color: Colors.black,
                              textTransform: 'capitalize',
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
                                fontSize: themes?.fontSize?.medium,
                                fontFamily: themes?.font?.extraBold,
                                color: Colors.black,

                              }}>
                              {item?.rating_avg.map((data) => data.rating_count) || 0}{" "} Reviews
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity >
                          <FastImage
                            source={{ uri: item?.event_image ? `${ImageURL?.ImageURL}${item?.event_image}` : `${DummyURL.dummy}` }}
                            style={{ width: '100%', height: 170, marginTop: 10, borderRadius: 10, borderWidth: 2, borderColor: Colors.purple }}
                            imageStyle={styles.img}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 12, left: 5, }}>
                              <Image source={Icons.location} resizeMode="contain" style={{ tintColor: Colors.white, width: 20, height: 20, }} />
                              <Text style={{
                                color: Colors.white, textTransform: 'capitalize', fontFamily: themes?.font?.bold,
                                fontSize: themes?.fontSize?.medium, width: 250
                              }} numberOfLines={1} >{' '}{item?.event_location}</Text>
                            </View>
                          </FastImage>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Delete_Event(item)} style={{ position: 'absolute', right: 2, bottom: 10, }}>
                          <Image source={Icons.delete} style={{ width: 20, height: 20, tintColor: Colors.purple }} resizeMode='contain' />

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