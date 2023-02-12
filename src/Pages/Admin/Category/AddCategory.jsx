import { Card, Button, Form, Input,Spin } from "antd";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.config";
import { addCategory } from "../../../store/OnlineStoreSlice";
import { useDispatch, useSelector } from "react-redux";

export const AddCategory = () => {
  const [name, setName] = useState("");

  const [file, setFile] = useState("");

  const [imageUrl, setImageUrl] = useState();

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
//   console.log('state',state?.OnlineStoreSlice?.isLoading
//   )

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

  const handleSubmitSlider = async () => {
    if (name === "" || imageUrl === "") {
      return alert("add details correctly");
    } else {
      const CategoryID = new Date().getTime();
      const data = {
        id: CategoryID,
        categoryName: name,
        imageUrl,
      };
      dispatch(addCategory(data));
      setName(null);
      alert("category Add successfully");
    }
  };

  return (
    <div className="flex justify-center items-center p-5">
      <>
        <div className="w-full">
          <div className=" text-center h-100">
            <div className="mt-4 site-card-border-less-wrapper flex justify-center items-center">
                {
                state?.OnlineStoreSlice?.isLoading ? <Spin/>:
                <Card
                title="Add Category"
                bordered={true}
                style={{ width: "500px", padding: "2rem", minWidth: "250px" }}
                className="bg-gray-50"
              >
                <Form layout="vertical" onFinish={handleSubmitSlider}>
                  <Form.Item
                    label="Add Category Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Category name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your Name"
                      id="my-input"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </Form.Item>
                  <Button htmlType="submit" disabled={!imageUrl}>
                    Add Category
                  </Button>
                </Form>
              </Card>
                }
              
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
