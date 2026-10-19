 const updateQuantity = async (productId, quantity) => {
    try {
      if (!productId) {
        console.log("Product ID is missing");
        return;
      }

      if (quantity < 1) {
        return;
      }

      console.log("UPDATE QUANTITY:", {
        productId,
        quantity,
      });

      const res = await apiInstance.patch("/cart/quantity", {
        productId: productId,
        quantity: quantity,
      });

      console.log("QUANTITY UPDATE RESPONSE:", res.data);
      await getData();
    } catch (error) {
      console.log("UPDATE QUANTITY ERROR:", error);
      console.log(
        "UPDATE QUANTITY ERROR RESPONSE:",
        error?.response?.data
      );
    }
  };


  const increaseQuantity = (item) => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      return;
    }

    updateQuantity(item.productId, item.quantity - 1);
  };