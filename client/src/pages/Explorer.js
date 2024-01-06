import React from "react";
import Paper from "@material-ui/core/Paper";
import Navbar from "../components/Navbar";
import CustomizedInputBase from "../components/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import ProductModal from "../components/Modal";
import ReciptModal from "../components/ReciptModal";
import TableRow from "@material-ui/core/TableRow";
import { Grid } from "@material-ui/core";
import { MapContainer } from "../components/map";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/Styles";
import Loader from "../components/Loader";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "mname", label: "Manfacturer", minWidth: 170 },
  { id: "mdate", label: "Tanggal", minWidth: 170 },
  { id: "pcat", label: "Kategori Obat", minWidth: 170 },
  { id: "pname", label: "Nama Obat", minWidth: 170 },
  { id: "price", label: "Nomor Batch", minWidth: 170 },
  { id: "lastAction", label: "Aktifitas Terakhir", minWidth: 170 },
];

const map = [
  "Obat Dibuat",
  "Dibeli Oleh Distributor",
  "Dikirim Oleh Manufacture",
  "Diterima Oleh Distributor",
  "Dibeli Oleh Apotek",
  "Dikirim Oleh Manufacture",
  "Diterima Oleh Pengiriman",
  "Dikirim Oleh Pengiriman",
  "Diterima Oleh Apotek",
];

export default function Explorer(props) {
  const classes = useStyles();
  const web3 = props.web3;
  const supplyChainContract = props.supplyChainContract;
  const [productData, setProductData] = React.useState([]);
  const [productHistory, setProductHistory] = React.useState([]);
  const [Text, setText] = React.useState(false);
  const navItem = [];
  const [modalData, setModalData] = React.useState([]);
  const [modalReciptData, setModalReciptData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openRecipt, setOpenRecipt] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const findProduct = async (search) => {
    var arr = [];
    var temp = [];
    setLoading(true);
    try {
      setProductData([]);
      setProductHistory([]);
      var a = await supplyChainContract.methods
        .fetchProductPart1(parseInt(search), "product", 0)
        .call();
      var b = await supplyChainContract.methods
        .fetchProductPart2(parseInt(search), "product", 0)
        .call();
      var c = await supplyChainContract.methods
        .fetchProductPart3(parseInt(search), "product", 0)
        .call();
      temp.push(a);
      temp.push(b);
      temp.push(c);
      setProductData(temp);
      arr = [];
      var l = await supplyChainContract.methods
        .fetchProductHistoryLength(parseInt(search))
        .call();

      arr = [];
      for (var i = 0; i < l; i++) {
        var h = await supplyChainContract.methods
          .fetchProductPart1(parseInt(search), "history", i)
          .call();
        var k = await supplyChainContract.methods
          .fetchProductPart2(parseInt(search), "history", i)
          .call();
        var j = await supplyChainContract.methods
          .fetchProductPart3(parseInt(search), "history", i)
          .call();
        temp = [];
        temp.push(h);
        temp.push(k);
        temp.push(j);
        arr.push(temp);
      }
      setProductHistory(arr);
    } catch (e) {
      setText(true);
      console.log(e);
    }
    setLoading(false);
  };

  const handleClose = () => setOpen(false);
  const handleCloseRecipt = () => setOpenRecipt(false);

  const handleClick = async (prod) => {
    await setModalData(prod);
    setOpen(true);
  };

  const fetchTxRecipt = async (hash) => {
    web3.eth.getTransaction(hash).then((recipt) => {
      setModalReciptData(recipt);
      setOpenRecipt(true);
    });
  };

  return (
    <>
      <Navbar navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductModal
              prod={modalData}
              open={open}
              handleClose={handleClose}
            />
            <ReciptModal
              recipt={modalReciptData}
              openRecipt={openRecipt}
              handleCloseRecipt={handleCloseRecipt}
            />
            <h1 className={classes.pageHeading}>Cari Obat</h1>
            <CustomizedInputBase findProduct={findProduct} />
            {productData.length !== 0 ? (
              <>
                <Grid container className={classes.Explorerroot} spacing={3}>
                  <Grid item xs={6}>
                    <Paper className={classes.ProductPaper}>
                      <div>
                        <div className={classes.ExplorerdRow}>
                          ID : {productData[0][0]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Pemilik : {productData[0][2]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacture : {productData[0][3]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Nama Manufacture : {productData[0][4]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Longitude Manufacture : {productData[0][6]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Latitude of Manfacturer : {productData[0][7]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Kategori Obat : {productData[1][4]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Nama Obat : {productData[1][1]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Nomor Obat : {productData[1][3]}
                        </div>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() => handleClick(productData)}
                          style={{ margin: "10px auto", backgroundColor: "#212e27" }}
                        >
                          MORE DETAILS
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} style={{ position: "relative" }}>
                    <MapContainer prodData={productData} />
                  </Grid>
                </Grid>
                <br />
                <h2 className={classes.tableCount}> History</h2>
                <Paper className={classes.TableRoot2}>
                  <TableContainer className={classes.TableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align="center"
                              className={classes.TableHead}
                              // style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                          <TableCell
                            align="center"
                            className={classes.TableHead}
                          >
                            Recipt
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productHistory.length !== 0 ? (
                          productHistory.map((row) => {
                            console.log(row[1][0]);
                            const d = new Date(parseInt(row[1][0] * 1000));
                            console.log(JSON.stringify(d));
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row[0][0]}
                              >
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[0][0]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[0][4]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {d.toDateString()}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[1][4]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[1][1]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[1][3]}
                                </TableCell>
                                <TableCell
                                  style={{ color: "#f00 !important" }}
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {map[row[1][5]]}
                                </TableCell>

                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{backgroundColor: "#212e27"}}
                                    onClick={() => fetchTxRecipt(row[2][5])}
                                  >
                                    RECIPT
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            ) : (
              <>{Text ? <p>Produk Tidak Ditemukan</p> : <></>}</>
            )}
          </>
        )}
      </Navbar>
    </>
  );
}
