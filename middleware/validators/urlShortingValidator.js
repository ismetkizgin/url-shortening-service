const joi = require("joi");
const HttpStatusCode = require("http-status-codes");

class UrlShortingValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          urlRedirect: joi.string().uri().max(256).required(),
          binCode: joi.string().min(6).max(256),
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(error.message);
    }
  }

  static async decode(req, res, next) {
    try {
      await joi
        .object({
          binCode: joi.string().min(6).max(256).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(error.message);
    }
  }
}

module.exports = UrlShortingValidator;
