const HttpStatusCode = require("http-status-codes");
const TransactionFactory = require("../../database/transactionFactory");
const { random } = require("../../utils");
const UrlRedirectsTransactions = TransactionFactory.creating(
  "urlRedirectsTransactions"
);

class UrlShortingRouter {
  async insertAsync({ urlRedirect, binCode }) {
    if (binCode && (await this._isBinCodeAsync(binCode)))
      throw {
        status: HttpStatusCode.CONFLICT,
        message: "Bin code registered in the system!",
      };

    return UrlRedirectsTransactions.insertAsync({
      urlRedirect,
      binCode: binCode || (await this._generateBinCodeAsync()),
    });
  }

  async _isBinCodeAsync(binCode) {
    console.log("adasads");
    return (await this.findBinCodeAsync(binCode)) ? true : false;
  }

  findBinCodeAsync(binCode) {
    return UrlRedirectsTransactions.findOneAsync({ binCode });
  }

  async _generateBinCodeAsync() {
    let state = true,
      binCode;
    do {
      binCode = random.generate({ length: 6 });
      state = await this._isBinCodeAsync(binCode);
    } while (state);
    return binCode;
  }
}

module.exports = UrlShortingRouter;
