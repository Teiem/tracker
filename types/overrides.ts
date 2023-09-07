import 'react-native-autocomplete-dropdown';

declare module 'react-native-autocomplete-dropdown' {
    export interface AutocompleteDropdownProps {
        ref?: React.Ref<any>;
    }
}
declare global {
    export interface Array<T> {
        /**
         * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
         */
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U): U;
    }
}