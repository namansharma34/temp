import Arweave from "arweave";
import { WarpWebFactory, LoggerFactory, Warp } from "warp-contracts";

// Set up Arweave client
export const arweave: Arweave = Arweave.init({
  host: "testnet.redstone.tools",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
});

LoggerFactory.INST.logLevel("debug");

// const warp = new WarpWebFactory.memCached(arweave);
export const warp: Warp = WarpWebFactory.memCachedBased(arweave)
  .useArweaveGateway()
  .build();
