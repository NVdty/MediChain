import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  pageWrap: {
    textAlign: "center",
    color: "#1a237e",
  },
  pageHeading: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "#082616",
  },

  TableRoot: {
    width: "100%",
    maxWidth: 1200,
    margin: "5px auto",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    borderColor: "#212e27",
  },
  TableContainer: {
    maxHeight: 600,
    borderRadius: 7,
  },
  AddressCell: {
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableCount: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "#082616",
  },
  TableHead: {
    backgroundColor: "#212e27 !important",
    color: "#fff !important",
  },
  TableCell: {
    color: "#19452d !important",
  },

  FormWrap: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 20,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
  },

  RoleForm: {
    display: "flex",
    alignItems: "center",
    margin: "20px auto",
  },

  //Explorer
  Explorerroot: {
    padding: "2px 4px",
    margin: "10px",
    width: "100%",
    borderColor: "#19452d"
  },
  ProductPaper: {
    padding: 10,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    border: "2px solid #1a237e",
    borderColor: "#19452d"
  },
  ExplorerdRow: {
    width: "100%",
    borderBottom: `0px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: "0 auto",
    fontWeight: 600,
    color: "#0f4a2a",
    borderColor: "#19452d"
  },
  TableRoot2: {
    width: "100%",
    maxWidth: 1300,
    margin: "5px auto",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    borderColor: "#19452d"
  },

  //Modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    padding: 15,
    outline: "none",
    width: "min(90%, 650px)",
    height: "80%",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    overflow: "scroll",
    borderColor: "#0f4a2a"
  },
  Reciptpaper: {
    backgroundColor: "#fff",
    border: "0px solid #000",
    padding: 15,
    outline: "none",
    width: "min(95%, 950px)",
    height: "500px",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    overflow: "scroll",
    borderColor: "#0f4a2a"
  },
  dRow: {
    width: "100%",
    borderBottom: `1px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: "0 auto",
    color: "#0f4a2a",
    borderColor: "#0f4a2a",
  },

  dCol1: {
    width: "30%",
    textAlign: "left",
    fontWeight: 600,
    color: "#0f4a2a",
    borderColor: "#0f4a2a"
  },
  dCol2: {
    width: "70%",
    textAlign: "left",
    fontWeight: 600,
    color: "#0f4a2a",
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderColor: "#0f4a2a"
  },

  //Home
  HomeBtn: {
    margin: 10,
  },
  HomeCardWrap: {
    maxWidth: 500,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    border: "2px solid #1a237e",
    margin: "10px auto",
  },
});
