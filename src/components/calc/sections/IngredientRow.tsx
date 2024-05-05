import * as React from "react";
import {EnrichedIngredient, Ingredient, IngredientType} from "@/data/recipe";
import {ButtonGroup, IconButton, InputAdornment, MenuItem, styled, TableCell, TableRow, TextField, Tooltip} from "@mui/material";
import {Cancel, Delete, Edit, Save, Scale} from "@mui/icons-material";

const StyledTableCell = styled(TableCell)({
    padding: 0,
})

export interface IngredientRowProps {
    ingredient: EnrichedIngredient;
    onChange(ingredient: Ingredient): void;
    onDelete():void;
    onScale(factor: number): void; // add the new onScale prop
    initialEditMode: boolean;
}
export default function IngredientRow(props: Readonly<IngredientRowProps>) {
    const {ingredient, onChange, initialEditMode} = props;
    const [row, setRow] = React.useState(ingredient);
    React.useEffect(() => {
        setRow(ingredient);
    }, [ingredient]);
    const [editMode, setEditMode] = React.useState(initialEditMode);

    const handleScale = () => {
        props.onScale(row.weight / ingredient.weight);
        setEditMode(false);
    };

    const hasHydration = ingredient.type === IngredientType.starter
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
                        <Tooltip title="Remove ingredient">
                            <IconButton size="small" aria-label="remove ingredient" onClick={props.onDelete}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit ingredient">
                            <IconButton size="small" aria-label="edit ingredient" onClick={() => setEditMode(true)}>
                                <Edit/>
                            </IconButton>
                        </Tooltip>
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
                    <Tooltip title="Scale recipe">
                      <span> {/* Add a span to allow the tooltip to be shown even when the button is disabled */}
                          <IconButton size="small" aria-label="scale recipe" onClick={handleScale} disabled={row.weight === 0}>
                          <Scale/>
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Confirm edit">
                        <IconButton aria-label="save ingredient" onClick={commitEdit}>
                            <Save/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel edit">
                        <IconButton aria-label="cancel ingredient" onClick={cancelEdit}>
                            <Cancel/>
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>
            </StyledTableCell>
        </TableRow>
            <TableRow>

            <StyledTableCell colSpan={hasHydration ? 2 : 3}>
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
                <StyledTableCell colSpan={hasHydration ? 1 : 2}>
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
                {hasHydration &&
                    <StyledTableCell colSpan={hasHydration ? 1 : 2}>
                        <TextField
                        value={row.hydration}
                        sx={{m: 1, width: "15ch"}}
                        type="Number"
                        label="Hydration"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        onChange={(e) =>
                            setRow({...row, hydration: Number(e.target.value)})}
                        />
                    </StyledTableCell>
                }
        </TableRow>
            </>
    );
}
