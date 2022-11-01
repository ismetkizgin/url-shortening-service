const controllers = require("./providers");

class ControllersFactory {
  constructor() {}

  static creating(provider, args) {
    let controller = controllers[provider];
    if (!controllers)
      throw new Error(
        "Controller is not found. Controller provider: " + provider
      );
    return new controller(args);
  }
}

module.exports = ControllersFactory;
