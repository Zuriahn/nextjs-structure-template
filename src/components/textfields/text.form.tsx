import { TextField, TextFieldPropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { HTMLInputTypeAttribute } from "react";

interface IProps {
  title: string | undefined;
  name: string;
  defaultValue?: string | undefined;
  onError: boolean | undefined;
  errorMsg: string | undefined;
  disabled: boolean;
  size: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  funReturnValue: (value: any) => void,
  type: HTMLInputTypeAttribute | undefined
}

export default function TextfieldForm(props: IProps) {
  return (
    <>
      <TextField
        title={props.title}
        defaultValue={props.defaultValue}
        error={props.onError}
        disabled={props.disabled}
        name={props.name}
        size={props.size}
        type={props.type}
        onChange={(e) => { e.target.value != null ? props.funReturnValue(e.target.value) : undefined}}
        label={props.errorMsg ? props.errorMsg : props.title}
      />
    </>
  );
}
