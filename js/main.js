let imgarry =[];
async function getImages() {
    const accessKey = 'ifXIkLpGASymRlq52PZbWdlOueq7hlVDUfFV7ILaVgA'; 
    const count = 50; 
    const apiUrl = `https://api.unsplash.com/photos/random?count=${count}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Client-ID ${accessKey}`
            }
        });
        const photosArray = await response.json();
        return photosArray; 
    } catch (error) {
        console.error('Oops, something went wrong with the API:', error);
    }
}


function displayimg(imgarry) {

    let img_container = document.querySelector(".img_container");
    img_container.innerHTML = '';

    imgarry.forEach(oneimg =>{
        let createimg = document.createElement("img")
        createimg.src = oneimg.urls.small;
        createimg.alt = oneimg.alt_description; 
        
        createimg.dataset.date = oneimg.created_at;
        createimg.dataset.fullUrl = oneimg.urls.full;
        createimg.dataset.imgname = oneimg.user.name;
        createimg.dataset.location = oneimg.user.location;

        img_container.appendChild(createimg)
    })
}

async function displayandget() {
    imgarry = await getImages();

    if (imgarry) {
        displayimg(imgarry);
    }
}

displayandget();


document.querySelector(".img_container").addEventListener("click", (e) => {
    let link = e.target.src;
    if (link != undefined) {

        document.querySelector(".big_img").src = e.target.dataset.fullUrl
        document.querySelector(".image_info").innerHTML ="Name : "+ e.target.dataset.imgname
        document.querySelector(".image_info2").innerHTML ="Location : "+ e.target.dataset.location
        document.querySelector(".image_info3").innerHTML ="Date : "+ e.target.dataset.date
        document.querySelector(".image_info4").innerHTML ="Description : "+ e.target.alt
        document.querySelector(".hidden").style.display = "flex"
        document.querySelector(".hidden1").style.display = "block"
    }
})


document.querySelector(".close_button").addEventListener("click", () => {
    document.querySelector(".hidden").style.display = "none"
    document.querySelector(".hidden1").style.display = "none"
})