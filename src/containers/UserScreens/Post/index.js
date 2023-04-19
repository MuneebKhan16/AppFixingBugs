/* eslint-disable prettier/prettier */
import React, { Component, createRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image ,StyleSheet} from 'react-native';
import { Colors, NavService } from '../../../config';
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

class Post extends Component {
  state = {
    state: this.props.user?.state,
    userImage: this.props.user?.image,
    selectedImage: null,
    toggleCheckBox: false,
    toggleCheckBox2: false,
    toggleCheckBox3: false,
    starCount: 1,
    isChecked: false
  };
  handleCheckboxChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }
  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  EventCreated(){
    NavService.navigate('Review')
    const { userImage ,selectedImage , toggleCheckBox , toggleCheckBox2 , toggleCheckBox3  } = this.state;
    console.log("postsss" , userImage ,selectedImage , toggleCheckBox , toggleCheckBox2 , toggleCheckBox3)
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
                  value={this.state.isChecked}
                  onValueChange={(newValue) => this.setState({ isChecked: newValue })}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsLit</Text>

              </View>
              <View style={styles.check}>

                <CheckBox
                  disabled={false}
                  value={this.state.isChecked1}
                  onValueChange={(newValue) => this.setState({ isChecked1: newValue })}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={{ fontSize: 25, marginLeft: 10 }}>ItsAVibe</Text>

              </View>
              <View style={styles.check}>

                <CheckBox
                  disabled={false}
                  value={this.state.isChecked2}
                  onValueChange={(newValue) => this.setState({ isChecked2: newValue })}
                  tintColors={{ true: Colors.purple, false: 'grey' }}
                />
                <Text style={styles.tags}>NeedsCompany</Text>

              </View>
            </View>
            <CustomButton
              title={'Post'}
              buttonStyle={styles.btn}
              onPress={() => this.EventCreated() }
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


