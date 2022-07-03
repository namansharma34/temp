import Arweave from "arweave/node/common";
import { Warp } from "warp-contracts";
export {};
declare global {
  interface Window {
    warp: Warp;
    id: string;
  }
}
