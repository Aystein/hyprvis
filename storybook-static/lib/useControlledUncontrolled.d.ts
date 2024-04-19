import { Dispatch, SetStateAction } from '../../node_modules/react';

interface ControlledUncontrolledProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: Dispatch<SetStateAction<T>>;
}
export declare function useControlledUncontrolled<T>({ value, defaultValue, onChange, }: ControlledUncontrolledProps<T>): [T, Dispatch<SetStateAction<T>>];
export {};
