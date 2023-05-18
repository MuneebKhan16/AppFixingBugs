import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground'
import { Colors } from '../../../config'
import { themes } from '../../../config/globalFonts/globalFonts'
const Help = () => {
    return (
        <AppBackground title={'Help'} back home>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 30, marginLeft: 20, }}>
                <Text style={{
                    fontFamily: themes?.font?.black,
                    fontSize: themes?.fontSize?.medium, color: Colors.black
                }}>Email: outsideeeapp@gmail.com {'\n'}<Text style={{
                    fontFamily: themes?.font?.bold,
                    fontSize: themes?.fontSize?.medium, 
                }}>{'\n'}for Account Support issues, Account De-Activation Requests{'\n'}{'\n'}</Text></Text>
                <Text style={{
                    fontFamily: themes?.font?.black,
                    fontSize: themes?.fontSize?.medium, color: Colors.black
                }}>Phone # 704.800.5166 {'\n'}<Text style={{
                    fontFamily: themes?.font?.bold,
                    fontSize: themes?.fontSize?.medium, 
                }}>{'\n'}Customer Contact Number for Account Support issues, Account De-Activation Requests{'\n'}{'\n'}</Text></Text>
                
            </ScrollView>
        </AppBackground >
    )
}

export default Help

const styles = StyleSheet.create({})