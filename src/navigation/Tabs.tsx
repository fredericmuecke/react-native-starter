import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import All from '../screens/All/All';
import Tracks from '../screens/Tracks/Tracks';
import Notes from '../screens/Notes/Notes';
import Playlists from '../screens/Playlists/Playlists';
import { View, Text, StyleSheet, Platform } from 'react-native';

const TabIcon = ({ label, color }: { label: string; color: string }) => (
    <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color }]}>{label}</Text>
    </View>
);

export type TabParamList = {
    All: undefined;
    Tracks: undefined;
    Notes: undefined;
    Playlists: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#202018',
                    borderTopWidth: 0,
                    borderWidth: 0,
                    borderColor: '#202018',
                    elevation: 0,
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 15,
                    ...Platform.select({
                        ios: {
                            shadowColor: '#202018',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0,
                            shadowRadius: 0,
                        },
                        android: {
                            elevation: 0,
                            borderTopColor: '#202018',
                        },
                    }),
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#FFFFFF',
                headerStyle: {
                    backgroundColor: '#202018',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    borderTopWidth: 0,
                    borderWidth: 0,
                },
                headerTintColor: '#FFFFFF',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 4,
                },
            }}>
            <Tab.Screen
                name="All"
                component={All}
                options={{
                    title: 'All',
                    tabBarIcon: ({ color }) => (
                        <TabIcon label="A" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tracks"
                component={Tracks}
                options={{
                    title: 'Tracks',
                    tabBarIcon: ({ color }) => (
                        <TabIcon label="T" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notes"
                component={Notes}
                options={{
                    title: 'Notizen',
                    tabBarIcon: ({ color }) => (
                        <TabIcon label="N" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Playlists"
                component={Playlists}
                options={{
                    title: 'Playlists',
                    tabBarIcon: ({ color }) => (
                        <TabIcon label="P" color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 24,
        fontWeight: 'bold',
    },
}); 