import {ButtonGroup, Chip, IconButton, TextField, Tooltip} from "@mui/material";
import * as React from 'react';
import {Cancel, Edit, Save, Scale } from "@mui/icons-material";
import {useEffect} from "react";

interface RecipeHeaderProps {
  readonly title: string
  readonly quantity: number
  readonly onUpdate: (title: string, quantity: number) => void,
  readonly scaleQuantity: (quantity: number) => void,
  readonly initialEditMode: boolean,
}

export default function RecipeHeader(props: RecipeHeaderProps) {
  const [editMode, setEditMode] = React.useState(props.initialEditMode);
  const [title, setTitle] = React.useState(props.title);
  const [quantity, setQuantity] = React.useState(props.quantity);

  useEffect(() => {
    setTitle(props.title)
    setQuantity(props.quantity)
  }, [props.title, props.quantity])

  const titleOrFallback = title || "Untitled recipe"
  const quantityRef = React.useRef<HTMLInputElement>(null)
  const confirmEdit = () => {
    setEditMode(false)
    if (quantity < 1) {
      setQuantity(1)
      props.onUpdate(title, 1)
    } else {
      props.onUpdate(title, quantity)
    }
  }
  if (editMode) {
    return <h2>
      <TextField sx={{m: 1, width: "25ch"}} value={title} label="Name"
                 onChange={(e) => {
                   const newTitle = e.target.value
                   if (newTitle !== title) {
                     setTitle(newTitle)
                   }
                 }}/>
      <TextField label="Quantity" type="number" value={quantity}
                 inputRef={quantityRef}
                 sx={{m: 1, width: "5ch" }}
                 onChange={(e) => {
                   const newQuantity = Number(e.target.value)
                   if (newQuantity !== quantity) {
                     setQuantity(Number(e.target.value))
                   }
                 }}
      />
      <ButtonGroup variant="outlined">
        <Tooltip title="Confirm edit">
          <IconButton aria-label="confirm edit" onClick={confirmEdit}>
            <Save/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel edit">
        <IconButton aria-label="cancel edit" onClick={() => setEditMode(false)}>
          <Cancel/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Scale the recipe to this quantity">
          <IconButton aria-label="scale recipe" onClick={() => {props.scaleQuantity(quantity)}}>
            <Scale/>
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </h2>
  } else {
    return <h2>
      <span data-testid="recipe-name">{titleOrFallback}</span> <Chip data-testid="recipe-quantity" label={props.quantity}/>
        <IconButton aria-label="edit recipe header" onClick={() => setEditMode(true)}>
          <Edit/>
        </IconButton>
    </h2>
  }
}
