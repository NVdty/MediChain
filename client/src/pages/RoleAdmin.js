import React from 'react';
import ResponsiveDrawer from "../components/Navbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../context/RoleDataContext";
import { useStyles } from "../components/Styles";

function RoleAdmin(props) {
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;
  const { roles, setRoles } = useRole();

  const classes = useStyles();
  const [manufacturerRole, setManufacturerRole] = React.useState("");
  const [thirdPartyRole, setDistributorRole] = React.useState("");
  const [deliveryHubRole, setPengirimanRole] = React.useState("");
  const [apotekRole, setApotekRole] = React.useState("");
  const navItem = [];

  const handleAddManufacturerRole = async () => {
    await setRoles({
      ...roles, 
      manufacturer : manufacturerRole
    })

    localStorage.setItem("mRole", manufacturerRole);
    await supplyChainContract.methods.addManufacturerRole(manufacturerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setManufacturerRole("");
  }
  
  const handleAddDistributorRole = async () => {
    await setRoles({
      ...roles, 
      distributor : thirdPartyRole
    })

    localStorage.setItem("tpRole", thirdPartyRole);
    await supplyChainContract.methods.addDistributorRole(thirdPartyRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setDistributorRole("");
  }

  const handleAddPengirimanRole = async () => {
    await setRoles({
      ...roles, 
      pengiriman : deliveryHubRole
  })

   localStorage.setItem("dhRole", deliveryHubRole);
    await supplyChainContract.methods.addPengirimanRole(deliveryHubRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setPengirimanRole("");
  }

  const handleAddApotekRole = async () => {
    await setRoles({
      ...roles, 
    apotek : apotekRole
  })

   localStorage.setItem("cRole", apotekRole);
    await supplyChainContract.methods.addApotekRole(apotekRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

   

    setApotekRole("");
  }


  return (
    <div>
      <ResponsiveDrawer navItems={navItem}>
      <div className={classes.FormWrap}> 
      <h1 className={classes.pageHeading} style={{color:"#082616"}}>Wallet Address</h1>
      {console.log(roles)}
      
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="manufacturerRole"
            label="Masukkan Wallet Address Manufacture"
            variant="outlined"
            value={manufacturerRole}
            onChange={(e) => setManufacturerRole(e.target.value)}
            style={{width:"70%", borderColor:"#19452d"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddManufacturerRole}
            style={{width:"30%", marginLeft:"10px", backgroundColor: "#212e27", textTransform: "none",}}
          >
            Tambah Address Manufacture
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="thirdPartyRole"
            label="Masukkan Wallet Address Distributor"
            variant="outlined"
            value={thirdPartyRole}
            onChange={(e) => setDistributorRole(e.target.value)}
            style={{width:"70%", borderColor:"#19452d"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDistributorRole}
            style={{width:"30%", marginLeft:"10px", backgroundColor: "#212e27", textTransform: "none",}}
          >
            Tambah Address Distibutor
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="deliveryHubRole"
            label="Masukkan Wallet Address Pengiriman"
            variant="outlined"
            value={deliveryHubRole}
            onChange={(e) => setPengirimanRole(e.target.value)}
            style={{width:"70%", borderColor:"#19452d"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPengirimanRole}
            style={{width:"30%", marginLeft:"10px", backgroundColor: "#212e27", textTransform: "none",}}
          >
            Tambah Address Pengiriman
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="apotekRole"
            label=" Masukkan Wallet Address Apotek"
            variant="outlined"
            value={apotekRole}
            onChange={(e) => setApotekRole(e.target.value)}
            style={{width:"70%", borderColor:"#19452d"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddApotekRole}
            style={{width:"30%", marginLeft:"10px", backgroundColor: "#212e27", textTransform: "none",}} 
          >
            Tambah Address Apotek
          </Button>
        </div>
      </form>
      </div>
      <div className={classes.FormWrap}>
        <h1 className={classes.pageHeading}style={{color:"#082616"}}>Wallet Address</h1>
        {accounts.slice(1).map((acc) => (
          <h3 className={classes.tableCount}style={{color:"#0f4a2a"}}>{acc}</h3>
        ))}
        
      </div>

      </ResponsiveDrawer>
    </div>
  );
}

export default RoleAdmin;
