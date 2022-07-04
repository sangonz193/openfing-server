require("@babel/register")({
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
	plugins: ["@babel/plugin-transform-runtime"],
	extensions: [".js", ".ts"],
})
