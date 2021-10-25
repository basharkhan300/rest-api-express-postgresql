const client = require("./db");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        return reject(err);
      }

      return resolve(res.rows);
    });
  });
};

exports.create = (newCustomer) => {
  return new Promise((resolve, reject) => {
    client.query(
      "INSERT INTO customers (email, name, active) values($1, $2, $3)",
      [newCustomer.email, newCustomer.name, newCustomer.active],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        // result(null, { id: res.insertId, ...newCustomer });
        return resolve({ id: res.insertId, ...newCustomer });
      }
    );
  });
};

exports.findById = (customerId) => {
  return new Promise((resolve, reject) => {
    client.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          // result(err, null);
          return reject(err);
        }

        if (res.rows.length) {
          console.log("found customer: ", res.rows);
          // result(null, res[0]);
          return resolve(res.rows);
        }

        // not found Customer with the id
        // result({ kind: "not_found" }, null);
        resolve({ kind: "not_found" });
      }
    );
  });
};

exports.updateById = (id, customer) => {
  return new Promise((resolve, reject) => {
    client.query(
      "UPDATE customers SET email = $1, name = $2, active = $3 WHERE id = $4",
      [customer.email, customer.name, customer.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          // result(null, err);
          return reject(err);
        }

        if (res.affectedRows == 0) {
          // not found Customer with the id
          // result({ kind: "not_found" }, null);
          return resolve({ kind: "not_found" });
        }

        console.log("updated customer: ", { id: id, ...customer });
        // result(null, { id: id, ...customer });
        resolve({ id: id, ...customer });
      }
    );
  });
};

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    client.query("DELETE FROM customers WHERE id = $1", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }

      if (res.affectedRows == 0) {
        return resolve({ kind: "not_found" });
      }

      console.log("deleted customer with id: ", id);
      resolve(res);
    });
  });
};

exports.removeAll = () => {

  return new Promise((resolve, reject) => {

    client.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      resolve(res);
    });
    
  })
  
}
