// import React, { useState } from 'react';

// const ProductCreationPage = () => {
//   // State to hold form data
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]; // Get the selected file
//     if (file) {
//       setImage(file);
//       setError('');
//     } else {
//       setError('Please upload an image');
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Basic validation
//     if (!title || !description || !image) {
//       setError('All fields are required.');
//       return;
//     }

//     // Clear the error
//     setError('');

//     // Log the form data (for now, can be replaced with API call)
//     console.log('Product Title:', title);
//     console.log('Product Description:', description);
//     console.log('Product Image:', image);

//     // Reset the form
//     setTitle('');
//     setDescription('');
//     setImage(null);
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>Create New Product</h2>
      
//       {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}  {/* Display error if any field is empty */}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Product Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Product Description:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '150px' }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="image" style={{ display: 'block', marginBottom: '5px' }}>Upload Image:</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
//             required
//           />
//         </div>

//         {image && (
//           <div style={{ marginBottom: '10px' }}>
//             <p>Preview:</p>
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Product Preview"
//               style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
//             />
//           </div>
//         )}

//         <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductCreationPage;
// import React, { useState } from 'react';
// import "../styles/ProductCreationPage.scss";

// const ProductCreationPage = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setError('');
//     } else {
//       setError('Please upload an image');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !image) {
//       setError('All fields are required.');
//       return;
//     }

//     setError('');

//     // This can be replaced with an API call to submit the product
//     console.log('Product Title:', title);
//     console.log('Product Description:', description);
//     console.log('Product Image:', image);

//     // Reset the form after submission
//     setTitle('');
//     setDescription('');
//     setImage(null);
//   };

//   return (
//     <div className="product-creation">
//       <div className="product-creation_content">
//         <h2>Create New Product</h2>
        
//         {error && <div className="error-message">{error}</div>}

//         <form className="product-creation_content_form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Product Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Product Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />

//           {image && (
//             <div className="image-preview">
//               <p>Image Preview:</p>
//               <img src={URL.createObjectURL(image)} alt="Product Preview" />
//             </div>
//           )}

//           <button type="submit">Create Product</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductCreationPage;
import React, { useState } from 'react';
import "../styles/ProductCreationPage.scss";

const ProductCreationPage = () => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      setError('You can only upload up to 10 images.');
    } else {
      setImages([...images, ...files]);
      setError('');
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tag.trim()) {
      e.preventDefault();
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || images.length === 0) {
      setError('All fields are required.');
    } else {
      console.log('Product Title:', title);
      console.log('Tags:', tags);
      console.log('Product Description:', description);
      console.log('Product Images:', images);
      setTitle('');
      setDescription('');
      setImages([]);
      setTags([]);
    }
  };

  return (
    <div className="product-creation">
      <div className="product-creation_content">
        <h2>Create New Product</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="product-creation_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="tag-input">
            <input
              type="text"
              placeholder="Add tags (press Enter)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleTagInput}
            />
            <div className="tags-display">
              {tags.map((t, index) => (
                <span key={index} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="image-preview">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="Preview"
              />
            ))}
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationPage;
