export function capitalize(str: string): string {
  // Check if the input is a valid string
  if (typeof str !== "string") {
    return str;
  }

  // Capitalize the first letter and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""; // Return empty string if dateString is falsy

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Return empty string if date is invalid

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return ""; // Return empty string if dateString is falsy

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Return empty string if date is invalid

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);

  return `${formattedDate}  ${formattedTime}`;
}

export function formatTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export const getCroppedImg = async (imageSrc: string, crop: any): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "anonymous"; // Avoid CORS issues
    image.onload = () => {
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      // Debug: Log natural dimensions
      console.log("Natural Image Dimensions:", { naturalWidth, naturalHeight });

      // Convert crop dimensions from percentage to pixels if needed
      const cropX =
        crop.unit === "%" ? (crop.x / 100) * naturalWidth : crop.x;
      const cropY =
        crop.unit === "%" ? (crop.y / 100) * naturalHeight : crop.y;
      const cropWidth =
        crop.unit === "%" ? (crop.width / 100) * naturalWidth : crop.width;
      const cropHeight =
        crop.unit === "%" ? (crop.height / 100) * naturalHeight : crop.height;

      console.log("Raw Crop Values:", { cropX, cropY, cropWidth, cropHeight });

      // Introduce manual adjustment or scaling
      const OFFSET_X = 12; // Adjust X-coordinate dynamically
      const adjustedCropX = Math.max(
        0,
        Math.min(cropX + OFFSET_X, naturalWidth - cropWidth)
      );
      const adjustedCropY = Math.max(
        0,
        Math.min(cropY, naturalHeight - cropHeight)
      );

      console.log("Adjusted Crop Coordinates:", {
        adjustedCropX,
        adjustedCropY,
        cropWidth,
        cropHeight,
      });

      // Set the canvas dimensions based on the crop area
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      if (ctx) {
        // Draw the cropped area onto the canvas
        ctx.drawImage(
          image,
          adjustedCropX, // Source X coordinate
          adjustedCropY, // Source Y coordinate
          cropWidth, // Width of the crop area in the source image
          cropHeight, // Height of the crop area in the source image
          0, // Destination X coordinate on canvas
          0, // Destination Y coordinate on canvas
          cropWidth, // Width on the canvas
          cropHeight // Height on the canvas
        );
      }

      // Convert canvas content to a blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          console.log("Cropped image blob created successfully");
          resolve(blob);
        },
        "image/jpeg",
        1 // Adjust quality if needed
      );
    };

    image.onerror = (error) => {
      console.error("Error loading image:", error);
      reject(error);
    };

    image.src = imageSrc;
  });
};

export const maskPhoneNumber = (phoneNumber: string): string => {
  let maskedPhoneNumber = "";
  if (phoneNumber) {
    const visibleDigits = 2;

    const countryCode = phoneNumber.slice(0, 3);
    const digits = phoneNumber.slice(3);

    const maskedDigits =
      "x".repeat(digits.length - visibleDigits) + digits.slice(-visibleDigits);

    maskedPhoneNumber = countryCode + maskedDigits;
  }
  return maskedPhoneNumber;
};
