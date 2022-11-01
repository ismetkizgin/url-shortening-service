var Chance = require("chance");
var chance = new Chance();

class Random {
  static generate({ length, alpha = true, casing, numeric = true, symbols }) {
    return chance.string({ length, alpha, casing, numeric, symbols });
  }
}

module.exports = Random;
