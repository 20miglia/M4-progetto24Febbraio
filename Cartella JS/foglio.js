const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

const resultBox = document.getElementById("boxCard")


//Funzione per chiamata API
async function getCards() {
    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"
            }
        })
        
        const json = await res.json();
        cycleProducts(json)
        console.log(json);

    } catch (err) {
        console.log(err);
    }
}

//Funzione per ciclare i risultati   
function cycleProducts(set) {

    resultBox.innerHTML = "";

    const cycleProd = set.map((element) => createCard(element))
    resultBox.append(...cycleProd);
}


//Funzione per creare le card dei prodotti
function createCard({imageUrl, name, price, _id}){
   
   const colBox = document.createElement("div")
   colBox.classList.add("col-12", "col-md-6", "col-lg-3")
   
   //colBox.className = "col-12 col-md-6 col-lg-3"

   const cardBody = document.createElement("div")
   cardBody.classList.add("card", "mt-4")
   cardBody.style.height = "320px"
   
   const productImg = document.createElement("img")
   productImg.src = imageUrl
   productImg.style.height = "214px"

   const textBody = document.createElement("div")
   textBody.classList.add("card-body")

   const productName = document.createElement("h5");
   productName.innerText = name
   productName.classList.add("fs-4", "fw-bold", "fst-italic")

   const productPrice = document.createElement("h6");
   productPrice.innerText = "Price:" + " " + price + "€"
   productPrice.className = "fs-5 fw-medium"

   const detailProduct = document.createElement("a")
   detailProduct.innerText = "Product details" 
   detailProduct.className = "btn btn-dark btn-sm"
    detailProduct.setAttribute('href', `details.html?id=${_id}`);
   


   cardBody.appendChild(productImg)

   textBody.append(productName, productPrice, detailProduct)

   cardBody.appendChild(textBody)

   colBox.appendChild(cardBody)

   return colBox

}


getCards()
