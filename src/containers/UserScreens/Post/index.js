/* eslint-disable prettier/prettier */
import React, {Component, createRef} from 'react';
import {Colors, NavService} from '../../../config';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
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
import {post_reviews} from '../../../redux/APIs';
import {styles} from './post_styles';

const Checkbox = {
  first: '#ItsLit',
  second: '#ItsAVibe',
  third: '#NeedsCompany',
};
class Post extends Component {
  state = {
    state: this.props.user?.state,
    userImage: this.props.user?.image,
    selectedImage: null,
    starCount: 1,
    isChecked: false,
    isChecked1: false,
    isChecked2: false,
    checkbox: Checkbox,
    selectedVideo: null,
  };
  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  handleReview = name => {
    const {isChecked} = this.state;
    isChecked[name] = !isChecked[name];
    this.setState({isChecked});
    return;
  };
  handleReview = name => {
    const {isChecked1} = this.state;
    isChecked1[name] = !isChecked1[name];
    this.setState({isChecked1});
    return;
  };
  handleReview = name => {
    const {isChecked2} = this.state;
    isChecked2[name] = !isChecked2[name];
    this.setState({isChecked2});
    return;
  };

  handleSubmit = () => {
    const {id} = this.props.user;
    const {
      selectedImage,
      starCount,
      isChecked,
      isChecked1,
      isChecked2,
      checkbox,
      selectedVideo,
    } = this.state;

    // if (!selectedImage || !selectedVideo) {
    //   return Toast.show({
    //     text1: 'No Image Found',
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    // }

    if (
      isChecked === true &&
      isChecked1 === true &&
      isChecked2 === true &&
      checkbox
    ) {
      const tag = Object.values(checkbox);

      var user_id = id;
      var user_type = 'customer';
      var rating_image;
      if (selectedImage) {
        rating_image = {
          uri: selectedImage.path,
          name: `Rating${Date.now()}.${selectedImage?.mime?.slice(
            selectedImage?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedImage?.mime,
        };
      }
      if (selectedVideo) {
        rating_image = {
          uri: selectedVideo.path,
          name: `Rating${Date.now()}.${selectedVideo?.mime?.slice(
            selectedVideo?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedVideo?.mime,
        };
      }
      var tags = tag.join(',');
      var rating = starCount;
      var review = null;
      var event_id = this.props.route.params;
      post_reviews(
        user_id,
        user_type,
        rating_image,
        tags,
        rating,
        review,
        event_id,
      );
    } else if (isChecked === true) {
      var user_id = id;
      var user_type = 'customer';
      var rating_image;
      if (selectedImage) {
        rating_image = {
          uri: selectedImage.path,
          name: `Rating${Date.now()}.${selectedImage?.mime?.slice(
            selectedImage?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedImage?.mime,
        };
      }
      if (selectedVideo) {
        rating_image = {
          uri: selectedVideo.path,
          name: `Rating${Date.now()}.${selectedVideo?.mime?.slice(
            selectedVideo?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedVideo?.mime,
        };
      }
      var tags = checkbox.first;
      var rating = starCount;
      var review = null;
      var event_id = this.props.route.params;
      post_reviews(
        user_id,
        user_type,
        rating_image,
        tags,
        rating,
        review,
        event_id,
      );
    } else if (isChecked1 === true) {
      var user_id = id;
      var user_type = 'customer';
      if (selectedImage) {
        rating_image = {
          uri: selectedImage.path,
          name: `Rating${Date.now()}.${selectedImage?.mime?.slice(
            selectedImage?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedImage?.mime,
        };
      }
      if (selectedVideo) {
        rating_image = {
          uri: selectedVideo.path,
          name: `Rating${Date.now()}.${selectedVideo?.mime?.slice(
            selectedVideo?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedVideo?.mime,
        };
      }
      var tags = checkbox.second;
      var rating = starCount;
      var review = null;
      var event_id = this.props.route.params;
      post_reviews(
        user_id,
        user_type,
        rating_image,
        tags,
        rating,
        review,
        event_id,
      );
    } else if (isChecked2 === true) {
      var user_id = id;
      var user_type = 'customer';
      if (selectedImage) {
        rating_image = {
          uri: selectedImage.path,
          name: `Rating${Date.now()}.${selectedImage?.mime?.slice(
            selectedImage?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedImage?.mime,
        };
      }
      if (selectedVideo) {
        rating_image = {
          uri: selectedVideo.path,
          name: `Rating${Date.now()}.${selectedVideo?.mime?.slice(
            selectedVideo?.mime.lastIndexOf('/') + 1,
          )}`,
          type: selectedVideo?.mime,
        };
      }
      var tags = checkbox.third;
      var rating = starCount;
      var review = null;
      var event_id = this.props.route.params;

      console.log(
        'object',
        user_id,
        user_type,
        rating_image,
        tags,
        rating,
        review,
        event_id,
      );

      post_reviews(
        user_id,
        user_type,
        rating_image,
        tags,
        rating,
        review,
        event_id,
      );
    }
  };

  render() {
    const {userImage, selectedImage, selectedVideo} = this.state;
    const {user} = this.props;
    console.log('selectedImage', this.state.selectedImage);
    return (
      <AppBackground title={'Post'} back home>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          contentContainerStyle={styles.content}>
          <Mainprofile txt center top name={user.name} />
          <View style={styles.top}>
            <StarRating
              fullStar={Icons.starFilled}
              emptyStar={Icons.null}
              starSize={16}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
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
          <View style={styles.profile}>
            <View style={styles.btm}>
              {selectedImage !== null ? (
                <ProfileImage
                  name={user?.name}
                  imageUri={
                    selectedImage?.mime?.startsWith('image/')
                      ? selectedImage.path
                      : null
                  }
                  videoUri={
                    selectedVideo?.mime?.startsWith('image/')
                      ? selectedVideo.path
                      : null
                  }
                />
              ) : (
                <ProfileImage
                  name={user?.name}
                  imageUri={
                    selectedImage?.mime.startsWith('image/')
                      ? selectedImage.path
                      : null
                  }
                  videoUri={
                    selectedVideo?.mime.startsWith('image/')
                      ? selectedVideo.path
                      : null
                  }
                />
              )}
              <View style={styles.picker}>
                <CustomImagePicker
                  uploadVideo
                  onImageChange={(path, mime) => {
                    console.log('pathssss', path);

                    if (mime.startsWith('image/')) {
                      if (Array.isArray(path)) {
                        this.setState({
                          selectedImage: {
                            path: path[0]?.path,
                            mime: path[0]?.mime,
                          },
                          selectedVideo: null,
                        });
                      } else {
                        this.setState({
                          selectedImage: {
                            path,
                            mime,
                          },
                          selectedVideo: null,
                        });
                      }
                    } else if (mime.startsWith('video/')) {
                      this.setState({
                        selectedVideo: {path, mime},
                        selectedImage: null,
                      });
                    }
                  }}>
                  <View style={styles.item}>
                    <Image source={Icons.upload} style={styles.uploadimg} />
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
                  onValueChange={newValue =>
                    this.setState({isChecked: newValue})
                  }
                  tintColors={{true: 'white', false: 'black'}}
                />
                <Text style={styles.txt}>{Checkbox.first}</Text>
              </View>
              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked1}
                  onValueChange={newValue =>
                    this.setState({isChecked1: newValue})
                  }
                  tintColors={{true: 'white', false: 'black'}}
                />
                <Text style={styles.txt}>{Checkbox.second}</Text>
              </View>

              <View style={styles.check}>
                <CheckBox
                  disabled={false}
                  value={this.state.isChecked2}
                  onValueChange={newValue =>
                    this.setState({isChecked2: newValue})
                  }
                  tintColors={{true: 'white', false: 'black'}}
                />
                <Text style={styles.txt}>{Checkbox.third}</Text>
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

function mapState({reducer: {user}}) {
  return {
    user,
  };
}

export default connect(mapState)(Post);