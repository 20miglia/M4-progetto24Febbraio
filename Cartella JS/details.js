const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

const productResults = document.getElementById("productBox")


async function detailProduct() {
    const query = window.location.search; 
    console.log(window.location.search)
    const params = new URLSearchParams(query);
    const prodId = params.get('id');

    try{

        const res = await fetch(apiUrl + prodId, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"
            }
        })
        const json = await res.json();


        const myProduct = createProductTemplate(json);
        productResults.appendChild(myProduct);
    } 
    catch (err) {
        console.log(err)
    }
}

function createProductTemplate({imageUrl, name, brand, description, price}){

    const prodCard = document.createElement('div');
    prodCard.classList.add('text-center')
    prodCard.style.border = "2px solid black"
    prodCard.style.width = "50%"
    prodCard.style.height = "500px"

    const imagePost = document.createElement("img")
    imagePost.src = imageUrl
    imagePost.style.width = "300px"
    imagePost.style.height = "300px"

    const namePost = document.createElement("h4")
    namePost.innerText = "Name:" + " " + name
    namePost.style.fontSize = "35pt"
    namePost.style.fontWeight = "bold"
    

    const brandPost = document.createElement("h5")
    brandPost.innerText = "Brand:" + " " + brand
    brandPost.style.fontSize = "30pt"
    brandPost.style.fontWeight = "bold"

    const pricePost = document.createElement("h5")
    pricePost.innerText = "Price:" + " " + price + "€"
    pricePost.style.fontSize = "30pt"
    pricePost.style.fontWeight = "bold"

    const descriptionPost = document.createElement("p")
    descriptionPost.innerText = "Description:" + " " + description
    descriptionPost.style.fontSize = "15pt"
    descriptionPost.style.fontWeight = "regular"
    

    prodCard.append(imagePost, namePost, brandPost, pricePost, descriptionPost)

    return prodCard
}


detailProduct()