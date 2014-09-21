isTrue = require('../index');
random = require('random-strings');
assert = require('assert');

describe('is-true-ish',function(){
  var valid = "yes|y|true|t|on|1|ok".split('|');

  describe('true-ish Strings',function(){
    for(var v in valid) {
      it('Returns true for '+valid[v],function(){
        assert.equal(isTrue(valid[v]),true);
      });
    }
  });

  describe('Strings that are not true-ish but contain true-ish values', function(){
    for(var v in valid) {
      var r1 = random.newBase64(1+parseInt(Math.random()*5));
      var r2 = random.newBase64(1+parseInt(Math.random()*5));
      var t = r1+valid[v]+r2;
      it('Returns false for '+t,function(){
        assert.notEqual(isTrue(t),true);
      });
    }
  });

  describe('Strings that are not true-ish at all',function(){
    for(var i=0;i<10;i++) {
      var r = random.newBase64(1+parseInt(Math.random()*20));
      if(r.search(isTrue.regexp)!=-1) {i--;continue;}

      it('Returns false for '+r,function(){
        assert.notEqual(isTrue(r),true);
      });
    }
  });

  describe('Values that are not strings',function(){
    it('Returns false for Object',function(){ assert.notEqual(isTrue({}),true);});
    it('Returns false for Array',function(){ assert.notEqual(isTrue([]),true);});
    it('Returns false for int',function(){ assert.notEqual(isTrue(1),true);});
    it('Returns false for float',function(){ assert.notEqual(isTrue(1.1),true);});
    it('Returns false for RegExp',function(){ assert.notEqual(isTrue(/a/),true);});
    it('Returns false for Date',function(){ assert.notEqual(isTrue(new Date()),true);});
  });
});
