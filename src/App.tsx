import React, { useEffect, useState } from 'react';
import { arweave, warp } from './utils/config';
import * as fdd from './HllvB064_PZSaeoXj4gtX_wdj22WawoyAz5iCuq1uzs.json';
import { mineBlock } from './utils/mineBlock';
const App = () => {
  const contract = warp.contract('DsHwq-Y4Lwvik3Wc2kxKawS_wpsIDAtadEbCklqTpvM').connect(fdd);
  const [contractState, setContractState] = useState({});
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleClickButton = async () => {
    const txId = await contract.writeInteraction({ function: 'register', text: inputValue });
    console.log(txId);
    await mineBlock(arweave);
    await fetchContractData();
    setInputValue('');
  };
  async function fetchContractData() {
    const result = await contract.readState();
    setContractState(result);
  }
  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <>
      <div>{JSON.stringify(contractState)}</div>
      <div>
        <input value={inputValue} onChange={handleInputChange} />
        <button onClick={handleClickButton}>Register</button>
      </div>
    </>
  );
};
export default App;
