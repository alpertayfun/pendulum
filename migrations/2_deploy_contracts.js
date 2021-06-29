const CakeToken = artifacts.require("PendulumToken");
const SyrupBar = artifacts.require("SyrupBar");
const MasterChef = artifacts.require("MasterChef");
const Timelock = artifacts.require("Timelock");
let admin = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af"
let startBlock = 7186400

module.exports = async function (deployer) {
  // initial deployment
  deployer.deploy(CakeToken).then(function () {
    return deployer.deploy(SyrupBar, CakeToken.address).then(function () {
      return deployer.deploy(MasterChef, CakeToken.address, admin, admin, "2000000000000000", startBlock).then(function () {
        return deployer.deploy(Timelock, admin, 21600)
      })
    })
  })
}