import {FC, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { PaperProvider } from 'react-native-paper';

import Login from './src/screens/Login';
import MainMenu from './src/screens/MainMenu';

import useFontFetch from './src/Hooks/useFontFetch';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='MainMenu' component={MainMenu}/>
    </InsideStack.Navigator>
  )
};

const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    });
  }, [])

  const [fontsLoaded, fontError] = useFontFetch();

  useEffect(()=>{
    const fontFetch = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };
    fontFetch()
  },[fontsLoaded, fontError])

  if(!fontsLoaded && !fontError) return null

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName='Login'>
          {user ? (<Stack.Screen name='InsideLayout' component={InsideLayout} options={{headerShown:false}}/>)
          : (
              <Stack.Screen name='Login' component={Login}/>
            )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App