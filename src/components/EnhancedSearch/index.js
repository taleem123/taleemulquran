import React, { useState, useCallback } from 'react';
import { TextField, Box, Paper, List, ListItem, ListItemText, Typography, Chip } from '@mui/material';
import { Search, History } from '@mui/icons-material';
import surahData from '../SurahList/surahData.json';

const EnhancedSearch = ({ onSurahSelect, placeholder = "Search Surahs..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = useCallback((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const results = surahData
      .filter(surah => 
        surah.englishName.toLowerCase().includes(term.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(term.toLowerCase()) ||
        surah.name.includes(term) ||
        surah.number.toString().includes(term)
      )
      .slice(0, 8); // Limit to 8 results

    setSearchResults(results);
    setShowSuggestions(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  }, [handleSearch]);

  const handleSurahClick = useCallback((surah) => {
    onSurahSelect(surah);
    setSearchTerm('');
    setShowSuggestions(false);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.number !== surah.number);
      return [surah, ...filtered].slice(0, 5);
    });
  }, [onSurahSelect]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSuggestions(false);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        InputProps={{
          startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'white',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00a7d5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00a7d5',
              borderWidth: 2,
            },
          }
        }}
      />

      {/* Search Suggestions */}
      {showSuggestions && (searchResults.length > 0 || recentSearches.length > 0) && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
          }}
        >
          {searchResults.length > 0 && (
            <Box>
              <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Search Results ({searchResults.length})
                </Typography>
              </Box>
              <List dense>
                {searchResults.map((surah) => (
                  <ListItem
                    key={surah.number}
                    onClick={() => handleSurahClick(surah)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={surah.number} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                          <Typography variant="subtitle1">
                            {surah.englishName}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {surah.englishNameTranslation}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {surah.name} • {surah.numberOfAyahs} Ayat • {surah.revelationType}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {searchResults.length === 0 && recentSearches.length > 0 && (
            <Box>
              <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <History fontSize="small" color="action" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Recent Searches
                  </Typography>
                </Box>
              </Box>
              <List dense>
                {recentSearches.map((surah) => (
                  <ListItem
                    key={surah.number}
                    onClick={() => handleSurahClick(surah)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={surah.number} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                          />
                          <Typography variant="subtitle1">
                            {surah.englishName}
                          </Typography>
                        </Box>
                      }
                      secondary={surah.englishNameTranslation}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {searchResults.length === 0 && recentSearches.length === 0 && searchTerm && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No Surahs found for "{searchTerm}"
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Click outside to close */}
      {showSuggestions && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </Box>
  );
};

export default EnhancedSearch;
