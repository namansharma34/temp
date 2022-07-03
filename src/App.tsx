import React from "react";
import { warp } from "./utils/config";
import * as fdd from "./HllvB064_PZSaeoXj4gtX_wdj22WawoyAz5iCuq1uzs.json";
const App = () => {
  const contract = warp
    .contract("DsHwq-Y4Lwvik3Wc2kxKawS_wpsIDAtadEbCklqTpvM")
    .connect(fdd);
  contract
    .writeInteraction({ function: "register", text: "memCached" })
    .then()
    .catch((err) => console.log(err));
  contract.readState().then((e) => console.log(e.state));
  return (
    <>
      <h1>dsf</h1>
    </>
  );
};
export default App;
