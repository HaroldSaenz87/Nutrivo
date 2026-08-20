// components/ui/DateNav.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

type Props = {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  iconColor: string;
  disabledIconColor: string;
  textColor: string;
  buttonBg: string;
  buttonBorder: string;
  disabledButtonBorder: string;
};

export default function DateNavigator({

    label,
    onPrevious,
    onNext,
    nextDisabled,
    iconColor,
    disabledIconColor,
    textColor,
    buttonBg,
    buttonBorder,
    disabledButtonBorder,
}: Props) {


    return (

        <View style={styles.row}>
        <Pressable
            onPress={onPrevious}
            style={[styles.button, { backgroundColor: buttonBg, borderColor: buttonBorder }]}
            accessibilityLabel="Previous day"
        >
            <ChevronLeft size={16} color={iconColor} />

        </Pressable>

        <Text style={[styles.label, { color: textColor }]}>{label}</Text>

        <Pressable
            onPress={onNext}
            disabled={nextDisabled}
            style={[
            styles.button,
            {
                backgroundColor: buttonBg,
                borderColor: nextDisabled ? disabledButtonBorder : buttonBorder,
            },
            ]}
            accessibilityLabel="Next day"
        >
            <ChevronRight size={16} color={nextDisabled ? disabledIconColor : iconColor} />
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25,
        marginBottom: 16,
        
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
});