// import React, { useState, useEffect, useRef } from 'react';
// import './style.css';

// export default function App() {
//   const [imageList, setImageList] = useState([]);
//   const [slideNo, setSlideNo] = useState(0);

//   const ref = useRef();

//   const fetchImages = async () => {
//     try {
//       const fetchImg = await fetch('https://picsum.photos/v2/list');
//       const jsonData = await fetchImg.json();
//       setImageList(jsonData);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     console.log(imageList);
//     fetchImages();
//   }, []);

//   useEffect(() => {
//     // let timer;
//     ref.current = setInterval(() => {
//       console.log('Interval running', ref.current);
//       setSlideNo((prevSlide) => prevSlide + 1);
//     }, 1000);

//     return () => {
//       clearInterval(ref.current);
//     };
//   }, []);

//   const handleMouseOver = () => {
//     clearInterval(ref.current);
//   };

//   const handleMouseLeave = () => {
//     clearInterval(ref.current);
//     ref.current = setInterval(() => {
//       setSlideNo((prevSlide) => prevSlide + 1);
//     }, 1000);
//   };

//   return (
//     <div
//       className="container"
//       onMouseEnter={handleMouseOver}
//       onMouseLeave={handleMouseLeave}
//     >
//       {slideNo > 0 ? (
//         <div
//           className="back-btn btn"
//           onClick={() => setSlideNo((prevSlideNo) => prevSlideNo - 1)}
//         >
//           {'<'}
//         </div>
//       ) : (
//         ''
//       )}
//       <div className="carousel-container">
//         <img
//           src={imageList[slideNo]?.download_url}
//           className="carousel-image"
//         />
//       </div>
//       <div
//         className="next-btn btn"
//         onClick={() => setSlideNo((prevSlideNo) => prevSlideNo + 1)}
//       >
//         {'>'}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // assume this file has your carousel styles

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [slideNo, setSlideNo] = useState(0);
  const intervalRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('https://picsum.photos/v2/list');
      const data = await res.json();
      setImageList(data.slice(0, 5)); // use first 5 images for example
    } catch (err) {
      console.error('Failed to fetch images', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideNo((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    }, 2000);
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (imageList.length > 0) startInterval();
    return () => stopInterval();
  }, [imageList]);

  const handleMouseEnter = () => stopInterval();
  const handleMouseLeave = () => startInterval();

  return (
    <div
      className="container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="back-btn btn"
        onClick={() =>
          setSlideNo((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
        }
      >
        {'<'}
      </div>

      <div className="carousel-container">
        {imageList.length > 0 && (
          <img
            src={imageList[slideNo].download_url}
            alt="Slide"
            className="carousel-image"
          />
        )}
      </div>

      <div
        className="next-btn btn"
        onClick={() =>
          setSlideNo((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
        }
      >
        {'>'}
      </div>
    </div>
  );
}
