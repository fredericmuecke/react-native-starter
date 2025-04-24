import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme/colors';

const Tracks: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={typography.h1}>Tracks</Text>
            <Text style={styles.content}>Tracks Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    content: {
        color: colors.onBackground,
        fontSize: 24,
        marginTop: 20,
    },
});

export default Tracks; 