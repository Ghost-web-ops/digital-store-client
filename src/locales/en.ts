export default {
  home: {
    title: "Our Digital Products",
    addToCartButton: "Add to Cart",
  },
  nav: {
    login: "Login",
    signUp: "Sign Up",
  },
  CartPage: {
    title: "Your Shopping Cart",
    emptyMessage: "Your cart is empty.",
    continueShopping: "Continue Shopping",
  },

  Auth: {
    loginTitle: "Login",
    registerTitle: "create a new account",
    orContinueWith: "Or continue with",
    signInWithGoogle: "Sign in with Google",
    dontHaveAccount: "Don't have an account?",
    registerHere: "Register here",
    alreadyHaveAccount: "Already have an account?",
    loginHere: "Login here",
    usernameLabel: "Username",
    usernamePlaceholder: "Enter a username",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    registeringButton: "Registering...",
    registerButton: "Register",
  },
  AccountPage: {
    title: "My Account",
    orderHistory: "Order History",
    noOrders: "You haven't placed any orders yet.",
  },
  OrderDetails: {
    order: "Order #",
    total: "Total:",
    download: "Download",
    products: "Products:",
    loading: "Loading your orders...",
  },
  CartSummary: {
    remove: "Remove",
    title: "Cart Summary",
    total: "Total:",
    checkoutButton: "Proceed to Checkout",
    quantity: "Quantity:",
  },
  SuccessPage: {
    title: "Payment Successful!",
    message:
      "Thank you for your purchase. You will receive an email with your download links and receipt shortly.",
    backButton: "Back to Store",
    invalidAccessTitle: "Invalid Access",
    invalidAccessMessage:
      "This page can only be accessed after a successful payment.",
  },
} as const;
