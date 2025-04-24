import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
    Login: undefined;
    ThemeDemo: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>; 