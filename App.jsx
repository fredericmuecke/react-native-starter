import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, PermissionsAndroid, Platform, Modal } from 'react-native';
import { colors } from './src/theme/colors';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';

const AllScreen = ({ onFilesLoaded }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    requestPermissionAndLoadFiles();
  }, []);

  const requestPermissionAndLoadFiles = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // Für Android 13 und höher
          const mediaPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
            {
              title: "Zugriff auf Audio-Dateien",
              message: "Die App benötigt Zugriff auf Ihre Audio-Dateien.",
              buttonNeutral: "Später fragen",
              buttonNegative: "Abbrechen",
              buttonPositive: "OK"
            }
          );

          if (mediaPermission === PermissionsAndroid.RESULTS.GRANTED) {
            loadFiles();
          } else {
            console.log("Audio-Berechtigung verweigert");
            setLoading(false);
          }
        } else {
          // Für Android 12 und niedriger
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Zugriff auf Dateien",
              message: "Die App benötigt Zugriff auf Ihre Dateien.",
              buttonNeutral: "Später fragen",
              buttonNegative: "Abbrechen",
              buttonPositive: "OK"
            }
          );

          if (storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
            loadFiles();
          } else {
            console.log("Speicher-Berechtigung verweigert");
            setLoading(false);
          }
        }
      } else {
        // Für iOS
        loadFiles();
      }
    } catch (err) {
      console.warn("Fehler bei der Berechtigungsanfrage:", err);
      setLoading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const path = RNFS.DownloadDirectoryPath;
      console.log('Suche in Verzeichnis:', path);

      const result = await RNFS.readDir(path);
      console.log('Gefundene Dateien:', result.length);

      const audioFiles = result
        .filter(file => file.name.toLowerCase().endsWith('.mp3') || file.name.toLowerCase().endsWith('.wav'))
        .map(file => ({
          name: file.name,
          path: file.path,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.name.toLowerCase().endsWith('.mp3') ? 'MP3' : 'WAV',
          mtime: file.mtime // Zeitstempel der letzten Änderung
        }));

      console.log('Gefundene Audio-Dateien:', audioFiles.length);
      setFiles(audioFiles);
      onFilesLoaded(audioFiles.length);
    } catch (error) {
      console.error('Fehler beim Laden der Dateien:', error);
      onFilesLoaded(0);
    } finally {
      setLoading(false);
    }
  };

  const sortFiles = (files) => {
    return [...files].sort((a, b) => {
      if (sortBy === 'date') {
        return b.mtime - a.mtime; // Neueste zuerst
      } else {
        return a.name.localeCompare(b.name); // Alphabetisch
      }
    });
  };

  const sortOptions = [
    { id: 'date', label: 'Datum (neueste zuerst)', icon: 'sort' },
    { id: 'name', label: 'Name (A-Z)', icon: 'sort-by-alpha' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.id === sortBy);
    return option ? option.label : 'Sortieren nach';
  };

  const renderSortMenu = () => (
    <Modal
      visible={showSortMenu}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSortMenu(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowSortMenu(false)}
      >
        <View style={styles.sortMenu}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.sortMenuItem}
              onPress={() => {
                setSortBy(option.id);
                setShowSortMenu(false);
              }}
            >
              <Icon
                name={option.icon}
                size={20}
                color={sortBy === option.id ? colors.primary : colors.onBackground}
              />
              <Text style={[
                styles.sortMenuItemText,
                sortBy === option.id && styles.sortMenuItemTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderItem = ({ item }) => (
    <View style={styles.fileItem}>
      <Icon name="music-note" size={24} color={colors.primary} />
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{item.name}</Text>
        <Text style={styles.fileDetails}>{item.type} • {item.size}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Lade Dateien...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortMenu(true)}
        >
          <Text style={styles.sortButtonText}>{getCurrentSortLabel()}</Text>
          <Icon name="arrow-drop-down" size={24} color={colors.onBackground} />
        </TouchableOpacity>
      </View>
      {renderSortMenu()}
      {files.length === 0 ? (
        <Text style={styles.text}>Keine Audio-Dateien gefunden</Text>
      ) : (
        <FlatList
          data={sortFiles(files)}
          renderItem={renderItem}
          keyExtractor={item => item.path}
          style={styles.list}
        />
      )}
    </View>
  );
};

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
  const [audioFileCount, setAudioFileCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'All':
        return <AllScreen onFilesLoaded={setAudioFileCount} />;
      case 'Tracks':
        return <TracksScreen />;
      case 'Notes':
        return <NotesScreen />;
      case 'Playlists':
        return <PlaylistsScreen />;
      default:
        return <AllScreen onFilesLoaded={setAudioFileCount} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentScreen}
          {currentScreen === 'All' && audioFileCount > 0 && ` (${audioFileCount})`}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentScreen('All')}>
          <Icon name="apps" size={24} color={currentScreen === 'All' ? colors.primary : colors.onBackground} />
          <Text style={[styles.tabText, { color: currentScreen === 'All' ? colors.primary : colors.onBackground }]}>
            All
            {audioFileCount > 0 && ` (${audioFileCount})`}
          </Text>
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
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
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
  list: {
    width: '100%',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  fileName: {
    color: colors.onBackground,
    fontSize: 16,
  },
  fileDetails: {
    color: colors.onBackground,
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  sortContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'flex-start',
    width: '100%',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  sortButtonText: {
    color: colors.onBackground,
    fontSize: 16,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  sortMenu: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sortMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortMenuItemText: {
    color: colors.onBackground,
    fontSize: 16,
    marginLeft: 12,
  },
  sortMenuItemTextActive: {
    color: colors.primary,
  },
});

export default App;
