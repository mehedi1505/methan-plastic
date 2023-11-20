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
import {messageClear,employee_type_add,employee_type_get} from "../../../store/reducers/payrollReducer";
import Search from "../../../components/Search";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const EmployeeType = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage,empTypes } = useSelector((state) => state.payroll);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = useState({
    emp_type_name: "",
    type_description: ""
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const TypeAdd = (e) => {
    e.preventDefault();
    dispatch(
      employee_type_add({
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
        emp_type_name: "",
        type_description: ""
      });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatch(employee_type_get({ searchValue }));
  }, [searchValue, successMessage, errorMessage]);

  const AllRows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-xs text-white">
        <div className="w-[10%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[30%] p-2 whitespace-nowrap">{`${empTypes[index].emp_type_name}`}</div>
        <div className="w-[40%] p-2 whitespace-nowrap">{`${empTypes[index].type_description}`}</div>
        <div className="w-[20%] flex justify-center items-center gap-1">
          <Link
            to={`/admin/dashboard/employee-type-edit/${empTypes[index]._id}`}
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
                <div className="pl-2 font-bold text-2xl">Employee Type Create</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={TypeAdd}>
                    <div className='flex flex-col mb-1 md:flex-row gap-2 w-full px-3 text-[#d0d2d6] mt-1'>
                    <div className="flex flex-col w-[40%] gap-1">
                    <label htmlFor="emp_type_name">Employee Type Name</label>
                    <input
                      value={state.emp_type_name}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="emp_type_name"
                      name="emp_type_name"
                      placeholder="Enter type name"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-[40%] gap-1">
                    <label htmlFor="product_code">Type Description</label>
                    <input
                      value={state.type_description}
                      onChange={inputHandle}
                      className="bg-[#4E5B7C] border border-slate-700 px-4 py-1 focus:border-indigo-500 outline-none text-[#d0d2d6] rounded-md"
                      type="text"
                      id="type_description"
                      name="type_description"
                      placeholder="Enter type description"
                      required
                    />
                  </div>

                    <div className='flex w-[20%] mt-[28px]'>
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
              Total Type : 
              </div>
              <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div> 
              <div className='w-full border border-slate-700 overflow-x-auto'>
              <div className='w-full overflow-x-auto'>
                  <div className='flex bg-[#161d31] uppercase text-white'>
                      <div className='w-[10%] p-2 text-xs'>No</div>
                      <div className='w-[30%] p-2 text-xs text-left'>Employee Type</div>
                      <div className='w-[40%] p-2 text-xs text-left'>Type Description</div>
                      <div className='w-[20%] p-2 text-xs text-center'>Action</div>
                  </div>
                  {
                      <List 
                      style={{minWidth: '340px',overflowX:'hidden'}}
                      className='List'
                      height={365}
                      itemCount={empTypes.length}
                      itemSize={32}
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

export default EmployeeType;
