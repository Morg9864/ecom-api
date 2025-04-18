module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js", "json", "node"],
	// Ces chemins sont relatifs à la racine du projet
	globalSetup: "./tests/globalSetup.js",
	globalTeardown: "./tests/globalTeardown.js",
};
