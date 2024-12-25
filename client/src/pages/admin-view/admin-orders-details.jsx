import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { adminOrderStatus } from "@/config";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAllOrders, getOrderDetails, updateOrderStatus } from "@/store/admin-slice/orders-slice";

const initialFormData = {
    status: "",
};

function AdminOrderDetails({ setOpenDetailsDialog, orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        setFormData({
            status: orderDetails?.orderStatus
        })
    }, [])
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { status } = formData;
        dispatch(updateOrderStatus({
            id: orderDetails._id,
            orderStatus: status
        })).then((res) => {
            if (res?.payload?.status == "Success") {
                dispatch(getAllOrders());
                dispatch(getOrderDetails(orderDetails._id));
                toast({
                    title: "Success!",
                    description: res.payload?.message,
                });
            } else {
                toast({
                    title: "Error!",
                    description: res.payload?.message,
                    variant: "destructive",
                });
            }
        })
            .catch((err) => {
                toast({
                    title: "Error!",
                    description: err.message,
                });
            });

    }
    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>

                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>

                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>

                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge
                                className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderDetails?.orderStatus === "rejected"
                                        ? "bg-red-600"
                                        : "bg-black"
                                    }`}
                            >
                                {orderDetails?.orderStatus}

                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => handleOnSubmit(e)}>
                    <div>
                        <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Brand
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        >
                            {
                                adminOrderStatus.map((e) => {
                                    return (
                                        <option key={e.id} value={e.id}>{e.label}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                        >
                            Update Order Status
                        </button>
                    </div>
                </form>

            </div>
        </DialogContent>
    );
}

export default AdminOrderDetails;
