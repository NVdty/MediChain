import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./Styles";

export default function ProductModal({
  prod,
  open,
  handleClose,
  handleReceiveButton,
  aText
}) {
  const [rdata, setRdata] = React.useState({
    long: "",
    lat: "",
  });

  const handleChangeForm = async (e) => {
    setRdata({
      ...rdata,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {prod.length === 0 ? (
              <></>
            ) : (
              <>
                <h1 className={classes.pageHeading}>Details</h1>
                <div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>ID: </div>
                    <div className={classes.dCol2}>{prod[0][0]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Pemilik: </div>{" "}
                    <div className={classes.dCol2}>{prod[0][2]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Address Distibutor: </div>{" "}
                    <div className={classes.dCol2}>{prod[1][6]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Distibutor Longitude: </div>{" "}
                    <div className={classes.dCol2}>{prod[1][7]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Distibutor Latitude: </div>{" "}
                    <div className={classes.dCol2}>{prod[2][0]}</div>
                  </div>

                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Address Pengiriman:</div>{" "}
                    <div className={classes.dCol2}> {prod[2][1]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>
                      Pengiriman Longitude:{" "}
                    </div>{" "}
                    <div className={classes.dCol2}>{prod[2][2]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Pengiriman Latitude:</div>{" "}
                    <div className={classes.dCol2}> {prod[2][3]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Address Apotek: </div>{" "}
                    <div className={classes.dCol2}>{prod[2][4]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Nama Manufacture:</div>{" "}
                    <div className={classes.dCol2}> {prod[0][4]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>
                      Manufacture Longitude:{" "}
                    </div>{" "}
                    <div className={classes.dCol2}>{prod[0][6]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Manufacture Latitude:</div>{" "}
                    <div className={classes.dCol2}>{prod[0][7]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Kode Obat:</div>{" "}
                    <div className={classes.dCol2}>{prod[1][2]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}> Kategori Obat: </div>
                    <div className={classes.dCol2}>{prod[1][4]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Nama Obat: </div>{" "}
                    <div className={classes.dCol2}>{prod[1][1]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Nomor Batch: </div>{" "}
                    <div className={classes.dCol2}>{prod[1][3]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>
                      Keterangan:
                    </div>{" "}
                    <div className={classes.dCol2}> {prod[0][5]}</div>
                  </div>
                  <div className={classes.dRow}>
                    <div className={classes.dCol1}>Tx Hash: </div>{" "}
                    <div className={classes.dCol2}>
                      {/* {prod[2][5]} */}
                      {prod[2][5].length > 40
                        ? prod[2][5].substring(0, 40) + "..."
                        : prod[2][5]}
                    </div>
                  </div>
                  <br />
                  {console.log(handleReceiveButton)}
                  {handleReceiveButton ? (
                    prod[1][5] === "2" || prod[1][5] === "5" ? (
                      <>
                        <TextField
                          name="long"
                          variant="outlined"
                          value={rdata.long}
                          onChange={handleChangeForm}
                          label="Longitude"
                        />
                        &nbsp;
                        <TextField
                          name="lat"
                          variant="outlined"
                          value={rdata.lat}
                          onChange={handleChangeForm}
                          label="Latitude"
                        />
                      </>
                    ) : (
                      <> </>
                    )
                  ) : (
                    <> </>
                  )}
                  {handleReceiveButton ? (
                    prod[1][5] === "2" ||
                    prod[1][5] === "5" ||
                    prod[1][5] === "7" ? (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ margin: 10, backgroundColor: "#212e27" }}
                          onClick={() =>
                            handleReceiveButton(
                              prod[0][0],
                              rdata.long,
                              rdata.lat
                            )
                          }
                        >
                          Terima
                        </Button>
                        <p><b style={{ color: "red" }}>{aText.length !== 0 ? aText : ""}</b></p>
                      </>
                    ) : (
                      <> </>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
