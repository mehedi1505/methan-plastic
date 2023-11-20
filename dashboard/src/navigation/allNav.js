import {AiFillDashboard, AiOutlineShopping,AiOutlinePlusCircle,AiOutlineShoppingCart} from 'react-icons/ai'
import {BiCategory, BiLoaderCircle} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import {BsCurrencyDollar} from 'react-icons/bs'
import {RiProductHuntLine} from 'react-icons/ri'
export const allNav = [
    {
        id: 1,
        title: 'Dashboard',
        icon:<AiFillDashboard/>,
        role: 'admin',
        path: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Manage Items',
        icon:<AiOutlineShopping/>,
        role: 'admin',
        path: '/admin/dashboard/manage-items'
    },
    {
        id: 3,
        title: 'Receive Items',
        icon:<AiOutlineShoppingCart/>,
        role: 'admin',
        path: '/admin/dashboard/receive-items'
    },
    {
        id: 4,
        title: 'Product Profile',
        icon:<RiProductHuntLine/>,
        role: 'admin',
        path: '/admin/dashboard/product-list'
    },
    {
        id: 5,
        title: 'Bill of Materials',
        icon:<BiCategory/>,
        role: 'admin',
        path: '/admin/dashboard/bom-list'
    },
    {
        id: 6,
        title: 'Productions',
        icon:<BiCategory/>,
        role: 'admin',
        path: '/admin/dashboard/production-create'
    },
    {
        id: 7,
        title: 'Invoice',
        icon:<FiUsers/>,
        role: 'admin',
        path: '/admin/dashboard/invoice-list'
    },
    {
        id: 8,
        title: 'Assets',
        icon:<BiLoaderCircle/>,
        role: 'admin',
        path: '/admin/dashboard/assets'
    },
    {
        id: 9,
        title: 'Order',
        icon:<BiLoaderCircle/>,
        role: 'admin',
        path: '/admin/dashboard/order-list'
    },
    {
        id: 10,
        title: 'Payment',
        icon:<BsCurrencyDollar/>,
        role: 'admin',
        path: '/admin/dashboard/payment-add'
    },
    {
        id: 11,
        title: 'Collection',
        icon:<BsCurrencyDollar/>,
        role: 'admin',
        path: '/admin/dashboard/collection-add'
    },
    {
        id: 12,
        title: 'Expenses',
        icon:<AiOutlinePlusCircle/>,
        role: 'admin',
        path: '/admin/dashboard/expense'
    },
    {
        id: 13,
        title: 'Bill',
        icon:<AiOutlinePlusCircle/>,
        role: 'admin',
        path: '/admin/dashboard/bill-list'
    },
    {
        id: 14,
        title: 'Bank',
        icon:<RiProductHuntLine/>,
        role: 'admin',
        path: '/admin/dashboard/bank'
    },
    {
        id: 15,
        title: 'Options',
        icon:<RiProductHuntLine/>,
        role: 'admin',
        path: '/admin/dashboard/options'
    },
    {
        id: 16,
        title: 'Payroll',
        icon:<RiProductHuntLine/>,
        role: 'admin',
        path: '/admin/dashboard/payroll'
    },
    {
        id: 17,
        title: 'Report',
        icon:<RiProductHuntLine/>,
        role: 'admin',
        path: '/admin/dashboard/report'
    },
    
]