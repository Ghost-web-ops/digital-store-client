export default {
  home: {
    title: "منتجاتنا الرقمية",
    addToCartButton: "أضف إلى السلة",
  },
  nav: {
    login: "التسجيل",
    signUp: "تسجيل الدخول",
  },
  CartPage: {
    title: "سلة التسوق الخاصة بك",
    emptyMessage: "سلّتك فارغة.",
    continueShopping: "اكمل التسوق",
  },

  Auth: {
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    orContinueWith: "أو المتابعة باستخدام",
    signInWithGoogle: "الدخول باستخدام جوجل",
    dontHaveAccount: "ليس لديك حساب؟",
    registerHere: "سجل من هنا",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    loginHere: "سجل دخولك من هنا",

    usernameLabel: "اسم المستخدم",
    usernamePlaceholder: "اختر اسم مستخدم",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "اختر كلمة مرور قوية",
    registeringButton: "جاري التسجيل...",
    registerButton: "إنشاء حساب",
  },

  AccountPage: {
    title: "حسابي",
    orderHistory: "سجل الطلبات",
    noOrders: "لم تقم بأي طلبات بعد.",
  },
  OrderDetails: {
    order: "طلب رقم #",
    total: "الإجمالي:",
    download: "تحميل",
    products: "المنتجات:",
    loading: "جاري تحميل طلباتك...",
  },
  CartSummary: {
    remove: "إزالة",
    title: "ملخص السلة",
    total: "الإجمالي:",
    checkoutButton: "إتمام عملية الدفع",
    quantity: "الكمية:",
  },
  SuccessPage: {
    title: "تم الدفع بنجاح!",
    message:
      "شكرًا لك على شرائك. ستصلك رسالة إلكترونية تحتوي على روابط التحميل والإيصال قريبًا.",
    backButton: "العودة إلى المتجر",
    invalidAccessTitle: "وصول غير صالح",
    invalidAccessMessage:
      "لا يمكن الوصول لهذه الصفحة إلا بعد إتمام عملية دفع ناجحة.",
  },
} as const;
