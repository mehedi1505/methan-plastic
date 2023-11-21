const express = require('express')
const app = express()
const { dbConnect } = require('./utils/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const path = require('path')
require('dotenv').config()


app.use(cors({
    origin: "https://shimmering-strudel-8bac69.netlify.app",
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

const port = process.env.PORT

// app.get('/', (req, res) => res.send('Welcome!'))

//middleware
app.use(bodyParser.json())
app.use(cookieParser())

//routes
app.use('/api',require("./routes/authRoutes"))
app.use('/api',require("./routes/dashboard/itemRoutes"))
app.use('/api',require("./routes/dashboard/itemCategoryRoutes"))
app.use('/api',require("./routes/dashboard/itemUnitRoutes"))
app.use('/api',require("./routes/dashboard/itemGroupRoutes"))
app.use('/api',require("./routes/dashboard/termRoutes"))
app.use('/api',require("./routes/dashboard/vendor/vendorRoutes"))
app.use('/api',require("./routes/dashboard/customer/customerRoutes"))
app.use('/api',require("./routes/dashboard/receiveTypeRoutes"))
app.use('/api',require("./routes/dashboard/product/productRoutes"))
app.use('/api',require("./routes/dashboard/bom/bomRoutes"))
app.use('/api',require("./routes/dashboard/receive/receiveRoutes"))
app.use('/api',require("./routes/dashboard/production/productionRoutes"))
app.use('/api',require("./routes/dashboard/bank/bankRoutes"))
app.use('/api',require("./routes/dashboard/agent/agentRoutes"))
app.use('/api',require("./routes/dashboard/paymentMode/paymentModeRoutes"))
app.use('/api',require("./routes/dashboard/expense/expenseRoutes"))
app.use('/api',require("./routes/dashboard/asset/assetRoutes"))
app.use('/api',require("./routes/dashboard/invoice/invoiceRoutes"))
app.use('/api',require("./routes/dashboard/collection/collectionRoutes"))
app.use('/api',require("./routes/dashboard/payment/paymentRoutes"))
app.use('/api',require("./routes/dashboard/bill/billRoutes"))
app.use('/api',require("./routes/dashboard/gatePass/gatePassRoutes"))
app.use('/api',require("./routes/dashboard/order/customerOrderRoutes"))
app.use('/api',require("./routes/dashboard/report/reportRoutes"))
app.use('/api',require("./routes/dashboard/payroll/payrollRoutes"))

dbConnect();

app.listen(port, () => console.log(`Server is running on port ${port}!`))
