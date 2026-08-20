import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import AccountBubble from './ui/AccountBubble';
import { getInitials, mockUserData, UserData } from '@/lib/homeScreen/mockUser';
import { useAppTheme } from './ThemeContext';

type Props = {
    user: UserData;
};

export default function ProfileCard({ user }: Props) {

    const { colorScheme } = useAppTheme();
    const theme = Colors[colorScheme];

    return (
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            
            <AccountBubble 
                initials={getInitials(mockUserData.name)}
                bgColor={theme.background}
                textColor={theme.accentText}
                borderColor={theme.accentText}
                size={56}
            />
    
            <View style={styles.userInfo}>

                <Text style={[styles.name, {color: theme.textPrimary }]}>{mockUserData.name}</Text>
                <Text style={[styles.email, {color: theme.textSecondary }]}>{mockUserData.email}</Text>
            
            </View>

            <Pressable style={[styles.editButton, { borderColor: theme.textSecondary, backgroundColor: theme.card }]}>
            
                <Text style={[styles.editButtonText, { color: theme.textPrimary}]}>Edit Profile</Text>

            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        padding: 18,
        borderWidth: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    userInfo: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    email: {
        fontSize: 13,
        marginTop: 2,
    },
    editButton: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 14,
    },
    editButtonText: {
        fontSize: 13,
    },

});