
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

const postName = document.getElementById("post-name")
const postBrand = document.getElementById("post-brand")
const postDescription = document.getElementById("post-description")
const postPrice = document.getElementById("post-price")
const postUrl = document.getElementById("post-urlImg")

const query = window.location.search; 
    const params = new URLSearchParams(query);
    const prodId = params.get('q');




async function edProduct() {
    

    try{

        const res = await fetch(apiUrl + prodId, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"
            }
        })
        const json = await res.json();

     postName.value = json.name;
     postBrand.value = json.brand;
     postDescription.value = json.description;
     postPrice.value = json.price;
     postUrl.value = json.imageUrl;
    }
    catch (err) {
        console.log(err);
    }
}



async function updatePost() {
    if (postName.value && postBrand.value && postDescription.value && postPrice.value && postUrl.value) {
        const postEdit = {
            name: postName.value,
            brand: postBrand.value,
            description: postDescription.value,
            price: postPrice.value,
            imageUrl: postUrl.value,
        };

        try {
            const res = await fetch(apiUrl + prodId, {
                method: "PUT",
                body: JSON.stringify(postEdit),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZTZkZjFlMTQwNjAwMTUzMTRkMGQiLCJpYXQiOjE3NDA0OTg2NTYsImV4cCI6MTc0MTcwODI1Nn0.4-GACHFCRrUJ4roOAY3D9QacOX-BUkKeZcyyX3z0U_4"
                }
            });

            editMsg.classList.remove("d-none");

            setTimeout(() => {
                editMsg.classList.add('d-none');
                window.location.href = '/backOffice.html';
            }, 5000);
        } catch (err) {
            console.log(err);
        }

    } else {
        alertMsg.classList.remove("d-none");

        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000)
    }
}




edProduct()