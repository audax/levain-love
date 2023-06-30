import * as React from 'react';
import { Section } from '../../data/recipe';
import { Stack } from '@mui/material';

interface SectionProps {
  section: Section
  onChange: (section: Section) => void
}
export default function DoughBuilder(props: SectionProps) {
  const { section, onChange } = props
  return (
    <div>
      <Stack>
        <h2>{section.name}</h2>
      </Stack>
    </div>
  );
}