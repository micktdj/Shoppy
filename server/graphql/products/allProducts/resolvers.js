const pool = require('../../../utils/database')

const resolvers = {
  Query: {
    allProducts: async (_, __, { req }) => {
      if (typeof req.session.user === 'undefined') return null
      try {
        const allProducts = await pool.query('SELECT * FROM products ORDER BY name')
        return allProducts
      } catch (err) {
        console.log('allProducts Error', err)
        return null
      }
    }
  }
}
exports.resolvers = resolvers
