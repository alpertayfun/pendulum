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
        this.syrup = await SyrupBar.new(cake.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp1 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp2 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.lp3 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        this.chef = await MasterChef.new(cake.address, syrup.address, "0x759a31a5087ee60bd57d74fc1088ec62f2c211af", '1000', '100', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.cake.transferOwnership(chef.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.syrup.transferOwnership(chef.address, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

        await this.lp1.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp2.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp3.transfer("0xD7A340Be68e5d115a871727F9189cca1886E811F", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

        await this.lp1.transfer("0x8a23594b56FA5c9594Bf726436e18753398c5461", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp2.transfer("0x8a23594b56FA5c9594Bf726436e18753398c5461", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
        await this.lp3.transfer("0x8a23594b56FA5c9594Bf726436e18753398c5461", '2000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
    });
    it('real case', async () => {
      this.lp4 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      this.lp5 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      this.lp6 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      this.lp7 = await MockBEP20.new('LPToken', 'LP1', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      this.lp8 = await MockBEP20.new('LPToken', 'LP2', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      this.lp9 = await MockBEP20.new('LPToken', 'LP3', '1000000', { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('2000', lp1.address, '2000', true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('1000', lp2.address, '1000',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('500', lp3.address, '500',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('500', lp3.address, '500',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('500', lp3.address, '500',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('500', lp3.address, '500',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('500', lp3.address, '500',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('100', lp3.address, '100',true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('100', lp3.address, '100', true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      assert.equal((await this.chef.poolLength()).toString(), "10");

      await time.advanceBlockTo('170');
      await this.lp1.approve(chef.address, '1000', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      assert.equal((await cake.balanceOf("0x8a23594b56FA5c9594Bf726436e18753398c5461")).toString(), '0');
      await chef.deposit(1, '20', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await chef.withdraw(1, '20', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      assert.equal((await cake.balanceOf("0x8a23594b56FA5c9594Bf726436e18753398c5461")).toString(), '263');

      await this.cake.approve(chef.address, '1000', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.enterStaking('20', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.enterStaking('0', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.enterStaking('0', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.enterStaking('0', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      assert.equal((await this.cake.balanceOf(alice)).toString(), '993');
      // assert.equal((await this.chef.getPoolPoint(0, { from: minter })).toString(), '1900');
    })

    it('deposit/withdraw', async () => {
      minter = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af";
      bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
      alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
      await this.chef.add('1000', lp1.address, true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('1000', lp2.address, true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('1000', lp3.address, true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

      await this.lp1.approve(chef.address, '100', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.deposit(1, '20', { from: alice });
      await this.chef.deposit(1, '0', { from: alice });
      await this.chef.deposit(1, '40', { from: alice });
      await this.chef.deposit(1, '0', { from: alice });
      assert.equal((await this.lp1.balanceOf(alice)).toString(), '1940');
      await this.chef.withdraw(1, '10', { from: alice });
      assert.equal((await this.lp1.balanceOf(alice)).toString(), '1950');
      assert.equal((await this.cake.balanceOf(alice)).toString(), '999');
      assert.equal((await this.cake.balanceOf(dev)).toString(), '100');

      await this.lp1.approve(this.chef.address, '100', { from: bob });
      assert.equal((await this.lp1.balanceOf(bob)).toString(), '2000');
      await this.chef.deposit(1, '50', { from: bob });
      assert.equal((await this.lp1.balanceOf(bob)).toString(), '1950');
      await this.chef.deposit(1, '0', { from: bob });
      assert.equal((await this.cake.balanceOf(bob)).toString(), '125');
      await this.chef.emergencyWithdraw(1, { from: bob });
      assert.equal((await this.lp1.balanceOf(bob)).toString(), '2000');
    })

    it('staking/unstaking', async () => {
      minter = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af";
      bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
      alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
      await this.chef.add('1000', lp1.address, '1000' ,true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('1000', lp2.address, '1000' ,true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });
      await this.chef.add('1000', lp3.address, '1000' ,true, { from: "0x759a31a5087ee60bd57d74fc1088ec62f2c211af" });

      await this.lp1.approve(chef.address, '10', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" });
      await this.chef.deposit(1, '2', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" }); //0
      await this.chef.withdraw(1, '2', { from: "0x8a23594b56FA5c9594Bf726436e18753398c5461" }); //1

      await this.cake.approve(this.chef.address, '250', { from: alice });
      await this.chef.enterStaking('240', { from: alice }); //3
      assert.equal((await this.syrup.balanceOf(alice)).toString(), '240');
      assert.equal((await this.cake.balanceOf(alice)).toString(), '10');
      await this.chef.enterStaking('10', { from: alice }); //4
      assert.equal((await this.syrup.balanceOf(alice)).toString(), '250');
      assert.equal((await this.cake.balanceOf(alice)).toString(), '249');
      await this.chef.leaveStaking(250);
      assert.equal((await this.syrup.balanceOf(alice)).toString(), '0');
      assert.equal((await this.cake.balanceOf(alice)).toString(), '749');

    });


    it('updaate multiplier', async () => {
      minter = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af";
      bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
      alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
      await this.chef.add('1000', this.lp1.address, true, { from: minter });
      await this.chef.add('1000', this.lp2.address, true, { from: minter });
      await this.chef.add('1000', this.lp3.address, true, { from: minter });

      await this.lp1.approve(this.chef.address, '100', { from: alice });
      await this.lp1.approve(this.chef.address, '100', { from: bob });
      await this.chef.deposit(1, '100', { from: alice });
      await this.chef.deposit(1, '100', { from: bob });
      await this.chef.deposit(1, '0', { from: alice });
      await this.chef.deposit(1, '0', { from: bob });

      await this.cake.approve(this.chef.address, '100', { from: alice });
      await this.cake.approve(this.chef.address, '100', { from: bob });
      await this.chef.enterStaking('50', { from: alice });
      await this.chef.enterStaking('100', { from: bob });

      await this.chef.updateMultiplier('0', { from: minter });

      await this.chef.enterStaking('0', { from: alice });
      await this.chef.enterStaking('0', { from: bob });
      await this.chef.deposit(1, '0', { from: alice });
      await this.chef.deposit(1, '0', { from: bob });

      assert.equal((await this.cake.balanceOf(alice)).toString(), '700');
      assert.equal((await this.cake.balanceOf(bob)).toString(), '150');

      await time.advanceBlockTo('265');

      await this.chef.enterStaking('0', { from: alice });
      await this.chef.enterStaking('0', { from: bob });
      await this.chef.deposit(1, '0', { from: alice });
      await this.chef.deposit(1, '0', { from: bob });

      assert.equal((await this.cake.balanceOf(alice)).toString(), '700');
      assert.equal((await this.cake.balanceOf(bob)).toString(), '150');

      await this.chef.leaveStaking('50', { from: alice });
      await this.chef.leaveStaking('100', { from: bob });
      await this.chef.withdraw(1, '100', { from: alice });
      await this.chef.withdraw(1, '100', { from: bob });

    });

    it('should allow dev and only dev to update dev', async () => {
        minter = "0x759a31a5087ee60bd57d74fc1088ec62f2c211af";
        bob = "0xD7A340Be68e5d115a871727F9189cca1886E811F";
        alice = "0x8a23594b56FA5c9594Bf726436e18753398c5461";
        assert.equal((await this.chef.devaddr()).valueOf(), dev);
        await expectRevert(this.chef.dev(bob, { from: bob }), 'dev: wut?');
        await this.chef.dev(bob, { from: dev });
        assert.equal((await this.chef.devaddr()).valueOf(), bob);
        await this.chef.dev(alice, { from: bob });
        assert.equal((await this.chef.devaddr()).valueOf(), alice);
    })
});
