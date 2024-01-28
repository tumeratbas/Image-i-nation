// SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';
import Pagination from './Pagination';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '42056557-da06fdafea3663d9930b1dddc',
          q: query,
          image_type: 'photo',
          per_page: 21,
          page: currentPage,
        },
      });

      setResults(response.data.hits);
      setTotalPages(Math.ceil(response.data.totalHits / 20));
    } catch (error) {
      console.error('Error searching images:', error);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setCurrentPage(1);

    // Her kelime değiştiğinde anında arama yap
    if (newQuery.trim() !== '') {
      handleSearch();
    } else {
      // Eğer arama çubuğu boşsa sonuçları temizle
      setResults([]);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a painting, image or painter name..."
          value={query}
          onChange={handleInputChange}
        />
      </div>

      <div className="search-results">
        {results.map((result) => (
          <img key={result.id} src={result.previewURL} alt={result.tags} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchBar;
