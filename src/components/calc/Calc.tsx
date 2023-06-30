import * as React from 'react';
import { Box, Stack } from '@mui/material';
import Title from './Title';
import { useCalcVM } from './vm';
import { CalcProps } from './types';
import RecipePropertiesDisplay from './RecipePropertyDisplay';
import SectionBuilder from './SectionBuilder';

export default function Calc(props: CalcProps) {
  const vm = useCalcVM(props)

  const sections = vm.recipe.sections.map(section => (
    <SectionBuilder key={section.key} section={section} onChange={(section) => vm.updateSection(section)} />
  ))
  return (
  <Box>
  <Title title={vm.recipe.title} onChange={vm.setTitle} />
  <Stack>
  {sections}
  </Stack>
  <RecipePropertiesDisplay properties={vm.properties} />
  </Box>
  );
}
