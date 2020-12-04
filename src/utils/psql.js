const config    = require('../config/config')
const { Pool }  = require('pg')

const pool = new Pool({
  host:     config.psql.host,
  user:     config.psql.username,
  password: config.psql.password,
  port:     config.psql.port,
  database: config.psql.database
})

class PSQLInterface {
  constructor () {
    this.pool = pool
    this.client = null
  }

  async connect() {
    try {
      let client = await this.pool.connect()          
      this.client = client
    } catch (error) {
      console.log(error)
      throw new Error('Unable to connect over PSQL.')
    }
  }

  /**
   * @param {String} tableName 
   * @param {Array} argValues 
   */

  async insertIntoTable(argValues) {
    try {
      await this.pool.query('INSERT INTO heat_sensor(time, day, light, temperature, humidity, motion) VALUES ($1, $2, $3, $4, $5, $6);', [argValues[0], argValues[1], argValues[2], argValues[3], argValues[4], argValues[5]])
    } catch (error) {
      console.log(error)
      throw new Error('Unable to insert data into table')
    }  
  }

  release() {
    try {
      this.client.release()
      this.client = null
    } catch (error) {
      throw new Error('Unable to release a client for the pool')
    }   
  }
}

module.exports = new PSQLInterface()