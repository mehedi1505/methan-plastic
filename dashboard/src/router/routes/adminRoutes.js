import {lazy} from 'react'
const AdminDashboard = lazy(()=>import('../../views/admin/AdminDashboard'))
const Items = lazy(()=>import("../../views/dashboard/item/Items"))
const ItemCategory = lazy(()=>import('../../views/dashboard/item/ItemCategory'))
const ItemCategoryEdit = lazy(()=>import('../../views/dashboard/item/ItemCategoryEdit'))
const ItemUnit = lazy(()=>import('../../views/dashboard/item/ItemUnit'))
const ItemUnitEdit = lazy(()=>import('../../views/dashboard/item/ItemUnitEdit'))
const ItemGroup = lazy(()=>import('../../views/dashboard/item/ItemGroup'))
const ItemGroupEdit = lazy(()=>import('../../views/dashboard/item/ItemGroupEdit'))
const Term = lazy(()=>import('../../views/dashboard/item/Term'))
const TermEdit = lazy(()=>import('../../views/dashboard/item/TermEdit'))
const Options = lazy(()=>import('../../views/dashboard/Options'))
const VendorAdd = lazy(()=>import('../../views/dashboard/vendor/VendorAdd'))
const VendorEdit = lazy(()=>import('../../views/dashboard/vendor/VendorEdit'))
const CustomerAdd = lazy(()=>import('../../views/dashboard/customer/CustomerAdd'))
const CustomerList = lazy(()=>import('../../views/dashboard/customer/CustomerList'))
const CustomerEdit = lazy(()=>import('../../views/dashboard/customer/CustomerEdit'))
const ItemEdit = lazy(()=>import('../../views/dashboard/item/ItemEdit'))
const ReceiveType = lazy(()=>import('../../views/dashboard/item/ReceiveType'))
const ReceiveTypeEdit = lazy(()=>import('../../views/dashboard/item/ReceiveTypeEdit'))
const ProductList = lazy(()=>import('../../views/dashboard/products/ProductList'))
const ProductEdit = lazy(()=>import('../../views/dashboard/products/ProductEdit'))
const Production  = lazy(()=>import('../../views/dashboard/production/Production'))
const ProductionList  = lazy(()=>import('../../views/dashboard/production/ProductionList'))
const ProductionEdit  = lazy(()=>import('../../views/dashboard/production/ProductionEdit'))
const BomList = lazy(()=>import('../../views/dashboard/bom/BomList'))
const BomAdd = lazy(()=>import('../../views/dashboard/bom/BomAdd'))
const BomEdit = lazy(()=>import('../../views/dashboard/bom/BomEdit'))
const ItemReceive = lazy(()=>import('../../views/dashboard/itemReceive/ItemReceive'))
const ItemReceiveList = lazy(()=>import('../../views/dashboard/itemReceive/ItemReceiveList'))
const ItemReceiveEdit = lazy(()=>import('../../views/dashboard/itemReceive/ItemReceiveEdit'))
const BankAdd = lazy(()=>import('../../views/dashboard/bank/BankAdd'))
const BankEdit = lazy(()=>import('../../views/dashboard/bank/BankEdit'))
const Agent = lazy(()=>import('../../views/dashboard/agent/Agent'))
const AgentEdit = lazy(()=>import('../../views/dashboard/agent/AgentEdit'))
const PaymentMode = lazy(()=>import('../../views/dashboard/paymentMode/PaymentMode'))
const PaymentModeEdit = lazy(()=>import('../../views/dashboard/paymentMode/PaymentModeEdit'))
const ExpenseCategory = lazy(()=>import('../../views/dashboard/expenses/ExpenseCategory'))
const ExpenseCategoryEdit = lazy(()=>import('../../views/dashboard/expenses/ExpenseCategoryEdit'))
const Expense = lazy(()=>import('../../views/dashboard/expenses/Expense'))
const ExpenseEdit = lazy(()=>import('../../views/dashboard/expenses/ExpenseEdit'))
const SpecialBomCreate = lazy(()=>import('../../views/dashboard/bom/SpecialBomCreate'))
const Assets = lazy(()=>import('../../views/dashboard/assets/Assets'))
const AssetType = lazy(()=>import('../../views/dashboard/assets/AssetType'))
const AssetTypeEdit = lazy(()=>import('../../views/dashboard/assets/AssetTypeEdit'))
const AssetRegister = lazy(()=>import('../../views/dashboard/assets/AssetRegister'))
const AssetRegisterEdit = lazy(()=>import('../../views/dashboard/assets/AssetRegisterEdit'))
const AssetRevalue = lazy(()=>import('../../views/dashboard/assets/AssetRevalue'))
const AssetRevalueEdit = lazy(()=>import('../../views/dashboard/assets/AssetRevalueEdit'))
const AssetDepreciation = lazy(()=>import('../../views/dashboard/assets/AssetDepreciation'))
const AssetDepreciationEdit = lazy(()=>import('../../views/dashboard/assets/AssetDepreciationEdit'))
const AssetClosure = lazy(()=>import('../../views/dashboard/assets/AssetClosure'))
const AssetClosureEdit = lazy(()=>import('../../views/dashboard/assets/AssetClosureEdit'))
const InvoiceCreate = lazy(()=>import('../../views/dashboard/invoice/InvoiceCreate'))
const InvoiceList = lazy(()=>import('../../views/dashboard/invoice/InvoiceList'))
const InvoiceEdit = lazy(()=>import('../../views/dashboard/invoice/InvoiceEdit'))
const InvoiceView = lazy(()=>import('../../views/dashboard/invoice/InvoiceView'))
const OrderCreate = lazy(()=>import('../../views/dashboard/order/OrderCreate'))
const OrderList = lazy(()=>import('../../views/dashboard/order/OrderList'))
const OrderEdit = lazy(()=>import('../../views/dashboard/order/OrderEdit'))
const OrderView = lazy(()=>import('../../views/dashboard/order/OrderView'))
const CollectionAdd = lazy(()=>import('../../views/dashboard/collection/CollectionAdd'))
const CollectionEdit = lazy(()=>import('../../views/dashboard/collection/CollectionEdit'))
const PaymentAdd = lazy(()=>import('../../views/dashboard/payment/PaymentAdd'))
const PaymentEdit = lazy(()=>import('../../views/dashboard/payment/PaymentEdit'))
const GatePassType = lazy(()=>import('../../views/dashboard/gatepass/GatePassType'))
const GatePassTypeEdit = lazy(()=>import('../../views/dashboard/gatepass/GatePassTypeEdit'))
const GatePassList = lazy(()=>import('../../views/dashboard/gatepass/GatePassList'))
const GatePassAdd = lazy(()=>import('../../views/dashboard/gatepass/GatePassAdd'))
const GatePassEdit = lazy(()=>import('../../views/dashboard/gatepass/GatePassEdit'))
const BillList = lazy(()=>import('../../views/dashboard/bill/BillList'))
const BillAdd = lazy(()=>import('../../views/dashboard/bill/BillAdd'))
const BillEdit = lazy(()=>import('../../views/dashboard/bill/BillEdit'))
const BillView = lazy(()=>import('../../views/dashboard/bill/BillView'))
const Report = lazy(()=>import('../../views/dashboard/report/Report'))
const MaterialStockReport = lazy(()=>import('../../views/dashboard/report/MaterialStockReport'))
const ProductStockReport = lazy(()=>import('../../views/dashboard/report/ProductStockReport'))
const MaterialReceiveReport = lazy(()=>import('../../views/dashboard/report/MaterialReceiveReport'))
const ChallanReport = lazy(()=>import('../../views/dashboard/report/ChallanReport'))
const ProductionReport = lazy(()=>import('../../views/dashboard/report/ProductionReport'))
const PaymentReport = lazy(()=>import('../../views/dashboard/report/PaymentReport'))
const CollectionReport = lazy(()=>import('../../views/dashboard/report/CollectionReport'))
const ExpensesReport = lazy(()=>import('../../views/dashboard/report/ExpensesReport'))
const GatePassReport = lazy(()=>import('../../views/dashboard/report/GatePassReport'))
const Payroll = lazy(()=>import('../../views/dashboard/payroll/Payroll'))
const EmployeeType = lazy(()=>import('../../views/dashboard/payroll/EmployeeType'))
const EmployeeTypeEdit = lazy(()=>import('../../views/dashboard/payroll/EmployeeTypeEdit'))
const EmployeeEntry = lazy(()=>import('../../views/dashboard/payroll/EmployeeEntry'))
const EmployeeEdit = lazy(()=>import('../../views/dashboard/payroll/EmployeeEdit'))
const EmployeeLeave = lazy(()=>import('../../views/dashboard/payroll/EmployeeLeave'))
const EmployeeLeaveEdit = lazy(()=>import('../../views/dashboard/payroll/EmployeeLeaveEdit'))
const PaySlipCreate = lazy(()=>import('../../views/dashboard/payroll/PaySlipCreate'))
const PaySlipEdit = lazy(()=>import('../../views/dashboard/payroll/PaySlipEdit'))
const PaySlipView = lazy(()=>import('../../views/dashboard/payroll/PaySlipView'))


export const adminRoutes = [
    {
        path:'/admin/dashboard',
        element:<AdminDashboard />,
        role:'admin'
    },
    {
        path:'/admin/dashboard/manage-items',
        element:<Items />,
        role:'admin'
    },
    {
        path:'/admin/dashboard/item-edit/:itemId',
        element:<ItemEdit />,
        role:'admin'
    },
    {
        path:'/admin/dashboard/item-category',
        element:<ItemCategory />,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-item-category/:itemCatId',
        element:<ItemCategoryEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/item-unit',
        element:<ItemUnit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-item-unit/:unitId',
        element:<ItemUnitEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/item-group',
        element:<ItemGroup/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-item-group/:groupId',
        element:<ItemGroupEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/term',
        element:<Term/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-term/:termId',
        element:<TermEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/options',
        element:<Options/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/vendor/add',
        element:<VendorAdd/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/vendor-edit/:vendorId',
        element:<VendorEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/customer/add',
        element:<CustomerAdd/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/customer/list',
        element:<CustomerList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/customer-edit/:customerId',
        element:<CustomerEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/receive-type',
        element:<ReceiveType/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-rec-type/:recTypeId',
        element:<ReceiveTypeEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/bom-list',
        element:<BomList/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/bom-add',
        element:<BomAdd/>,
        role:'admin'
    },  
    {
        path:'/admin/dashboard/bom-edit',
        element:<BomEdit/>,
        role:'admin'
    },    
    {
        path:'/admin/dashboard/product-list',
        element:<ProductList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/product-edit/:productId',
        element:<ProductEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/production-create',
        element:<Production/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/production-list',
        element:<ProductionList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/production-edit/:productionId',
        element:<ProductionEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/receive-items',
        element:<ItemReceive/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/item-receive-list',
        element:<ItemReceiveList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/receive-invoice-edit/:receiveId',
        element:<ItemReceiveEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/invoice-create',
        element:<InvoiceCreate/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/invoice-list',
        element:<InvoiceList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/invoice-edit/:invoiceId',
        element:<InvoiceEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/invoice-view/:invoiceId',
        element:<InvoiceView/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/order-create',
        element:<OrderCreate/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/order-list',
        element:<OrderList/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/order-edit/:orderId',
        element:<OrderEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/order-view/:orderId',
        element:<OrderView/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/bank',
        element:<BankAdd/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-bank/:bankId',
        element:<BankEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/agent',
        element:<Agent/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-agent/:agentId',
        element:<AgentEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/payment-mode',
        element:<PaymentMode/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-payment-mode/:pmodeId',
        element:<PaymentModeEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/expense-category',
        element:<ExpenseCategory/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-expense-category/:catId',
        element:<ExpenseCategoryEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/expense',
        element:<Expense/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/edit-expense/:expId',
        element:<ExpenseEdit/>,
        role:'admin'
    },
    {
        path:'/admin/dashboard/special-bom-create',
        element:<SpecialBomCreate/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/assets',
        element:<Assets/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/asset-type',
        element:<AssetType/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-asset-type/:typeId',
        element:<AssetTypeEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/asset-register',
        element:<AssetRegister/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-asset-register/:regId',
        element:<AssetRegisterEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/asset-revalue',
        element:<AssetRevalue/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-asset-revalue/:revalueId',
        element:<AssetRevalueEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/asset-closure',
        element:<AssetClosure/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-asset-closure/:closureId',
        element:<AssetClosureEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/asset-depreciation',
        element:<AssetDepreciation/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-asset-depreciation/:depreciationId',
        element:<AssetDepreciationEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/collection-add',
        element:<CollectionAdd/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-collection/:collectionId',
        element:<CollectionEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/payment-add',
        element:<PaymentAdd/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-payment/:paymentId',
        element:<PaymentEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/gate-pass-type',
        element:<GatePassType/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-gate-pass-type/:gatePassTypeId',
        element:<GatePassTypeEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/gate-pass-list',
        element:<GatePassList/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/gate-pass-add',
        element:<GatePassAdd/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-gate-pass/:gatePassId',
        element:<GatePassEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/bill-list',
        element:<BillList/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/bill-add',
        element:<BillAdd/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/edit-bill/:billId',
        element:<BillEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/view-bill/:billId',
        element:<BillView/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/payroll',
        element:<Payroll/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/employee-type',
        element:<EmployeeType/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/employee-type-edit/:empTypeId',
        element:<EmployeeTypeEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/employee-entry',
        element:<EmployeeEntry/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/employee-edit/:empId',
        element:<EmployeeEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/employee-leave',
        element:<EmployeeLeave/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/leave-edit/:empLeaveId',
        element:<EmployeeLeaveEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/pay-slip-create',
        element:<PaySlipCreate/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/pay-slip-edit/:paySlipId',
        element:<PaySlipEdit/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/pay-slip-view/:paySlipId',
        element:<PaySlipView/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/report',
        element:<Report/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/material-stock-report',
        element:<MaterialStockReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/product-stock-report',
        element:<ProductStockReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/material-receive-report',
        element:<MaterialReceiveReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/challan-report',
        element:<ChallanReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/production-report',
        element:<ProductionReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/payment-report',
        element:<PaymentReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/collection-report',
        element:<CollectionReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/expenses-report',
        element:<ExpensesReport/>,
        role:'admin'
    }, 
    {
        path:'/admin/dashboard/gp-report',
        element:<GatePassReport/>,
        role:'admin'
    }, 
]