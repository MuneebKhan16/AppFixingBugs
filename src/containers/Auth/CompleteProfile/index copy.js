import React, {Component, createRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import ActionSheet from 'react-native-actions-sheet';
import CustomSelector from '../../../components/TextWithActionSheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const states = [
  {
    state_name: 'California',
  },
  {
    state_name: 'Hawaii',
  },
  {
    state_name: 'California',
  },
  {
    state_name: 'Hawaii',
  },
  {
    state_name: 'California',
  },
  {
    state_name: 'Hawaii',
  },
];

class App extends Component {
  state = {
    name: '',
    state: '',
    city: '',
    dob: '',
    institute: '',
    showDOB: false,
  };

  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
    this.actionSheetCityRef = createRef();
  }

  render() {
    const {name, state, city, dob, institute, showDOB} = this.state;

    return (
      <CustomBackground>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <ActionSheet
            ref={this.actionSheetStateRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
              <ActionSheetCommponent
                title="Select a State"
                dataset={states}
                onPress={async item => {
                  this.actionSheetStateRef.current.hide();
                  this.setState({state: item.state_name, city: ''});
                  // await getCities(item.state_id);
                }}
              />
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
          <ActionSheet
            ref={this.actionSheetCityRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
              <ActionSheetCommponent
                title="Select a City"
                dataset={states}
                onPress={async item => {
                  this.actionSheetCityRef.current.hide();
                  this.setState({city: item.state_name});
                  // await getCities(item.state_id);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetCityRef.current.hide()}
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
          <DateTimePickerModal
            maximumDate={new Date()}
            themeVariant="light"
            isDarkModeEnabled={false}
            isVisible={showDOB}
            mode="date"
            onConfirm={date => {
              console.log('date', date);
              this.setState({
                showDOB: false,
                dob: moment(date).format('YYYY-MM-DD'),
              });
            }}
            onCancel={() => this.setState({showDOB: false})}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.white,
              marginVertical: 20,
            }}>
            Create Profile
          </Text>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <CustomTextInput
              icon={Icons.user}
              placeholder={'Name'}
              onChangeText={value => this.setState({name: value})}
              value={name}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.actionSheetStateRef.current.show()}
              style={{width: '100%'}}>
              <CustomSelector
                rightIcon={true}
                placeholder={'State'}
                icon={Icons.location}
                value={state}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.actionSheetCityRef.current.show()}
              style={{width: '100%'}}>
              <CustomSelector
                rightIcon={true}
                placeholder={'City'}
                icon={Icons.location}
                value={city}
              />
            </TouchableOpacity>
            <CustomTextInput
              icon={Icons.institute}
              placeholder={'Institute'}
              onChangeText={value => this.setState({institute: value})}
              value={institute}
            />
            
            {/* <CustomButton
              title={'CREATE PROFILE'}
              onPress={() => NavService.reset(0, [{name: 'GuardianAppStack'}])}
            /> */}
          </View>
        </ScrollView>
      </CustomBackground>
    );
  }
}

export default App;

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
              <Text style={{color: '#000', fontSize: 16}} numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : item?.city_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
