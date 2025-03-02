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

    const imagePost = document.createElement("img")
    imagePost.src = imageUrl

    const namePost = document.createElement("h4")
    namePost.innerText = name

    const brandPost = document.createElement("h5")
    brandPost.innerText = brand

    const pricePost = document.createElement("h5")
    pricePost.innerText = price

    const descriptionPost = document.createElement("p")
    descriptionPost.innerText = description

    prodCard.append(imagePost, namePost, brandPost, pricePost, descriptionPost)

    return prodCard
}


detailProduct()