'use client'
import React, {useState, useEffect, Suspense} from 'react';
import {Alert, Card, CardActions, CardContent, IconButton, Tooltip} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import {Editor} from "./Editor"
import Typography from "@mui/material/Typography";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'



export interface RecipeDescriptionProps {
  readonly description: string;
  readonly updateDescription: (description: string) => void;
}

export default function RecipeDescription(props: RecipeDescriptionProps) {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');

  const descriptionTooLong = (description.length >= 100000) ?
      <Alert severity="warning">
          Description is too long and will be shortened to 100.000 characters from currently {description.length} characters.
      </Alert> : <></>


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
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Description
                </Typography>
          {descriptionTooLong}
          <Suspense fallback={<div>Loading...</div>}>
            <Editor
              originalText={props.description}
              markdown={description}
              onChange={setDescription}
            />
          </Suspense>
            </CardContent>

            <CardActions>
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
        </Tooltip></CardActions>
      </Card>
    );
  } else {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Description
                </Typography>
            {descriptionTooLong}
            <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
            </CardContent>
            <CardActions>
        <IconButton aria-label="edit description" onClick={() => setEditMode(true)}>
          <Edit/>
        </IconButton></CardActions>
      </Card>
    );
  }
}
