import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderDetails from "./admin-orders-details";
import { getAllOrders, getOrderDetails, resetOrderDetails } from "@/store/admin-slice/orders-slice";

// import ShoppingOrderDetailsView from "./order-details";
// import {
//     getAllOrdersByUserId,
//     getOrderDetails,
//     resetOrderDetails,
// } from "@/store/shop/order-slice";

function AdminViewOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                        }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                      >
                        View Details
                      </Button>
                      <AdminOrderDetails setOpenDetailsDialog={setOpenDetailsDialog} orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  );
}

export default AdminViewOrders;
