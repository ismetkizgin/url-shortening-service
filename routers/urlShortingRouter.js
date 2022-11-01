const router = require("express")();
const HttpStatusCode = require("http-status-codes");
const { urlShortingValidator } = require("../middleware/validators");
const ControllerFactory = require("../controllers/controllerFactory");
const UrlShortingController = ControllerFactory.creating(
  "urlShortingController"
);

router.post(
  "/url-shortening",
  urlShortingValidator.insert,
  async (req, res) => {
    try {
      const response = await UrlShortingController.insertAsync(req.body);
      res.json(response);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  "/url-shortening/decode",
  urlShortingValidator.decode,
  async (req, res) => {
    try {
      const response = await UrlShortingController.findBinCodeAsync(
        req.body.binCode
      );

      if (!response)
        res
          .status(HttpStatusCode.NOT_FOUND)
          .send("There was no such a thousand code in the system!");

      res.json(response);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get("/l/:binCode", async (req, res) => {
  try {
    const response = await UrlShortingController.findBinCodeAsync(
      req.params.binCode
    );

    if (!response)
      res
        .status(HttpStatusCode.NOT_FOUND)
        .send("There was no such a thousand code in the system!");
    else res.redirect(response.urlRedirect);
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

module.exports = router;
