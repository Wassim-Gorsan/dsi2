import React, { useEffect, useState } from 'react';

const Classes = () => {
  const ClasseValid = async () => {
    // store jwt token in local storage
    let token = localStorage.getItem("usersdatatoken");

    // pass token in Authorization header
    const res = await fetch("/validUser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    console.log(data);
  }

  const [images, setImages] = useState([]);

  useEffect(() => {
    ClasseValid();
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8009/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }

        div {
          width: 80%;
          margin: 50px auto;
          background-color: #fff;
          padding: 20px;
        }

        h2 {
          text-align: center;
          color: #333;
        }

        .image-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .image-item {
          width: 300px;
          height: 300px;
          overflow: hidden;
          border: 2px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img src={`http://localhost:8009/api/images/${image._id}`} alt={image.fileName} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
