/* eslint-disable prettier/prettier */
import Auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
    webClientId:
        '267078628700-vml9d497rbkm59a29ngmltkfjfqscies.apps.googleusercontent.com',
});

Settings.setAppID('1284024702540652');  

const Google = async () => {
    try {
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        const googleCredential = Auth.GoogleAuthProvider.credential(
            userInfo.idToken,
        );
        const userAuth = await Auth().signInWithCredential(googleCredential);
        
        const { uid, email ,displayName,photoURL,emailVerified } = userAuth.user._user;
        
        if(emailVerified === true){
            return { uid: uid,Email: email ,Name: displayName, Pic:photoURL }
        }
    } catch (error) {
        console.log(error);
    }
};

const Facebook = () => {
   return  LoginManager.logInWithPermissions(['public_profile'])
        .then(async login => {
            if (login.isCancelled) {
                return;
            } else {
                try {
                    const fbAuth = await AccessToken.getCurrentAccessToken();
                    const fbCredential = Auth.FacebookAuthProvider.credential(
                        fbAuth.accessToken,
                    );
                    const userAuth = await Auth().signInWithCredential(fbCredential);
                    const { uid, providerData,displayName,photoURL,emailVerified } = userAuth?.user?._user;
                    return { uid: uid,Email : providerData[0].providerId ,Name: displayName, Pic:photoURL , status:emailVerified };
                } catch (error) {
                    console.log(error);
                }
            }
        })
        .catch((error)=> {
            console.log(error)
        })
};

const Apple = async type => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = Auth?.AppleAuthProvider?.credential(
            identityToken,
            nonce,
        );
        const userAuth = await Auth()?.signInWithCredential(appleCredential);
        const { uid, email } = userAuth?.user;
        console.log('userAuth', userAuth);
    } catch (error) {
        console.log(error);
    }
};

export default { Google, Facebook };
