import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface ControlledUncontrolledProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: Dispatch<SetStateAction<T>>;
}

export function useControlledUncontrolled<T>({
  value,
  defaultValue,
  onChange = () => { },
}: ControlledUncontrolledProps<T>): [T, Dispatch<SetStateAction<T>>] {
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Controlled mode
  if (value !== undefined) {
    return [value as T, onChange];
  }

  const handleChange: Dispatch<SetStateAction<T>> = useCallback((val: T) => {
    setInternalValue(val);
    onChange?.(val);
  }, []);

  // Uncontrolled mode
  return [internalValue as T, handleChange];
}