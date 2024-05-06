'use client'
import React, {useState, useEffect, Suspense} from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import {Editor} from "./Editor"


export interface RecipeDescriptionProps {
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
          <Suspense fallback={<div>Loading...</div>}>
        <Editor
          originalText={props.description}
          markdown={description}
          onChange={setDescription}
        />
          </Suspense>
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
