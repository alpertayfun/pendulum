const { expectRevert, time } = require('@openzeppelin/test-helpers');
const NyanToken = artifacts.require('NyanToken');
const SyrupBar = artifacts.require('SyrupBar');
const MasterChef = artifacts.require('MasterChef');
const MockBEP20 = artifacts.require('libs/MockBEP20');

contract('MasterChef', ([alice, , carol, dev, minter]) => {
    beforeEach(async () => {
        bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
        alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
        this.cake = await NyanToken.new({ from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.syrup = await SyrupBar.new(this.cake.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp1 = await MockBEP20.new('LPToken', 'LP1', '1000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp2 = await MockBEP20.new('LPToken', 'LP2', '1000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp3 = await MockBEP20.new('LPToken', 'LP3', '1000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.chef = await MasterChef.new("0xd516a805e6eef43f9421d058808a8449996cb2a5", "0x9d69cfe50cc59fb15ce9c406959a88f13285597f", "0x759a31a5087ee60bd57d74fc1088ec62f2c211af", '1000', '100', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.cake.transferOwnership(this.chef.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.syrup.transferOwnership(this.chef.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

        await this.lp1.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp2.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp3.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

        await this.lp1.transfer(alice, '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp2.transfer(alice, '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp3.transfer(alice, '200', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        console.log(this);
    });

    it('deposit/withdraw', async () => {
        minter = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af";
        bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
        alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
        await this.chef.add('1000', this.lp1.address, true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.chef.add('1000', this.lp2.address, true, { from: minter });
        await this.chef.add('1000', this.lp3.address, true, { from: minter });
  
        await this.lp1.approve(this.chef.address, '100', { from: alice });
        await this.chef.deposit(1, '20', { from: alice });
        await this.chef.deposit(1, '0', { from: alice });
        await this.chef.deposit(1, '40', { from: alice });
        await this.chef.deposit(1, '0', { from: alice });
        assert.equal((await this.lp1.balanceOf(alice)).toString(), '194');
        await this.chef.withdraw(1, '10', { from: alice });
        assert.equal((await this.lp1.balanceOf(alice)).toString(), '195');
        assert.equal((await this.cake.balanceOf(alice)).toString(), '999');
        assert.equal((await this.cake.balanceOf(dev)).toString(), '100');
  
        await this.lp1.approve(this.chef.address, '100', { from: bob });
        assert.equal((await this.lp1.balanceOf(bob)).toString(), '200');
        await this.chef.deposit(1, '50', { from: bob });
        assert.equal((await this.lp1.balanceOf(bob)).toString(), '195');
        await this.chef.deposit(1, '0', { from: bob });
        assert.equal((await this.cake.balanceOf(bob)).toString(), '125');
        await this.chef.emergencyWithdraw(1, { from: bob });
        assert.equal((await this.lp1.balanceOf(bob)).toString(), '200');
      })
});