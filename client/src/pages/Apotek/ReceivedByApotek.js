import React from "react";
import Navbar from "../../components/Navbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { useStyles } from "../../components/Styles";
import ProductModal from "../../components/Modal";
import clsx from "clsx";
import Loader from "../../components/Loader";

export default function ReceivedByApotek(props) {
  const classes = useStyles();
  const supplyChainContract = props.supplyChainContract;
  const [count, setCount] = React.useState(0);
  const [allReceived, setAllReceived] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navItem = [
    ["Beli Obat", "/Apotek/buy"],
    ["Terima Obat", "/Apotek/receive"],
    ["Daftar Obat", "/Apotek/allReceived"],
  ];
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const cnt = await supplyChainContract.methods.fetchProductCount().call();
      setCount(cnt);
    })();

    (async () => {
      const arr = [];
      for (var i = 1; i < count; i++) {
        const prodState = await supplyChainContract.methods
          .fetchProductState(i)
          .call();

        if (prodState === "8") {
          const prodData = [];
          const a = await supplyChainContract.methods
            .fetchProductPart1(i, "product", 0)
            .call();
          const b = await supplyChainContract.methods
            .fetchProductPart2(i, "product", 0)
            .call();
          const c = await supplyChainContract.methods
            .fetchProductPart3(i, "product", 0)
            .call();
          prodData.push(a);
          prodData.push(b);
          prodData.push(c);
          arr.push(prodData);
        }
      }
      setAllReceived(arr);
      setLoading(false);
    })();
  }, [count]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);

  const handleClose = () => setOpen(false);

  const handleClick = async (prod) => {
    await setModalData(prod);
    setOpen(true);
  };

  return (
    <>
      <div classname={classes.pageWrap}>
        <Navbar pageTitle={"Apotek"} navItems={navItem}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ProductModal
                prod={modalData}
                open={open}
                handleClose={handleClose}
              />
              <h1 className={classes.pageHeading}>Daftar Obat</h1>
              <h3 className={classes.tableCount}>
                Total : {allReceived.length}
              </h3>
              <>
                <div>
                  <Paper className={classes.TableRoot}>
                    <TableContainer className={classes.TableContainer}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              className={classes.TableHead}
                              align="left"
                            >
                              ID
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Kode Obat
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Manufacture
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Tanggal Produksi
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Tanggal Diterima
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Kategori Obat
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Nama Obat
                            </TableCell>
                            <TableCell
                              className={classes.TableHead}
                              align="center"
                            >
                              Nomor Batch
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {allReceived.length !== 0 ? (
                            allReceived
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((prod) => {
                                const d = new Date(parseInt(prod[1][0] * 1000));
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={prod[0][0]}
                                    onClick={() => handleClick(prod)}
                                  >
                                    <TableCell
                                      className={classes.TableCell}
                                      component="th"
                                      align="left"
                                      scope="row"
                                    >
                                      {prod[0][0]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                    >
                                      {prod[1][2]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                    >
                                      {prod[0][4]}
                                    </TableCell>
                                    <TableCell align="center">
                                      {d.toDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                      {d.toDateString()}
                                    </TableCell>
                                    
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[1][4]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[1][1]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[1][3]}
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                          ) : (
                            <> </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={allReceived.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </>
            </>
          )}
        </Navbar>
      </div>
    </>
  );
}
