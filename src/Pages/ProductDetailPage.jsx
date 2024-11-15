// CarDetailPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import "../styles/ProductDetailPage.scss";

const CarDetailPage = () => {
  const { carId } = useParams(); // Get carId from the URL
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCar, setUpdatedCar] = useState({
    name: '',
    description: '',
    price: '',
  });

  const navigate = useNavigate();

  // Fetch car details when the page loads
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${carId}`);
        const carData = await response.json();
        setCar(carData);
        setUpdatedCar({
          name: carData.name,
          description: carData.description,
          price: carData.price,
        });
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };
    fetchCarDetails();
  }, [carId]);

  // Handle car details edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar((prevState) => ({ ...prevState, [name]: value }));
  };

  // Update car details
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
      });

      if (response.ok) {
        setIsEditing(false);
        alert('Car details updated successfully');
      } else {
        alert('Failed to update car details');
      }
    } catch (err) {
      console.error('Error updating car details:', err);
    }
  };

  // Delete car
  const handleDeleteCar = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${carId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Car deleted successfully');
          navigate('/'); // Redirect to the home page or product list after deletion
        } else {
          alert('Failed to delete car');
        }
      } catch (err) {
        console.error('Error deleting car:', err);
      }
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="car-detail-page">
      <div className="car-detail-container">
        <h2>{car.name}</h2>

        {/* Display car details */}
        <div className="car-info">
          {isEditing ? (
            <div className="edit-fields">
              <input
                type="text"
                name="name"
                value={updatedCar.name}
                onChange={handleEditChange}
              />
              <textarea
                name="description"
                value={updatedCar.description}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="price"
                value={updatedCar.price}
                onChange={handleEditChange}
              />
            </div>
          ) : (
            <div className="car-details">
              <p><strong>Description:</strong> {car.description}</p>
              <p><strong>Price:</strong> ${car.price}</p>
            </div>
          )}
        </div>

        {/* Edit and Delete buttons */}
        <div className="car-actions">
          {isEditing ? (
            <button onClick={handleSaveChanges}>Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </button>
          )}
          <button className="delete-btn" onClick={handleDeleteCar}>
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
