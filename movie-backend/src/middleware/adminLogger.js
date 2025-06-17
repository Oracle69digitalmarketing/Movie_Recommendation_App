const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/admin.log');

module.exports = (action) => {
  return (req, res, next) => {
    const user = req.user?.email || 'unknown';
    const logEntry = `[${new Date().toISOString()}] ADMIN: ${user} → ${action} → ${req.originalUrl}\n`;
    fs.appendFile(logPath, logEntry, () => {});
    next();
  };
};
