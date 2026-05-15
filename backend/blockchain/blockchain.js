require("dotenv").config();
const { ethers } = require("ethers");

// ✅ YOUR SMART CONTRACT ABI
const contractABI = [
  "function storeEvidence(string memory id,string memory hash,string memory fileName) public",
  "function getEvidence(string memory id) public view returns(string memory,string memory,string memory,address,uint256)"
];

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

// ✅ STORE
async function storeEvidence(id, hash, fileName) {
  const tx = await contract.storeEvidence(
    id,
    hash,
    fileName
  );

  const receipt = await tx.wait();

  return {
    txHash: tx.hash,
    blockNumber: receipt.blockNumber
  };
}

// ✅ GET
async function getEvidence(id) {
  const data = await contract.getEvidence(id);

  return {
    id: data[0],
    hash: data[1],
    fileName: data[2],
    owner: data[3],
    timestamp: Number(data[4]),
    readableTime: new Date(
      Number(data[4]) * 1000
    ).toLocaleString()
  };
}

// ✅ EXPORT
module.exports = {
  storeEvidence,
  getEvidence
};