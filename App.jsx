import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from './src/theme/colors';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>All Screen</Text>
  </View>
);

const TracksScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Tracks Screen</Text>
  </View>
);

const NotesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Notes Screen</Text>
  </View>
);

const PlaylistsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Playlists Screen</Text>
  </View>
);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'All':
        return <AllScreen />;
      case 'Tracks':
        return <TracksScreen />;
      case 'Notes':
        return <NotesScreen />;
      case 'Playlists':
        return <PlaylistsScreen />;
      default:
        return <AllScreen />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{currentScreen}</Text>
      </View>
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentScreen('All')}>
          <Icon name="apps" size={24} color={currentScreen === 'All' ? colors.primary : colors.onBackground} />
          <Text style={[styles.tabText, { color: currentScreen === 'All' ? colors.primary : colors.onBackground }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentScreen('Tracks')}>
          <Icon name="music-note" size={24} color={currentScreen === 'Tracks' ? colors.primary : colors.onBackground} />
          <Text style={[styles.tabText, { color: currentScreen === 'Tracks' ? colors.primary : colors.onBackground }]}>Tracks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentScreen('Notes')}>
          <Icon name="note" size={24} color={currentScreen === 'Notes' ? colors.primary : colors.onBackground} />
          <Text style={[styles.tabText, { color: currentScreen === 'Notes' ? colors.primary : colors.onBackground }]}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentScreen('Playlists')}>
          <Icon name="playlist-play" size={24} color={currentScreen === 'Playlists' ? colors.primary : colors.onBackground} />
          <Text style={[styles.tabText, { color: currentScreen === 'Playlists' ? colors.primary : colors.onBackground }]}>Playlists</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  headerText: {
    color: colors.onBackground,
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    color: colors.onBackground,
    fontSize: 24,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default App;
