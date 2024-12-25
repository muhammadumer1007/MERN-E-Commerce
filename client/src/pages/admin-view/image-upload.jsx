import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isCustomStyling = false,

}) {
  let isEditMode = false;
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImage = async () => {
    if (imageFile != null) {
      try {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("file", imageFile);
        const responce = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
          data
        );
        console.log(responce);
        if (responce?.data?.success) {
          setUploadedImageUrl(responce.data.result.url);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setImageLoadingState(false);
      }
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageFile]);
  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""
          } border-2 border-dashed rounded-lg p-4`}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        //   disabled={isEditMode}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""
              } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </label>
        ) : imageLoadingState ? (
          <Skeleton className="w-full h-[20px] rounded-full" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
