import React from "react";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleDataContext";
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

export default function ShipDistributor(props) {
  const classes = useStyles();
  const supplyChainContract = props.supplyChainContract;
  const { roles } = useRole();
  const [count, setCount] = React.useState(0);
  const [allSoldProducts, setAllSoldProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navItem = [
    ["Beli Obat", "/Distributor/allObats"],
    ["Terima Obat", "/Distributor/receive"],
    ["Kirim Obat", "/Distributor/ship"],
  ];
  const [alertText, setalertText] = React.useState("");
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

        if (prodState === "4") {
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
      setAllSoldProducts(arr);
      setLoading(false);
    })();
  }, [count]);

  const handleSetTxhash = async (id, hash) => {
    await supplyChainContract.methods
      .setTransactionHash(id, hash)
      .send({ from: roles.manufacturer, gas: 900000 });
  };

  const handleShipButton = async (id) => {
    try{
      await supplyChainContract.methods
      .shipByDistributor(id)
      .send({ from: roles.distributor, gas: 1000000 })
      .on("transactionHash", function (hash) {
        handleSetTxhash(id, hash);
      });
     setCount(0);
    }catch{
      setalertText("Kamu Bukan Pemilik Produk Ini")
    }
   
  };
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
        <Navbar pageTitle={"Distributor"} navItems={navItem}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ProductModal
                prod={modalData}
                open={open}
                handleClose={handleClose}
              />
              <h1 className={classes.pageHeading}>Obat Yang Dikirimkan</h1>
              <h3 className={classes.tableCount}>
                Total : {allSoldProducts.length}
              </h3>

              <div>
              <p><b style={{ color: "red" }}>{alertText.length !== 0 ? alertText : ""}</b></p>
                <Paper className={classes.TableRoot}>
                  <TableContainer className={classes.TableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.TableHead} align="left">
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
                            Tanggal Diterima
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
                          <TableCell
                            className={clsx(
                              classes.TableHead,
                              classes.AddressCell
                            )}
                            align="center"
                          >
                            Pembeli
                          </TableCell>
                          <TableCell
                            className={clsx(classes.TableHead)}
                            align="center"
                          >
                            Kirim
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allSoldProducts.length !== 0 ? (
                          allSoldProducts
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((prod) => {
                              const d = new Date(parseInt(prod[1][0] * 1000));
                              return (
                                <>
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={prod[0][0]}
                                  >
                                    <TableCell
                                      className={classes.TableCell}
                                      component="th"
                                      align="left"
                                      scope="row"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[0][0]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[1][2]}
                                    </TableCell>
                                    <TableCell
                                      className={classes.TableCell}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[0][4]}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {d.toDateString()}
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
                                    <TableCell
                                      className={clsx(
                                        classes.TableCell,
                                        classes.AddressCell
                                      )}
                                      align="center"
                                      onClick={() => handleClick(prod)}
                                    >
                                      {prod[2][4]}
                                    </TableCell>
                                    <TableCell
                                      className={clsx(classes.TableCell)}
                                      align="center"
                                    >
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{backgroundColor: "#212e27"}}
                                        onClick={() =>
                                          handleShipButton(prod[0][0])
                                        }
                                      >
                                        KIRIM
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </>
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
                    count={allSoldProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </>
          )}
        </Navbar>
      </div>
    </>
  );
}
