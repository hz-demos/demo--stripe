import { strict as assert } from 'node:assert'

assert(process.env.REDIS_HOST, 'REDIS_HOST is required')
assert(process.env.REDIS_PORT, 'REDIS_PORT is required')
// assert(process.env.REDIS_PASSWORD, 'REDIS_PASSWORD is required')

const configuration = {
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
}

export default configuration
