let winston = require('winston');
let configs = require('./config.js');

let access = new winston.Logger({
	levels: {
		access: 0
	},
	exitOnError: false,
	transports: [
		new (winston.transports.File)({ filename: configs.accessLog, level: 'access'}),
		new (winston.transports.Console)({level: 'access'})
	]
});

let error = new winston.Logger({
	levels: {
		error: 1
	},
	exitOnError: false,
	transports: [
		new (winston.transports.File)({ filename: configs.errorLog, level: 'error'}),
		new (winston.transports.Console)({level: 'error'})
	]
});

let info = new winston.Logger({
	levels: {
		info: 2
	},
	exitOnError: false,
	transports: [
		new (winston.transports.File)({ filename: configs.errorLog, level: 'info'}),
		new (winston.transports.Console)({level: 'info'})
	]
});

let debug = new winston.Logger({
	levels: {
		debug: 3
	},
	exitOnError: false,
	transports: [
		new (winston.transports.File)({ filename: configs.errorLog, level: 'debug'}),
		new (winston.transports.Console)({level: 'debug'})
	]
});

let Logger = (...args) => { debug.debug(args.join(''))};
Logger.access = (...args) => { access.access(args.join('')) };
Logger.error = (...args) => { error.error(args.join('')) };
Logger.info = (...args) => { info.info(args.join('')) };
Logger.debug = (...args) => { debug.debug(args.join('')) };

module.exports = Logger;