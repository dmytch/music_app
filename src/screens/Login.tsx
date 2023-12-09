import {FC, useState} from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login: FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const auth = FIREBASE_AUTH;

    const [test, setTest] = useState<string>('nothing');

    const signIn = async () => {
        setLoading (true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            setTest('Successfully')
        } catch (error) {
            console.log(error);
            if(error instanceof Error) setTest('Sign in failed')
        } finally {
            setLoading(false)
        }
    };

    const signUp = async () => {
        setLoading (true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            setTest('Check your email!')
        } catch (error) {
            console.log(error);
            if(error instanceof Error) setTest('Registration failed')
        } finally {
            setLoading(false)
        }
    };
        
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput style={styles.loginInput} value={email} onChangeText={setEmail} placeholder='Email' autoCapitalize='none'/>
                <TextInput style={styles.loginInput} value={password} onChangeText={setPassword} placeholder='Password' autoCapitalize='none' secureTextEntry/>
                        {loading ? <ActivityIndicator />
                        :   <>
                                <Button title='Login' onPress={signIn}/>
                                <Button title='Create account' onPress={signUp}/>
                            </>}
                        <Text>{test}</Text>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container:{
        padding: 5,
    },
    loginInput:{
        borderWidth: 2,
        borderStyle:'solid',
        borderColor:'black'
    }
})