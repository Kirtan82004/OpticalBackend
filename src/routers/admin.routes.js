import {Router} from "express"
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    UpdateAccountDetail

} from "../controllers/admin/authController.js"
import {
    getDashboardStats,
    getSalesReport,
    getOrderSummary
} from "../controllers/admin/dashboardController.js"
import {
    sendEmailNotification,
    sendBulkNotifications
} from "../controllers/admin/notificationController.js"
import {  
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/admin/productController.js"
import {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from "../controllers/admin/orderControllers.js"
import {
    createCategory
} from "../controllers/categoryControllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/adminAuth.middleware.js"


const router = Router()
//auth route
router.route("/register").post(upload.none(),registerAdmin)
router.route("/login").post(
    upload.none(),
    loginAdmin)
router.route("/logout").post(verifyJWT,logoutAdmin)
router.route("/refresh-Token").post(refreshAccessToken)
router.route("/change-Password").patch(upload.none(),verifyJWT,changeCurrentPassword)
router.route("/current-Admin").get(verifyJWT,getCurrentAdmin)
router.route("/update-Account").put(upload.none(),verifyJWT,UpdateAccountDetail)

//dashboard routes
router.route("/dashboard/stats").get(verifyJWT,getDashboardStats)
router.route("/dashboard/sales-report").get(verifyJWT,getSalesReport)
router.route("/dashboard/order-summary").get(verifyJWT,getOrderSummary)

//notification routes
router.route("/notifications/email").post(verifyJWT,sendEmailNotification)
router.route("/notifications/bulk").post(verifyJWT,sendBulkNotifications)

//product routes
router.route("/create-product").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    },
    {
        name:"images",
        maxCount:5
    }
]),verifyJWT,createProduct)
router.route("/product/update").put(upload.none(),verifyJWT,updateProduct)
router.route("/product/delete").delete(upload.none(),verifyJWT,deleteProduct)

//order routes
router.route("/get-orders").get(upload.none(),verifyJWT,getAllOrders)
router.route("/get-orders-ById/:orderId").get(verifyJWT,getOrderById)
router.route("/update-Order-Status/:orderId").put(verifyJWT,updateOrderStatus)
router.route("/delete-order/:orderId").delete(verifyJWT,deleteOrder)

//category route
router.route("/create-category").post(upload.none(),verifyJWT,createCategory)


export default router;