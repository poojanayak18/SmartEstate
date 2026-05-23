const API = "http://localhost:5000/api";



// GET PROPERTY ID
const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    params.get("id");



async function loadPropertyDetails() {

    try {

        const res = await fetch(

            `${API}/property/all`
        );

        const data =
            await res.json();



        const property =
            data.properties.find(

                (p) => p._id === id
            );



        if (!property) {

            alert(
                "Property Not Found"
            );

            return;
        }



        // IMAGE
        const image =

            property.image ||

            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop";



        // MAP
        const map =

            `https://www.google.com/maps?q=${property.location}&output=embed`;



        // WHATSAPP
        const whatsappMessage =
            encodeURIComponent(

                `Hi, I'm interested in ${property.title}`
            );

        const whatsappLink =
            `https://wa.me/?text=${whatsappMessage}`;



        // HTML
        document.getElementById(
            "property-details"
        ).innerHTML = `

            <div class="details-card">

                <img
                    src="${image}"
                    class="details-image">


                <div class="details-info">

                    <h1>

                        ${property.title}

                    </h1>

                    <p>

                        📍 ${property.location}

                    </p>

                    <h2>

                        ₹ ${property.totalPrice}

                    </h2>



                    <!-- MAP -->
                    <iframe
                        src="${map}"
                        width="100%"
                        height="350"
                        style="border:0;"
                        loading="lazy">

                    </iframe>



                    <!-- WHATSAPP -->
                    <a
                        href="${whatsappLink}"
                        target="_blank"
                        class="whatsapp-btn">

                        📱 Contact Owner

                    </a>



                    <!-- PAYMENT BUTTON -->
                    <button
                        class="payment-btn"
                        onclick="payNow(${property.totalPrice})">

                        💳 Book / Pay Now

                    </button>

                </div>

            </div>

        `;

    } catch (error) {

        console.log(error);
    }
}



loadPropertyDetails();




// ================= PAYMENT =================
function payNow(amount) {

    const options = {

        key: "rzp_test_SrCQPIoL8P6uI4
",

        amount: amount * 100,

        currency: "INR",

        name: "SmartEstate",

        description: "Property Booking Payment",

        image:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",


        handler: function (response) {

            alert(

                "✅ Payment Successful\n\n" +

                "Payment ID: " +

                response.razorpay_payment_id
            );
        },


        theme: {

            color: "#00b894"
        }
    };


    const rzp =
        new Razorpay(options);

    rzp.open();
}