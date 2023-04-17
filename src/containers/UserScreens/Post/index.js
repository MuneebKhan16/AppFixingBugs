import React, {Component, createRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import ActionSheet from 'react-native-actions-sheet';
import CustomImagePicker from '../../../components/CustomImagePicker';
import AppBackground from '../../../components/AppBackground';
import ProfileImage from '../../../components/ProfileImage';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import Mainprofile from '../../../components/Mainprofile';
import StarRating from 'react-native-star-rating';


class Post extends Component {
  state = {
    state: this.props.user?.state,
    userImage: this.props.user?.image,
    selectedImage: null,
    toggleCheckBox:false,
    toggleCheckBox2:false,
    toggleCheckBox3:false,
    starCount:1,
  };

  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const {name, state,  starCount,  userImage, selectedImage,toggleCheckBox,toggleCheckBox2,toggleCheckBox3} =
      this.state;
      const {user }  = this.props
      
    return (
      <AppBackground title={'Post'} back home>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
            marginTop:30
          }}>
              <Mainprofile
          txt
            center
            top
            name={user.name}
          />
          <View style={{marginBottom:20}}>

             <StarRating
            fullStar={Icons.starFilled}
            // halfStar={Icons.star_half}
            emptyStar={Icons.starEmpty}
            starSize={14}
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          </View>
          <ActionSheet
            ref={this.actionSheetStateRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
             
              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'rgb(0,88,200)',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
         
        
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <View style={{marginBottom: 30}}>
              <ProfileImage
                name={user?.name}
                imageUri={selectedImage ? selectedImage.path : userImage}
              />
              <View
                style={{
                  width:60,
                  height: 35,
                  // borderRadius: 35 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf:'center',
                  marginTop:-90
                }}>
                <CustomImagePicker
                  onImageChange={(path, mime) => {
                    console.log('path', path);
                    this.setState({selectedImage: {path, mime}});
                  }}>
                    <View style={{alignItems:'center'}}>

                  <Image
                    source={Icons.upload}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                  <Text style={{fontWeight:'bold'}}>Upload</Text>
                    </View>
                </CustomImagePicker>
              </View>
            </View>
            <View style={{alignSelf:'center'}}>
        <View style={{ marginVertical: 10, flexDirection: 'row', marginTop:100}}>

          <CheckBox
            disabled={false}
            value={this.state.toggleCheckBox}
            tintColor={Colors.black}
            onCheckColor={Colors.white}
            onFillColor={Colors.purple}
            onTintColor={Colors.purple}
            boxType='square'
            lineWidth={3.0}
          />
          <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsLit</Text>

        </View>
        <View style={{ marginVertical: 10, flexDirection: 'row',  }}>

          <CheckBox
            disabled={false}
            value={this.state.toggleCheckBox2}
            tintColor={Colors.black}
            onCheckColor={Colors.white}
            onFillColor={Colors.purple}
            onTintColor={Colors.purple}
            boxType='square'
            lineWidth={3.0}
          />
          <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsAVibe</Text>

        </View>
        <View style={{ marginVertical: 10, flexDirection: 'row',  }}>

          <CheckBox
            disabled={false}
            value={this.state.toggleCheckBox3}
            tintColor={Colors.black}
            onCheckColor={Colors.white}
            onFillColor={Colors.purple}
            onTintColor={Colors.purple}
            boxType='square'
            lineWidth={3.0}
          />
             <Text style={{ fontSize: 25, marginLeft: 10 }}>NeedsCompany</Text>

</View>
</View>
            <CustomButton
          title={'Post'}
          buttonStyle={{ alignSelf: 'center',marginTop:50 }}
          onPress={() => NavService.navigate('Home')}
        />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

const ActionSheetCommponent = ({
  title = '',
  dataset = [],
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{maxHeight: 200}} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
            
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

function mapState({reducer: {user}}) {
  return {
    user,
  };
}

export default connect(mapState)(Post);