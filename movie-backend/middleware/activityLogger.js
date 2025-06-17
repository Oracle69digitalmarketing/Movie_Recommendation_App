// middleware/activityLogger.js
const fs = require('fs');
const path = require('path');
const Activity = require('../models/analytics');

const activityLogger = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next();

  const loggableMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const isApi = req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/');

  if (loggableMethods.includes(req.method) && isApi) {
    try {
      await Activity.create({
        userId,
        method: req.method,
        endpoint: req.originalUrl,
        timestamp: new Date(),
      });
    } catch (err) {
      // Silent fail, don't block the request
      console.error('Activity logging failed:', err.message);
    }
  }

  next();
};

module.exports = activityLogger;
