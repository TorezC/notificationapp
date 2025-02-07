import { StyleSheet, Text, View, PermissionsAndroid, Linking, Alert } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'



const App = () => {
  useEffect(() => {
    // Foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
        Alert.alert('Shipment Update', remoteMessage.notification.body);
    });

    // Background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Background Message:', remoteMessage);
    });

    return unsubscribe;
}, []);

    async function requestUserPermission(){
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        const authStatus: any = messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if(enabled){
            console.log('Authorized status:', authStatus);
            
        }
    }

    const getToken = async() => {
        const token = await messaging().getToken()
        console.log('Token =', token);
        
    }
console.log('jj')
    useEffect(()=> {
        requestUserPermission()
        getToken()
    }, [])
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})