const pool = require('../../../utils/database')
const { yupProductInput } = require('../../../utils/yupSchemas')

const resolvers = {
  Mutation: {
    modifyProduct: async (_, { id, input }, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        await yupProductInput.validate(input, { abortEarly: false })
        input.id = id
        const update = await pool.query(`UPDATE products
        SET name = ?, price = ?, type = ?, stock = ?, enabled = ?, url = ?
        WHERE id = ?`,
        [input.name, input.price, input.type, input.stock, input.enabled, input.url, input.id])
        return update.changedRows === 1 ? input : null
      } catch (err) {
        console.log('ModifyProduct Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
