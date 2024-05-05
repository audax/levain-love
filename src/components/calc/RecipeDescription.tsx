import { useState, useEffect } from 'react';
import { TextField, IconButton, Tooltip } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

interface RecipeDescriptionProps {
  readonly description: string;
  readonly updateDescription: (description: string) => void;
}

export default function RecipeDescription(props: RecipeDescriptionProps) {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
      if (props.description !== undefined) {
          setDescription(props.description);
      } else {
          setDescription('');
      }
  }, [props.description]);

  const confirmEdit = () => {
    setEditMode(false);
    props.updateDescription(description);
  };

  if (editMode) {
    return (
      <div>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Tooltip title="Confirm edit">
          <IconButton aria-label="confirm edit" onClick={confirmEdit}>
            <Save/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel edit">
          <IconButton aria-label="cancel edit" onClick={() => {
              setDescription(props.description);
              setEditMode(false)}
          }>
            <Cancel/>
          </IconButton>
        </Tooltip>
      </div>
    );
  } else {
    return (
      <div>
        <p>{description}</p>
        <IconButton aria-label="edit description" onClick={() => setEditMode(true)}>
          <Edit/>
        </IconButton>
      </div>
    );
  }
}
