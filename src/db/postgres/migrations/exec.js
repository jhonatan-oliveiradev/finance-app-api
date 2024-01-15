import "dotenv/config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../helper.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const execMigrations = async () => {
	const client = await pool.connect();

	try {
		const filePath = path.join(__dirname, "./01-init.sql");

		const script = fs.readFileSync(filePath, "utf-8");

		await client.query(script.toString());

		console.log("Migrations executed successfully!");
	} catch (err) {
		console.log(err);
	} finally {
		await client.release();
	}
};

execMigrations();
