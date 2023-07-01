import * as React from "react";
import { Ingredient, IngredientType } from "../../../data/recipe";
import { IconButton, InputAdornment, MenuItem, Paper, Stack, TextField, styled } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

interface IngredientRowProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
  onDelete: () => void;
  initialEditMode: boolean;
}

export default function IngredientRow(props: IngredientRowProps) {
  const { ingredient, onChange, initialEditMode } = props;
  const [row, setRow] = React.useState(ingredient);
  React.useEffect(() => {
    setRow(ingredient);
  }, [ingredient]);
  const [editMode, setEditMode] = React.useState(initialEditMode);

  const commitEdit = () => {
    onChange(row);
    setEditMode(false);
  };
  const cancelEdit = () => {
    setRow(ingredient);
    setEditMode(false);
  };

  const readOnly = !editMode;

  const items: IngredientType[] = [];
  for (const type in IngredientType) {
    items.push(IngredientType[type as keyof typeof IngredientType]);
  }

  if (!editMode) {
    return (
      <Stack direction={"row"}>
        <Item>{ingredient.name}</Item>
        <Item>{ingredient.weight}g</Item>
        <Item>{ingredient.type}</Item>
        <Item>
          <IconButton aria-label="edit ingredient" onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
        </Item>
        <Item>
          <IconButton aria-label="delete ingredient" onClick={props.onDelete}>
            <Delete />
          </IconButton>
        </Item>
      </Stack>
    );
  }

  return (
    <Stack direction={"row"}>
      <TextField sx={{ m: 1, width: "25ch" }} value={row.name} label="Name" onChange={(e) => setRow({ ...ingredient, name: e.target.value })} />
      <TextField
        value={row.weight}
        sx={{ m: 1, width: "25ch" }}
        type="Number"
        InputProps={{
          startAdornment: <InputAdornment position="start">g</InputAdornment>,
        }}
        label="Weight"
        onChange={(e) => setRow({ ...ingredient, weight: Number(e.target.value) })}
      />
      <TextField
        select
        value={row.type}
        sx={{ m: 1, width: "25ch" }}
        label="Type"
        onChange={(e) => setRow({ ...ingredient, type: e.target.value as IngredientType })}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <IconButton aria-label="save ingredient" onClick={commitEdit}>
        <Save />
      </IconButton>
      <IconButton aria-label="cancel ingredient" onClick={cancelEdit}>
        <Cancel />
      </IconButton>
    </Stack>
  );
}
