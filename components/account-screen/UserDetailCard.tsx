
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { UserDetails } from '@/lib/accountScreen/mockUserDetails';
import DetailRow from '../ui/DetailRow';
import { useAppTheme } from '../ThemeContext';

type Props = {

    details: UserDetails;
    
};

export default function UserDetailCard({ details }: Props) {

    const { colorScheme } = useAppTheme();
    const theme = Colors[colorScheme];

    const rows = [

        { label: 'Height', value: details.height },
        { label: 'Weight', value: details.weight },
        { label: 'Age', value: String(details.age) },
        { label: 'Activity level', value: details.activityLevel },
        { label: 'Units', value: details.units },

    ];

    return (

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        
        <Text style={[styles.title, { color: theme.textSecondary }]}>User details</Text>

        {rows.map((row) => (
            
            <DetailRow
            key={row.label}
            label={row.label}
            value={row.value}
            labelColor={theme.textSecondary}
            valueColor={theme.textPrimary}
            dividerColor={theme.border}
            />
            
        ))}

        </View>

    );
  
}

const styles = StyleSheet.create({
    
    card: {
        borderRadius: 14,
        padding: 16,
        borderWidth: 1.5,
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },

});