
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type Props = {

    label: string;
    value: string;
    labelColor: string;
    valueColor: string;
    dividerColor: string;
    
};

export default function DetailRow({ label, value, labelColor, valueColor, dividerColor }: Props) {

    return (
        
        <View style={[styles.row, { borderTopColor: dividerColor }]}>
        
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
        
        </View>

    );

}

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderTopWidth: 1,
    },
    label: {
        fontSize: 13,
    },
    value: {
        fontSize: 13,
    },

});