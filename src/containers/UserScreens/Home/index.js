/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import AppBackground from '../../../components/AppBackground';
import {Colors, NavService, Shadows} from '../../../config';
import {connect} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import Btn from '../../../components/Btn';
import Pickdate from '../../../components/Pickdate';
const {width} = Dimensions.get('window');
import RNBounceable from '@freakycoder/react-native-bounceable';
import SplashScreen from 'react-native-splash-screen';
import Categories from '../../../components/Categories';
import Images from '../../../assets/Images';
import {Get_All_Categories, localevents} from '../../../redux/APIs/index';
import Icons from '../../../assets/Icons';
import {styles} from './Home_Styles';
import ImageURL from '../../../config/Common';
import FastImage from 'react-native-fast-image';
import Searchable from '../../../components/searchable';

export class Home extends Component {
  Featured = () => {
    NavService.navigate('Featured');
  };

  state = {
    popUp: true,
    location: '',
    date: false,
    isVisible: false,
    selectedId: '',
    category: [],
    categoryid: null,
    feature: [],
    text: '',
    isFocused: false,
    modalVisible: false,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  setLocation = (location) => {
    this.setState({ location });
  };
  componentDidMount() {
    SplashScreen.hide();
    const userData = this.props?.user?.api_token;
    Get_All_Categories().then(res => this.setState({category: res?.Data}));
    Get_All_Categories().then(res =>
      this.setState({categoryid: res.Data.filter(data => data?.category_id)}),
    );
    localevents(userData).then(res =>
      this.setState({feature: res?.Data?.featured}),
    );
  }
  render() {
    const {
      popUp,
      location,
      date,
      category,
      categoryid,
      feature,
      text,
      isFocused,
      modalVisible,
    } = this.state;
    const userImage = this?.props?.user?.image;

    const togglePopUp = () => {
      // if (text != '') {
      console.log('data', text);
      this.setState(previousState => ({popUp: !previousState?.popUp}));
      // }
    };

    return (
      <AppBackground marginHorizontal title={'Home'} home>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrlcontainer}>
          <Text style={styles.header}>Featured</Text>
          <View style={styles.maincontainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={feature}
              horizontal
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={this.Featured} style={styles.tch}>
                  <FastImage
                    source={{uri: `${ImageURL?.ImageURL}${item.event_image}`}}
                    style={styles.imgbackground}
                    imageStyle={styles.imgbg}>
                    <View style={styles.icnstrempty}>
                      <Image
                        source={Icons.starEmpty}
                        style={styles.starempty}
                      />
                    </View>
                    <Text style={styles.ftrtitle}>{item.event_title}</Text>
                  </FastImage>
                  {/* <ImageBackground
                    source={{ uri: `${ImageURL?.ImageURL}${item.event_image}` }}
                    style={styles.imgbackground}
                    imageStyle={styles.imgbg}>
                    <View style={styles.icnstrempty}>
                      <Image
                        source={Icons.starEmpty}
                        style={styles.starempty}
                      />
                    </View>
                    <Text
                      style={styles.ftrtitle}>
                      {item.event_title}
                    </Text>
                  </ImageBackground> */}
                </TouchableOpacity>
              )}
            />
          </View>
          {category && category?.length > 0 ? (
            category?.map((data, index) => {
              return (
                <Categories
                  key={index}
                  categories={data}
                  onPress={() =>
                    NavService.navigate('Event', data?.category_id)
                  }
                />
              );
            })
          ) : (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}>No Category Found</Text>
            </View>
          )}
        </ScrollView>
        <Modal isVisible={popUp} style={styles.modal} backdropOpacity={0.7}>
          <View style={styles.modalcontainer}>
            <View>
              <Text style={styles.mdltxt}>Please enter the location</Text>

              <Btn />
              <TouchableOpacity
                style={styles.mdltxtheader}
                onPress={() => this.setModalVisible(true)}>
                <Image
                  source={Icons.marker}
                  resizeMode="contain"
                  style={styles.mdlimg}
                />
                <TextInput
                  editable={false}
                  style={styles.txtinputadrs}
                  placeholder={location ? location.name :"Address"}
                  // secureTextEntry={!isFocused}
                  onFocus={() => this.setState({isFocused: true})}
                  onBlur={() => this.setState({isFocused: false})}
                  onChangeText={text => this.setState({text})}
                  value={text}
                  placeholderTextColor={Colors.greey}
                />
              </TouchableOpacity>
              {text.length <= 0 ? (
                <Text style={{color: Colors?.purple, fontSize: 16}}>
                  Address required
                </Text>
              ) : null}
            </View>
            <Pickdate />
            <CustomButton
              onPress={togglePopUp}
              buttonStyle={styles.btnstyle}
              title="Continue"
            />
          </View>
        </Modal>
                {console.log("location",location) }
        <Searchable
          isVisible={this.state.modalVisible}
          onClose={() => this.setModalVisible(false)}
          setLocation={this.setLocation}
        />
      </AppBackground>
    );
  }
}

const mapStateToProp = ({reducer: {user}}) => {
  return {user};
};

export default connect(mapStateToProp)(React.memo(Home));
