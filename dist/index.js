import { __awaiter, __rest } from "tslib";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { findNodeHandle, NativeModules, TextInput, } from 'react-native';
const { RNMoneyInput } = NativeModules;
export const { initializeMoneyInput, extractValue, formatMoney, } = RNMoneyInput;
if (!RNMoneyInput) {
    throw new Error(`NativeModule: RNMoneyInput is null.
To fix this issue try these steps:
  • Rebuild and restart the app.
  • Run the packager with \`--clearCache\` flag.
  • If happening on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app.
`);
}
const MoneyInput = forwardRef((_a, ref) => {
    var { defaultValue, value, onChangeText, locale, onFocus } = _a, rest = __rest(_a, ["defaultValue", "value", "onChangeText", "locale", "onFocus"]);
    // Create a default input
    const [defaultMoney] = useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : value);
    const [defaultLabel] = useState(defaultMoney != null ? formatMoney(defaultMoney, locale) : '');
    // Keep a reference to the actual text input
    const input = useRef(null);
    const [rawValue, setValue] = useState(defaultMoney);
    const [label, setLabel] = useState(defaultLabel);
    // Keep numeric prop in sync with out state
    useEffect(() => {
        if (value != null && value != rawValue) {
            setValue(value);
            setLabel(formatMoney(value, locale));
        }
    }, [value, rawValue]);
    // Convert TextInput to MoneyInput native type
    useEffect(() => {
        const nodeId = findNodeHandle(input.current);
        if (nodeId)
            initializeMoneyInput(nodeId, { locale });
    }, [locale]);
    // Create a false ref interface
    useImperativeHandle(ref, () => ({
        focus: () => {
            var _a;
            (_a = input.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        blur: () => {
            var _a;
            (_a = input.current) === null || _a === void 0 ? void 0 : _a.blur();
        },
    }));
    return (<TextInput {...rest} ref={input} value={label} onFocus={e => {
            if (defaultLabel == "" && !rawValue) {
                setValue(0);
                setLabel(formatMoney(0, locale));
            }
            onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
        }} onChangeText={(label) => __awaiter(void 0, void 0, void 0, function* () {
            const computedValue = extractValue(label, locale);
            setLabel(label);
            setValue(computedValue);
            onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(computedValue, label);
        })}/>);
});
export default MoneyInput;
//# sourceMappingURL=index.js.map