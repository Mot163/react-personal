import {
    TableContainer,
    Box,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TextField,
    IconButton,
    TableCell
} from '@mui/material';
import { Delete as DeleteIcon, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import AntSwitch from '../base/AntSwitch';
import styled from '@emotion/styled';
import { useState } from 'react';

/**
 * 请求头行结构
 */
interface HeaderRowConstruct {
    isUse: boolean;
    name: string;
    value: string;
}

// 带边框表格元素
const TableCellB = styled(TableCell)({
    textAlign: 'center',
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: 0
});

/**
 * 请求头行
 */
function HeaderRow({
    row,
    index,
    setRow,
    deleteRow
}: {
    row: HeaderRowConstruct;
    index: number;
    setRow: (index: number, newRow: HeaderRowConstruct) => void;
    deleteRow: (index: number) => void;
}) {
    return (
        <TableRow hover>
            <TableCellB>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <AntSwitch
                        checked={row.isUse}
                        size="small"
                        onChange={(e) => setRow(index, Object.assign(row, { isUse: e.target.checked }))}
                    />
                </Box>
            </TableCellB>
            <TableCellB>
                <TextField
                    variant="standard"
                    value={row.name}
                    placeholder="参数名"
                    size="small"
                    fullWidth
                    inputProps={{ style: { padding: '0 5px' } }}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => setRow(index, Object.assign(row, { name: e.target.value }))}
                />
            </TableCellB>
            <TableCellB>
                <TextField
                    variant="standard"
                    value={row.value}
                    placeholder="参数值"
                    size="small"
                    fullWidth
                    inputProps={{ style: { padding: '0 5px' } }}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => setRow(index, Object.assign(row, { value: e.target.value }))}
                />
            </TableCellB>
            <TableCellB>
                <IconButton size="small" onClick={() => deleteRow(index)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCellB>
        </TableRow>
    );
}

/**
 * 请求头
 */
function RequestHeader({ onChange }: { onChange: (newRows: Array<HeaderRowConstruct>) => void }) {
    // 请求头数据
    let [rows, setRows] = useState([{ isUse: true, name: '', value: '' }]);
    // 添加新行
    const addRow = () => {
        const newRows = [...rows];
        newRows.push({ isUse: true, name: '', value: '' });
        setRows(newRows);
        onChange(rows);
    };
    // 设置新行数据
    const setRow = (index: number, newRow: HeaderRowConstruct) => {
        const newRows = [...rows];
        newRows[index] = newRow;
        setRows(newRows);
        onChange(rows);
    };
    // 删除行数据
    const deleteRow = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
        if (newRows.length === 0) {
            newRows.push({ isUse: true, name: '', value: '' });
        }
        onChange(rows);
    };

    return (
        <TableContainer component={Box} sx={{ maxHeight: '100%' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCellB sx={{ width: '40px' }}></TableCellB>
                        <TableCellB sx={{ width: '300px' }}>参数名</TableCellB>
                        <TableCellB>参数值</TableCellB>
                        <TableCellB sx={{ width: '40px' }}>
                            <IconButton size="small" onClick={addRow}>
                                <AddCircleOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </TableCellB>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <HeaderRow key={index} row={row} index={index} setRow={setRow} deleteRow={deleteRow} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RequestHeader;
export type { HeaderRowConstruct };
