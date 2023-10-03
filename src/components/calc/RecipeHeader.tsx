import {ButtonGroup, Chip, IconButton, TextField} from "@mui/material";
import * as React from 'react';
import {Cancel, Edit, Save, Scale } from "@mui/icons-material";

interface RecipeHeaderProps {
  name: string
  quantity: number
  onUpdate: (header: { name: string, quantity: number }) => void,
  scaleQuantity: (quantity: number) => void,
  initialEditMode: boolean,
}

export default function RecipeHeader(props: RecipeHeaderProps) {
  const [editMode, setEditMode] = React.useState(props.initialEditMode);
  const [name, setName] = React.useState(props.name);
  const [quantity, setQuantity] = React.useState(props.quantity);
  const nameOrFallback = name || '<Unnamed recipe>'
  const quantityRef = React.useRef<HTMLInputElement>(null)
  const confirmEdit = () => {
    setEditMode(false)
    if (quantity < 1) {
      setQuantity(1)
      props.onUpdate({name, quantity: 1})
    } else {
      props.onUpdate({name, quantity})
    }
  }
  if (editMode) {
    return <h2>
      <TextField sx={{m: 1, width: "25ch"}} value={name} label="Name"
                 onChange={(e) => setName(e.target.value)}/>
      <TextField label="Quantity" type="number" value={quantity}
                 inputRef={quantityRef}
                 sx={{m: 1, width: "5ch" }}
                 onChange={(e) => {
                   setQuantity(Number(e.target.value))
                 }}
      />
      <ButtonGroup variant="outlined">
        <IconButton aria-label="confirm edit" onClick={confirmEdit}>
          <Save/>
        </IconButton>
        <IconButton aria-label="cancel edit" onClick={() => setEditMode(false)}>
          <Cancel/>
        </IconButton>
        <IconButton aria-label="scale recipe" onClick={() => {props.scaleQuantity(quantity)}}>
          <Scale/>
        </IconButton>
      </ButtonGroup>
    </h2>
  } else {
    return <h2>
      <span>{nameOrFallback}</span> <Chip data-testid="recipe-quantity" label={props.quantity}/>
        <IconButton aria-label="edit recipe header" onClick={() => setEditMode(true)}>
          <Edit/>
        </IconButton>
    </h2>
  }
}
