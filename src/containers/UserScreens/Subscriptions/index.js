

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
  import React, { useState, useEffect } from 'react';
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
  import { Colors } from '../../../config';
  import { loaderStart, loaderStop } from '../../../redux/APIs';
  import Icons from '../../../assets/Icons';
  
  const productIds = Platform.select({
    ios: ['Featured_15'],
    android: ['Featured_15'],
  });
  const subscriptionIds = Platform.select({
    ios: ['Recurring_60', 'Monthly_80'],
    android: ['Recurring_60', 'Monthly_80'],
  });
  const Subscription = () => {
    // let purchaseUpdateSubscription = null;
    // let purchaseErrorSubscription = null;
    // const [iapProducts, setIapProducts] = useState([]);
    // const buyFeature = async (receiptJson, sku, title) => {
    //   // await buyFeatures(receiptJson, sku, 5, title?.split(' ')[0]);
    // };
    // const getAllProducts = async () => {
    //   loaderStart();
    //   try {
    //     const products = await getProducts({skus: productIds});
    //     if (products && products?.length) {
    //       console.log('getProducts',products,'getProducts')
    //       const currentProduct = [...iapProducts];
    //       const mergedProducts = [...currentProduct, ...products];
    //       setIapProducts(mergedProducts);
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   } finally {
    //     loaderStop();
    //     await getAllSubscriptions();
    //   }
    // };
    // const getAllSubscriptions = async () => {
    //   loaderStart();
    //   try {
    //     const products = await getSubscriptions({skus: subscriptionIds});
    //     if (products && products?.length) {
    //       console.log('getSubscriptions',products,'getSubscriptions')
    //       const currentProduct = [...iapProducts];
    //       const mergedProducts = [...currentProduct, ...products];
    //       setIapProducts(mergedProducts);
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    //   loaderStop();
    // };
  
    // const purchase = async () => {
    //   Platform.OS == 'android' &&
    //     flushFailedPurchasesCachedAsPendingAndroid()
    //       .then(() => {
    //         purchaseUpdateSubscription = purchaseUpdatedListener(
    //           async purchase => {
    //             const receipt = purchase.transactionReceipt;
    //             if (receipt) {
    //               console.log('purchase', purchase.productId);
    //               // await this.buyFeature(receipt, purchase.productId);
    //             }
    //             const newPurchase = await getAvailablePurchases();
    //             await finishTransaction(newPurchase[0]);
    //           },
    //         );
  
    //         purchaseErrorSubscription = purchaseErrorListener(error => {
    //           console.warn('purchaseErrorListener', error);
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    // };
  
    // const requestSubscription = async (sku, offerToken, title) => {
    //   try {
    //     loaderStart();
    //     Alert.alert(
    //       Platform.OS == 'android' ? 'Confirm Subscription' : 'Confirmation',
    //       Platform.OS == 'android'
    //         ? 'The Subscription will continue unless cancelled settings atleast 24 hours before the end of the subscription period.'
    //         : 'Are you sure you want to continue the purchase',
    //       [
    //         {
    //           text: 'Cancel',
    //           onPress: () =>
    //             Toast.show({
    //               text1: 'Purchased cancelled',
    //               type: 'error',
    //               visibilityTime: 5000,
    //             }),
    //           style: 'cancel',
    //         },
    //         {
    //           text: 'OK',
    //           onPress: async () => {
    //             const receipt = await requestPurchase(
    //               Platform.select({
    //                 ios: {
    //                   sku,
    //                   andDangerouslyFinishTransactionAutomaticallyIOS: false,
    //                 },
    //                 android: {
    //                   skus: [sku],
    //                   andDangerouslyFinishTransactionAutomaticallyIOS: false,
    //                 },
    //               }),
    //             );
    //             const receiptJson = JSON.stringify(receipt);
    //             await buyFeature(receiptJson, sku, title);
    //           },
    //         },
    //       ],
    //     );
    //     loaderStop();
    //   } catch (error) {
    //     loaderStop();
    //     if (error instanceof PurchaseError) {
    //       console.log({message: `[${error?.code}]: ${error?.message}`, error});
    //     } else {
    //       console.log({message: 'handleBuySubscription', error});
    //     }
    //   }
    // };
    // useEffect(async () => {
    //   await initConnection();
    //   await getAllProducts();
    //   await purchase();
    //   return () => {
    //     if (purchaseUpdateSubscription) {
    //       purchaseUpdateSubscription.remove();
    //       purchaseUpdateSubscription = null;
    //     }
  
    //     if (purchaseErrorSubscription) {
    //       purchaseErrorSubscription.remove();
    //       purchaseErrorSubscription = null;
    //     }
    //   };
    // }, []);
    return (
      <AppBackground
        title={'Subscriptions'}
        profile={false}
        notification={false}
        back
        home>
        <View style={{ height: 400, borderRadius: 10, marginTop: 30 }}>
          <Swiper style={styles.wrapper} showsButtons={false} 
          activeDotColor={Colors.purple}
          // "transparent"
            dotColor={Colors.grey}
            // "transparent"
            >
              {/* //////////////////////////////// */}
            <View style={styles.slide1}>
              <Text style={styles.text}>Featured Post</Text>
              <View
                style={styles.maincontent}>
                <Text
                  style={styles.txt}>
                  $15
                </Text>
              </View>
              <View
                style={styles.container}>
                <View
                  style={styles.maincontainer}>
                  <Image
                    source={Icons.check}
                    resizeMode="contain"
                    style={styles.check}
                  />
                </View>
                <Text
                  style={styles.descrption}>
                  Feature your event across the top and on the featured events page
                </Text>
              </View>
              <View
                style={styles.container}>
                <View
                  style={styles.maincontainer}>
                  <Image
                    source={Icons.check}
                    resizeMode="contain"
                    style={styles.check}
                  />
                </View>
                <Text
                  style={styles.descrption}>
                  Feature your event across the top and on the featured events page
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btncontent}>
                <Text
                  style={styles.btn}>
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
            {/* //////////////////////////////////////////////////// */}
            <View style={styles.slide2}>
            <Text style={styles.text}>Month-to-Month</Text>
              <View
                style={styles.maincontent}>
                <Text
                  style={styles.txt}>
                 $80
                </Text>
              </View>
              <View
                style={styles.container}>
                <View
                  style={styles.maincontainer}>
                  <Image
                    source={Icons.check}
                    resizeMode="contain"
                    style={styles.check}
                  />
                </View>
                <Text
                  style={styles.descrption}>
                  Subscribe a month-to-month package to avail all the features
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btncontent}>
                <Text
                  style={styles.btn}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
            {/* //////////////////////////////////////// */}
            <View style={styles.slide3}>
            <Text style={styles.text}>Monthly recurring</Text>
              <View
                style={styles.maincontent}>
                <Text
                  style={styles.txt}>
                $60
                </Text>
              </View>
              <View
                style={styles.container}>
                <View
                  style={styles.maincontainer}>
                  <Image
                    source={Icons.check}
                    resizeMode="contain"
                    style={styles.check}
                  />
                </View>
                <Text
                  style={styles.descrption}>
                  Subscribe a monthly recurring package to avail all the features 
                </Text>
                
              </View>
              <TouchableOpacity
                style={styles.btncontent}>
                <Text
                  style={styles.btn}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
          </Swiper>
        </View>
      </AppBackground>
    );
  };
  
  const { width, height } = Dimensions.get('window');
  export default Subscription;
  
  const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: 400,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.purple,
      height: 500,
    },
    slide2: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: 400,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.purple,
      height: 500,
    },
    slide3: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: 400,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.purple,
      height: 500,
    },
    text: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20
    },
    maincontent:
    {
      marginVertical: 15,
      backgroundColor: Colors.purple,
      width: '100%',
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt: {
      color: Colors.white, fontSize: 24, fontWeight: 'bold'
    },
    btncontent: {
      borderRadius: 10,
      width: '85%',
      backgroundColor: Colors.purple,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      position: 'absolute',
      bottom: 50
    },
  
    btn: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    maincontainer: {
      backgroundColor: Colors.purple,
      padding: 3,
      borderRadius: 10,
      marginBottom: 15
    },
    check: { width: 10, height: 10, tintColor: Colors.white },
    descrption: { marginLeft: 5, fontSize: 18, color: Colors.black, width: '80%' }
  
  
  
  });
  