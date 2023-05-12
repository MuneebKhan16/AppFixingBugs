import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground'
import Swiper from 'react-native-swiper'
import { Colors } from '../../../config'
const Data = [
    {
        id: 1,
        name: 'lorem ipsum dolor sit amet,consectetur adipisicing elit, sed'
    },
    {
        id: 2,
        name: 'lorem ipsum dolor sit amet,consectetur adipisicing elit, sed'
    }, {
        id: 3,
        name: 'lorem ipsum dolor sit amet,consectetur adipisicing elit, sed'
    },
]
const Subscription = () => {

    return (
        <AppBackground
            title={'Subscriptions'}
            profile={false}
            notification={false}
            back
            home>
            <View style={styles.container}>
                <Text style={{ fontSize: 80 }}>‹</Text>
                <View style={{ backgroundColor: 'black', width: 280, height: 420, borderRadius: 10 }}>
                    <Text style={{ color: Colors.white, fontSize: 35, marginTop: 30, marginLeft: 30 }}>Plan 1</Text>
                    <View >

                        <FlatList
                            data={Data}
                            renderItem={({ item }) => (
                                <View style={{ marginLeft: 30, marginTop: 30, marginRight: 10 }}>
                                    <Text style={{ color: Colors.white, fontSize: 18, }}>{item.name}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <TouchableOpacity style={{backgroundColor:Colors.grey,width:120,position:'absolute',right:25,bottom:25,height:50,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                        <Text style={{ color: Colors.black,fontWeight:'bold',fontSize:17 }}>Buy</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 80 }}>›</Text>

            </View>
        </AppBackground>
    )
}


const { width, height } = Dimensions.get('window');
export default Subscription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    swiper: {
        width: 370,
        height: height * 0.4, // Adjust the height as needed
        marginTop: 180,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        borderRadius: 10,

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
})