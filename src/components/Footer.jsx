import { useState } from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-20 space-y-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-start space-y-8 lg:space-y-0">
          {/* Company Information */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              The Booksellers Limited
            </h1>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li>
                <span className="font-medium text-gray-700">Location:</span>{" "}
                Corporate Headquarters: 52 Magazine Road, Jericho, Ibadan
              </li>
              <li>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                08033229113, 08078496332, 07040560876, 0700-Booksellers
              </li>
              <li>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                info@booksellers.ng
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="lg:w-1/3 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Follow Us On
            </h2>
            <ul className="mt-6 flex justify-center space-x-8 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Facebook</li>
              <li className="hover:text-blue-400 cursor-pointer">Twitter</li>
              <li className="hover:text-pink-500 cursor-pointer">Instagram</li>
              <li className="hover:text-red-500 cursor-pointer">YouTube</li>
            </ul>
          </div>
        </div>

        {/* Information and Service Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Company Information
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">About Us</li>
              <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-500 cursor-pointer">Publishing</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Events & News
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Customer Service
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Help & FAQ</li>
              <li className="hover:text-blue-500 cursor-pointer">
                Delivery Information
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                Events & News
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Subscribe to Our Newsletter
          </h2>
          <div className="mt-6 flex justify-center items-center">
            <input
              type="email"
              name="newsletter"
              id="email-news"
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-r-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500">
          Copyright © 2017 – The Booksellers Limited. All rights reserved.
          eCommerce Website Design by CKDigital.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
