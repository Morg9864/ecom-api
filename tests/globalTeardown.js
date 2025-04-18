// tests/globalTeardown.js
import { closeDatabase } from "./setup.js";

/**
 * Ce hook se déclenche après le dernier test exécuté,
 * quelle que soit la quantité de workers lancés.
 */
export default async function () {
	await closeDatabase();
}
