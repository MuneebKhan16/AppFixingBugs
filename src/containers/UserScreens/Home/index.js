/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, { Component } from 'react';
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
  BackHandler

} from 'react-native';
import Modal from 'react-native-modal';
import AppBackground from '../../../components/AppBackground';
import { Colors, NavService, Shadows } from '../../../config';
import { connect } from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import Btn from '../../../components/Btn';
import Pickdate from '../../../components/Pickdate';
const { width } = Dimensions.get('window');
import RNBounceable from '@freakycoder/react-native-bounceable';
import SplashScreen from 'react-native-splash-screen';
import Categories from '../../../components/Categories';
import Images from '../../../assets/Images';
import { Get_All_Categories, localevents } from '../../../redux/APIs/index'
import Icons from '../../../assets/Icons';
import { styles } from './Home_Styles';
import ImageURL from '../../../config/Common'

export class Home extends Component {

  Featured = () => {
    NavService.navigate('Featured')
  }

  state = {
    popUp: true,
    location: false,
    date: false,
    isVisible: false,
    selectedId: '',
    category: [],
    categoryid: null,
    feature: []
  };

  componentDidMount() {
    SplashScreen.hide();
    const userData = this.props?.user?.api_token;
    Get_All_Categories().then((res) => this.setState({ category: res?.Data }));
    Get_All_Categories().then((res) => this.setState({ categoryid: res.Data.filter((data) => data?.category_id) }));
    localevents(userData).then((res) => this.setState({ feature: res?.Data?.featured }));
  }
  render() {
    const { popUp, location, date, category, categoryid, feature } = this.state;
    const userImage = this?.props?.user?.image;


    const togglePopUp = () => {
      this.setState(previousState => ({ popUp: !previousState?.popUp }));
    };

    return (
      <AppBackground notification marginHorizontal title={'Home'} home>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrlcontainer}>
          <Text
            style={styles.header}>
            Featured
          </Text>
          <View
            style={styles.maincontainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={feature}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={this.Featured}
                  style={styles.tch}>
                  <ImageBackground
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
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>
          {
            category &&
              category?.length > 0 ?
              (
                category?.map((data, index) => {
                  return (
                    <Categories key={index} categories={data} onPress={() => NavService.navigate('Event', data?.category_id)} />
                  )
                })
              ) :
              (
                <View>
                  <Text>No Category Found</Text>
                </View>
              )
          }

        </ScrollView>
        <Modal
          isVisible={popUp}
          style={styles.modal}
          backdropOpacity={0.7}
        >
          <View
            style={styles.modalcontainer}>
            <View>
              <View
                style={styles.mdlmaincontainer}>
                <TextInput
                  style={styles.lcntxtinput}
                  value={location}
                  placeholder="Please enter the location"
                  placeholderTextColor={Colors.black}
                  placeholderTextStyle={styles.txtinput}
                />
              </View>
              <Btn />
              <Pickdate />
              <Pickdate />
            </View>
            <CustomButton
              onPress={togglePopUp}
              buttonStyle={styles.btnstyle}
              title="Continue"
            />
          </View>
        </Modal>
      </AppBackground>
    );
  }
}

const mapStateToProp = ({ reducer: { user } }) => {
  return { user };
};

export default connect(mapStateToProp)(React.memo(Home));
