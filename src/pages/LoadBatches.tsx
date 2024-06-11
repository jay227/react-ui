import React, { useState, useEffect } from "react";
//import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";


  function GetBaches():JSX.Element {
    const [users, setUsers] = useState<any[]>([]);
    const [showLoading, setShowLoading] = React.useState(false);
    const gridRef = React.useRef(null);
  
    useEffect(() => {
      setShowLoading(true);
      setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
            setShowLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setShowLoading(false);
          });
      }, 3000);
    }, []);
    return (
      <div >
  
        <Grid style={{ height: "400px" }} data={users}>
          <Column field="id" title="ID" width="40px" />
          <Column field="name" title="Name" width="250px" />
          <Column field="email" title="Email" />
          <Column field="address.street" title="Address" />
          <Column field="address.zipcode" title="Zipcode" />
          <Column field="address.city" title="City" />
        </Grid>
      </div>
    );
  };


const CashAppBatches:React.FunctionComponent = () => {
    return (
      <GetBaches/>
    )
}
export default CashAppBatches;