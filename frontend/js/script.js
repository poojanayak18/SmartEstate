const API = "http://localhost:5000/api";



// ================= REGISTER =================
async function registerUser() {

    try {

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const role =
            document.getElementById("role").value;


        if (!name || !email || !password) {

            alert("Please Fill All Fields");

            return;
        }


        const res = await fetch(

            `${API}/auth/register`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name,
                    email,
                    password,
                    role
                })
            }
        );


        const data =
            await res.json();


        if (res.ok) {

            alert(
                "✅ Registered Successfully"
            );

            window.location.href =
                "login.html";

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.log(error);

        alert("Register Failed");
    }
}




// ================= LOGIN =================
async function loginUser() {

    try {

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        if (!email || !password) {

            alert(
                "Please Enter Email & Password"
            );

            return;
        }


        const res = await fetch(

            `${API}/auth/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    email,
                    password
                })
            }
        );


        const data =
            await res.json();


        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

            alert(
                "✅ Login Successful"
            );

            window.location.href =
                "index.html";

        } else {

            alert(
                data.message ||
                "Invalid Credentials"
            );
        }

    } catch (error) {

        console.log(error);

        alert("Login Failed");
    }
}




// ================= ADD PROPERTY =================
async function addProperty() {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please Login First"
            );

            return;
        }


        const title =
            document.getElementById("title").value;

        const location =
            document.getElementById("location").value;

        const pricePerSqFt =
            document.getElementById("pricePerSqFt").value;

        const totalPrice =
            document.getElementById("totalPrice").value;

        const type =
            document.getElementById("type").value;

        const image =
            document.getElementById("image").value;


        const res = await fetch(

            `${API}/property/add`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        "Bearer " + token
                },

                body: JSON.stringify({

                    title,

                    location,

                    pricePerSqFt,

                    totalPrice,

                    type,

                    image
                })
            }
        );


        const data =
            await res.json();


        if (res.ok) {

            alert(
                "✅ Property Added Successfully"
            );

            window.location.href =
                "properties.html";

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.log(error);

        alert(
            "Failed To Add Property"
        );
    }
}




// ================= DELETE PROPERTY =================
async function deleteProperty(id) {

    try {

        const token =
            localStorage.getItem("token");

        const confirmDelete =
            confirm(
                "Delete this property?"
            );

        if (!confirmDelete) {

            return;
        }


        const res = await fetch(

            `${API}/property/delete/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                        "Bearer " + token
                }
            }
        );


        const data =
            await res.json();

        alert(data.message);

        loadProperties();

    } catch (error) {

        console.log(error);

        alert(
            "Delete Failed"
        );
    }
}




// ================= LOAD PROPERTIES =================
async function loadProperties() {

    try {

        const res = await fetch(

            `${API}/property/all`
        );

        const data =
            await res.json();


        const purchaseList =
            document.getElementById(
                "purchase-list"
            );

        const rentalList =
            document.getElementById(
                "rental-list"
            );

        const leaseList =
            document.getElementById(
                "lease-list"
            );


        if (
            !purchaseList ||
            !rentalList ||
            !leaseList
        ) {

            return;
        }


        purchaseList.innerHTML = "";
        rentalList.innerHTML = "";
        leaseList.innerHTML = "";



        data.properties.forEach((p) => {



            // ================= IMAGES =================

            const purchaseImages = [

                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
            ];


            const rentalImages = [

                "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200&auto=format&fit=crop"
            ];


            const leaseImages = [

                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",

                "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop"
            ];


            let image = "";


            if (p.type === "purchase") {

                image =

                    purchaseImages[
                        Math.floor(
                            Math.random() *
                            purchaseImages.length
                        )
                    ];
            }

            else if (p.type === "rental") {

                image =

                    rentalImages[
                        Math.floor(
                            Math.random() *
                            rentalImages.length
                        )
                    ];
            }

            else {

                image =

                    leaseImages[
                        Math.floor(
                            Math.random() *
                            leaseImages.length
                        )
                    ];
            }


            if (p.image) {

                image = p.image;
            }



            // ================= LOCATION =================

            const location =
                p.location.toLowerCase();

            let amenities = [];

            let nearby = [];


            if (location.includes("bangalore")) {

                amenities = [

                    "Metro Access",

                    "Swimming Pool",

                    "Gym",

                    "Club House"
                ];

                nearby = [

                    "MG Road Metro",

                    "Apollo Hospital",

                    "Orion Mall"
                ];
            }

            else if (location.includes("goa")) {

                amenities = [

                    "Beach Access",

                    "Sea View",

                    "Private Pool"
                ];

                nearby = [

                    "Candolim Beach",

                    "Goa Mall",

                    "Resort Area"
                ];
            }

            else {

                amenities = [

                    "Parking",

                    "Security",

                    "WiFi"
                ];

                nearby = [

                    "Hospital",

                    "School",

                    "Shopping Center"
                ];
            }



            // ================= WHATSAPP =================

            const whatsappMessage =
                encodeURIComponent(

                    `Hi, I'm interested in ${p.title}`
                );

            const whatsappLink =
                `https://wa.me/?text=${whatsappMessage}`;



            // ================= CARD =================

            const card = `

                <div class="property-card">

                    <img src="${image}">

                    <div class="property-info">

                        <h3>${p.title}</h3>

                        <p>

                            📍 ${p.location}

                        </p>

                        <p class="price">

                            ₹ ${p.totalPrice}

                        </p>



                        ${
                            p.type !== "lease"

                            ?

                            `

                            <div class="amenities-preview">

                                <strong>
                                    Amenities:
                                </strong>

                                <br><br>

                                ${amenities.join(" • ")}

                            </div>

                            `

                            :

                            ""
                        }



                        <div class="nearby-preview">

                            <strong>
                                Nearby:
                            </strong>

                            <br><br>

                            ${nearby.join(" • ")}

                        </div>



                        <!-- VIEW DETAILS -->
                        <a
                            href="property-details.html?id=${p._id}"
                            class="details-btn">

                            View Details

                        </a>



                        <!-- WHATSAPP -->
                        <a
                            href="${whatsappLink}"
                            target="_blank"
                            class="whatsapp-btn">

                            📱 Contact Owner

                        </a>



                        <!-- DELETE -->
                        <button
                            class="delete-btn"
                            onclick="deleteProperty('${p._id}')">

                            🗑 Delete Property

                        </button>

                    </div>

                </div>

            `;



            if (p.type === "purchase") {

                purchaseList.innerHTML += card;
            }

            else if (p.type === "rental") {

                rentalList.innerHTML += card;
            }

            else {

                leaseList.innerHTML += card;
            }

        });

    } catch (error) {

        console.log(error);
    }
}




// ================= AI PRICE PREDICTOR =================
function predictPrice() {

    const location =

        document.getElementById(
            "predictLocation"
        ).value.toLowerCase();


    const area = Number(

        document.getElementById(
            "predictArea"
        ).value
    );


    const type =

        document.getElementById(
            "predictType"
        ).value;


    if (!location || !area) {

        alert(
            "Please Enter Location and Area"
        );

        return;
    }


    let pricePerSqFt = 5000;


    if (location.includes("bangalore")) {

        pricePerSqFt = 7000;
    }

    else if (location.includes("mumbai")) {

        pricePerSqFt = 15000;
    }

    else if (location.includes("goa")) {

        pricePerSqFt = 10000;
    }

    else {

        pricePerSqFt = 5000;
    }


    if (type === "rental") {

        pricePerSqFt *= 0.4;
    }

    else if (type === "lease") {

        pricePerSqFt *= 0.6;
    }


    const estimatedPrice =

        area * pricePerSqFt;


    document.getElementById(
        "predictionResult"
    ).innerHTML =

        `Estimated AI Price:
         ₹ ${estimatedPrice.toLocaleString()}`;
}