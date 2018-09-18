function createNode(element){
    return document.createElement(element);
  }
  
  function append(parent, element){
    return parent.appendChild(element)
  } 
  

  let mainImageDiv = document.querySelector('.photo');
  let weatherDescription = document.querySelector('#conditions')
  let credits = document.querySelector('#credit-user');
  let form = document.querySelector('.search'); 
  let input = document.querySelector('.search__input')
  let thumbNailsDiv = document.querySelector('.thumbs');
  let thumbNails = document.querySelector('.thumb');
  function imageFetch(description) {
    fetch(`https://api.unsplash.com/search/photos?query=${description}&client_id=c983e2460b497eab772c710349148927497de703a9dd2f4a61217006c714e76b`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
       let mainImage = createNode('img');
        mainImage.src = data.results[0].urls.regular;
         credits.textContent = data.results[0].user.name;
         credits.href = data.results[0].user.links.html;
        
        append(mainImageDiv, mainImage);
        createThumb(data);

            let thumbNails = document.querySelectorAll('.thumb');
            
            addListener(thumbNails)
        })
    
    }


function weatherFetch(city='london') {
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=886ac1fdabafed2710d90bf45cff48aa`)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
    let weather = data.weather; 
    //console.log(weather[0].description)
    imageFetch(weather[0].description);
    weatherDescription.innerHTML = `${weather[0].description} - temperature (celcius): ${convertToCelcius(data.main.temp)}`
})

}

weatherFetch()

form.addEventListener('submit', function(event){
    if (input.value !== "") {
    event.preventDefault();
    console.log(input.value)
    city = input.value;  
    thumbNailsDiv.innerHTML = "";
    mainImageDiv.innerHTML = "";
    weatherFetch(city);
    }
});

function convertToCelcius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
    
}

function createThumb(data){
    data.results.forEach(function(image) {
     let images = createNode('img');
     images.src = image.urls.regular;
     images.className = 'thumb';
     images.textContent = image.user.name;
     images.href = image.user.links.html;
     append(thumbs, images);
    })
}

function addListener(imgArray){
    imgArray.forEach(function(image){
        image.addEventListener('click', function(event){     
    credits.textContent = "";
        credits.href = "";
        mainImageDiv.innerHTML = ""; 
        let mainImage = createNode('img');
        mainImage.src = event.target.src;
        credits.textContent = image.textContent;
        credits.href = image.href;
        append(mainImageDiv, mainImage)
        

        
    })
})
}