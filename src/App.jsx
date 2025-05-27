import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";
import './App.css';
import ImageCard from "./components/ImageCard";
import NavbarSearch from "./components/NavbarSearch";

const App =()=>{
  const [query, setQuery] = useState(()=>{
    return localStorage.getItem("lastQuery") || "";
  });
  const debouncedQuery= useDebounce(query,800);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchImages= async (term)=>{
    if (!term) return;
    setLoading(true);
    setError(null);
    try {
      const accessKey="P6H7-ISkyanXMyHsCHC5vmO37pn7HFk5hslnqHe1KOM";

      const res =await axios.get("https://api.unsplash.com/search/photos", {
        params: {query: term,
          per_page: 30
        },

        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      console.log(res);
      setImages(res.data.results);
      
    } catch (err) {
      setError("Failed to fetch images. Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    searchImages(debouncedQuery);
  }, [debouncedQuery]);

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
    <div className="container pt-5" style={{paddingTop:"80px"}}>
      <NavbarSearch query={query} handleInputChange={handleInputChange}/>

      {loading && <p className="text-info">Loading images...</p>}
      {error && (
        <p className="text-danger">{error}</p>
        )}

      {/* No result Found */}
      {!loading && images.length === 0 && query && !error && (<p className="text-warning">No resullts found for "{query}".</p>)}

      <div className="row">
        {images.map((img)=>(
          <div className="col-md-4 col-sm-6">
          <ImageCard key={img.id} image={img}/>
          <div className="d-flex justify-content-center gap-2 mt-2">

            <button className="btn btn-sm btn-outline-primary" onClick={()=> downloadImage(img.urls.small, "small")}>Small</button>

            <button className="btn btn-sm btn-outline-success" onClick={()=> downloadImage(img.urls.regular, "medium")}>Medium</button>

            <button className="btn btn-sm btn-outline-danger" onClick={()=> downloadImage(img.urls.full, "large")}>Large</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;