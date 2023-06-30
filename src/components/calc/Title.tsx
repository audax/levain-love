import { TextField } from '@mui/material';
import * as React from 'react';

interface TitleProps {
  title: string
  onChange: (title: string) => void
}
export default function Title(props: TitleProps) {
  const { title, onChange } = props
  return (
    <TextField
    label="Recipe name"
    value={title}
    onChange={(e) => onChange(e.target.value)}
  />
  );
}