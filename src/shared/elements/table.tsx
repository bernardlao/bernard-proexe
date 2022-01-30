import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { ITableColumn, ITableHead, ITableRow } from "../interfaces/table";
import { Button } from "@mui/material";
import styled from "styled-components";

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order: string, orderBy: string) => {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array: ITableRow[], comparator: any) => {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
};

const EnhancedTableHead = (props: ITableHead) => {
  const { order, orderBy, onRequestSort, columns, hasEdit, hasDelete } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? "right" : "left"}
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.id ? order : false}
            style={{ display: column.hidden ? "none" : "table-cell" }}
          >
            {column.hasSort ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
        {hasEdit && (
          <TableCell width="100px" key="edit" align="center">
            Edit
          </TableCell>
        )}
        {hasDelete && (
          <TableCell width="100px" key="delete" align="center">
            Delete
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

interface Props {
  columns: ITableColumn[];
  data: ITableRow[];
  onEdit?: (user: ITableRow) => void;
  onDelete?: (user: ITableRow) => void;
}

const EnhancedTable: React.FC<Props> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  const columnsInOrder = columns.map(item => item.id);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order as any}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
              hasEdit={onEdit !== undefined}
              hasDelete={onDelete !== undefined}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map(
                (row: ITableRow, index: number) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      {(columnsInOrder || []).map((key, idx) => {
                        const value = row[key];
                        const columnData = columns.find(
                          (col) => col.id === key
                        );
                        const alignment = columnData
                          ? columnData.numeric
                            ? "right"
                            : "left"
                          : "left";
                        const hidden = columnData?.hidden ?? false;
                        return (
                          <TableCell
                            style={{
                              display: hidden ? "none" : "table-cell",
                            }}
                            align={alignment}
                            key={`${index}_${idx}`}
                          >
                            {value ? value : 'N/A'}
                          </TableCell>
                        );
                      })}
                      {onEdit && (
                        <TableCell align="center" key={`${index}_edit`}>
                          <Button
                            onClick={() => onEdit(row)}
                            color="warning"
                            variant="contained"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      )}
                      {onDelete && (
                        <TableCell align="center" key={`${index}_delete`}>
                          <Button
                            onClick={() => onDelete(row)}
                            color="error"
                            variant="contained"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                }
              )}

              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
          {data.length === 0 && (
            <StyledEmptyMessage>No Records Found</StyledEmptyMessage>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default EnhancedTable;

const StyledEmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 50vh;
`;
