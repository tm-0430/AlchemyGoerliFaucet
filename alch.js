require('dotenv').config();
const { ethers } = require('ethers');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function sendFaucetFunds(toAddress, amountEth) {
  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: ethers.utils.parseEther(amountEth),
  });
  await tx.wait();
  console.log(`Sent ${amountEth} ETH to ${toAddress}. Transaction Hash: ${tx.hash}`);
}

// Read recipient address from CLI args
const recipient = process.argv[2];
if (!recipient) {
  console.error('Please provide a recipient address');
  process.exit(1);
}

sendFaucetFunds(recipient, '0.01').catch(console.error);
