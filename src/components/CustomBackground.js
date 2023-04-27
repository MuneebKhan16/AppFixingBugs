import React from 'react';
import { ImageBackground, ScrollView, View, Text, Image ,StyleSheet} from 'react-native';
import Images from '../assets/Images';
import { Colors } from '../config';
import Logo from './Logo';

export default ({ children, background }) => {
  return (
    background ?
      <View style={styles.flex}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          contentContainerStyle={styles.content}>
          <View
            style={styles.container}>
          </View>
          <View style={styles.main}>{children}</View>
        </ScrollView >
      </View>
      :
      <View style={styles.maincontent}>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          contentContainerStyle={styles.mainlogo}>
          <View
            style={styles.logo}>
            <Logo size={180} />
          </View>
          <View style={styles.child}>{children}</View>
        </ScrollView>
      </View>
  );
};


const styles = StyleSheet.create({
  flex:{flex:1},
  content:{
    alignItems: 'center',
    flexGrow: 1,
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{ flex: 1, marginTop: 30 },
  maincontent:{ flex: 1, marginTop: 15 },
  mainlogo:{
    alignItems: 'center',
    flexGrow: 1,
  },
  logo:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 140
  },
  child:{ flex: 1, }
})