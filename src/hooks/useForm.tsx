import React, { useState } from "react";

export interface IInputValues {
  password?: string;
  token?: string;
  email?: string;
  name?: string;
}

export interface IUseFormReturn {
  values: IInputValues;
  handleChange: (event: any) => void;
  setValues: (value: React.SetStateAction<IInputValues>) => void;
}

export function useForm(inputValues: IInputValues): IUseFormReturn {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: any) => {
    event.preventDefault();
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
