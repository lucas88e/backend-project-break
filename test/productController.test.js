const {createProduct} = require('../src/controllers/productController.js')

describe('createProduct',()=>{
test('Should create a new product',()=>{
    expect(()=> createProduct().not.toThrow())
})
})