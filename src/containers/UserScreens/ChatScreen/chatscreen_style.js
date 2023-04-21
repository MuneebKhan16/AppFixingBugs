import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
export const styles = StyleSheet.create({
  flex: { flex: 1, },
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  msg: {
    width: Dimensions.get('window').width - 20,
  }
});
