import React, { useState } from 'react'

function  Data({setYoutubeData}) {

    // const [data, setData] = useState([])

    const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest';
const options = {method: 'GET', headers: {accept: 'application/json'}};

try {
  const response =  fetch(url, options);
  const data = response.json();
  setYoutubeData(data);

  
} catch (error) {
  console.error(error);
}
}

export default Data