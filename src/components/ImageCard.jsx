const ImageCard = ({image})=> {
    return (
        <div className="card shadow-sm ">
            <img 
        src={image.urls.small}
        alt={image.alt_description}
        className="card-img-top "
        />
        </div>
        
    );
};

export default ImageCard