// Local SVG placeholders keep the project self-contained while still showing polished product art.
function createPlaceholderImage(label, background) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 460">
            <rect width="600" height="460" rx="36" fill="${background}"/>
            <rect x="78" y="72" width="444" height="244" rx="28" fill="#ffffff" opacity="0.92"/>
            <text x="300" y="190" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="34" font-weight="700" fill="#102533">${label}</text>
            <text x="300" y="236" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="20" fill="#48616d">Chor Bazaar</text>
            <rect x="180" y="348" width="240" height="40" rx="20" fill="#102533" opacity="0.08"/>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

window.CATEGORY_META = {
    minutes: {
        title: "Minutes Delivery",
        tag: "Fast essentials",
        description: "Quick-pick snacks, beverages and daily-use products for instant convenience.",
        shortNote: "Quick-delivery essential"
    },
    mobiles: {
        title: "Mobiles & Tablets",
        tag: "Top devices",
        description: "Popular smartphones, tablets and smart accessories with student-friendly pricing.",
        shortNote: "Latest device pick"
    },
    fashion: {
        title: "Fashion Store",
        tag: "Trending style",
        description: "Curated apparel, footwear and accessories designed for everyday style updates.",
        shortNote: "Style-forward choice"
    },
    electronics: {
        title: "Electronics",
        tag: "Tech deals",
        description: "Audio, displays and creator gadgets with polished product cards and filters.",
        shortNote: "Popular electronics deal"
    },
    appliances: {
        title: "TVs & Appliances",
        tag: "Home upgrades",
        description: "Kitchen, cleaning and home-comfort appliances for practical everyday living.",
        shortNote: "Useful home upgrade"
    },
    furniture: {
        title: "Home & Furniture",
        tag: "Comfort spaces",
        description: "Smart furniture picks for study setups, bedrooms and modern home corners.",
        shortNote: "Space-saving favorite"
    },
    flights: {
        title: "Flight Bookings",
        tag: "Travel offers",
        description: "Domestic and international booking options presented as travel-ready product cards.",
        shortNote: "Travel-ready deal"
    },
    grocery: {
        title: "Grocery Store",
        tag: "Daily pantry",
        description: "Pantry staples, healthy snacks and kitchen basics at practical prices.",
        shortNote: "Everyday grocery staple"
    }
};

window.PRODUCTS = [
    { id: "minutes-1", category: "minutes", name: "Instant Noodles Combo Pack", price: 199, rating: 4.4, image: createPlaceholderImage("Instant Noodles", "#fff4d9") },
    { id: "minutes-2", category: "minutes", name: "Chocolate Wafer Snack Box", price: 149, rating: 4.2, image: createPlaceholderImage("Snack Box", "#f9e8ea") },
    { id: "minutes-3", category: "minutes", name: "Cold Coffee Ready Drink", price: 99, rating: 4.1, image: createPlaceholderImage("Cold Coffee", "#e7f2ff") },
    { id: "minutes-4", category: "minutes", name: "Energy Drink Six Pack", price: 420, rating: 4.3, image: createPlaceholderImage("Energy Drink", "#edf7e8") },
    { id: "minutes-5", category: "minutes", name: "Greek Yogurt Cup Set", price: 275, rating: 4.5, image: createPlaceholderImage("Greek Yogurt", "#f4eefb") },
    { id: "minutes-6", category: "minutes", name: "Sandwich Bread Family Pack", price: 65, rating: 4.0, image: createPlaceholderImage("Bread Pack", "#f8f3e1") },
    { id: "minutes-7", category: "minutes", name: "Fresh Fruit Basket Mini", price: 349, rating: 4.6, image: createPlaceholderImage("Fruit Basket", "#e6f6e8") },
    { id: "minutes-8", category: "minutes", name: "Breakfast Cereal Jar", price: 289, rating: 4.3, image: createPlaceholderImage("Cereal Jar", "#fbeedc") },

    { id: "mobiles-1", category: "mobiles", name: "Nova X5 5G Smartphone", price: 14999, rating: 4.4, image: createPlaceholderImage("Nova X5", "#e9f6fb") },
    { id: "mobiles-2", category: "mobiles", name: "PixelTab Lite 10.4", price: 18999, rating: 4.5, image: createPlaceholderImage("PixelTab Lite", "#eef0fb") },
    { id: "mobiles-3", category: "mobiles", name: "Pulse Buds Pro", price: 1999, rating: 4.2, image: "buds.webp" },
    { id: "mobiles-4", category: "mobiles", name: "MagSafe Power Bank 10000mAh", price: 1299, rating: 4.1, image: createPlaceholderImage("Power Bank", "#f3f8e7") },
    { id: "mobiles-5", category: "mobiles", name: "GlassShield Screen Protector", price: 399, rating: 4.0, image: createPlaceholderImage("Screen Guard", "#f6eefc") },
    { id: "mobiles-6", category: "mobiles", name: "SmartView Tablet Cover", price: 799, rating: 4.3, image: createPlaceholderImage("Tablet Cover", "#fff0ea") },
    { id: "mobiles-7", category: "mobiles", name: "UltraCharge 45W Adapter", price: 999, rating: 4.4, image: createPlaceholderImage("45W Charger", "#eaf7fc") },
    { id: "mobiles-8", category: "mobiles", name: "Halo Smartwatch Fit", price: 2499, rating: 4.5, image: "fastrack.webp" },

    { id: "fashion-1", category: "fashion", name: "Classic Cotton Shirt", price: 899, rating: 4.3, image: createPlaceholderImage("Cotton Shirt", "#eef7ff") },
    { id: "fashion-2", category: "fashion", name: "Relaxed Fit Denim Jeans", price: 1299, rating: 4.2, image: createPlaceholderImage("Denim Jeans", "#e8eefc") },
    { id: "fashion-3", category: "fashion", name: "Casual Sneakers White", price: 1799, rating: 4.5, image: createPlaceholderImage("Sneakers", "#f5f5f5") },
    { id: "fashion-4", category: "fashion", name: "Printed Summer Kurti", price: 999, rating: 4.4, image: createPlaceholderImage("Summer Kurti", "#fff1f3") },
    { id: "fashion-5", category: "fashion", name: "Leather Strap Watch", price: 1499, rating: 4.1, image: "fastrack.webp" },
    { id: "fashion-6", category: "fashion", name: "Travel Backpack Urban", price: 1599, rating: 4.6, image: createPlaceholderImage("Backpack", "#eef8ea") },
    { id: "fashion-7", category: "fashion", name: "Training Joggers", price: 799, rating: 4.0, image: createPlaceholderImage("Joggers", "#f4f2f0") },
    { id: "fashion-8", category: "fashion", name: "Statement Sunglasses", price: 699, rating: 4.2, image: createPlaceholderImage("Sunglasses", "#eef2f5") },

    { id: "electronics-1", category: "electronics", name: "Noise Cancellation Ear Buds", price: 999, rating: 4.4, image: "buds.webp" },
    { id: "electronics-2", category: "electronics", name: "24-inch Full HD Monitor", price: 6599, rating: 4.5, image: "monitor.webp" },
    { id: "electronics-3", category: "electronics", name: "Wireless Keyboard Combo", price: 1899, rating: 4.2, image: createPlaceholderImage("Keyboard Combo", "#eef8fa") },
    { id: "electronics-4", category: "electronics", name: "All-in-One Printer", price: 10999, rating: 4.1, image: "printers.webp" },
    { id: "electronics-5", category: "electronics", name: "Mini Home Projector", price: 6990, rating: 4.0, image: "projectors.webp" },
    { id: "electronics-6", category: "electronics", name: "Mirrorless Camera Kit", price: 99999, rating: 4.7, image: "camera.webp" },
    { id: "electronics-7", category: "electronics", name: "Portable Bluetooth Speaker", price: 2499, rating: 4.3, image: createPlaceholderImage("BT Speaker", "#fceee9") },
    { id: "electronics-8", category: "electronics", name: "Action Creator Camera", price: 22999, rating: 4.6, image: "top-camera.webp" },

    { id: "appliances-1", category: "appliances", name: "Smart Air Fryer 4L", price: 5499, rating: 4.4, image: createPlaceholderImage("Air Fryer", "#f9f0df") },
    { id: "appliances-2", category: "appliances", name: "Compact Mixer Grinder", price: 3299, rating: 4.2, image: createPlaceholderImage("Mixer Grinder", "#eef6fb") },
    { id: "appliances-3", category: "appliances", name: "Solo Microwave Oven", price: 6499, rating: 4.3, image: createPlaceholderImage("Microwave", "#f6f3ff") },
    { id: "appliances-4", category: "appliances", name: "Room Heater Comfort Plus", price: 2799, rating: 4.1, image: createPlaceholderImage("Room Heater", "#fff0eb") },
    { id: "appliances-5", category: "appliances", name: "Steam Iron Glide", price: 1499, rating: 4.0, image: createPlaceholderImage("Steam Iron", "#edf7ea") },
    { id: "appliances-6", category: "appliances", name: "Robot Vacuum Basic", price: 11999, rating: 4.5, image: createPlaceholderImage("Robot Vacuum", "#f0f4f6") },
    { id: "appliances-7", category: "appliances", name: "Double Door Refrigerator", price: 24999, rating: 4.6, image: createPlaceholderImage("Fridge", "#eef7fb") },
    { id: "appliances-8", category: "appliances", name: "Smart LED TV 43 Inch", price: 28999, rating: 4.4, image: createPlaceholderImage("Smart LED TV", "#ebf0fc") },

    { id: "furniture-1", category: "furniture", name: "Ergonomic Study Chair", price: 4999, rating: 4.5, image: createPlaceholderImage("Study Chair", "#edf7fb") },
    { id: "furniture-2", category: "furniture", name: "Engineered Wood Desk", price: 7499, rating: 4.4, image: createPlaceholderImage("Study Desk", "#f4ece2") },
    { id: "furniture-3", category: "furniture", name: "Minimal Bedside Table", price: 2399, rating: 4.1, image: createPlaceholderImage("Bedside Table", "#f7f1ea") },
    { id: "furniture-4", category: "furniture", name: "Compact Three Seater Sofa", price: 18999, rating: 4.3, image: createPlaceholderImage("Sofa", "#eef0f6") },
    { id: "furniture-5", category: "furniture", name: "Wardrobe Storage Cabinet", price: 12999, rating: 4.2, image: createPlaceholderImage("Wardrobe", "#edf5e9") },
    { id: "furniture-6", category: "furniture", name: "Wall Mount Bookshelf", price: 1699, rating: 4.0, image: createPlaceholderImage("Bookshelf", "#fbf0e5") },
    { id: "furniture-7", category: "furniture", name: "Floor Lamp Warm Glow", price: 2199, rating: 4.4, image: createPlaceholderImage("Floor Lamp", "#fbf7df") },
    { id: "furniture-8", category: "furniture", name: "Coffee Table Studio", price: 3599, rating: 4.1, image: createPlaceholderImage("Coffee Table", "#f2efe8") },

    { id: "flights-1", category: "flights", name: "Hyderabad to Delhi Saver Fare", price: 4599, rating: 4.2, image: createPlaceholderImage("HYD to DEL", "#eaf6ff") },
    { id: "flights-2", category: "flights", name: "Bengaluru to Mumbai Flexi Fare", price: 5299, rating: 4.3, image: createPlaceholderImage("BLR to BOM", "#eef2fd") },
    { id: "flights-3", category: "flights", name: "Chennai to Goa Weekend Deal", price: 6199, rating: 4.5, image: createPlaceholderImage("MAA to GOI", "#fff0e7") },
    { id: "flights-4", category: "flights", name: "Kolkata to Dubai Promo", price: 18999, rating: 4.4, image: createPlaceholderImage("CCU to DXB", "#edf7ea") },
    { id: "flights-5", category: "flights", name: "Delhi to Singapore Round Trip", price: 26499, rating: 4.6, image: createPlaceholderImage("DEL to SIN", "#eef7fb") },
    { id: "flights-6", category: "flights", name: "Mumbai to Jaipur Budget Fare", price: 3999, rating: 4.1, image: createPlaceholderImage("BOM to JAI", "#f9f0df") },
    { id: "flights-7", category: "flights", name: "Pune to Kochi Holiday Fare", price: 5799, rating: 4.3, image: createPlaceholderImage("PNQ to COK", "#f3ecff") },
    { id: "flights-8", category: "flights", name: "Ahmedabad to Bangkok Special", price: 22499, rating: 4.5, image: createPlaceholderImage("AMD to BKK", "#eef7ee") },

    { id: "grocery-1", category: "grocery", name: "Premium Coffee Powder", price: 399, rating: 4.6, image: "coffee.webp" },
    { id: "grocery-2", category: "grocery", name: "Dry Fruits Value Pack", price: 599, rating: 4.5, image: "dry.webp" },
    { id: "grocery-3", category: "grocery", name: "Chocolate Spread Jar", price: 249, rating: 4.3, image: "spreads.webp" },
    { id: "grocery-4", category: "grocery", name: "Organic Rice 5Kg", price: 449, rating: 4.2, image: createPlaceholderImage("Organic Rice", "#f6f0de") },
    { id: "grocery-5", category: "grocery", name: "Cold Pressed Cooking Oil", price: 299, rating: 4.1, image: createPlaceholderImage("Cooking Oil", "#fbf1db") },
    { id: "grocery-6", category: "grocery", name: "Healthy Muesli Breakfast", price: 369, rating: 4.4, image: createPlaceholderImage("Healthy Muesli", "#edf6e6") },
    { id: "grocery-7", category: "grocery", name: "Masala Spice Essentials", price: 199, rating: 4.0, image: createPlaceholderImage("Masala Set", "#fcefe7") },
    { id: "grocery-8", category: "grocery", name: "Honey Oats Cookies Tin", price: 179, rating: 4.2, image: createPlaceholderImage("Cookie Tin", "#fbf6df") }
];
