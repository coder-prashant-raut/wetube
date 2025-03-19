import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [youtubeData, setYoutubeData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
      .then((res) => res.json())
      .then((ytData) => {
        if (ytData?.data?.data) {
          setYoutubeData(ytData.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Filter videos based on search input
  const filteredVideos = youtubeData.filter((video) =>
    video?.items?.snippet?.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Navbar with search functionality */}
      <Navbar search={search} setSearch={setSearch} />

      <div className="flex flex-wrap justify-center gap-6 mt-17">
        {/* If no videos found after search */}
        {filteredVideos.length === 0 ? (
          <p className="text-gray-500 text-lg">No videos found</p>
        ) : (
          filteredVideos.map((video, index) => (
            <div
              key={index}
              className="w-full sm:w-80 md:w-96 lg:w-[400px] bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer"
            >
              <img
                className="w-full h-56 object-cover"
                src={video?.items?.snippet?.thumbnails?.high?.url}
                alt="Video Thumbnail"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {video?.items?.snippet?.title || "Video Title Here"}
                </h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full mr-3"
                      src="https://avatars.githubusercontent.com/u/11613311?v=4"
                      alt="Channel Logo"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {video?.items?.snippet?.channelTitle || "Channel Name"}
                    </span>
                  </div>
                  <button className="bg-red-600 p-3 text-white rounded-3xl hover:bg-red-700">
                    Subscribe
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  {video?.items?.statistics?.viewCount || "1M"} views
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
