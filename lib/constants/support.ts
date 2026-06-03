import { shippingInfo, businessPolicies, companyInfo } from "./legal";

// FAQ Categories and Questions
export const faqCategories = [
  {
    id: "orders",
    name: "Orders & Payment",
    icon: "ShoppingBag",
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "Simply browse our collection, select your size and color, add to cart, and proceed to checkout. You'll need to create an account or checkout as a guest.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, Razorpay, and Cash on Delivery for select pincodes.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer: `Yes, you can cancel your order within ${businessPolicies.cancellationWindow}. Contact our support team immediately with your order number.`,
      },
      {
        question: "Is it safe to use my credit card on your site?",
        answer:
          "Yes. All payments are processed securely through Razorpay, a PCI-DSS compliant payment gateway. We do not store your full payment details.",
      },
      {
        question: "Will I receive an invoice for my order?",
        answer:
          "Yes, a tax invoice will be sent to your registered email address after order confirmation.",
      },
    ],
  },
  {
    id: "shipping",
    name: "Shipping & Delivery",
    icon: "Truck",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: `Domestic orders typically arrive within ${shippingInfo.domesticShippingTime}. Metro cities may receive delivery in ${shippingInfo.metroCitiesTime}.`,
      },
      {
        question: "Do you ship internationally?",
        answer: shippingInfo.internationalShipping
          ? `Yes, we ship worldwide. International delivery takes ${shippingInfo.internationalShippingTime}. Customs duties and taxes are the responsibility of the customer.`
          : "Currently, we only ship within India. International shipping coming soon!",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking link via email and SMS. You can also track your order in your account dashboard.",
      },
      {
        question: "What are the shipping charges?",
        answer: `Orders over ₹${shippingInfo.freeShippingThreshold.toLocaleString()} qualify for free shipping. Otherwise, a flat fee of ₹${
          shippingInfo.shippingCost
        } applies.`,
      },
      {
        question: "Do you offer express shipping?",
        answer:
          "Yes, express shipping is available at checkout for an additional fee. Delivery within 1-2 business days in select cities.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Exchanges",
    icon: "RefreshCw",
    faqs: [
      {
        question: "What is your return policy?",
        answer: `We offer returns within ${businessPolicies.returnWindow} from the date of delivery. Items must be ${businessPolicies.returnConditions}.`,
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Login to your account, go to 'My Orders', select the order and item, and click 'Return'. Follow the instructions to complete the process.",
      },
      {
        question: "How long does a refund take?",
        answer: `Refunds are processed within ${businessPolicies.refundTime} after return approval. The amount will be credited to your original payment method.`,
      },
      {
        question: "Can I exchange an item?",
        answer: businessPolicies.exchangePolicy,
      },
      {
        question: "Who pays for return shipping?",
        answer:
          "Return shipping is free for defective or incorrect items. For size exchanges or change of mind, return shipping charges may apply.",
      },
      {
        question: "What if I received a defective item?",
        answer:
          "We're sorry! Please contact our support team within 48 hours of delivery with photos of the defect. We'll arrange a free replacement or refund.",
      },
    ],
  },
  {
    id: "products",
    name: "Products & Sizing",
    icon: "Shirt",
    faqs: [
      {
        question: "How do I find my correct size?",
        answer:
          "Refer to our detailed Size Guide available on every product page. Each product listing includes specific measurements for that garment.",
      },
      {
        question: "Are your products true to size?",
        answer:
          "Most products are true to size. However, we recommend checking the individual size chart as fits may vary by style.",
      },
      {
        question: "What fabrics do you use?",
        answer:
          "We use premium fabrics including French linen, organic cotton, mulberry silk, and handwoven textiles. Material composition is listed on each product page.",
      },
      {
        question: "How should I care for my garment?",
        answer:
          "Care instructions are provided on each product page and on the garment tag. Most of our products are machine washable on gentle cycle.",
      },
      {
        question: "Do you restock sold-out items?",
        answer:
          "Popular items may be restocked. Sign up for 'Notify Me' on the product page to get email alerts when back in stock.",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Privacy",
    icon: "User",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the user icon in the navigation bar and select 'Sign Up'. You can also create an account during checkout.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click 'Forgot Password' on the sign-in page and follow the instructions to reset your password.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Please contact our support team with your account deletion request. We'll process it within 7 business days.",
      },
      {
        question: "How is my data protected?",
        answer:
          "We take data privacy seriously. Please read our Privacy Policy for detailed information on how we protect your information.",
      },
    ],
  },
  {
    id: "promotions",
    name: "Promotions & Discounts",
    icon: "Tag",
    faqs: [
      {
        question: "How do I apply a discount code?",
        answer:
          "Enter your promo code at checkout in the 'Discount Code' field and click 'Apply'.",
      },
      {
        question: "Can I combine multiple discount codes?",
        answer:
          "Only one discount code can be applied per order unless specified otherwise in the promotion terms.",
      },
      {
        question: "How do I sign up for newsletters?",
        answer:
          "Subscribe to our newsletter at the bottom of any page. You'll receive updates on new arrivals and exclusive offers.",
      },
      {
        question: "Do you offer seasonal sales?",
        answer:
          "Yes, we have seasonal sales and promotional events. Follow us on Instagram or subscribe to our newsletter for announcements.",
      },
    ],
  },
];

// Policy Cards Data
export const policyCards = [
  {
    id: "shipping-policy",
    title: "Shipping Policy",
    description: `Free shipping on orders over ₹${shippingInfo.freeShippingThreshold.toLocaleString()}. Delivery in ${
      shippingInfo.domesticShippingTime
    }.`,
    icon: "Truck",
    link: "/shipping-policy",
  },
  {
    id: "return-policy",
    title: "Return Policy",
    description: `${
      businessPolicies.returnWindow
    } returns. Items must be ${businessPolicies.returnConditions.substring(
      0,
      60
    )}...`,
    icon: "RefreshCw",
    link: "/return-policy",
  },
  {
    id: "exchange-policy",
    title: "Exchange Policy",
    description: businessPolicies.exchangePolicy,
    icon: "Repeat",
    link: "/exchange-policy",
  },
];

// Support Contact Options
export const supportContacts = [
  {
    id: "email",
    name: "Email Support",
    description: "Get response within 24 hours",
    contact: companyInfo.email,
    action: `mailto:${companyInfo.email}`,
    icon: "Mail",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Quick replies within hours",
    contact: companyInfo.phone,
    action: `https://wa.me/${companyInfo.phone.replace(/\s/g, "")}`,
    icon: "MessageCircle",
  },
  {
    id: "phone",
    name: "Phone Support",
    description: "Mon-Fri, 10 AM - 7 PM",
    contact: companyInfo.phone,
    action: `tel:${companyInfo.phone}`,
    icon: "Phone",
  },
];
