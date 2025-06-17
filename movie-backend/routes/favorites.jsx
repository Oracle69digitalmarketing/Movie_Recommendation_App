// Get favorites with pagination and optional genre filter
router.get('/favorites', authenticateToken, async (req, res) => {
  const { page = 1, limit = 10, genre } = req.query;

  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.favorites) return res.status(404).json({ message: 'No favorites found' });

    // Optional genre filtering
    let filteredFavorites = user.favorites;
    if (genre) {
      filteredFavorites = filteredFavorites.filter(fav =>
        fav.genre?.toLowerCase() === genre.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedFavorites = filteredFavorites.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredFavorites.length,
      results: paginatedFavorites,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});
