const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

const tBody = document.getElementById("tableBody")

const postName = document.getElementById("post-name")
const postBrand = document.getElementById("post-brand")
const postDescription = document.getElementById("post-description")
const postPrice = document.getElementById("post-price")
const postUrl = document.getElementById("post-urlImg")
const postAlert = document.getElementById("alertMsg")

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

    tBody.innerHTML = "";

    const cycleProd = set.map((element) => createRow(element))
    tBody.append(...cycleProd);
}

//Funzione per creare la row
function createRow({name, brand, description, price, imageUrl, _id}) {
    const tableRow = document.createElement("tr");

    const cellName = document.createElement("td")
    cellName.innerText = name

    const cellBrand = document.createElement("td")
    cellBrand.innerText = brand

    const cellDescription = document.createElement("td")
    cellDescription.innerText = description

    const cellPrice = document.createElement("td")
    cellPrice.innerText = price + " €"
    cellPrice.className = "px-0"
    cellPrice.style.width = "55px"

    const cellUrl = document.createElement("td")
    cellUrl.innerText = imageUrl
    cellUrl.style.width = "230px"

    const cellActions = document.createElement("td")
    cellActions.style.width = "100px"

    const editButton = document.createElement("a")
    editButton.innerText = "Edit post"
    editButton.className = "btn btn-success px-1 py-1"
    editButton.style.width = "75px"
    editButton.setAttribute("href", `edit.html?q=${_id}`);

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete post"
    deleteButton.className = "btn btn-danger px-0 py-1 mt-1"
    deleteButton.style.width = "75px"
    deleteButton.addEventListener("click", () => {
        deleteLine(_id)

    });
    
    

    cellActions.append(editButton, deleteButton)

    tableRow.append(cellName, cellBrand, cellDescription, cellPrice, cellUrl, cellActions)

    return tableRow
}



//Funzione POST per inserire un nuovo prodotto
async function createLine() {

    if(postName.value && postBrand.value && postDescription.value && postPrice.value && postUrl.value ) {
       
        try{


        const newLine = {
            name: postName.value,
            brand: postBrand.value,
            description: postDescription.value,
            price: postPrice.value,
            imageUrl: postUrl.value,
            
            
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(newLine),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"

                
            }
        });

        getCards()
    } catch (error) {
        console.log(error);
    }

} else {
    
        postAlert.classList.remove('d-none');

        setTimeout(() => {
            postAlert.classList.add('d-none');
        }, 7000);

    }
}




//Funzione DELETE per eliminare un prodotto
async function deleteLine(iden) {
    try {
        const response = await fetch(apiUrl + iden, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"
                }
            
        });

        getCards();
    } catch (err) {
        console.log(err);
    }
    
}




getCards()






    
