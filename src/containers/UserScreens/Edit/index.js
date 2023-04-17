import {StyleSheet, Text, View, FlatList, Image, TextInput,ScrollView} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import {Colors, NavService} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';

class Edit extends Component {
  state = {
    title: '',
    type: '',
   Date: '',
    stateTime: '',
    endTime: '',
    description: '',
    withWhom: '',
    setReminder: '',

  };

  render() {
    const {title, type, Date, startTime, endTime,description,withWhom,setReminder} = this.state;
    return (
    <AppBackground title={'06 Nov 2022'} profile={false} back home>
     
         <ScrollView
         showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                width: '100%',
                backgroundColor:'white',
              borderRadius:10,
              }}>
            <CustomTextInput
                value={title}
                onChangeText={text => this.setState({title: text})}
                label={'Title'}
                grey
              />
               <CustomTextInput
                value={type}
                onChangeText={text => this.setState({type: text})}
                label={'Type'}
                righticon={Icons.subscription}
                grey
              />
               <CustomTextInput
                value={Date}
                onChangeText={text => this.setState({Date: text})}
                label={'Date'}
                righticon={Icons.subscription}
                grey
              />
               <CustomTextInput
                value={startTime}
                onChangeText={text => this.setState({startTime: text})}
                label={'Start Time'}
                righticon={Icons.subscription}
                grey
              />
               <CustomTextInput
                value={endTime}
                onChangeText={text => this.setState({endTime: text})}
                label={'End Time'}
                righticon={Icons.subscription}
                grey
              />
              <CustomTextInput
                value={description}
                onChangeText={text => this.setState({description: text})}
                label={'Description'}
                righticon={Icons.subscription}
                grey
              />
               <CustomTextInput
                value={withWhom}
                onChangeText={text => this.setState({withWhom: text})}
                label={'With Whom'}
                righticon={Icons.subscription}
                grey
              />
              
           <CustomButton
                buttonStyle={{
                  width:'95%',
                  alignSelf:'center',
                  marginBottom:15

                }}
                title="Edit"
              />
                </View>
            </ScrollView>
          
        
     
    </AppBackground>
    );
  }
}

export default Edit;



// import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
// import React, {useState} from 'react';
// import AppBackground from '../../../components/AppBackground';
// import {Colors, NavService} from '../../../config';
// import {FlatList} from 'react-native-gesture-handler';
// import Icons from '../../../assets/Icons';
// import CustomButton from '../../../components/CustomButton';

// const Data = [
//   {
//     name: 'Title',
//   },
//   {
//     name: 'Type',
//     icon: Icons.subscription,
//   },
//   {
//     name: 'Date',
//     icon: Icons.subscription,
//   },
//   {
//     name: 'Start Time',
//     icon: Icons.subscription,
//   },
//   {
//     name: 'End Time',
//     icon: Icons.subscription,
//   },
//   {
//     name: 'Description',
//     icon: Icons.subscription,
//   },
//   {
//     name: 'With Whom',
//     icon: Icons.subscription,
//   },
// ];

// const Edit = () => {
//   const [title, setTitle] = useState();
//   const [type, setType] = useState();
//   const [date, setDate] = useState();
//   const [startTime, setStartTime] = useState();
//   const [endTime, setEndTime] = useState();
//   const [description, setDescription] = useState();
//   const [withWhom, setWithWhom] = useState();
//   return (
//     <AppBackground title={'1st August 2022'} profile={false} back home>
//       <View
//         style={{
//           backgroundColor: Colors.white,
//           marginVertical: 15,
//           borderRadius: 20,
//           paddingVertical:25,
//           paddingHorizontal:10
//         }}>
//         <FlatList
//           data={Data}
//           renderItem={({item, index}) => (
//             <View style={{
//                 flexDirection:'row',
//                 margin:10,
//                 borderBottomWidth:2,
//                 borderBottomColor:Colors.grey,
//                 padding:10
//             }}>
//               <TextInput
//                 style={{width: '80%'}}
//                 // onChangeText={item.name}
//                 placeholder={item.name}
//                 keyboardType="numeric"
//               />
//                <View
//                   style={{
//                     alignItems: 'center',
//                     position: 'absolute',
//                   right:5
            
//                   }}>
//                   <Image
//                     source={item.icon}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       resizeMode: 'contain',
//                       marginTop:10
//                     }}
//                   />
//                 </View>
//             </View>
//           )}
//         />
//            <CustomButton
//                 buttonStyle={{
//                   width:'95%',
//                   marginLeft:5
//                 }}
//                 title="Edit"
//               />
//       </View>
//     </AppBackground>
//   );
// };

// export default Edit;

// const styles = StyleSheet.create({});
