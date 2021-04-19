require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to databse...");
});

const db = {
	createTable: () => {
		const sql =
			"CREATE TABLE test_table (id INT AUTO_INCREMENT, firstname VARCHAR(80), lastname VARCHAR(80), PRIMARY KEY(id))";
		connection.query(sql, (err) => {
			if (err) throw err;
			console.log("Table Created Successfully!");
		});
	},
	getAll: () => {
		return new Promise((resolve, reject, fields) => {
			const sql = "SELECT * FROM test_table";
			connection.query(sql, (err, result) => {
				if (err) return reject(err);
				return resolve(result);
			});
		});
	},
	insertData: () => {
		return new Promise((resolve, reject, fields) => {
			const data = { firstname: "Eli", lastname: "Amore" };
			const sql = "INSERT INTO test_table SET ?";
			connection.query(sql, data, (err) => {
				if (err) return reject(err);
				return resolve("Data inserted to the database!");
			});
		});
	},
	updateData: (id) => {
		return new Promise((resolve, reject, fields) => {
			const data = { id: id, firstname: "Eli", lastname: "Amore" };
			const sql = "REPLACE INTO test_table SET ?";
			connection.query(sql, data, (err) => {
				if (err) return reject(err);
				return resolve("Data updated!");
			});
		});
	},
	deleteData: (id) => {
		return new Promise((resolve, reject, fields) => {
			const sql = "DELETE FROM test_table where id = ?";
			connection.query(sql, id, (err) => {
				if (err) return reject(err);
				return resolve("Data deleted!");
			});
		});
	},
};
module.exports = db;
