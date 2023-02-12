  import { Card, Button, Form, Input, Spin, Select, InputNumber } from "antd";
  import { useEffect, useState } from "react";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { storage } from "../../../firebase.config";
  import { useDispatch, useSelector } from "react-redux";
  import { getAllCategories,addProduct } from "../../../store/OnlineStoreSlice";

  export const AddProducts = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [description,setDescription] = useState('');
    const [unitName,setUnitName] = useState('');
    const [unitPrice,setUnitPrice] = useState('');
    const [category,setCategory] = useState('');




    const [imageUrl, setImageUrl] = useState();

    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    console.log(
      "state?.OnlineStoreSlice?.dataList.allCategories",
      state
    );

    useEffect(() => {
      const uploadFile = () => {
        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImageUrl(downloadURL);
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);

    const fetchAllCategories = () => {
      dispatch(getAllCategories())
          .unwrap()
          .then((data) => {
              console.log(data);
          });
  };

  useEffect(() => {
      fetchAllCategories();
  }, []);

    const handleSubmitSlider = async () => {
      if (name === "" || imageUrl === "") {
        return alert("add details correctly");
      } else {
        const ProductID = new Date().getTime();
        const data = {
          id: ProductID,
          ProductName: name,
          imageUrl,
          description,
          unitName,
          category,
          unitPrice
        };

      //   console.log(data)
        dispatch(addProduct(data));
        alert("Product Add successfully");
      }
    };

    return (
      <div className="flex justify-center items-center p-5">
        <>
          <div className="w-full">
            <div className=" text-center h-100">
              <div className="mt-4 site-card-border-less-wrapper flex justify-center items-center">
                {state?.OnlineStoreSlice?.isLoading ? (
                  <Spin />
                ) : (
                  <Card
                    title="Add Product"
                    bordered={true}
                    style={{ width: "500px", padding: "2rem", minWidth: "250px" }}
                    className="bg-gray-50"
                  >
                    <Form layout="vertical" onFinish={handleSubmitSlider}>
                      <Form.Item>
                        <input
                          type="file"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Add Product Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Product Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your Product Name"
                          id="my-input"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Select defaultValue="Select a Category" onChange={(value)=>setCategory(value)}>
                          {state?.OnlineStoreSlice?.dataList.allCategories.map(
                            (category, index) => {
                              return <Option key={index} value={category?.categoryName}>{category?.categoryName}</Option>;
                            }
                          )}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Add Product Description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Product Description!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your Product Description"
                          id="my-input"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Add Unit Name"
                        name="unit"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Unit Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your Unit Name"
                          id="my-input"
                          value={unitName}
                          onChange={(e) => {
                            setUnitName(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Add Unit Price"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Please input your  Unit Price!",
                          },
                        ]}
                      >
                        {/* <Input
                          placeholder="Enter your Unit Price"
                          id="my-input"
                          value={unitPrice}
                          onChange={(e) => {
                            setUnitPrice(e.target.value);
                          }}
                        /> */}
                        <Input className=" w-full"
                        placeholder="Enter your Unit Price"
                          value={unitPrice}
                          onChange={(e) => {
                            setUnitPrice(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Button htmlType="submit" disabled={!imageUrl}>
                        Add Product
                      </Button>
                    </Form>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    );
  };
