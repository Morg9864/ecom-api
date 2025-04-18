// tests/globalSetup.js
import { connect } from "./setup.js";

/**
 * Ce hook est exécuté UNE SEULE fois avant la suite complète.
 * On établit la connexion Mongo en amont pour que chaque worker Jest la partage.
 */
export default async function () {
	await connect();
}
