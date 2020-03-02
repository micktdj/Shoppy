const pool = require('../../../utils/database')

const resolvers = {
  Mutation: {
    removeProduct: async (_, { id }, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        const product = await pool.query('SELECT * FROM products WHERE id = ?', [id])
        if (!product[0]) return null
        await pool.query('DELETE FROM products WHERE id = ?', [id])
        return product[0]
      } catch (err) {
        console.log('removeProduct Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
