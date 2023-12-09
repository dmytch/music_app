import {FC} from 'react';
import { Text, View, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const MainMenu: FC = () => {

    return (
        <View>
            <Text>
                Main menu
            </Text>
            <Button title='Log out' onPress={()=>{FIREBASE_AUTH.signOut()}}/>
        </View>
    );
};

export default MainMenu;