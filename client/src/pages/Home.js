import React from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/Styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function Home() {
  const classes = useStyles();
  const navItem = [];

  return (
    <>
      <div className={classes.pageWrap}>
        <Navbar navItems={navItem}>
          <Grid
            container
            spacing={3}
            style={{ height: "100%", minHeight: "90vh", width: "100%" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                alt="."
                src="/leaf.png"
                style={{ width: "90%", height: "auto" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div className={classes.HomeCardWrap} style={{border: '2px solid #19452d'}}>
                <h1 className={classes.pageHeading} style={{color:"#082616"}}>Wallet Address</h1>
                <Link
                  to="/roleAdmin"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    style={{borderColor:"#19452d", color:"#19452d"}}
                  >
                    Tambah
                  </Button>
                </Link>
                <br />

                <h1 className={classes.pageHeading} style={{color:"#082616"}}>Kunjungi Sebagai</h1>
                <Link
                  to="/manufacturer/manufacture"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    style={{borderColor:"#19452d", color:"#19452d"}}
                  >
                    Manufacturer
                  </Button>
                </Link>
                <Link
                  to="/Distributor/allObats"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    style={{borderColor:"#19452d", color:"#19452d"}}
                  >
                    Distibutor
                  </Button>
                </Link>
                <Link
                  to="/Pengiriman/receive"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    style={{borderColor:"#19452d", color:"#19452d"}}
                  >
                    Pengiriman
                  </Button>
                </Link>
                <Link
                  to="/Apotek/buy"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    style={{borderColor:"#19452d", color:"#19452d"}}
                  >
                    Apotek
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Navbar>
      </div>
    </>
  );
}
