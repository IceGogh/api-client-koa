const log4js = require('log4js')
const date = new Date()
const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
log4js.configure({
  appenders: { ajax: { type: 'file', filename: `logsFile/node-rewrite.${M}${D}.log` }},
  categories: { default: { appenders: ['ajax'], level: 'trace' }}
})

const logger = log4js.getLogger('ajax')
module.exports = logger
