module.exports = function (api) {
	api.cache(true);

	return {
		presets: [
			[
				"@babel/preset-env",
				{
					targets: { node: 16 },
					useBuiltIns: "entry",
					corejs: 3,
					loose: true,
				},
			],
			"@babel/preset-typescript",
		],
		plugins: [
			"@babel/plugin-transform-runtime",
			["@babel/plugin-proposal-decorators", { legacy: true }],
			["@babel/proposal-class-properties", { loose: true }],
			"@babel/proposal-object-rest-spread",
		],
	};
};
