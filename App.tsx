import {FC, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import MainMenu from './src/screens/MainMenu';

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (<Stack.Screen name='InsideLayout' component={InsideLayout} options={{headerShown:false}}/>)
        : (
            <Stack.Screen name='Login' component={Login}/>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App