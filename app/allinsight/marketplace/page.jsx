'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const dummyProducts = [
  {
    id: 1,
    name: 'Mathematics Book',
    category: 'Books',
    image: 'https://t3.ftcdn.net/jpg/04/61/40/68/360_F_461406849_e3VTquns36ftSqArxMCnwXUSjLH0HoYo.jpg',
    related: [
      { id: 101, name: 'Algebra Essentials', image: 'https://images-na.ssl-images-amazon.com/images/I/51MD9Rri4YL.jpg' },
      { id: 102, name: 'Geometry Guide', image: 'https://images-na.ssl-images-amazon.com/images/I/71lSbRY8JuL.jpg' },
      { id: 103, name: 'Calculus Crash Course', image: 'https://m.media-amazon.com/images/I/815b3ea+kOL.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Science Kit',
    category: 'Kits',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81ZUvHszgOL.jpg',
    related: [
      { id: 201, name: 'Physics Experiments', image: 'https://cdn2.webdamdb.com/md_ga8wEtYpGD451GlP.png?1680276441' },
      { id: 202, name: 'Biology Kit', image: 'https://cdn11.bigcommerce.com/s-ufhcuzfxw9/images/stencil/500x659/q/th-biology-biology-supplies-and-kits__44871.original.jpg' },
      { id: 203, name: 'Chemistry Starter Kit', image: 'https://m.media-amazon.com/images/I/61wGB7dJJRL.jpg' },
    ],
  },
  {
    id: 3,
    name: 'Python Course',
    category: 'Courses',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81ZBWeKoZVL.jpg',
    related: [
      { id: 301, name: 'Beginner Python', image: 'https://files.realpython.com/media/python-cookbook-cover.449eb0e173ad.jpg' },
      { id: 302, name: 'Data Science Basics', image: 'https://cdn.mentorcruise.com/cdn-cgi/image/width=320,format=auto/https://cdn.mentorcruise.com/cover-data-science-from-scratch-first-principles-with-python.jpg' },
      { id: 303, name: 'Flask Web Dev', image: 'https://m.media-amazon.com/images/I/51MiYDbJinL.jpg' },
    ],
  },
  {
    id: 4,
    name: 'Nursing Guide',
    category: 'Health',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61zdaF2vD-L.jpg',
    related: [
      { id: 401, name: 'Anatomy Basics', image: 'https://images-na.ssl-images-amazon.com/images/I/71kCQD44h2L.jpg' },
      { id: 402, name: 'Patient Care', image: 'https://t3.ftcdn.net/jpg/05/44/76/40/360_F_544764081_OUO4Kfn3wQ4R3tPpDh2lATs8uEIVvlwu.jpg' },
      { id: 403, name: 'Pharmacology Intro', image: 'https://images-na.ssl-images-amazon.com/images/I/7138pzW-PvL.jpg' },
    ],
  },
  {
    id: 5,
    name: 'Geography Fundamentals',
    category: 'Social Sciences',
    image: 'https://m.media-amazon.com/images/I/51p8kXhRVcL.jpg',
    related: [
      { id: 501, name: 'World Maps', image: 'https://res.cloudinary.com/dk-hub/image/upload/c_limit,f_auto,w_580,h_650/dk-core-nonprod/9781465475855/9781465475855_cover.jpg' },
      { id: 502, name: 'Climate Studies', image: 'https://images3.penguinrandomhouse.com/cover/9780593492321' },
      { id: 503, name: 'Human Geography', image: 'https://eternalexploration.wordpress.com/wp-content/uploads/2011/10/approaches-human-geography-gill-valentine-paperback-cover-art.jpg?w=640' },
    ],
  },
  {
    id: 6,
    name: 'Management Essentials',
    category: 'Business',
    image: 'https://m.media-amazon.com/images/I/51fjvcGuKYL.jpg',
    related: [
      { id: 601, name: 'Leadership Skills', image: 'https://images.squarespace-cdn.com/content/v1/59c82ac46f4ca30b86d179bf/1719842276594-D4A647QZ6YWRNN6IMAXF/125.bookreview.TribalLeadership2.jpg' },
      { id: 602, name: 'Project Management', image: 'https://factorialhr.com/wp-content/uploads/2025/01/14165524/Interactive-PM-233x300.jpg' },
      { id: 603, name: 'Financial Basics', image: 'https://images4.penguinrandomhouse.com/cover/9780525534587' },
    ],
  },
  {
    id: 7,
    name: 'Engineering Principles',
    category: 'Engineering',
    image: 'https://images-na.ssl-images-amazon.com/images/I/7169ZfqojOL.jpg',
    related: [
      { id: 701, name: 'Mechanical Basics', image: 'https://m.media-amazon.com/images/I/51DE-Oh02FL.jpg' },
      { id: 702, name: 'Electrical Circuits', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
      { id: 703, name: 'Civil Structures', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' },
    ],
  },
];

// Helper to find category of a product (main or related) by id
const findCategoryByProductId = (productId) => {
  for (const mainProduct of dummyProducts) {
    if (mainProduct.id === productId) {
      return mainProduct.category;
    }
    if (mainProduct.related.some((item) => item.id === productId)) {
      return mainProduct.category;
    }
  }
  return null; // not found
};

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const filteredProducts = dummyProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedProductId((prev) => (prev === id ? null : id));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const goBack = () => {
    setSelectedProduct(null);
    setExpandedProductId(null);
  };

  // Check if category already in cart
  const isCategoryInCart = (category) => {
    return cart.some((item) => {
      const cat = findCategoryByProductId(item.id);
      return cat === category;
    });
  };

  // Add to cart (main or related)
  const addToCart = (product) => {
    const productCategory = findCategoryByProductId(product.id);
    if (isCategoryInCart(productCategory)) {
      alert(`You can only add one item from the "${productCategory}" category.`);
      return;
    }
    setCart((prevCart) => [...prevCart, product]);
    alert(`"${product.name}" added to cart.`);
  };

  // Buy now (main or related)
  const buyNow = (product) => {
    const productCategory = findCategoryByProductId(product.id);
    if (isCategoryInCart(productCategory)) {
      alert(`You already have an item from the "${productCategory}" category in your cart or purchased.`);
      return;
    }
    alert(`Thank you for purchasing "${product.name}" from category "${productCategory}"!`);
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="min-h-screen bg-green-100 p-6 pt-24">
      <div className="max-w-6xl mx-auto">

        {/* CART SUMMARY */}
        <div className="mb-6 p-4 bg-green-200 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-green-900">Your Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-green-800">Your cart is empty.</p>
          ) : (
            <ul className="list-disc pl-5 text-green-900">
              {cart.map((item) => (
                <li key={item.id}>{item.name} ({findCategoryByProductId(item.id)})</li>
              ))}
            </ul>
          )}
        </div>

        {!selectedProduct ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-green-900">Education Marketplace</h1>

            <div className="flex items-center gap-2 mb-6">
              <Search className="text-green-800" />
              <input
                type="text"
                placeholder="Search for books, courses, kits..."
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white cursor-pointer flex flex-col"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onClick={() => handleProductClick(product)}
                    />
                    <div className="p-4 flex-grow" onClick={() => handleProductClick(product)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-semibold text-green-900">{product.name}</h2>
                          <p className="text-sm text-green-700">{product.category}</p>
                        </div>
                        {expandedProductId === product.id ? (
                          <ChevronUp className="text-green-600" />
                        ) : (
                          <ChevronDown className="text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="p-4 border-t flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-green-600 text-white rounded py-2 hover:bg-green-700 transition"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => buyNow(product)}
                        className="flex-1 bg-green-900  text-white rounded py-2 hover:bg-green-800 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-800">No products found.</p>
            )}
          </>
        ) : (

          // DETAIL SCREEN
          <div className="max-w-4xl mx-auto">
            <button
              onClick={goBack}
              className="mb-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              &larr; Back to Marketplace
            </button>

            <div className="border rounded-xl overflow-hidden shadow bg-white">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold text-green-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-green-700 text-lg mb-6">{selectedProduct.category}</p>

                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="mr-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => buyNow(selectedProduct)}
                  className="px-6 py-2 bg-green-900 text-white rounded hover:bg-green-800 transition"
                >
                  Buy Now
                </button>

                <h3 className="text-2xl font-semibold text-green-900 mt-8 mb-4">Related Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedProduct.related.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-3 bg-green-50 p-4 rounded-md shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded"
                      />
                      <span className="text-green-900 font-medium text-center">{item.name}</span>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => buyNow(item)}
                          className="px-4 py-1 bg-green-900 text-white rounded hover:bg-green-800 transition"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
