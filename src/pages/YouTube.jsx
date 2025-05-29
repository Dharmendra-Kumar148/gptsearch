// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import '../index.css'

// function YouTube({search}) {
//     const [videos, setVideos]= useState([]);
//     const [selectedVideoId, setSelectedVideoId]= useState(null);

//     const fetchVideos= async ()=>{
//         if (!search) return;

//         const accesskey = "AIzaSyDNPwCDR4SL6PkA--jTlrL8xfJE4gldPm4";

//         try { 
//             const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//             params: {
//                 part: "snippet",
//                 q: search,
//                 key: accesskey,
//                 type: "video"
//                 },
//         });

//         console.log(response.data.items);
        
//         setVideos(response.data.items);
//         } catch (error) {
//             console.error("Error fetching YouTube videos:", error.response?.data || error.message);
//             alert("Failed to fetch videos. Please check API key or quota.");
//         }
//         ;
        
//     };

//     useEffect(()=> {
//         fetchVideos();
//     }, [search]);

//   return (
//     <div className='container page-content'>
//         <div className="row">
//             {videos.map(video=>(
//                  <div className="col-md-4 mb-4">
//                 <div className="card" key={video.id.videoId}>
//                     <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="card-img-top" />
//                     <div className="card-body">
//                         <h5 className="card-title">{video.snippet.title}</h5>
//                         <button className="btn btn-primary" onClick={()=>setSelectedVideoId(video.id.videoId)}>Watch</button>
//                     </div>
//                 </div>
//             </div>
//             )) 
//             }
            
//         </div>

//         {/* Video player Modal */}
//         {selectedVideoId &&
//         <div className="video-modal" style={{
//             position:"fixed",
//             top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.7",
//             display:"flex",
//             justifyContent:"center",
//             alignItems: "center",
//             zIndex:9999,
//         }} onClick={()=>setSelectedVideoId(null)}>
//             <div style={{ position:"relative" ,width:"80%",maxWidth:"900px", backgroundColor:"#000"}}
//              onClick={(e)=> e.stopPropagation()}>
//                 <button onClick={()=> setSelectedVideoId(null)}
//                     style={{position:"absolute",top:10,right:10,
//                         zIndex:10,backgroundColor:"red",border:"none",
//                         color:"white",padding:"5px 10px",cursor:"pointer",
//                         fontSize:"18px",
//                     }}>✕</button>
//                      <iframe
//               width="100%"
//               height="450px"
//               src={`https://www.youtube.com/embed/${selectedVideoId}`}
//               title="Allify video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//              </div>
//         </div>}
//     </div>
//   )
// }

// export default YouTube
