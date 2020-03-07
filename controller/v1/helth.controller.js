const getHelth = async (req, res, next) => {
  try {
    return res.status(200).json({
      res: true, data: {
        output: "Server is alive"
      }, metadata: {slug: "out"}
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getHelth
}
