import React, { useState } from 'react';

const DosaDelivery = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const dosaVarieties = [
    {
      id: 1,
      name: "Masala Dosa",
      price: 120,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "classic",
      description: "Crispy golden dosa stuffed with spiced potato filling",
      rating: 4.5,
      cookTime: "15 min",
      isVeg: true,
      tags: ["Best Seller", "Spicy"]
    },
    {
      id: 2,
      name: "Rava Dosa",
      price: 140,
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "special",
      description: "Instant crispy dosa made with semolina and spices",
      rating: 4.8,
      cookTime: "10 min",
      isVeg: true,
      tags: ["Crispy", "Quick"]
    },
    {
      id: 3,
      name: "Mysore Masala Dosa",
      price: 150,
      image: "https://th.bing.com/th/id/OIP.6R2epjWiYK2anm6lI2BwagHaEK?w=208&h=117&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "spicy",
      description: "Spicy red chutney spread with potato masala",
      rating: 4.6,
      cookTime: "18 min",
      isVeg: true,
      tags: ["Spicy", "Authentic"]
    },
    {
      id: 4,
      name: "Paneer Dosa",
      price: 160,
      image: "https://th.bing.com/th/id/OIP.Df0V1RgHsnhrxZ1ZrDZQfwHaE8?w=208&h=139&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "special",
      description: "Stuffed with spicy paneer and vegetable filling",
      rating: 4.4,
      cookTime: "20 min",
      isVeg: true,
      tags: ["Rich", "Creamy"]
    },
    {
      id: 5,
      name: "Set Dosa",
      price: 130,
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "classic",
      description: "Soft, spongy dosas served in a set of three",
      rating: 4.3,
      cookTime: "12 min",
      isVeg: true,
      tags: ["Soft", "Traditional"]
    },
    {
      id: 6,
      name: "Cheese Dosa",
      price: 180,
      image: "https://th.bing.com/th/id/OIP.rQfFGsDJ1xJpXBvm16YfwwHaE8?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "fusion",
      description: "Loaded with melted cheese and herbs",
      rating: 4.7,
      cookTime: "15 min",
      isVeg: true,
      tags: ["Cheesy", "Modern"]
    },
    {
      id: 7,
      name: "Onion Dosa",
      price: 110,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "classic",
      description: "Crispy dosa topped with finely chopped onions",
      rating: 4.2,
      cookTime: "12 min",
      isVeg: true,
      tags: ["Crunchy", "Classic"]
    },
    {
      id: 8,
      name: "Chocolate Dosa",
      price: 200,
      image: "https://th.bing.com/th/id/OIP.X6i__fmWKFD-EYvBIIkDrwHaEK?w=308&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      category: "fusion",
      description: "Sweet dosa with chocolate and nuts",
      rating: 4.5,
      cookTime: "10 min",
      isVeg: true,
      tags: ["Sweet", "Dessert"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Dosas', count: dosaVarieties.length },
    { id: 'classic', name: 'Classic', count: dosaVarieties.filter(d => d.category === 'classic').length },
    { id: 'special', name: 'Special', count: dosaVarieties.filter(d => d.category === 'special').length },
    { id: 'spicy', name: 'Spicy', count: dosaVarieties.filter(d => d.category === 'spicy').length },
    { id: 'fusion', name: 'Fusion', count: dosaVarieties.filter(d => d.category === 'fusion').length }
  ];

  const filteredDosas = activeCategory === 'all'
    ? dosaVarieties
    : dosaVarieties.filter(dosa => dosa.category === activeCategory);

  const addToCart = (dosa) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dosa.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dosa.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dosa, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dosa Delights</h1>
                <p className="text-sm text-gray-600">Authentic South Indian Experience</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              {['Home', 'Menu', 'About', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-amber-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Crispy, Golden
              <span className="block text-amber-200">Dosa Delights</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Experience the authentic taste of South India with our handcrafted dosas, made with traditional recipes and served with love.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Order Delivery
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                View Menu
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' }}>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all ${activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dosa Menu */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Dosa Collection</h2>
            <p className="text-gray-600 text-lg">Discover our wide range of delicious dosas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDosas.map((dosa) => (
              <div key={dosa.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img src={dosa.image} alt={dosa.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    {dosa.tags.map((tag, index) => (
                      <span key={index} className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    {dosa.isVeg ? (
                      <div className="w-4 h-4 border-2 border-green-500 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{dosa.name}</h3>
                    <span className="text-orange-500 font-bold text-lg">₹{dosa.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{dosa.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <StarRating rating={dosa.rating} />
                    <span className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {dosa.cookTime}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(dosa)}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:from-orange-600 hover:to-amber-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Fast Delivery', desc: 'Fresh and hot dosas delivered in 30 minutes' },
              { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Traditional recipes by experienced South Indian chefs' },
              { icon: '🌱', title: 'Fresh Ingredients', desc: 'Daily prepared batter and fresh ingredients' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-2xl rounded-l-2xl p-6 w-80">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-orange-500 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-orange-500">₹{getTotalPrice()}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Dosa Delights</h3>
              <p className="text-gray-400">Serving authentic South Indian dosas with love and tradition since 2010.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {['Menu', 'About Us', 'Contact', 'Delivery Areas'].map((link) => (
                  <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 98765 43210</p>
                <p>📧 hello@dosadelights.com</p>
                <p>📍 123 Dosa Street, Mumbai</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Opening Hours</h4>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 7AM - 11PM</p>
                <p>Saturday - Sunday: 8AM - 12AM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dosa Delights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DosaDelivery; 