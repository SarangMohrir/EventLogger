const fs = require("fs")
const os = require("os")
const EventEmitter  = require('events')

class Logger extends EventEmitter {
    log(message) {
        this.emit('message', {message})
    }
}
const logger = new Logger()
const logFile  = '/Users/pinak/Documents/JavaScript Projects/EventLogger/eventlog.txt'

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFileSync(logFile, logMessage)
}

logger.on('message', logToFile)

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100
    logger.log(`current memory usage: ${memoryUsage.toFixed(2)}`)
}, 3000)

logger.log("Application Started")
logger.log("log file is loading")

