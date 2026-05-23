const router = require("express").Router();

const Property = require("../models/Property");

const protect = require("../middleware/authMiddleware");


// ================= ADD PROPERTY =================
router.post(

    "/add",

    protect,

    async (req, res) => {

        try {

            console.log(req.body);

            const property =
                new Property({

                    title:
                        req.body.title,

                    location:
                        req.body.location,

                    pricePerSqFt:
                        req.body.pricePerSqFt,

                    totalPrice:
                        req.body.totalPrice,

                    type:
                        req.body.type,

                    image:
                        req.body.image,

                    amenities:
                        req.body.amenities,

                    nearbyPlaces:
                        req.body.nearbyPlaces,

                    owner:
                        req.user.id
                });

            await property.save();

            res.status(201).json({

                message:
                    "Property Added Successfully",

                property
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message
            });
        }
    }
);

// ================= GET ALL =================
// ================= GET ALL =================
router.get("/all", async (req, res) => {

    try {

        const properties =
            await Property.find();

        console.log(properties);

        res.status(200).json({

            success: true,

            properties
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message
        });
    }
});

// ================= DELETE PROPERTY =================
router.delete("/delete/:id", protect, async (req, res) => {

    try {

        await Property.findByIdAndDelete(req.params.id);

        res.json({
            message: "Property Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;