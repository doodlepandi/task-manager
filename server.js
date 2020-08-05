const { join } = require('path')

require('dotenv').config()

const cluster = require('cluster')
const numCPUs = require('os').cpus().length || 1
const port = process.env.PORT || 3001
const app = require('./app')
const { log, info, error } = require('./utils').logging
const chalk = require('chalk');

// Graceful shutdown
process.on('SIGINT', () => {
  process.exit(1)
})

app.listen(port, () => {
  info(chalk.blue(' [ ✓ ] ') + `Application - Process ${process.pid} is listening to all incoming requests at: ${port} `);
})
