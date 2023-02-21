import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {
    collection,
    setDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where
} from "firebase/firestore";

import { db } from "../firebase.config";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { Navigate } from "react-router-dom";



const registerUser = createAsyncThunk('OnlineStore/registerUser', ((userSignUpData) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userSignUpData.email, userSignUpData.password)
            .then((userCredential) => {
                // Signed in 
                let uid = userCredential.user.uid
                userSignUpData.uid = uid;
                setDoc(doc(db, "users", uid), userSignUpData);
                return toast.success('User Register Successfully!');


            })

            .catch((error) => {

                const errorMessage = error.message;
                return toast.error(`${errorMessage}`);


            });
    }
    catch (e) {
        console.log(e)
    }
}))


const loginUser = createAsyncThunk('Online/loginUser', ((userLogin) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
        .then((userCredential) => {
            // Signed in 
            toast.success('User Login Successfully!');

            const user = userCredential.user;
            getDoc(doc(db, "users", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    return localStorage.setItem('login', JSON.stringify(docSnap.data()))


                } else {
                    console.log("No such document!");

                }

            })
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage)
            return toast.error(`${errorMessage}`);

        });
}))

const addCategory = createAsyncThunk("OnlineStore/addCategory", async (data) => {
    try {
        await setDoc(doc(db, "Categories", data?.id.toString()), data);
        return toast.success('Data Added Successfully!');


    } catch (e) {
        toast.error("Error adding document: ", `${e}`);
    }
});

const getAllCategories = createAsyncThunk("OnlineStore/getAllCategories", async () => {
    try {
        const allData = [];
        const querySnapshot = await getDocs(collection(db, "Categories"));
        querySnapshot.forEach((doc) => {
            allData.push(doc.data());
        });
        return allData
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const addProduct = createAsyncThunk("OnlineStore/addProduct", async (data) => {
    try {
        await setDoc(doc(db, "Products", data?.id.toString()), data);
        return toast.success('Data Added Successfully!');


    } catch (e) {
        toast.error("Error adding document: ", `${e}`);
    }
});


const getAllProducts = createAsyncThunk("OnlineStore/getAllProducts", async () => {
    try {
        const allData = [];
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.forEach((doc) => {
            allData.push(doc.data());
        });
        return allData
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const createOrder = createAsyncThunk("OnlineStore/createOrder", async (data) => {
    try {
        await setDoc(doc(db, "orders", data?.orderId.toString()), data);
        toast.success('Order Created Successfully!');



    } catch (e) {
        toast.error("Error adding document: ", `${e}`);
    }
});



const getCurrentUserOrders = createAsyncThunk("twitter/getCurrentUserOrders", async () => {
    const data = localStorage.getItem('login')

    const currentUid = JSON.parse(data);
    try {
        const q = query(collection(db, "orders"), where("uid", "==", currentUid?.uid));
        const querySnapshot = await getDocs(q);
        const Data = [];

        querySnapshot.forEach((doc) => {
            Data.push(doc.data());

            console.log('doc.id', " => ", doc.data());
        });
        return Data



    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
});







const initialState = {
    isLoading: false,
    dataList: {
        allCategories: [],
        allProducts: [],
        currentUserOrders: [],
        cart: []
    },
};

export const OnlineStoreSlice = createSlice({
    name: "onlineStore",
    initialState,
    reducers: {
        cart: (state, action) => {
            state.dataList.cart.push(action.payload);

        },

        increaseQuantity: (state, action) => {
            let increaseQuantity = state.dataList.cart.map((current) => {
                if (current.id === action.payload) {
                    return { ...current, quantity: current.quantity + 1 };
                }
                else {
                    return current;
                }
            });

            state.dataList.cart = increaseQuantity
        }
        ,

        decreaseQuantity: (state, action) => {
            // console.log(action)
            if (action.payload.quantity === 1) {
                let remove = state.dataList.cart.filter((removeItem) => {
                    if (removeItem.id === action.payload.id) {
                        return removeItem.id !== action.payload.id;
                    }
                    return removeItem;
                });
                state.dataList.cart = remove
            } else {
                let decreaseCartValue = state.dataList.cart.map((current) => {
                    if (current.id === action.payload.id) {
                        return { ...current, quantity: current.quantity - 1 };
                    }
                    return current;
                });
                state.dataList.cart = decreaseCartValue

            }
        },

        removeAllItems: (state, action) => {

        }


    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;

        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;



        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(addCategory.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(getAllCategories.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;

            state.dataList.allCategories = action.payload?.reverse();
        });
        builder.addCase(getAllCategories.rejected, (state, { payload }) => {
            state.isLoading = false;
        });

        builder.addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
        })

        builder.addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;

            state.dataList.allProducts = action.payload?.reverse();
        });
        builder.addCase(getAllProducts.rejected, (state, { payload }) => {
            state.isLoading = false;
        });

        builder.addCase(createOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataList.cart = []


        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
        })


        builder.addCase(getCurrentUserOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCurrentUserOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.dataList.cart = []
            state.dataList.currentUserOrders = action.payload


        });
        builder.addCase(getCurrentUserOrders.rejected, (state, action) => {
            state.isLoading = false;
        })


    },
});


export { registerUser, loginUser, addCategory, getAllCategories, addProduct, getAllProducts, createOrder, getCurrentUserOrders };
export const { cart, increaseQuantity, decreaseQuantity } = OnlineStoreSlice.actions

export default OnlineStoreSlice.reducer;
