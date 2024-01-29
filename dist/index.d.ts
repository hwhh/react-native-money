import React from 'react';
import { TextInputProps } from 'react-native';
export declare const initializeMoneyInput: (reactNode: Number, options: any) => void, extractValue: (label: string, locale?: string) => number, formatMoney: (value: Number, locale?: string) => string;
interface Handles {
    focus: () => void;
    blur: () => void;
}
declare const MoneyInput: React.ForwardRefExoticComponent<TextInputProps & {
    value?: number | undefined;
    defaultValue?: number | undefined;
    locale?: string | undefined;
    onChangeText?: ((value: number, label: string) => void) | undefined;
} & React.RefAttributes<Handles>>;
export default MoneyInput;
