import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'

/* Stylesheet */
import Stylesheet from './views/Stylesheet.vue'

/* Auth */
import Login from './views/auth/Login.vue'
import Signup from './views/auth/Signup.vue'
import ForgetPassword from './views/auth/ForgetPassword.vue'
import Profile from './views/auth/Profile.vue'
import AddAddress from './views/auth/AddAddress.vue'
import EditAddress from './views/auth/EditAddress.vue'
import QrVerification from './views/auth/QrVerification.vue'
import PrescriptionVerification from './views/auth/PrescriptionVerification.vue'

/* Pages */
import LinkDoctorView from './views/pages/LinkDoctorView.vue'
import OrderHistory from './views/pages/OrderHistory.vue'
import OngoingOrders from './views/pages/OngoingOrders.vue'
import CancelledOrders from './views/pages/CancelledOrders.vue'
import CompletedOrders from './views/pages/CompletedOrders.vue'
import QrScan from './views/pages/QrScan.vue'
import IdScan from './views/pages/IdScan.vue'
import AddNewQr from './views/pages/AddNewQr.vue'
import UploadPrescription from './views/pages/UploadPrescription.vue'
import Generic from './views/pages/Generic.vue'
import Help from './views/pages/Help.vue'
import Health from './views/pages/MyHealth/Health.vue'
import OrderView from './views/pages/OrderView.vue'

/* News */
import News from './views/news/News.vue'
import NewsView from './views/news/NewsView.vue'

/* Notification */
import Notification from './views/notification/Notification.vue'
import NotificationView from './views/notification/NotificationView.vue'

/* Cart */
import CartCheckout from './views/cart/CartCheckout.vue'
import CartCheckoutShipping from './views/cart/CartCheckoutShipping.vue'
import CartPayment from './views/cart/CartPayment.vue'
import CartSummary from './views/cart/CartSummary.vue'
import CartCheckoutSummary from './views/cart/CartCheckoutSummary.vue'
import CartEdit from './views/cart/CartEdit.vue'

/* Payment */
import PaymentBankDeposit from './views/payment/PaymentBankDeposit.vue'
import PaymentCreditCard from './views/payment/PaymentCreditCard.vue'
import PaymentDragonPay from './views/payment/PaymentDragonPay.vue'
import PaymentPaypal from './views/payment/PaymentPaypal.vue'

/* Reward */
import Reward from './views/reward/Reward.vue'
import RewardView from './views/reward/RewardView.vue'
import RewardPointEarned from './views/reward/RewardPointEarned.vue'

/* Product */
import ProductParents from './views/product/ProductParents.vue'
import Product from './views/product/Product.vue'
import ProductView from './views/product/ProductView.vue'

/* Online Consultation */
import OnlineConsultation from './views/onlineconsultation/OnlineConsultation.vue'
import ConsultDoctor from './views/onlineconsultation/ConsultDoctor.vue'

/** Doctor Profile */
import DoctorProfile from './views/onlineconsultation/DoctorProfile.vue'
import BookAppointment from './views/onlineconsultation/BookAppointment.vue'

/* Refer a friend */
import ReferAFriend from './views/pages/ReferAFriend.vue'

/* My Vouchers */
import MyVouchers from './views/pages/MyVouchers.vue'

import VideoCall from './views/onlineconsultation/VideoCall.vue'
import VideoCallDispatcher from './views/onlineconsultation/VideoCallDispatcher.vue'

import ChatPage from './views/onlineconsultation/ChatPage.vue'
import Specialization from './views/onlineconsultation/Specialization.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { name: 'home', path: '/home', component: Home },

    /* Stylesheet */
    { name: 'stylesheet', path: '/stylesheet', component: Stylesheet },

    /* Auth */
    { name: 'login', path: '/login', component: Login },
    { name: 'qrVerification', path: '/signup/verify/qr', component: QrVerification },
    { name: 'prescriptionVerification', path: '/signup/verify/prescription', component: PrescriptionVerification },
    { name: 'signup', path: '/signup', component: Signup },
    { name: 'forgetPassword', path: '/forgetPassword', component: ForgetPassword },
    { name: 'profile', path: '/profile/:params', component: Profile },
    { name: 'addAddress', path: '/profile/addAddress', component: AddAddress },
    { name: 'editAddress', path: '/profile/editAddress', component: EditAddress },

    /* Pages */
    { name: 'linkDoctorView', path: '/pages/linkDoctorView', component: LinkDoctorView },
    { name: 'orderHistory', path: '/pages/orderHistory', component: OrderHistory },
    { name: 'ongoingOrders', path: '/pages/orders/ongoing', component: OngoingOrders },
    { name: 'cancelledOrders', path: '/pages/orders/ongoing', component: CancelledOrders },    
    { name: 'completedOrders', path: '/pages/orders/completed', component: CompletedOrders },
    { name: 'qrScan', path: '/pages/qrScan', component: QrScan },
    { name: 'idScan', path: '/pages/idScan', component: IdScan },
    { name: 'addNewQr', path: '/pages/addNewQr', component: AddNewQr },
    { name: 'uploadPrescription', path: '/pages/prescription/upload', component: UploadPrescription },
    { name: 'generic', path: '/pages/generic', component: Generic },
    { name: 'help', path: '/pages/help', component: Help },
    { name: 'health', path: '/pages/health', component: Health },
    { name: 'orderView', path: '/pages/orderView', component: OrderView },

    { name: 'referafriend', path: '/refer-a-friend', component: ReferAFriend },

    { name: 'myvouchers', path: '/my-vouchers', component: MyVouchers },

    /* News */
    { name: 'news', path: '/news/', component: News },
    { name: 'newsView', path: '/news/view', component: NewsView },

    /* Notification */
    { name: 'notification', path: '/notification/', component: Notification },
    { name: 'notificationView', path: '/notification/view', component: NotificationView },

    /* Cart */
    { name: 'cartCheckout', path: '/cart/checkout', component: CartCheckout },
    { name: 'cartCheckoutShipping', path: '/cart/checkout/shipping', component: CartCheckoutShipping },
    { name: 'cartPayment', path: '/cart/payment', component: CartPayment },
    { name: 'cartSummary', path: '/cart/summary', component: CartSummary },
    { name: 'cartCheckoutSummary', path: '/cart/checkout/summary', component: CartCheckoutSummary },
    { name: 'cartEdit', path: '/cart/edit', component: CartEdit },

    /* Payment */
    { name: 'paymentBankDeposit', path: '/payment/bankDeposit', component: PaymentBankDeposit },
    { name: 'paymentCreditCard', path: '/payment/creditCard', component: PaymentCreditCard },
    { name: 'paymentDragonPay', path: '/payment/dragonPay', component: PaymentDragonPay },
    { name: 'paymentPaypal', path: '/payment/paypal', component: PaymentPaypal },

    /* Reward */
    { name: 'reward', path: '/reward', component: Reward },
    { name: 'rewardView', path: '/reward/view', component: RewardView },
    { name: 'rewardPointEarned', path: '/reward/pointsEarned', component: RewardPointEarned },

    /* Product */
    // { name: 'product-parents', path: '/product-parents', component: ProductParents },
    { name: 'product', path: '/product', component: Product },
    { name: 'productView', path: '/productView', component: ProductView },

    /* Chat Page */
    { name: 'chats', path: '/chats', component: ChatPage },

    /* Online Consultation */
    { name: 'online-consultation', path: '/online-consultation', component: OnlineConsultation },
    { name: 'consult-doctor', path: '/consult-doctor', component: ConsultDoctor },
    { name: 'doctor-profile', path: '/doctor-profile', component: DoctorProfile },
    { name: 'book-appointment', path: '/book-appointment/:doctor', component: BookAppointment },    
    { name: 'video-call', path: '/video-call', component: VideoCall },
    { name: 'video-call-dispatcher', path: '/video-call-dispatcher/:type', component: VideoCallDispatcher },

    { name: 'specialization', path: '/specialization', component: Specialization },

  ]
})
