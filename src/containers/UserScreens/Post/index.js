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
    isChecked: false,
    isChecked1:false,
    isChecked2:false


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



  handleReview = (name) => {
    const { isChecked } = this.state;
    isChecked[name] = !isChecked[name];
    this.setState({ isChecked });
    return isChecked
  }

  handleSubmit = () => {

    const tag = this.handleReview();
    const tar = this.state.starCount;
    const yups = Object.keys(tag).map(data => data)
    const user_id = this?.props?.user?.id
    const user_type = this?.props?.user?.user_type || 'customer'
    const rating = tar
    const tags = yups.pop()
    const rating_image = { uri: this.state.selectedImage?.path, name: `rating`, type: this.state.selectedImage?.mime }
    const review = 'null'
    const event_id = this?.props?.route?.params;

    if (user_id !== null && user_type !== null && rating !== null && tags !== null && rating_image !== null) {
      console.log('object', user_id, user_type, rating_image, tags, rating, review, event_id)
      post_reviews(user_id, user_type, rating_image, tags, rating, review, event_id)

    }

  }

  render() {

    const { userImage, selectedImage,} =
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
              emptyStar={Icons.null}
              starSize={16}
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
                  value={this.state.isChecked}
                  onValueChange={(newValue) => this.setState({ isChecked: newValue })}
                  tintColors={{ true: 'purple', false: 'purple' }}
                />
                <Text style={styles.txt}>ItsLit</Text>

              </View>


              <View style={styles.check}>
              <CheckBox
                  disabled={false}
                  value={this.state.isChecked1}
                  onValueChange={(newValue) => this.setState({ isChecked1: newValue })}
                  tintColors={{ true: 'purple', false: 'purple' }}
                />
                <Text style={styles.txt}>ItsAVibe</Text>
              </View>

              <View style={styles.check}>
              <CheckBox
                  disabled={false}
                  value={this.state.isChecked2}
                  onValueChange={(newValue) => this.setState({ isChecked2: newValue })}
                  tintColors={{ true: 'purple', false: 'purple' }}
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