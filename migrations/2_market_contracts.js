const MathLib = artifacts.require('./libraries/MathLib.sol');
const OrderLib = artifacts.require('./libraries/OrderLib.sol');
const OrderLibMock = artifacts.require('./mocks/OrderLibMock.sol');
const CollateralToken = artifacts.require('./tokens/CollateralToken.sol');
const MarketContractOraclize = artifacts.require('./oraclize/TestableMarketContractOraclize.sol');
const MarketCollateralPoolFactory = artifacts.require(
  './factories/MarketCollateralPoolFactory.sol'
);
const MarketContractRegistry = artifacts.require('./MarketContractRegistry.sol');
const MarketToken = artifacts.require('./tokens/MarketToken.sol');
const MarketContractFactory = artifacts.require(
  './oraclize/TestableMarketContractFactoryOraclize.sol'
);

// NOTE: Currently the factory contract is a version that is deploying a testable MARKET contract, and not the
// production version.  We should be using inheritance but due to gas constraints that fails.

module.exports = function(deployer, network) {
  if (network !== 'live') {
    deployer.deploy(MathLib);
    deployer.deploy(OrderLib);

    deployer.link(OrderLib, OrderLibMock);
    deployer.link(MathLib, OrderLibMock);

    deployer.deploy(OrderLib);
    deployer.deploy(OrderLibMock);
    deployer.deploy(MarketContractRegistry);

    deployer.link(MathLib, MarketContractOraclize);
    deployer.link(OrderLib, MarketContractOraclize);

    deployer.link(MathLib, MarketContractFactory);
    deployer.link(OrderLib, MarketContractFactory);

    deployer.link(MathLib, MarketCollateralPoolFactory);

    const marketTokenToLockForTrading = 0; // for testing purposes, require no loc
    const marketTokenAmountForContractCreation = 0; //for testing purposes require no balance
    var gasLimit = web3.eth.getBlock('latest').gasLimit;

    // deploy primary instance of market contract
    return deployer
      .deploy(MarketToken, marketTokenToLockForTrading, marketTokenAmountForContractCreation)
      .then(function() {
        return deployer
          .deploy(CollateralToken, 'CollateralToken', 'CTK', 10000, 18, {
            gas: gasLimit,
            from: web3.eth.accounts[0]
          });
      });
  }
};
