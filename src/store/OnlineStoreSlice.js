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
            console.log(user.uid)
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
    console.log('add', data);
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
        console.log('allData', allData);
        return allData
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const addProduct = createAsyncThunk("OnlineStore/addProduct", async (data) => {
    console.log('addProducts', data);
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
        console.log('allData', allData);
        return allData
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const getSingleUserTweets = createAsyncThunk("twitter/getSingleUserTweets", async () => {
    const data = localStorage.getItem('login')

    const currentUid = JSON.parse(data);
    try {
        const q = query(collection(db, "posts"), where("uid", "==", currentUid?.uid));
        const querySnapshot = await getDocs(q);
        const Data = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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
        cart: []
    },
};

export const OnlineStoreSlice = createSlice({
    name: "twitter",
    initialState,
    reducers: {
        cart: (state, action) => {
            state.dataList.cart.push(action.payload);

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






    },
});


export { registerUser, loginUser, addCategory, getAllCategories, addProduct, getAllProducts };
export const {cart} = OnlineStoreSlice.actions

export default OnlineStoreSlice.reducer;
