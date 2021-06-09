import './Table.css';
import React, { useContext,useMemo } from "react";
import {formatNumber} from '../Utilities/formatNumber';
import { CountriesDataContext } from "../../Data/CountriesData";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tb from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow  from '@material-ui/core/TableRow';
const columns = [
  { id: "country", label: "country", minWidth: 100 },
  { id: "cases", label: "cases", minWidth: 100 },
  { id: "recovered", label: "recovered", minWidth: 100 },
  { id: "deaths", label: "deaths", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width  : '100%',
    padding: '10px 30px',
  },
  container: {
    maxHeight: 300,
  },
  trHead : {
    backgroundColor:'#efefef',
    fontWeight: 'bold',
    fontSize: '17px',
    textAlign: 'center',
    textDecoration: 'underline',
}
});

export default function Table() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const AllCountriesData = useContext(CountriesDataContext);
  const rows = useMemo(() => {
      if (AllCountriesData !== null) {
        return AllCountriesData.map(({ country, cases, recovered, deaths }) => ({ country, cases, recovered, deaths }))
      } 
      return {}
  }, [AllCountriesData]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <section className="table-section table">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Tb stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        className={classes.trHead}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.country}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {typeof value === "number"
                                    ? formatNumber(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Tb>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 10, 15]}
              component="div"
              count={rows.length > 0 ? rows.length : 200}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
    </section>
  );
}
