import Address from "../../models/address-model.js"
import asyncHandler from "express-async-handler";


const fetchAllAddress = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.json({
                success: false,
                status: "Error",
                message: "User Id required",
            });
        }
        const addressList = await Address.find({ userId });
        return res.status(200).json({
            success: true,
            status: "Success",
            message: "address fetched successfully",
            data: {
                count: addressList.length,
                addressList,
            },
        });
    } catch (error) {
        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while fetching address list",
        });

    }
})

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;


        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.json({
                success: false,
                status: "Error",
                message: "All Fields Are Required",
            });
        }
        const newlyCreatedAddress = await Address.create({
            userId,
            address,
            city,
            pincode,
            notes,
            phone,
        });

        return res.status(201).json({
            success: true,
            status: "Success",
            message: "Address created successfully",
            data: newlyCreatedAddress,
        });
    } catch (error) {

        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while creating address",
        });
    }

};

const editAddress = asyncHandler(async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        const formData = req.body;

        const address = await Address.findById({
            _id: addressId,
            userId,
        });
        if (!address) {
            return res.json({
                success: false,
                status: "Error",
                message: "address not found",
            });
        }
        const updatedAddress = await Address.findByIdAndUpdate(
            {
                _id: addressId,
                userId,
            },
            {
                address: formData.address || address.address,
                city: formData.city || address.city,
                pincode: formData.pincode || address.pincode,
                phone: formData.phone || address.phone,
                notes: formData.notes || address.notes
            }
        )
        return res.json({
            success: true,
            status: "Success",
            message: "Address updated successfully",
        });
    } catch (err) {
        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while updating the address",
        });

    }
})

const deleteAddress = asyncHandler(async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.json({
                success: false,
                status: "Error",
                message: "User Id And Address Id Are required",
            });
        }
        const address = await Address.findOneAndDelete({ _id: addressId, userId });


        if (!address) {
            return res.json({
                success: false,
                status: "Error",
                message: "Address not found",
            });
        }
        return res.json({
            success: true,
            status: "Success",
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.json({
            success: false,
            status: "Error",
            message: "Something error occurred while deleting the Address",
        });

    }
})



export { fetchAllAddress, addAddress, editAddress, deleteAddress }