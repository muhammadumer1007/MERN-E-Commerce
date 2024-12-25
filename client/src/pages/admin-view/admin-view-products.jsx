import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin-slice/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./product-tile";
import { filterOptions } from "@/config";

function AdminViewProducts() {
  const { productList, isLoading } = useSelector((state) => state.products);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const { toast } = useToast();

  const createProduct = () => {
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    )
      .then((res) => {
        if (res?.payload?.status == "Success") {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          dispatch(fetchAllProducts());
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
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  };

  const updateProduct = () => {
    dispatch(editProduct({ id: currentEditedId, formData }))
      .then((res) => {
        if (res?.payload?.status == "Success") {
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          dispatch(fetchAllProducts());
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
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (currentEditedId != null) {
      updateProduct();
    } else {
      createProduct();
    }
  };

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Success!",
          description: data.payload?.message,
        });
      } else {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => {
            return (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
                setImageFile={setImageFile}
              />
            );
          })
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            {currentEditedId ? (
              <SheetTitle>Update Product</SheetTitle>
            ) : (
              <SheetTitle>Add New Product</SheetTitle>
            )}
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <form className="space-y-4" onSubmit={(e) => handleOnSubmit(e)}>
              {/* Title input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              {/* Description textarea */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                ></textarea>
              </div>

              {/* Category dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  <option value="">Select a category</option>
                  {
                    filterOptions.category.map((e) => {
                      return (
                        <option value={e.id}>{e.label}</option>
                      )
                    })
                  }
                </select>
              </div>

              {/* Brand dropdown */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  <option value="">Select a brand</option>
                  {
                    filterOptions.brand.map((e) => {
                      return (
                        <option value={e.id}>{e.label}</option>
                      )
                    })
                  }

                </select>
              </div>

              {/* Price input */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              {/* Sale input */}
              <div>
                <label
                  htmlFor="salePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sale
                </label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              {/* Total stock input */}
              <div>
                <label
                  htmlFor="totalStock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Stock
                </label>
                <input
                  type="number"
                  id="totalStock"
                  name="totalStock"
                  value={formData.totalStock}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  {currentEditedId ? "Update " : "Create "}
                  Product
                </button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminViewProducts;
