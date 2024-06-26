import {Section, SectionType} from "@/data/recipe";
import {ButtonGroup, Chip, IconButton, MenuItem, TextField, Tooltip} from "@mui/material";
import React, {useEffect} from "react";
import {Cancel, Delete, Edit, Save} from "@mui/icons-material";

export interface SectionHeaderProps {
    section: Section,
    onUpdate( name: string, type: SectionType): void,
    remove: () => void,
    initialEditMode: boolean,
}

export default function SectionHeader(props: Readonly<SectionHeaderProps>) {
    const [editMode, setEditMode] = React.useState(props.initialEditMode);
    const [name, setName] = React.useState(props.section.name);
    const [type, setType] = React.useState(props.section.type);

    useEffect(() => {
        setName(props.section.name)
        setType(props.section.type)
    }, [props.section.name, props.section.type])

    const confirmEdit = () => {
        setEditMode(false)
        props.onUpdate(name, type)
    }
    if (editMode) {
        return <h2>
            <TextField sx={{m: 1, width: "25ch"}} value={name} label="Name"
                       onChange={(e) => setName(e.target.value)}/>
            <TextField
                select
                value={type}
                sx={{m: 1, width: "15ch"}}
                label="Type"
                onChange={(e) => setType(e.target.value as SectionType)}
            >
                {Object.values(SectionType).map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </TextField>
            <ButtonGroup variant="outlined">
                <Tooltip title="Confirm edit">
                <IconButton aria-label="confirm edit" onClick={confirmEdit}>
                    <Save/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Cancel edit">
                <IconButton aria-label="cancel edit" onClick={() => {
                    setName(props.section.name)
                    setType(props.section.type)
                    setEditMode(false)}
                }>
                    <Cancel/>
                </IconButton>
                </Tooltip>
            </ButtonGroup>
        </h2>
    } else {
        return <h2>
            {name} <Chip label={type}/>
            <ButtonGroup variant="outlined">
                <Tooltip title="Remove section">
                    <IconButton aria-label="remove section" onClick={props.remove}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit section header">
                    <IconButton aria-label="edit section header" onClick={() => setEditMode(true)}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        </h2>
    }
}
