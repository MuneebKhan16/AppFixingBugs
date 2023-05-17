import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground'
import Swiper from 'react-native-swiper'
import { Colors } from '../../../config'
import Icons from '../../../assets/Icons'
const Data = [
    {
        id: 1,
        name: 'Lorem ipsum dolor text sieut amet'
    },
    {
        id: 2,
        name: 'Lorem ipsum dolor text sieut amet'
    },
    {
        id: 3,
        name: 'Lorem ipsum dolor text sieut amet'
    },
    {
        id: 4,
        name: 'Lorem ipsum dolor text sieut amet'
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

            <View style={{ marginTop: 20, height: 500, }}>
                <Swiper style={styles.wrapper} showsButtons={false} dotColor={Colors.grey} activeDotColor={Colors.purple} >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Basic Plan</Text>
                        <View style={{
                            marginVertical: 15,
                            backgroundColor: Colors.purple,
                            width: '100%',
                            paddingVertical: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold' }}>$9.99</Text>

                        </View>
                        <FlatList data={Data}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginRight: 15 }}>
                                    <View style={{ backgroundColor: Colors.purple, padding: 3, borderRadius: 10 }}>
                                        <Image source={Icons.check} resizeMode='contain' style={{ width: 10, height: 10, tintColor: Colors.white }} />
                                    </View>
                                    <Text style={{ marginLeft: 5, fontSize: 18, color: Colors.black }}>{item.name}</Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={{ borderRadius: 10, width: '80%', backgroundColor: Colors.purple, padding: 15, alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>Buy</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Basic Plan</Text>
                        <View style={{
                            marginVertical: 15,
                            backgroundColor: Colors.purple,
                            width: '100%',
                            paddingVertical: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold' }}>$9.99</Text>

                        </View>
                        <FlatList data={Data}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginRight: 15 }}>
                                    <View style={{ backgroundColor: Colors.purple, padding: 3, borderRadius: 10 }}>
                                        <Image source={Icons.check} resizeMode='contain' style={{ width: 10, height: 10, tintColor: Colors.white }} />
                                    </View>
                                    <Text style={{ marginLeft: 5, fontSize: 18, color: Colors.black }}>{item.name}</Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={{ borderRadius: 10, width: '80%', backgroundColor: Colors.purple, padding: 15, alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>Buy</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Basic Plan</Text>
                        <View style={{
                            marginVertical: 15,
                            backgroundColor: Colors.purple,
                            width: '100%',
                            paddingVertical: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold' }}>$9.99</Text>

                        </View>
                        <FlatList data={Data}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginRight: 15 }}>
                                    <View style={{ backgroundColor: Colors.purple, padding: 3, borderRadius: 10 }}>
                                        <Image source={Icons.check} resizeMode='contain' style={{ width: 10, height: 10, tintColor: Colors.white }} />
                                    </View>
                                    <Text style={{ marginLeft: 5, fontSize: 18, color: Colors.black }}>{item.name}</Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity style={{ borderRadius: 10, width: '80%', backgroundColor: Colors.purple, padding: 15, alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                            <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>Buy</Text>
                        </TouchableOpacity>


                    </View>

                </Swiper>
            </View>

        </AppBackground>
    )
}


const { width, height } = Dimensions.get('window');
export default Subscription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: 'center',

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
        color: Colors.black,
        fontSize: 22,
        fontWeight: 'bold',
    },
    wrapper: {
        height: 500,
        marginTop: 30,

    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.purple,
        marginHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10

    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',

        marginHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10




    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',

        marginHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10


    },
})