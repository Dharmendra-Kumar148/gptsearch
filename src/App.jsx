import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";
import './App.css';
import ImageCard from "./components/ImageCard";
import NavbarSearch from "./components/NavbarSearch";
import { Route, Routes } from "react-router-dom";
// import YouTube from "./pages/YouTube";

const App =()=>{
  const [query, setQuery] = useState(()=>{
    return localStorage.getItem("lastQuery") || "";
  });
  const debouncedQuery= useDebounce(query,800);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // For pagination:
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore]= useState(true); // To know if more images available

  const searchImages= useCallback(async (term, pageNumber = 1)=>{
    if (!term) {
      setImages([]);
      setHasMore(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const accessKey="P6H7-ISkyanXMyHsCHC5vmO37pn7HFk5hslnqHe1KOM";

      const res =await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          page: pageNumber,
          per_page: 30,
        },

        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
        
      });

      if (pageNumber === 1){
        setImages(res.data.results);
      } else{
        setImages(prev=>[...prev, ...res.data.results]);
      }

      // If returned results are less than requested per_page, no more pages
      setHasMore(res.data.results.length === 30);
      
    } catch (err) {
      setError("Failed to fetch images. Please try again");
    } finally {
      setLoading(false);
    }
  }, []);

   // When query changes, reset page to 1 and fetch new images
   useEffect(()=>{
    const handleScroll =()=>{
     if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100 && !loading && hasMore
    ) {setPage(prevPage => prevPage +1);} 
    };
    window.addEventListener("scroll", handleScroll);

   return()=> window.removeEventListener("scroll",handleScroll);
   }, [loading, hasMore]);

   // Fetch next page when page changes (and page > 1)

  useEffect(()=>{
    if (page > 1){
      searchImages(debouncedQuery, page);
    } 
  }, [page, debouncedQuery, searchImages]);

  useEffect(()=>{
    setPage(1);
    searchImages(debouncedQuery, 1);
  }, [debouncedQuery, searchImages]);

  const handleInputChange=(e)=>{
    const value = e.target.value;
      setQuery(value);
      localStorage.setItem("lastQuery",value);
    };


  const downloadImage = async (url, size) => {
    try{
      const response =await fetch(url, {mode:"cors"});
      const blob =await response.blob();
      
      const blobUrl =URL.createObjectURL(blob);   
      {/*
        What is a Blob?
        Blob = Binary Large Object
        It’s a way for JavaScript to hold binary data like images, audio, video, etc. You can turn this blob into a downloadable file using:

        URL.createObjectURL(blob);  
      */}

      const link =document.createElement("a");
      link.href =blobUrl;
      link.download =`unsplash-${size}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Image download failed:", err);
      alert("Failed to download image. Try again.");
    }
  };
  
  return(
    <>

      <NavbarSearch query={query} handleInputChange={handleInputChange}/>
      <Routes>
      <Route path="/" element={
      <div className="container pt-6" style={{paddingTop:"80px"}}>
      {loading && <p className="text-info">Loading images...</p>}
      {error && (
        <p className="text-danger">{error}</p>
        )}

      {/* No result Found */}
      {!loading && images.length === 0 && query && !error && (<p className="text-warning">No resullts found for "{query}".</p>)}

      <div className="row">
        {images.map((img)=>(
          <div className="col-md-4 col-sm-6" key={img.id}>
            <div className="card shadow-sm mb-4">
              <ImageCard  image={img} onImageClick={setSelectedImage} />
          <div className="card-body d-flex justify-content-center gap-2 ">

            <button className="btn btn-sm btn-outline-primary" onClick={()=> downloadImage(img.urls.small, "small")}>Small</button>

            <button className="btn btn-sm btn-outline-success" onClick={()=> downloadImage(img.urls.regular, "medium")}>Medium</button>

            <button className="btn btn-sm btn-outline-danger" onClick={()=> downloadImage(img.urls.full, "large")}>Large</button>
          </div>
            </div>
          
          </div>
        ))}
      </div>

      {/* Overlay Section */}
      {selectedImage && (
        <div className="overlay pt-4" onClick={(e)=> {
          if (e.target.classList.contains("overlay")){setSelectedImage(null)}
        }}>
          <div className="overlay-content card shadow-lg">
            <button className="close-btn btn btn-sm btn-danger" onClick={()=> setSelectedImage(null)}>✕</button>
            <img key={searchImages.id} src={selectedImage.urls.regular} alt={selectedImage.alt_description} className="img-fluid" />
            <div className="p-3">
              <h5>{selectedImage.alt_description || "No Description"}</h5>
              <p>By: {selectedImage.user.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
      }
    />
    {/* <Route path="/pages/youtube" element={<YouTube search={debouncedQuery} />} /> */}
    </Routes>
    </>
  );
};

export default App;