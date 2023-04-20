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
import { post_reviews } from '../../../redux/APIs'

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
    console.log("this.props.user?.state", this.props)
    post_reviews()
  }


  render() {
    const { userImage, selectedImage, } =
      this.state;
    const { user } = this.props

    return (
      <AppBackground title={'Post'} back home>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          contentContainerStyle={styles.content}>
          <Mainprofile
            txt
            center
            top
            name={user.name}
          />
          <View style={styles.top}>

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
            containerStyle={styles.backbg}>
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
            <View style={styles.btm}>
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
                  <View style={styles.item}>

                    <Image
                      source={Icons.upload}
                      style={styles.uploadimg}
                    />
                    <Text style={styles.upload}>Upload</Text>
                  </View>
                </CustomImagePicker>
              </View>
            </View>
            <View style={styles.center}>

              <View style={styles.box}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.first}
                  onValueChange={() => this.handleReview('ItsLit')}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={styles.txt}>ItsLit</Text>

              </View>


              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.second}
                  onValueChange={() => this.handleReview('ItsAVibe')}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={styles.txt}>ItsAVibe</Text>
              </View>

              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked.third}
                  onValueChange={() => this.handleReview('NeedsCompany')}
                  tintColors={{ true: Colors.purple, false: 'green' }}
                />
                <Text style={styles.txt}>NeedsCompany</Text>

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