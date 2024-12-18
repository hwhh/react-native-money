import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';

import { findNodeHandle, NativeModules, TextInput, TextInputProps, } from 'react-native';

const {RNMoneyInput} = NativeModules as { RNMoneyInput: NativeExports };


if (!RNMoneyInput) {
    throw new Error(`NativeModule: RNMoneyInput is null.
To fix this issue try these steps:
  • Rebuild and restart the app.
  • Run the packager with \`--clearCache\` flag.
  • If happening on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app.
`);
}

type NativeExports = {
    // initializeMoneyInput: (reactNode: Number, options: any) => void;
    // formatMoney: (value: Number, locale?: string) => string;
    // extractValue: (label: string, locale?: string) => number;
};

type MoneyInputProps = TextInputProps & {
    value?: number;
    defaultValue?: number;
    locale?: string;
    onChangeText?: (value: number, label: string) => void;
};

interface Handles {
    focus: () => void;
    blur: () => void;
}

const MoneyInput = forwardRef<Handles, MoneyInputProps>(
    ({defaultValue, value, onChangeText, locale, onFocus, ...rest}: MoneyInputProps, ref: any) => {

        const formatMoney = (value: number, locale = 'en_US') => {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
            }).format(value);

        };

        const extractValue = (formattedValue: string) => {
            // Implement extraction logic
            // Remove currency symbols and format
            const numberString = formattedValue.replace(/[^0-9.-]+/g, '');
            return parseFloat(numberString);
        }
        
        // Create a default input
        const [defaultMoney] = useState(defaultValue ?? value);
        const [defaultLabel] = useState(
            defaultMoney != null ? formatMoney(defaultMoney, locale) : ''
        );

        // Keep a reference to the actual text input
        const input = useRef<TextInput>(null);
        const [rawValue, setValue] = useState<number | undefined>(defaultMoney);
        const [label, setLabel] = useState<string>(defaultLabel);

       

        // Keep numeric prop in sync with out state
        useEffect(() => {
            if (value != null && value != rawValue) {
                setValue(value);
                setLabel(formatMoney(value, locale));
            }
        }, [value, rawValue]);

        // Create a false ref interface
        useImperativeHandle(ref, () => ({
            focus: () => {
                input.current?.focus();
            },
            blur: () => {
                input.current?.blur();
            },
        }));

        return (
            <TextInput
                {...rest}
                ref={input}
                value={label}
                onFocus={(e) => {
                    if (defaultLabel == '' && !rawValue) {
                        setValue(0);
                        setLabel(formatMoney(0, locale));
                    }

                    onFocus?.(e);
                }}
                onChangeText={async (label: string) => {
                    const computedValue = extractValue(label);
                    setLabel(label);
                    setValue(computedValue);
                    onChangeText?.(computedValue, label);
                }}
            />
        );
    }
);

export default MoneyInput;
