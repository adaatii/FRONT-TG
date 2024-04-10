import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    Paper,
    IconButton
} from '@mui/material';
import { ArrowLineLeft, CaretLeft, CaretRight, ArrowLineRight, Pencil, Trash } from '@phosphor-icons/react';

export interface EmployeeData {
    id: number;
    name: string;
    email: string;
    cpf: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}

interface TableDefaultProps {
    data: EmployeeData[];
    onModalChange: (modal: boolean, employeeData?: EmployeeData) => void; // Ajuste aqui
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}


function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <ArrowLineRight /> : <ArrowLineLeft />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <CaretRight /> : <CaretLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <CaretLeft /> : <CaretRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <ArrowLineLeft /> : <ArrowLineRight />}
            </IconButton>
        </Box>
    );
}

export default function TableDefault({ data, onModalChange }: TableDefaultProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [activeButton, setActiveButton] = useState(false);
    const handleActiveButton = (modal: boolean, employeeData?: EmployeeData) => {
        onModalChange(modal, employeeData);
        setActiveButton(modal);
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Funcionário</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Data de Criação</TableCell>
                        <TableCell align="center">Data de Atualização</TableCell>
                        <TableCell align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.email}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.cpf}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.status ? 'Ativo' : 'Inativo'}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.created_at}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                {row.updated_at}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                                <div>
                                    <IconButton color='success' onClick={() => handleActiveButton(true, row)}>
                                        <Pencil weight="fill" />
                                    </IconButton>
                                    <IconButton color='error'>
                                        <Trash weight="fill" />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'linhas por página',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}