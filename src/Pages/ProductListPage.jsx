// import React from 'react';
// import { FaSearch } from 'react-icons/fa'; // Import the search icon
// import "../styles/ProductListPage.scss";

// const ProductListPage = () => {
//   return (
//     <div className="product-list">
//       <div className="search-bar">
//         <input type="text" placeholder="Search by car ID" />
//         <FaSearch className="search-icon" /> {/* Search icon */}
//       </div>
//       <div className="car-list">
//         {/* Car list items go here */}
//       </div>
//     </div>
//   );
// };

// export default ProductListPage;
// ProductListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // Assuming you use Redux to store user data
import "../styles/ProductListPage.scss";
const ProductListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  // Get the logged-in user's data from the Redux store
  const userId = useSelector((state) => state.user?.id); 

  // Fetching car list from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cars'); // Your API endpoint
        const carData = await response.json();
        setCars(carData);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };
    fetchCars();
  }, []);

  // Handle search query
  const handleSearch = () => {
    if (searchQuery) {
      setFilteredCars(cars.filter(car => car.id.toString().includes(searchQuery)));
    } else {
      setFilteredCars(cars);
    }
  };

  // Navigate to the product creation page
  const handleCreateProduct = () => {
    navigate('/productCreation');
  };

  // Navigate to the car detail page when clicking on a car
  const handleCarClick = (carId) => {
    navigate(`/productDetail/${carId}`);
  };

  return (
    <div className="product-list-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="user-id">
          {userId ? `User ID: ${userId}` : 'Not Logged In'}
        </div>
      </div>

      {/* Search bar with search icon */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Car ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <FaSearch className="search-icon" onClick={handleSearch} />
        </div>
        <button className="create-product-btn" onClick={handleCreateProduct}>Create Product</button>
      </div>

      {/* List of Cars */}
      <div className="car-list">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="car-item" key={car.id} onClick={() => handleCarClick(car.id)}>
              <p>{car.name}</p>
              <p>Car ID: {car.id}</p>
              <p>{car.description}</p>
            </div>
          ))
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
