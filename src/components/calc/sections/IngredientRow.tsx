import * as React from "react";
import {EnrichedIngredient, Ingredient, IngredientType} from "@/data/recipe";
import {IconButton, InputAdornment, MenuItem, TextField, styled, TableRow, TableCell, ButtonGroup} from "@mui/material";
import {Cancel, Delete, Edit, Save} from "@mui/icons-material";

const StyledTableCell = styled(TableCell)({
    padding: 0,
})

interface IngredientRowProps {
    ingredient: EnrichedIngredient;
    onChange: (ingredient: Ingredient) => void;
    onDelete: () => void;
    initialEditMode: boolean;
}

export default function IngredientRow(props: IngredientRowProps) {
    const {ingredient, onChange, initialEditMode} = props;
    const [row, setRow] = React.useState(ingredient);
    React.useEffect(() => {
        setRow(ingredient);
    }, [ingredient]);
    const [editMode, setEditMode] = React.useState(initialEditMode);

    const commitEdit = () => {
        setEditMode(false);
        onChange(row);
    };
    const cancelEdit = () => {
        setRow(ingredient);
        setEditMode(false);
    };

    const items: IngredientType[] = [];
    for (const type in IngredientType) {
        items.push(IngredientType[type as keyof typeof IngredientType]);
    }

    if (!editMode) {
        return (
            <TableRow

            >
                <StyledTableCell>{ingredient.name}</StyledTableCell>
                <StyledTableCell align="right"><span>{ingredient.weight}</span>&nbsp;g</StyledTableCell>
                <StyledTableCell align="right"><span>{ingredient.pct.toFixed(2)}</span>&nbsp;%</StyledTableCell>
                <StyledTableCell align="right">{ingredient.type}</StyledTableCell>
                <StyledTableCell align="right">
                    <ButtonGroup variant="outlined">
                        <IconButton size="small" aria-label="delete ingredient" onClick={props.onDelete}>
                            <Delete/>
                        </IconButton>
                        <IconButton size="small" aria-label="edit ingredient" onClick={() => setEditMode(true)}>
                            <Edit/>
                        </IconButton>
                    </ButtonGroup>
                </StyledTableCell>
            </TableRow>
        )
    }

    return (
        <>
        <TableRow
        >
            <StyledTableCell colSpan={4}>
                <TextField sx={{m: 1, width: "25ch"}} value={row.name} label="Name"
                           onChange={(e) => setRow({...row, name: e.target.value})}/>
            </StyledTableCell>
            <StyledTableCell>
                <ButtonGroup variant="outlined">

                    <IconButton aria-label="save ingredient" onClick={commitEdit}>
                        <Save/>
                    </IconButton>
                    <IconButton aria-label="cancel ingredient" onClick={cancelEdit}>
                        <Cancel/>
                    </IconButton>
                </ButtonGroup>
            </StyledTableCell>
        </TableRow>
            <TableRow>

            <StyledTableCell colSpan={3}>
                <TextField
                    value={row.weight}
                    sx={{m: 1, width: "15ch"}}
                    type="Number"
                    label="Weight"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                    onChange={(e) => setRow({...row, weight: Number(e.target.value)})}
                />
            </StyledTableCell>
                <StyledTableCell colSpan={2}>
                    <TextField
                        select
                        value={row.type}
                        sx={{m: 1, width: "15ch"}}
                        label="Type"
                        onChange={(e) => setRow({...row, type: e.target.value as IngredientType})}
                    >
                        {items.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                </StyledTableCell>
        </TableRow>
            </>
    );
}
