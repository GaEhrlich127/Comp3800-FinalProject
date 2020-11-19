import Web3 from 'web3';
const NETWORK_TYPE = 'live'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/a83a4fa8bc68474996b4c0129203e7dc"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

//const MOVIES_LIST = ['Avatar', 'Inception', 'Spider Man: Home Coming', 'Star Wars: The Last Jedi']

let defaultAccount = {
    address: '0xaD75155c5372530D3a3DcA79A4aBA583f588Cb95', // Replace <> with your Metamask wallet account address
    privateKey: '0x08240803fbef502d295fec3f79a237534c1d73421f8487b5b284b5bcc0792546' // Replace <> with private key of your Metamask wallet account address, prefixed with 0x
}
// Replace [] with rating ABI obtained by truffle console. Only the part between [] (inclusive)
let ratingABI = [{"inputs":[{"internalType":"string[]","name":"_moviesList","type":"string[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"moviesList","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"addNewMovie","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"getTotalVotes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"movieName","type":"string"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]// Replace '' with rating contract address obtained by truffle console
let ratingAddress = '0x7A9f134f6075F9f67747B47896d4554aF86b05bc'
// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const ratingContract = new web3.eth.Contract(ratingABI, ratingAddress)
export {
    web3,
    NETWORK_TYPE,
    defaultAccount,
    ratingContract,
}
