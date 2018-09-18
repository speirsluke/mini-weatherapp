function createNode(element){
    return document.createElement(element);
  }
  
  function append(parent, element){
    return parent.appendChild(element)
  } 
  function addHeaderImg(image) {
  
let headerImage = createNode('img')
  }
  let thumbs = document.querySelector('.thumbs') 


  function imageFetch(description) {
    fetch(`https://api.unsplash.com/search/photos?query=${description}&client_id=c983e2460b497eab772c710349148927497de703a9dd2f4a61217006c714e76b`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    data.results.map(function(image){
           let images = createNode('img')
            images.src = image.urls.thumb;
            images.className = 'thumb';
            console.log(images);
            append(thumbs, images)
        })
    })
}

function weatherFetch() {
fetch('http://api.openweathermap.org/data/2.5/weather?q=london&APPID=886ac1fdabafed2710d90bf45cff48aa')
.then(function(response){
    return response.json();
})
.then(function(data){
    let weather = data.weather; 
    console.log(weather[0].description)
    imageFetch(weather[0].description)
})
}


weatherFetch()