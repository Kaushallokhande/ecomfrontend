import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur. Sed dolor netus sed vitae
            convallis ullamcorper. Sapien quisque vitae fermentum neque eget at.
            Tempor sit nisl nulla amet morbi turpis.
          </p>
          <p className="text-sm">
            For order-related queries & bulk orders, <br />
            email – support@Krisky.com
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold text-lg mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#track-order"
                className="text-sm hover:underline hover:text-gray-300"
              >
                Track Your Order
              </a>
            </li>
            <li>
              <a
                href="#shipping-policy"
                className="text-sm hover:underline hover:text-gray-300"
              >
                Shipping & Return Policy
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="text-sm hover:underline hover:text-gray-300"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#about-us"
                className="text-sm hover:underline hover:text-gray-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact-support"
                className="text-sm hover:underline hover:text-gray-300"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold text-lg mb-4">CONNECT WITH US</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Pinterest"
            >
              <i className="fab fa-pinterest text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
