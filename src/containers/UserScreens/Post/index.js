/* eslint-disable prettier/prettier */
import React, { Component, createRef } from 'react';
import { Colors, NavService } from '../../../config';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import ActionSheet from 'react-native-actions-sheet';
import CustomImagePicker from '../../../components/CustomImagePicker';
import AppBackground from '../../../components/AppBackground';
import ProfileImage from '../../../components/ProfileImage';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import Mainprofile from '../../../components/Mainprofile';
import StarRating from 'react-native-star-rating';
import { styles } from './post_styles';
import { post_reviews} from '../../../redux/APIs'

const Checkbox = {
  first: false,
  second: false,
  third: false
};
class Post extends Component {
  state = {
    state: this.props.user?.state,
    userImage: this.props.user?.image,
    selectedImage: null,
    starCount: 1,
    isChecked: Checkbox,

  };
  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
  }
  handleCheckboxChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  handleReview = (name) => {
    const { isChecked } = this.state;
    isChecked[name] = !isChecked[name];
    this.setState({ isChecked });
    console.log(isChecked)
    return isChecked
    // NavService.navigate('Review')
  }

  handleSubmit = () => {
    const tag = this.handleReview();
    const yups = Object.keys(tag).map(data => data)
    const tags = yups.pop()
    console.log("8888", yups.pop()) 
    console.log("this.props.user?.state",this.props)
    post_reviews()
    // const payload = {
    //   user_id : ,
    //   user_type : ,
    //   review_image : ,
    //   tags : 
    //   rating : 
    //   review :
    // }
  }


  render() {
    const { userImage, selectedImage, toggleCheckBox, toggleCheckBox2, toggleCheckBox3 } =
      this.state;
    const { user } = this.props

    return (
      <AppBackground title={'Post'} back home>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}>
          <Mainprofile
            txt
            center
            top
            name={user.name}
          />
          <View style={{ marginBottom: 20 }}>

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
            containerStyle={{ backgroundColor: 'transparent' }}>
            <View style={styles.action}>

              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={styles.touchable}>
                <Text
                  style={styles.cancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>


          <View
            style={styles.profile}>
            <View style={{ marginBottom: 30 }}>
              <ProfileImage
                name={user?.name}
                imageUri={selectedImage ? selectedImage.path : userImage}
              />
              <View
                style={styles.picker}>
                <CustomImagePicker
                  onImageChange={(path, mime) => {
                    console.log('path', path);
                    this.setState({ selectedImage: { path, mime } });
                  }}>
                  <View style={{ alignItems: 'center' }}>

                    <Image
                      source={Icons.upload}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                    <Text style={styles.upload}>Upload</Text>
                  </View>
                </CustomImagePicker>
              </View>
            </View>
            <View style={{ alignSelf: 'center' }}>

              <View style={styles.box}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.first}
                  onValueChange={() => this.handleReview('ItsLit')}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsLit</Text>

              </View>


              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.second}
                  onValueChange={() => this.handleReview('ItsAVibe')}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsAVibe</Text>
              </View>

              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.third}
                  onValueChange={() => this.handleReview('NeedsCompany')}
                  tintColors={{ true: Colors.purple, false: 'green' }}
                />
                <Text style={{ fontSize: 25, marginLeft: 10 }}>NeedsCompany</Text>

              </View>
            </View>
            <CustomButton
              title={'Post'}
              buttonStyle={styles.btn}
              onPress={this.handleSubmit}
            />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}


function mapState({ reducer: { user } }) {
  return {
    user,
  };
}

export default connect(mapState)(Post);