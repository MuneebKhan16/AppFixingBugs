import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  initConnection,
  getProducts,
  getSubscriptions,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  requestPurchase,
  PurchaseError,
  finishTransaction,
  getAvailablePurchases,
} from 'react-native-iap';
import AppBackground from '../../../components/AppBackground';
import Swiper from 'react-native-swiper';
import {Colors} from '../../../config';
import {loaderStart, loaderStop} from '../../../redux/APIs';
import Icons from '../../../assets/Icons';
const Data = [
  {
    id: 1,
    name: 'Lorem ipsum dolor text sieut amet',
  },
  {
    id: 2,
    name: 'Lorem ipsum dolor text sieut amet',
  },
  {
    id: 3,
    name: 'Lorem ipsum dolor text sieut amet',
  },
  {
    id: 4,
    name: 'Lorem ipsum dolor text sieut amet',
  },
];
const productIds = Platform.select({
  ios: ['Featured_15'],
  android: ['Featured_15'],
});
const subscriptionIds = Platform.select({
  ios: ['Recurring_60', 'Monthly_80'],
  android: ['Recurring_60', 'Monthly_80'],
});
const EventSubscription = () => {
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;
  const [iapProducts, setIapProducts] = useState([]);
  const buyFeature = async (receiptJson, sku, title) => {
    // await buyFeatures(receiptJson, sku, 5, title?.split(' ')[0]);
  };
  const getProducts = async () => {
    loaderStart();
    try {
      const products = await getProducts({skus: productIds});
      if (products && products?.length) {
        const currentProduct = [...iapProducts];
        const mergedProducts = [...currentProduct, ...products];
        setIapProducts(mergedProducts);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      loaderStop();
      await getSubscriptions();
    }
  };
  const getSubscriptions = async () => {
    loaderStart();
    try {
      const products = await getSubscriptions({skus: subscriptionIds});
      if (products && products?.length) {
        const currentProduct = [...iapProducts];
        const mergedProducts = [...currentProduct, ...products];
        setIapProducts(mergedProducts);
      }
    } catch (err) {
      console.warn(err);
    }
    loaderStop();
  };

  const purchase = async () => {
    Platform.OS == 'android' &&
      flushFailedPurchasesCachedAsPendingAndroid()
        .then(() => {
          purchaseUpdateSubscription = purchaseUpdatedListener(
            async purchase => {
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                console.log('purchase', purchase.productId);
                // await this.buyFeature(receipt, purchase.productId);
              }
              const newPurchase = await getAvailablePurchases();
              await finishTransaction(newPurchase[0]);
            },
          );

          purchaseErrorSubscription = purchaseErrorListener(error => {
            console.warn('purchaseErrorListener', error);
          });
        })
        .catch(error => {
          console.log(error);
        });
  };

  const requestSubscription = async (sku, offerToken, title) => {
    try {
      loaderStart();
      Alert.alert(
        Platform.OS == 'android' ? 'Confirm Subscription' : 'Confirmation',
        Platform.OS == 'android'
          ? 'The Subscription will continue unless cancelled settings atleast 24 hours before the end of the subscription period.'
          : 'Are you sure you want to continue the purchase',
        [
          {
            text: 'Cancel',
            onPress: () =>
              Toast.show({
                text1: 'Purchased cancelled',
                type: 'error',
                visibilityTime: 5000,
              }),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const receipt = await requestPurchase(
                Platform.select({
                  ios: {
                    sku,
                    andDangerouslyFinishTransactionAutomaticallyIOS: false,
                  },
                  android: {
                    skus: [sku],
                    andDangerouslyFinishTransactionAutomaticallyIOS: false,
                  },
                }),
              );
              const receiptJson = JSON.stringify(receipt);
              await buyFeature(receiptJson, sku, title);
            },
          },
        ],
      );
      loaderStop();
    } catch (error) {
      loaderStop();
      if (error instanceof PurchaseError) {
        console.log({message: `[${error?.code}]: ${error?.message}`, error});
      } else {
        console.log({message: 'handleBuySubscription', error});
      }
    }
  };
  useEffect(async () => {
    await initConnection();
    await getProducts();
    await purchase();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);
  return (
    <AppBackground
      title={'Subscriptions'}
      profile={false}
      notification={false}
      back
      home>
      <View style={{marginTop: 20, height: 500}}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          dotColor={Colors.grey}
          activeDotColor={Colors.purple}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Basic Plan</Text>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: Colors.purple,
                width: '100%',
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Colors.white, fontSize: 24, fontWeight: 'bold'}}>
                $9.99
              </Text>
            </View>
            <FlatList
              data={Data}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.purple,
                      padding: 3,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={Icons.check}
                      resizeMode="contain"
                      style={{width: 10, height: 10, tintColor: Colors.white}}
                    />
                  </View>
                  <Text
                    style={{marginLeft: 5, fontSize: 18, color: Colors.black}}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: '80%',
                backgroundColor: Colors.purple,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              <Text
                style={{color: Colors.white, fontSize: 16, fontWeight: 'bold'}}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Basic Plan</Text>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: Colors.purple,
                width: '100%',
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Colors.white, fontSize: 24, fontWeight: 'bold'}}>
                $9.99
              </Text>
            </View>
            <FlatList
              data={Data}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.purple,
                      padding: 3,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={Icons.check}
                      resizeMode="contain"
                      style={{width: 10, height: 10, tintColor: Colors.white}}
                    />
                  </View>
                  <Text
                    style={{marginLeft: 5, fontSize: 18, color: Colors.black}}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: '80%',
                backgroundColor: Colors.purple,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              <Text
                style={{color: Colors.white, fontSize: 16, fontWeight: 'bold'}}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Basic Plan</Text>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: Colors.purple,
                width: '100%',
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Colors.white, fontSize: 24, fontWeight: 'bold'}}>
                $9.99
              </Text>
            </View>
            <FlatList
              data={Data}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.purple,
                      padding: 3,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={Icons.check}
                      resizeMode="contain"
                      style={{width: 10, height: 10, tintColor: Colors.white}}
                    />
                  </View>
                  <Text
                    style={{marginLeft: 5, fontSize: 18, color: Colors.black}}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: '80%',
                backgroundColor: Colors.purple,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              <Text
                style={{color: Colors.white, fontSize: 16, fontWeight: 'bold'}}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    </AppBackground>
  );
};

const {width, height} = Dimensions.get('window');
export default EventSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  swiper: {
    width: 370,
    height: height * 0.4, // Adjust the height as needed
    marginTop: 180,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: 'bold',
  },
  wrapper: {
    height: 500,
    marginTop: 30,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.purple,
    marginHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',

    marginHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',

    marginHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
