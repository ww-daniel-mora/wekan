/* eslint-env mocha */
import { expect } from 'chai';
import tempy from 'tempy';
import '../secretsReader';

describe('secretsReader', function() {
  describe(getSecret.name, function() {
    it('returns false when requesting a key that is not an evironment variable', function() {
      const fakeKey = 'FAKE_KEY'
      expect(process.env).to.not.have.keys(fakeKey);
      expect(getSecret(fakeKey)).to.be.false;
    });

    it('returns false when the file cannot be read', function() {
      const mykey = 'mykey';
      process.env[mykey] = 'notafile';
      expect(getSecret(mykey)).to.be.false;
    });

    it('returns the secret data', function() {
      const mySecret = 'Nope nope nope';
      const mykey = 'mykey';
      return tempy.write.task(mySecret, function(filePath) {
        process.env[mykey] = filePath
	expect(getSecret(mykey)).to.equal(mySecret);
      });
    });
  });
});

