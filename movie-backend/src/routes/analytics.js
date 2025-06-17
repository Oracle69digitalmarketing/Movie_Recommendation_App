router.get('/admin/analytics', authenticateToken, isAdmin, async (req, res) => {
  try {
    const logs = await Activity.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});
