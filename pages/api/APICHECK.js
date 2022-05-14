// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

const APICHECK = {
  POST_only: (req) => {
    if (req.method !== 'POST')
      return {
        httpStatus: 400,
        apiRes: {
          status: 'error',
          msg: 'Only POST is supported'
        }
      }
  },
  PARAMS_NONEMPTY: (req) => {
    let reqObj = req.body
    console.log(reqObj)
    for (const k in reqObj) {
      let v = reqObj[k]
      if (typeof v === 'undefined' || v === '') {
        return {
          httpStatus: 400,
          apiRes: {
            status: 'error',
            msg: `Missing parameter '${k}'`
          }
        }
      }
    }
  },
  PARAMS_REQUIRE: (req, dependency) => {
    let reqObj = req.body

    for (const idx in dependency) {
      let k = dependency[idx]
      let v = reqObj[k] // value of key k
      if (typeof v === 'undefined' || v === '') {
        return {
          httpStatus: 400,
          apiRes: {
            status: 'error',
            msg: `Missing parameter '${k}'`
          }
        }
      }
    }
  }
}

export default APICHECK