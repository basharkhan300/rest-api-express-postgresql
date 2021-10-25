module.exports = app => {
    const customers = require("../controllers/customer.controller")
      
  
    // Retrieve all Customers
  app.get("/customers", customers.findAll);


  // Create a new Customer
  app.post("/customers", customers.create);


  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);



  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Delete all
  app.delete("/customers", customers.deleteAll);
    
}  
