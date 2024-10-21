const request = require('supertest');
const app = require('../app');  // Assuming app.js exports your Express app

describe('Product API Tests', () => {
  
  // Test GET /products (get all products)
  describe('GET /products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array); // Expecting an array of products
      expect(res.body.length).toBeGreaterThan(0); // Ensure products exist
    });
  });

  // Test GET /products/:id (get product by ID)
  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const res = await request(app).get('/products/1'); // Assuming product with ID 1 exists
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 404 if product not found', async () => {
      const res = await request(app).get('/products/999'); // Non-existing product ID
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  // Test POST /products (add a new product)
  describe('POST /products', () => {
    it('should add a new product', async () => {
      const newProduct = {
        name: 'Tablet',
        price: 300,
        stock: 20
      };
      const res = await request(app).post('/products').send(newProduct);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id'); // New product will have an ID
      expect(res.body.name).toEqual('Tablet');
    });
  });

  // Test PUT /products/:id (update an existing product)
  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
      const updatedProduct = {
        name: 'Laptop Pro',
        price: 1200,
        stock: 4
      };
      const res = await request(app).put('/products/1').send(updatedProduct); // Update product with ID 1
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Laptop Pro');
      expect(res.body.price).toEqual(1200);
    });

    it('should return 404 if product not found', async () => {
      const res = await request(app).put('/products/999').send({ name: 'Unknown' });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

  // Test DELETE /products/:id (delete a product by ID)
  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const res = await request(app).delete('/products/1'); // Delete product with ID 1
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Product deleted');
    });

    it('should return 404 if product not found', async () => {
      const res = await request(app).delete('/products/999'); // Try deleting non-existing product
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });

});
