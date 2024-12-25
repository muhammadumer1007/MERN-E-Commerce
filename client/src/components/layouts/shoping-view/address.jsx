import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";

// import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop-slice/address-slice";
import AddressCard from "./address-card";
const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();
    const dispatch = useDispatch();

    function handleManageAddress(event) {
        event.preventDefault();

        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive",
            });

            return;
        }

        currentEditedId !== null
            ? dispatch(
                editAddress({
                    userId: user?.id,
                    addressId: currentEditedId,
                    formData,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address updated successfully",
                    });
                }
            })
            : dispatch(
                addNewAddress({
                    ...formData,
                    userId: user?.id,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address added successfully",
                    });
                }
            });
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
            deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                toast({
                    title: "Address deleted successfully",
                });
            }
        });
    }

    function handleEditAddress(getCuurentAddress) {
        setCurrentEditedId(getCuurentAddress?._id);
        setFormData({
            ...formData,
            address: getCuurentAddress?.address,
            city: getCuurentAddress?.city,
            phone: getCuurentAddress?.phone,
            pincode: getCuurentAddress?.pincode,
            notes: getCuurentAddress?.notes,
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
    }, [dispatch]);

    console.log(addressList, "addressList");

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((singleAddressItem) => (
                        <AddressCard
                            selectedId={selectedId}
                            handleDeleteAddress={handleDeleteAddress}
                            addressInfo={singleAddressItem}
                            handleEditAddress={handleEditAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />
                    ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? "Edit Address" : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <form className="space-y-4" onSubmit={handleManageAddress}>
                    {/* Address input */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                            type="text"
                            id="address"
                            name="address"
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        />
                    </div>

                    {/* City input */}
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                        >
                            City
                        </label>
                        <input
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                            }
                            type="text"
                            id="city"
                            name="city"
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        />
                    </div>

                    {/* Phone input */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            type="text"
                            id="phone"
                            name="phone"
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        />
                    </div>

                    {/* Pincode input */}
                    <div>
                        <label
                            htmlFor="pincode"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pincode
                        </label>
                        <input
                            value={formData.pincode}
                            onChange={(e) =>
                                setFormData({ ...formData, pincode: e.target.value })
                            }
                            type="text"
                            id="pincode"
                            name="pincode"
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        />
                    </div>

                    {/* Notes input */}
                    <div>
                        <label
                            htmlFor="notes"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            id="notes"
                            name="notes"
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                            disabled={!isFormValid()}
                        >
                            {currentEditedId !== null ? "Update Address" : "Add Address"}
                        </button>
                    </div>
                </form>
            </CardContent>

        </Card>
    );
}

export default Address;
