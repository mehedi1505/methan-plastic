import React, { useState, useEffect, forwardRef } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { cssOverride } from "../../../utils/utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
// import { GrClose } from "react-icons/gr";
// import { BsImage } from "react-icons/bs";
import {messageClear,get_emp_type_by_id,employee_type_update} from "../../../store/reducers/payrollReducer";
import Search from "../../../components/Search";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const EmployeeTypeEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ empTypeId } = useParams();
  const { loader, successMessage, errorMessage,empType } = useSelector((state) => state.payroll);
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
  useEffect(()=>{
    if(empType){
     setState({
        emp_type_name:empType.emp_type_name,
        type_description:empType.type_description
     })
    }
   },[empType])
  const UpdateType= (e) => {
    e.preventDefault();
    dispatch(employee_type_update({
        state: state,
        empTypeId,
        userName: userInfo.name,
      })
    );
  };

  useEffect(()=>{
        dispatch(get_emp_type_by_id(empTypeId))
  },[empTypeId])


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="mx-auto md:px-[2px] mt-[-20px]">
      <div className="flex flex-wrap w-[98%] mx-auto">
          <div className="w-full">
            <div className="bg-[#283046] text-[#d0d2d6] height-screen lg:height-auto px-2 py-1">
            <div className="flex justify-between items-center bg-[#283046] py-1 md:px-[10px] text-white">
                <div className="font-bold text-2xl">Employee Type Edit</div>
            </div>
              <hr className="border-2 border-slate-500 w-[98%] mx-auto mb-5"/>
              <form onSubmit={UpdateType}>
              <div className='px-3'>
                    <div className="flex flex-col w-full gap-2 mb-5">
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
                  <div className="flex flex-col w-full gap-2">
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
                    <button disabled={loader?true:false} type="submit" className='bg-green-500 w-full px-5 py-1 rounded-sm mb-3 text-white font-bold hover:shadow-blue-500/50 hover:shadow-md'>
            {
              loader? <PropagateLoader color='#fff' cssOverride={cssOverride}/>: 'Update'
            }
           
          </button>
                    </div> 

               
                 
         

       
               
                </div>
              </form>
            </div>
          
            
          </div>     
      </div>
    </div>
  );
};

export default EmployeeTypeEdit;
