import React from 'react';
import { Text, StyleSheet } from 'react-native';
import type { IconProps } from 'react-native-vector-icons/Icon';

export const Icon: React.FC<IconProps> = ({ name, size, color }) => {
    return (
        <Text style={[styles.icon, { fontSize: size, color: color as string }]}>
            {name}
        </Text>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontFamily: 'MaterialIcons',
    },
}); 