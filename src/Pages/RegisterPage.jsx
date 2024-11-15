// import React, { useState } from 'react';

// const RegisterPage = () => {
//   // State to hold user input
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Simple validation to check if passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match!');
//       return;
//     }

//     // Clear the error and handle registration logic (e.g., API call)
//     setError('');
//     console.log('User ID:', userId);
//     console.log('Password:', password);
//     // Here, you would typically send the data to the server for registration
//   };

//   return (
//     <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>Register</h2>
      
//       {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}  {/* Display error if passwords don't match */}
      
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="userId" style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
//           <input
//             type="text"
//             id="userId"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//             required
//           />
//         </div>
        
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//             required
//           />
//         </div>
        
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//             required
//           />
//         </div>
        
//         <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });
    
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        [name]: name === "profileImage" ? files[0] : value,
      });
    };

    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(() => {
      setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const register_form = new FormData()
  
        for (var key in formData) {
          register_form.append(key, formData[key])
        }
  
        // const response = await fetch("http://localhost:3001/auth/register", {
        //   method: "POST",
        //   body: register_form
        // })
  
        // if (response.ok) {
        //   navigate("/login")
        // }
        if(true){
          navigate("/")
        }
      } catch (err) {
        console.log("Registration failed", err.message)
      }
    }
  

    return (
        <div className="register">
            <div className="register_content">
                <form className='register_content_form' onSubmit={handleSubmit}>
                    <input
                        placeholder="First Name"
                        name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="Last Name"
                        name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                          value={formData.email}
                          onChange={handleChange}
                        required
                    />
                    <input
                        placeholder="Password"
                        name="password"
                          value={formData.password}
                          onChange={handleChange}
                        type="password"
                        required
                    />
                    <input
                        placeholder="Confirm Password"
                        name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        type="password"
                        required
                    />

                    {!passwordMatch && (
          <p style={{ color: "red" }}>Passwords are not matched!</p>
        )}

                    <input
                        id="image"
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        style={{ display: "none" }}
                          onChange={handleChange}
                        required
                    />
                    <label htmlFor="image">
                        <img src="/Images/addImage.png" alt="add profile photo" />
                        <p>Upload Your Photo</p>
                    </label>

                    {formData.profileImage && (
          <img
            src={URL.createObjectURL(formData.profileImage)}
            alt="profile photo"
            style={{ maxWidth: "80px" }}
          />
        )}
                    <button type="submit" disabled={!passwordMatch}>REGISTER</button>
                </form>
                <a href="/">Already have an account? Log In Here</a>
            </div>
        </div>
    )
}

export default RegisterPage
