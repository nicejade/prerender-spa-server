module.exports = {
	apps: [
		{
			name: 'prerender',
			script: './src/index.js',
			exec_mode: 'cluster',
			instances: 'max',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			restart_delay: 3000,
		},
	],
}
