import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import Listtintuc from './Listtintuc';
import { NavigationContainer } from '@react-navigation/native';
import Newpost from './Newpost';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Setiing from './Setiing';
import Chitiet from './Chitiet';


const Tab = createBottomTabNavigator();
const Stackhome = createNativeStackNavigator();


function tabbbbbtabbbbb() {
  return(
    <View>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Newpost} />
      </Tab.Navigator>
    </NavigationContainer>
  </View>
  )
}

export default function App() {
  return (



        <NavigationContainer>
          <Stackhome.Navigator initialRouteName='Login'>
            <Stackhome.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stackhome.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stackhome.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stackhome.Screen name='Listtintuc' component={Listtintuc} options={{ headerShown: false }} />
            <Stackhome.Screen name='Newpost' component={Newpost}   />
            <Stackhome.Screen name='Chitiet' component={Chitiet}   />
            <Stackhome.Screen name='Setiing' component={Setiing} options={{ headerShown: false }} />
          </Stackhome.Navigator>
        </NavigationContainer>
   

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0bd28a',
  }
})