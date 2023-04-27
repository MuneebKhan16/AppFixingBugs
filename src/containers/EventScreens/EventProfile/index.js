 /* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import { useSelector } from 'react-redux';
import { styles } from './eventprofile_style';
import { show_eventCreater_event } from '../../../redux/APIs'


const EventProfile = () => {
  const userData = useSelector((state) => state?.reducer?.user)
  const [ showEvents , SetshowEvents] = useState([]);

  const Event_data = async () => {
    const events = await show_eventCreater_event(userData.api_token  );
     SetshowEvents(events.events)
  }
  


  const DateReadbleFunction = (dateIn) => {
    const date = dateIn
    const dates = new Date(date);
    return dates?.toLocaleDateString();
  }

  return (

      <AppBackground gear title={'User Profile'} home back>
        <Mainprofile
          txt
          center
          name={userData?.name}
          subtitle={userData?.email}
          edit
        />
        <View style={styles.content}>
          <View
            style={styles.container}>
            <View>
              <Text
                style={styles.hd1}>
                Joining Date
              </Text>
              <Text
                style={styles.hd2}>
                No. of Events
              </Text>
              <Text
                style={styles.hd3}>
                No. of Attendees
              </Text>
            </View>
            <View>
              <Text style={styles.txt}>{DateReadbleFunction(userData.created_at)}</Text>
              <View style={styles.hdcontent}>
                <Text style={styles.txt}>{showEvents?.length}</Text>
                <Text style={styles.txt}>25</Text>
              </View>
            </View>
          </View>
        </View>
      </AppBackground>

  );
};

export default React.memo(EventProfile);

