import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { cssOverride } from "../../../utils/utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,product_add,products_get} from "../../../store/reducers/productReducer";
import Search from "../../../components/Search";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const ProductList = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, products, totalProduct } =
    useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    product_name: "",
    product_code: "",
    price: "",
    opening_stock: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const productAdd = (e) => {
    e.preventDefault();
    dispatch(
      product_add({
        state: state,
        userName: userInfo.name,
      })
    );
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        product_name: "",
        product_code: "",
        price: "",
        opening_stock: "",
      });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(products_get({ searchValue }));
  }, [searchValue, successMessage, errorMessage]);

  const AllRows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-xs text-white">
        <div className="w-[10%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[40%] p-2 whitespace-nowrap">{`${products[index].product_name}`}</div>
        <div className="w-[10%] p-2 whitespace-nowrap">{`${products[index].product_code}`}</div>
        <div className="w-[15%] p-2 whitespace-nowrap">{`${products[index].price.toFixed(2)}`}</div>
        <div className="w-[15%] p-2 whitespace-nowrap"><span className='bg-[#A1015D] px-3 py-[2px] rounded-full'>{`${products[index].status}`}</span></div>
        <div className="w-[10%] flex justify-center items-center gap-1">
          <Link
            to={`/admin/dashboard/product-edit/${products[index]._id}`}
            className="p-[5px] rounded bg-yellow-500 hover:shadow-lg shadow-yellow-500/50"
          >
            <FaEdit />
          </Link>
        </div>
      </div>
    );
  };     
  return (
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="pl-2 font-bold text-2xl">Product Profile Create</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={productAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className="flex flex-col w-[30%] gap-1">
                    <label htmlFor="product_name">Product Name</label>
                    <input
                      value={state.product_name}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="product_name"
                      name="product_name"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-[17%] gap-1">
                    <label htmlFor="product_code">Product Code</label>
                    <input
                      value={state.product_code}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="product_code"
                      name="product_code"
                      placeholder="Enter product code"
                      required
                    />
                  </div>
                  <div className='flex flex-col w-[17%] gap-1'>  
                  <label htmlFor="price">Price</label>
                      <input
                      value={state.price} onChange={(e)=>setState({...state,price: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="any"
                        placeholder="Enter item price" required
                      />
                    </div>
                    <div className='flex flex-col w-[17%] gap-1'>  
                    <label htmlFor="opening_stock">Opening Stock</label>
                        <input
                        value={state.opening_stock} onChange={(e)=>setState({...state,opening_stock: e.target.value})} className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                          type="number"
                          id="opening_stock"
                          name="opening_stock"
                          min="0"
                          step="any"
                          placeholder="Enter opening stock"
                        />
                    </div>

                    <div className='flex w-[15%] mt-[28px]'>
                    <button disabled={loader?true:false} type="submit" className='bg-blue-500 w-full px-5 py-1 rounded-md mb-3 text-white font-bold hover:shadow-blue-500/50 hover:shadow-md'>
            {
              loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Add'
            }
           
          </button>
                    </div> 

                    </div>
                 
         

       
                <div className='mt-4'>
                </div>
              </form>
              <div className="w-full p-2 bg-[#283046] rounded-md">
            <div className='w-full flex justify-between items-center bg-[#283046] py-2'>
              <div className='text-white font-bold'>
              Total Product : {totalProduct}
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
              <div className='w-full overflow-x-auto'>
                  <div className='flex bg-[#161d31] uppercase text-white'>
                      <div className='w-[10%] p-2 text-xs'>No</div>
                      <div className='w-[40%] p-2 text-xs text-left'>Name</div>
                      <div className='w-[10%] p-2 text-xs text-left'>Code</div>
                      <div className='w-[15%] p-2 text-xs text-left'>Price</div>
                      <div className='w-[15%] p-2 text-xs text-left'>Status</div>
                      <div className='w-[10%] p-2 text-xs'>Action</div>
                  </div>
                  {
                      <List 
                      style={{minWidth: '340px',overflowX:'hidden'}}
                      className='List'
                      height={365}
                      itemCount={products.length}
                      itemSize={35}
                      outerElementType={outerElementType}
                      >
                          {AllRows}
                      </List>
                  }
              </div>
                </div>

            </div>

            </div>
          
            
          </div>     
      </div>
    </div>
  );
};

export default ProductList;
