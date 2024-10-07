const express = require("express");
const prisma = require("./db/db");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Helloooo");
});

app.get("/menus", async (req, res) => {
  try {
    const allMenus = await prisma.menu.findMany({});
    // console.log(allMenus == null);

    if (allMenus.length == 0) {
      return res.json({
        msg: "No Menus found",
      });
    }

    res.json({
      allMenus,
    });
  } catch (error) {
    console.log(`Error while getting all the menus : ${error}`);
    res.status(500).json({
      error: "Error while getting the menus",
    });
  }
});

app.get("/showcart", async (req, res) => {
  try {
    const cartItems = await prisma.cart.findMany({
      include: {
        meal: {
          include: {
            menu: true, // Include menu details for each meal
          },
        },
      },
    });

    res.status(200).json({
      cartItems,
    });
  } catch (error) {
    console.log("Error while fetching the products from the cart.", error);
    return res.status(500).json({
      msg: "Failed to load cart products",
    });
  }
});

// app.get("/showcart", async (req, res) => {
//   try {
//     const cartItems = await prisma.cart.findMany({
//       where: {},
//       include: {
//         menu: true,
//       },
//     });

//     res.status(200).json({
//       Products: cartItems,
//     });
//   } catch (error) {
//     console.log("Error while fetching the products form the cart.", error);
//     return res.status(500).json({
//       msg: "Failed to load cart products",
//     });
//   }
// });

// app.post("/addToCart", async (req, res) => {
//   const { menuId, quantity } = req.body;
//   // console.log({size});

//   if (!menuId || isNaN(quantity) || quantity <= 0) {
//     return res.status(400).json({ msg: "Invalid menuId or quantity." });
//   }

//   try {
//     const menu = await prisma.menu.findUnique({
//       where: { id: menuId },
//     });

//     if (!menu) {
//       return res.status(404).json({
//         msg: "Menu not found",
//       });
//     }

//     // First lets check if this product already exists in the cart and if it exists then update the
//     const existingMenu = await prisma.cart.findFirst({
//       where: {
//         menuId: menuId,
//       },
//     });
//     console.log("existingProduct -------------- ", existingMenu);
//     if (existingMenu) {
//       try {
//         // console.log("if else ", existingProduct.id);
//         const newQuantity = existingMenu.quantity + parseInt(quantity);
//         if (newQuantity <= 0) {
//           return res
//             .status(400)
//             .json({ msg: "Quantity must be greater than zero." });
//         }
//         const updatedProduct = await prisma.cart.update({
//           where: {
//             id: existingMenu.id,
//           },
//           data: {
//             quantity: newQuantity,
//           },
//         });

//         console.log(updatedProduct);
//         return res.status(200).json({
//           msg: "Product quantity updated successfully.",
//         });
//       } catch (error) {
//         console.log(
//           "Error updating the existing product into the cart : ",
//           error
//         );
//         return res.status(500).json({
//           msg: "Error while updating the product quantity.",
//         });
//       }
//     }

//     // lets add the product into the cart
//     const cart = await prisma.cart.create({
//       data: {
//         menuId: menuId,
//         quantity: parseInt(quantity),
//         price: menu.price,
//       },
//     });

//     console.log("New Cart Item : ", cart);
//     res.status(200).json({
//       msg: "Product added to the cart.",
//     });
//   } catch (error) {
//     console.log("Error while adding product to the cart : ", error);
//     return res.status(500).json({
//       msg: "Failed to add the product to cart.",
//     });
//   }
// });

// app.post("/addToCart", async (req, res) => {
//   const { menuIds, mealType, quantity } = req.body;

//   if (!menuIds || menuIds.length === 0 || isNaN(quantity) || quantity <= 0) {
//     return res.status(400).json({ msg: "Invalid input" });
//   }

//   try {
//     // Check if the cart already exists
//     let cart = await prisma.cart.findFirst({
//       where: { mealType },
//     });

//     if (!cart) {
//       // Create a new cart if it doesn't exist
//       cart = await prisma.cart.create({
//         data: {
//           mealType,
//           quantity,
//           price: 0, // Price will be updated based on meals
//         },
//       });
//     }

//     // Add the selected meals to the cart
//     const meals = [];
//     let totalPrice = 0;

//     for (const menuId of menuIds) {
//       const menu = await prisma.menu.findUnique({
//         where: { id: menuId },
//       });

//       if (menu) {
//         meals.push({
//           menuId: menu.id,
//           cartId: cart.id,
//         });
//         totalPrice += menu.price;
//       }
//     }

//     if (meals.length > 0) {
//       await prisma.meal.createMany({ data: meals });
//     }

//     // Update cart price
//     await prisma.cart.update({
//       where: { id: cart.id },
//       data: { price: totalPrice },
//     });

//     res.status(200).json({ msg: "Meals added to the cart." });
//   } catch (error) {
//     console.log("Error while adding meals to the cart: ", error);
//     return res.status(500).json({ msg: "Failed to add meals to cart." });
//   }
// });

app.post("/addToCart", async (req, res) => {
  const { menuIds, mealType, quantity, extraChapatiCount } = req.body;

  console.log(req.body);

  if (!menuIds || menuIds.length === 0 || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    // Check if the cart already exists
    // let cart = await prisma.cart.findFirst({
    //   where: { mealType },
    // });

    // if (!cart) {
    // Create a new cart if it doesn't exist
    let cart = await prisma.cart.create({
      data: {
        mealType,
        quantity,
        price: 0, // Price will be updated based on meals
      },
    });
    // }

    // Add the selected meals to the cart
    const meals = [];
    let totalPrice = 0;

    // Loop through selected menuIds (vegetables, chapati combos, rice, etc.)
    for (const menuId of menuIds) {
      const menu = await prisma.menu.findUnique({
        where: { id: menuId },
      });

      if (menu) {
        meals.push({
          menuId: menu.id,
          cartId: cart.id,
          quantity: 1, // Default quantity is 1 for regular items
        });
        totalPrice += menu.price;
      }
    }

    // If extra chapatis are selected, add a record for that
    if (extraChapatiCount > 0) {
      const extraChapati = await prisma.menu.findFirst({
        where: { category: "extraChapati" },
      });

      if (extraChapati) {
        meals.push({
          menuId: extraChapati.id,
          cartId: cart.id,
          quantity: extraChapatiCount, // Store the number of extra chapatis
        });
        totalPrice += extraChapati.price * extraChapatiCount; // Adjust total price
      }
    }

    console.log("meals array : ", meals);

    // Add the meal records to the database
    if (meals.length > 0) {
      await prisma.meal.createMany({ data: meals });
    }

    // Update the cart price
    await prisma.cart.update({
      where: { id: cart.id },
      data: { price: totalPrice },
    });

    res.status(200).json({ msg: "Meals added to the cart." });
  } catch (error) {
    console.log("Error while adding meals to the cart: ", error);
    return res.status(500).json({ msg: "Failed to add meals to cart." });
  }
});

// app.put("/updateQuantity", async (req, res) => {
//   // console.log("request hitting for update the quantity");
//   const { menuId, quantity } = req.body;

//   // console.log("product qunatity: ",quantity);

//   try {
//     const cartItem = await prisma.cart.findFirst({
//       where: {
//         menuId: menuId,
//       },
//     });

//     if (!cartItem) {
//       return res.status(400).json({
//         msg: "Item not found.",
//       });
//     }

//     const updateQuantity = await prisma.cart.update({
//       where: {
//         id: cartItem.id,
//       },
//       data: {
//         quantity: parseInt(quantity),
//       },
//     });

//     console.log("item after update : ", updateQuantity);

//     res.status(200).json({
//       msg: "Quantity updated successfully.",
//     });
//   } catch (error) {
//     console.log("Error while updating the cartItems quantity", error);
//     return res.status(500).json({
//       Error: "Internal sever error",
//     });
//   }
// });

app.put("/updateQuantity", async (req, res) => {
  const { cartId, quantity } = req.body;

  if (!cartId || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        meal: {
          include: {
            menu: true, // Include menu details to access the original price
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found." });
    }

    // Calculate the new total price based on the new quantity
    let totalPrice = 0;
    for (const meal of cart.meal) {
      totalPrice += meal.menu.price; // Add the price of each meal's menu item
    }
    totalPrice *= parseInt(quantity); // Multiply by the new quantity

    // Update cart with new quantity and price
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        quantity: parseInt(quantity),
        price: totalPrice, // Update the price
      },
    });

    res.status(200).json({ msg: "Quantity and price updated successfully." });
  } catch (error) {
    console.log("Error while updating cart quantity and price: ", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// app.post("/removefromcart", async (req, res) => {
//   const { cartId } = req.body;

//   try {
//     // const menu = await prisma.menu.findUnique({
//     //   where: { id: menuId },
//     // });

//     // if (!menu) {
//     //   return res.status(404).json({
//     //     msg: "Menu not found",
//     //   });
//     // }

//     const cartitem = await prisma.cart.findUnique({
//       where: {
//         id: cartId,
//       },
//     });
//     console.log("cart item is : ", cartitem);

//     if (cartitem) {
//       try {
//         const deletedProduct = await prisma.cart.delete({
//           where: {
//             id: cartitem.id,
//           },
//           include: {
//             meal: true,
//           },
//         });

//         console.log("Deleted User : ", deletedProduct);
//         return res.status(200).json({
//           msg: "Product removed from the cart successfully.",
//         });
//       } catch (error) {
//         console.log("Error in removing the product for the cart : ", error);
//         return res.status(500).json({
//           msg: "Failed to remove product from the cart.",
//         });
//       }
//     }

//     return res.status(404).json({
//       msg: "Product not found in the cart.",
//     });
//   } catch (error) {
//     console.log("Error while removing the product", error);
//     res.status(500).json({
//       msg: "Failed to remove the product.",
//     });
//   }
// });

app.post("/removefromcart", async (req, res) => {
  const { cartId } = req.body;

  try {
    const cartitem = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    console.log("Cart item is: ", cartitem);

    if (cartitem) {
      try {
        // First, delete any related meal entries
        await prisma.meal.deleteMany({
          where: {
            cartId: cartitem.id, // Assuming you have a cartId field in the Meal table
          },
        });

        // Now, delete the cart item
        const deletedProduct = await prisma.cart.delete({
          where: {
            id: cartitem.id,
          },
        });

        console.log("Deleted Cart Item: ", deletedProduct);
        return res.status(200).json({
          msg: "Product removed from the cart successfully.",
        });
      } catch (error) {
        console.error("Error in removing the product from the cart: ", error);
        return res.status(500).json({
          msg: "Failed to remove product from the cart.",
        });
      }
    }

    return res.status(404).json({
      msg: "Product not found in the cart.",
    });
  } catch (error) {
    console.error("Error while removing the product", error);
    res.status(500).json({
      msg: "Failed to remove the product.",
    });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}/`);
});
