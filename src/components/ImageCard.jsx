import './ImageCard.css'

const ImageCard = ({image, onImageClick})=> {

    return (
        <div className="card shadow-sm image-card">
            <img 
                src={image.urls.small}
                onClick={()=>onImageClick(image)}
                alt={image.alt_description}
                className="card-img-top image-card-img "
            />
        </div>
        
    );
};

export default ImageCard