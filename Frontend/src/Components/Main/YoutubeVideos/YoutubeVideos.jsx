import React, { useEffect, useState } from "react";

import "./YoutubeVideos.css";

function YoutubeVideos() {
  const [youtubeVideos, setYoutubeVideos] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_API_KEY}&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet,id&order=date&maxResults=9&type=video&videoDuration=short`,
    )
      .then((data) => {
        return data.json();
      })
      .then((convertedData) => {
        setYoutubeVideos(convertedData.items);
      });
  }, []);
  // console.log(youtubeVideos);

  return (
    <div className="allVideosWrapper">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div className="title-wrapper">
              <br />
              <br />
              <br />
              <h2 className="title-wraper bold">Latest Videos</h2>
              <br />
            </div>
          </div>
          {youtubeVideos?.map((singleVideo) => {
            let vidId = singleVideo.id.videoId;
            let vidLink = `https://www.youtube.com/watch?v=${vidId}`;

            let videoWrapper = (
              <div key={vidId} className="col-sm-12 col-md-6 col-lg-4">
                <div className="singleVideoWrapper">
                  <div className="videoThumbnail">
                    <a href={vidLink} target="_blank">
                      <img src={singleVideo.snippet.thumbnails.high.url} />
                    </a>
                  </div>
                  <div className="videoInfoWrapper">
                    <div className="videoTitle">
                      <a href={vidLink} target="_blank">
                        {singleVideo.snippet.title}
                      </a>
                    </div>
                    <div className="videoDesc">
                      {singleVideo.snippet.description}
                    </div>
                  </div>
                </div>
              </div>
            );
            return videoWrapper;
          })}
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideos;
