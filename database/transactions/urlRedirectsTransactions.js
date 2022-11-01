const { FadabHelper } = require("fadab-mysql-helper");

class UrlRedirectsTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "urlRedirects";
  }
}

module.exports = UrlRedirectsTransactions;
