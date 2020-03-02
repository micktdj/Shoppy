const pool = require('../../../utils/database')
const { uuid } = require('uuidv4')
const { yupProductInput } = require('../../../utils/yupSchemas')

const resolvers = {
  Mutation: {
    addProduct: async (_, { input }, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        await yupProductInput.validate(input, { abortEarly: false })
        input.id = uuid()
        await pool.query('INSERT INTO products (id,name,price,type,stock,enabled, url) VALUES(?,?,?,?,?,?,?)',
          [input.id, input.name, input.price, input.type, input.stock, input.enabled, input.url])
        return input
      } catch (err) {
        console.log('addProducts Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
