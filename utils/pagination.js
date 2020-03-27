const pagination = (item, filter) => new Promise( async (resolve, reject) => {
  const {query, limit, offset} = filter
  try {
    const response = await item.find().limit(limit ||0).skyp(limit*offset ||0)
    resolve(response)
  } catch(error){
    let err = new Error(error)
    reject(err)
  }
})

module.exports=pagination
