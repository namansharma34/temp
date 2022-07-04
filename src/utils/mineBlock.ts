import Arweave from 'arweave';

export async function mineBlock(arweave: Arweave) {
  await arweave.api.get('mine');
}
