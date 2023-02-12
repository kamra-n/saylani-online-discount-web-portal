import { Avatar, List } from 'antd';
import { getAllCategories } from '../../../store/OnlineStoreSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';




export const ViewCategory = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);

      console.log('state',state?.OnlineStoreSlice?.dataList.allCategories
  )

    
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

  return (
    <div className="flex flex-col justify-center-center gap-7 p-5">
      <p className='text-center text-3xl text-[#024F9D] font-bold'>All Categories</p>


      <List
    itemLayout="horizontal"
    style={{width:'99%'}}
    pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
    dataSource={state?.OnlineStoreSlice?.dataList.allCategories}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.imageUrl} />}
          title={item.categoryName}
        />
      </List.Item>
    )}
  />
    </div>
  );
};
