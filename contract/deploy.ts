import Arweave from "arweave";
import { WarpNodeFactory, LoggerFactory } from "warp-contracts";
import fs from "fs";
import { JWKInterface } from "arweave/node/lib/wallet";
import path from "path";
import ArLocal from "arlocal";
(async () => {
  LoggerFactory.INST.logLevel("error");
  const arweave = Arweave.init({
    host: "testnet.redstone.tools",
    port: 443,
    protocol: "https",
  });
  const warp = WarpNodeFactory.forTesting(arweave);
  const wallet = await arweave.wallets.generate();
  addFunds(arweave, wallet);
  const contractSrc = fs.readFileSync(
    path.join(__dirname + "/../dist/init.js"),
    "utf8"
  );
  const state = fs.readFileSync(
    path.join(__dirname + "/../dist/init.json"),
    "utf8"
  );
  const contractTxId = await warp.createContract.deploy({
    wallet,
    initState: state,
    src: contractSrc,
  });
  const contract = warp.contract(contractTxId.contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "register",
    text: "arch",
  });
  await mineBlock(arweave);
  const states = await contract.readState();
  console.log(states.state);
  console.log(contractTxId.contractTxId);
})();
async function addFunds(arweave: Arweave, wallet: JWKInterface) {
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}
async function mineBlock(arweave: Arweave) {
  await arweave.api.get("mine");
}
