const Customer = require("../models/customer.model");

exports.findAll = async (req, res) => {
  try {
    const data = await Customer.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving customers.",
    });
  }
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const newCustomer = {
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  };
  // Save Customer in the database

  try {
    const data = await Customer.create(newCustomer);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Customer.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Customer.findById(req.params.customerId);
    res.send(data);
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`,
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Customer with id " + req.params.customerId,
      });
    }
  }
};


exports.update = async (req, res) => {

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Customer.updateById(req.params.customerId, req.body);
    res.send(data);

  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`
      });
    } else {
      res.status(500).send({
        message: "Error updating Customer with id " + req.params.customerId
      });
    }
  }
  
  
}


// delete by Id

exports.delete = async (req, res) => {

  try {
    
    const data = await Customer.remove(req.params.customerId);
    res.send({message: `Customer was deleted successfully!`})
    
  } catch (err) {
    if(err.kind === "not_found"){
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`
      })
    } else {
      res.status(500).send({
        message: "Could not delete Customer with id " + req.params.customerId
      });
    }
    
  }
  
}

// Delete All

exports.deleteAll = async (req, res) => {

  try {
    
    const data = await Customer.removeAll();
    res.send({message: `All Customers were deleted successfully!` })
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all customers."
    });
  }
  
}