import * as React from "react";
import { Ingredient, IngredientType } from "../../../data/recipe";
import { IconButton, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";

interface IngredientRowProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
  onDelete: () => void;
  initialEditMode: boolean;
}

export default function IngredientRow(props: IngredientRowProps) {
  const { ingredient, onChange, initialEditMode } = props;
  const [row, setRow] = React.useState(ingredient);
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


  return (
    <Stack direction={"row"}>
      <TextField
        sx={{ m: 1, width: "25ch" }}
        value={row.name}
        label="Name"
        onChange={(e) => setRow({ ...ingredient, name: e.target.value })}
        InputProps={{
          readOnly,
        }}
      />
      <TextField
        value={row.weight}
        sx={{ m: 1, width: "25ch" }}
        type="Number"
        InputProps={{
          startAdornment: <InputAdornment position="start">g</InputAdornment>,
          readOnly,
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
        InputProps={{ readOnly }}
      >
        {items.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </TextField>

      {editMode && (
        <>
          <IconButton aria-label="save ingredient" onClick={commitEdit}>
            <Save />
          </IconButton>
          <IconButton aria-label="cancel ingredient" onClick={cancelEdit}>
            <Cancel />
          </IconButton>
        </>
      )}
      {!editMode && (
        <>
          <IconButton aria-label="edit ingredient" onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
        <IconButton aria-label="delete ingredient" onClick={props.onDelete}>
          <Delete />
        </IconButton>
        </>
      )}

    </Stack>
  );
}
