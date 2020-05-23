const mockDevices = (el, data) => {
  return {
    topic: `Device_${el._id}`,
    payload: {
      data: {
        port: data.port,
        value: data.value
      }
    }
  }
}

module.exports = {
  mockDevices
}
