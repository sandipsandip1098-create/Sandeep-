import { BakeryItem, AddOnOption, NotificationItem, ReviewItem } from '../types/bakery';

export const BAKERY_ITEMS: BakeryItem[] = [
  // CAKES
  {
    id: 'cake-belgian-truffle',
    name: {
      hi: 'बेल्जियन चॉकलेट ट्रफल केक',
      en: 'Belgian Chocolate Truffle Cake'
    },
    description: {
      hi: 'प्रीमियम डार्क बेल्जियन गनाचे, मुलायम चॉकलेट स्पंज और रिच सिल्की लेयर्स से बना सबसे पसंदीदा केक।',
      en: 'Rich Belgian dark chocolate ganache draped over ultra-moist sponge layers. Pure decadence.'
    },
    category: 'cakes',
    basePrice: 599, // price for 0.5 kg
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 342,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 35,
    calories: '340 kcal/slice',
    availableWeights: [0.5, 1.0, 1.5, 2.0, 3.0],
    availableFlavors: ['बेल्जियन डार्क चॉकलेट', 'मिल्क चॉकलेट गनाचे', 'चॉकलेट वॉलनट', 'एस्प्रेसो मोका'],
    isCustomizable: true
  },
  {
    id: 'cake-rasmalai-fusion',
    name: {
      hi: 'रॉयल रसमलाई फ्यूज़न केक',
      en: 'Royal Rasmalai Fusion Cake'
    },
    description: {
      hi: 'ताज़ा छेना रसमलाई, इलायची-केसर विप्ड क्रीम, पिस्ता और गुलाब की पंखुड़ियों से सजा फेस्टिव स्पेशल केक।',
      en: 'Infused with saffron-cardamom milk, layers of fresh soft rasmalai, roasted pistachios & rose petals.'
    },
    category: 'cakes',
    basePrice: 699,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 289,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: true,
    preparationTimeMin: 40,
    calories: '310 kcal/slice',
    availableWeights: [0.5, 1.0, 1.5, 2.0, 3.0],
    availableFlavors: ['शाही रसमलाई केसर', 'रसमलाई पिस्ता स्पेशल', 'गुलाब जामुन फ्यूज़न'],
    isCustomizable: true
  },
  {
    id: 'cake-red-velvet',
    name: {
      hi: 'रेड वेलवेट क्रीम चीज़ केक',
      en: 'Red Velvet Cream Cheese Cake'
    },
    description: {
      hi: 'वेलवेटी लाल स्पंज, असली फिलाडेल्फिया क्रीम चीज़ फ्रॉस्टिंग और वेनिला सुगंध से भरपूर रोमांटिक केक।',
      en: 'Velvety crimson layers balanced with authentic smooth cream cheese frosting.'
    },
    category: 'cakes',
    basePrice: 649,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 198,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 35,
    calories: '320 kcal/slice',
    availableWeights: [0.5, 1.0, 1.5, 2.0, 3.0],
    availableFlavors: ['क्लासिक क्रीम चीज़', 'रेड वेलवेट चोको चिप', 'व्हाइट चॉकलेट वेलवेट'],
    isCustomizable: true
  },
  {
    id: 'cake-fresh-fruit',
    name: {
      hi: 'एक्सोटिक फ्रेश फ्रूट पैराडाइज केक',
      en: 'Exotic Fresh Fruit Paradise Cake'
    },
    description: {
      hi: 'कीवी, स्ट्रॉबेरी, ड्रैगन फ्रूट, अनार और ताज़े अनानास से भरपूर हल्का, कम मीठा व स्पंजी फ्रूट केक।',
      en: 'Light vanilla sponge layered with whipped cream and freshly carved exotic seasonal fruits.'
    },
    category: 'cakes',
    basePrice: 549,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 154,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 30,
    calories: '260 kcal/slice',
    availableWeights: [0.5, 1.0, 1.5, 2.0],
    availableFlavors: ['वैनिला फ्रूट कॉकटेल', 'मैंगो डिलाइट', 'स्ट्रॉबेरी ब्लिस'],
    isCustomizable: true
  },
  {
    id: 'cake-butterscotch-crunch',
    name: {
      hi: 'बटरस्कॉच कैरेमल क्रंच केक',
      en: 'Butterscotch Caramel Crunch Cake'
    },
    description: {
      hi: 'घर के बने क्रिस्पी बटरस्कॉच प्रैलीन, गोल्डन कैरेमल सॉस और स्मूथ बटर क्रीम का लाजवाब संगम।',
      en: 'Handcrafted crunchy praline nuggets drenched in golden caramel sauce and silky butter cream.'
    },
    category: 'cakes',
    basePrice: 499,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 220,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 30,
    availableWeights: [0.5, 1.0, 1.5, 2.0],
    availableFlavors: ['क्लासिक बटरस्कॉच', 'सॉल्टेड कैरेमल', 'हनी आलमंड क्रंच'],
    isCustomizable: true
  },
  {
    id: 'cake-black-forest',
    name: {
      hi: 'ऑथेंटिक ब्लैक फॉरेस्ट गेटो',
      en: 'Authentic Black Forest Gateau'
    },
    description: {
      hi: 'डार्क चॉकलेट फ्लेक्स, ताज़ी खट्टी-मीठी चेरी और वैनिला विप्ड क्रीम से तैयार क्लासिक जर्मन स्टाइल केक।',
      en: 'Traditional layers of chocolate sponge, tart cherry compote, fresh cream and chocolate shavings.'
    },
    category: 'cakes',
    basePrice: 520,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 275,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 30,
    availableWeights: [0.5, 1.0, 1.5, 2.0],
    availableFlavors: ['क्लासिक चेरी चॉकलेट', 'व्हाइट फॉरेस्ट चेरी'],
    isCustomizable: true
  },

  // PASTRIES
  {
    id: 'pastry-choco-lava',
    name: {
      hi: 'हॉट मेल्टेड चोको लावा कप',
      en: 'Hot Melted Choco Lava Cup'
    },
    description: {
      hi: 'गर्म बेक किया हुआ चॉकलेट केक जिसके अंदर से निकलता है पिघला हुआ गर्म बेल्जियन चॉकलेट लावा।',
      en: 'Warm baked miniature chocolate cake with a molten center of gooey chocolate.'
    },
    category: 'pastries',
    basePrice: 119,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 412,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    calories: '280 kcal',
    isCustomizable: false
  },
  {
    id: 'pastry-blueberry-cheesecake',
    name: {
      hi: 'ब्लूबेरी चीज़केक स्लाइस',
      en: 'New York Blueberry Cheesecake Slice'
    },
    description: {
      hi: 'क्रिस्पी ग्राहम क्रैकर क्रस्ट पर क्रीमी न्यू यॉर्क स्टाइल चीज़ और असली ब्लूबेरी कॉम्पोट की टॉपिंग।',
      en: 'Baked dense cream cheese on buttery biscuit crust topped with wild blueberry glaze.'
    },
    category: 'pastries',
    basePrice: 189,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 167,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    calories: '320 kcal',
    isCustomizable: false
  },
  {
    id: 'pastry-dutch-truffle',
    name: {
      hi: 'डच डार्क ट्रफल पेस्ट्री',
      en: 'Dutch Dark Truffle Pastry'
    },
    description: {
      hi: '70% डच कोकोआ से तैयार बेहद क्रीमी और रिच चॉकलेट पेस्ट्री स्लाइस।',
      en: 'Single serving of ultra creamy 70% dark cocoa truffle pastry.'
    },
    category: 'pastries',
    basePrice: 129,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 195,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },
  {
    id: 'pastry-pineapple-glaze',
    name: {
      hi: 'रिफ्रेशिंग पाइनएप्पल पेस्ट्री',
      en: 'Refreshing Pineapple Pastry'
    },
    description: {
      hi: 'ताज़े अनानास के टुकड़ों और मलाईदार वैनिला क्रीम से भरपूर लाइट और फ्रूटी पेस्ट्री।',
      en: 'Airy vanilla sponge soaked in pineapple nectar, layered with whipped cream and fruit chunks.'
    },
    category: 'pastries',
    basePrice: 89,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 130,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },

  // BREADS
  {
    id: 'bread-cheese-garlic',
    name: {
      hi: 'चीज़ी गार्लिक पुल-अप ब्रेड',
      en: 'Cheesy Garlic Pull-Apart Bread'
    },
    description: {
      hi: 'ऑरिगेनो, पार्सले, मक्खन और पिघली हुई मोज़ेरेला चीज़ से भरी हुई गर्मागर्म गार्लिक ब्रेड।',
      en: 'Oven-baked crusty artisan bread packed with roasted garlic butter, fresh parsley and stringy cheese.'
    },
    category: 'breads',
    basePrice: 199,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 310,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 20,
    isCustomizable: false
  },
  {
    id: 'bread-butter-croissant',
    name: {
      hi: 'फ्रेंच बटर क्रोइसैन (2 पीस)',
      en: 'French Butter Croissant (2 Pcs)'
    },
    description: {
      hi: '100% शुद्ध मक्खन से तैयार परतदार, खस्ता और कुरकुरा क्लासिक पेरिसियन क्रोइसैन।',
      en: 'Golden, flaky, 27-layered butter croissants baked fresh every morning.'
    },
    category: 'breads',
    basePrice: 159,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 182,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    isCustomizable: false
  },
  {
    id: 'bread-sourdough-loaf',
    name: {
      hi: 'आर्टिसन मल्टीग्रेन सॉरडो लोफ',
      en: 'Artisan Multigrain Sourdough Loaf'
    },
    description: {
      hi: '24 घंटे नैचुरल फर्मेंटेड, पचने में आसान, अलसी, तिल और सूरजमुखी के बीजों से युक्त हेल्दी ब्रेड।',
      en: 'Slow-fermented artisan sourdough packed with flaxseeds, chia, and sunflower kernels.'
    },
    category: 'breads',
    basePrice: 169,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 94,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },
  {
    id: 'bread-milk-buns',
    name: {
      hi: 'सॉफ्ट मिल्क ब्रेड बन (4 पीस)',
      en: 'Soft Milk Bread Buns (Pack of 4)'
    },
    description: {
      hi: 'रुई जैसे मुलायम, मीठे मक्खन युक्त ताजे बेक किए हुए मिल्क पाव/बन।',
      en: 'Cloud-soft brioche style sweet milk dinner rolls baked fresh daily.'
    },
    category: 'breads',
    basePrice: 65,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 112,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },

  // COOKIES
  {
    id: 'cookie-choco-chip',
    name: {
      hi: 'चंकी चोको चिप कुकीज़ (250g बॉक्स)',
      en: 'Chunky Choco-Chip Cookies (250g)'
    },
    description: {
      hi: 'भरपूर डार्क चॉकलेट चिप्स, कुरकुरे किनारे और सॉफ्ट सेंटर वाली क्लासिक कुकीज़।',
      en: 'Loaded with melted semi-sweet chocolate morsels with golden crisp edges.'
    },
    category: 'cookies',
    basePrice: 220,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 260,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },
  {
    id: 'cookie-royal-nankhatai',
    name: {
      hi: 'शाही बादाम पिस्ता नानखटाई (300g)',
      en: 'Royal Almond Pista Nankhatai (300g)'
    },
    description: {
      hi: 'देसी घी, इलायची और दरदरे पिस्ते-बादाम से बनी मुंह में घुल जाने वाली पारंपरिक नानखटाई।',
      en: 'Traditional Indian shortbread cookies baked with pure cow ghee, cardamom and roasted nuts.'
    },
    category: 'cookies',
    basePrice: 249,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 205,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: true,
    preparationTimeMin: 10,
    isCustomizable: false
  },
  {
    id: 'cookie-oats-cranberry',
    name: {
      hi: 'ओट्स व क्रैनबेरी हेल्दी कुकीज़ (200g)',
      en: 'Oats & Cranberry Healthy Cookies (200g)'
    },
    description: {
      hi: 'रोल्ड ओट्स, सूखी क्रैनबेरी और शहद से बनी फाइबर युक्त सेहतमंद कुकीज़।',
      en: 'Wholesome whole-grain rolled oats with tart dried cranberries and raw honey.'
    },
    category: 'cookies',
    basePrice: 210,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 88,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 10,
    isCustomizable: false
  },

  // SAVOURIES
  {
    id: 'savoury-paneer-puff',
    name: {
      hi: 'क्रिस्पी बेक्ड पनीर टिक्का पफ',
      en: 'Crispy Baked Paneer Tikka Puff'
    },
    description: {
      hi: 'मसालेदार पनीर टिक्का, शिमला मिर्च और प्याज से भरा हुआ गोल्डन परतदार गरमागरम पफ।',
      en: 'Flaky puff pastry stuffed with tandoori spiced paneer cubes and bell peppers.'
    },
    category: 'savouries',
    basePrice: 65,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 310,
    isVeg: true,
    isBestseller: true,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    isCustomizable: false
  },
  {
    id: 'savoury-cheese-corn-patty',
    name: {
      hi: 'चीज़ कॉर्न हर्ब पैटी',
      en: 'Cheesy Sweet Corn & Herb Patty'
    },
    description: {
      hi: 'स्वीट कॉर्न, ऑरिगेनो और भरपूर पिघली चीज़ से लबालब कुरकुरी बेक्ड पैटी।',
      en: 'Golden baked pastry with sweet American corn kernels in a creamy cheese bechamel sauce.'
    },
    category: 'savouries',
    basePrice: 60,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 145,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    isCustomizable: false
  },

  // CUPCAKES
  {
    id: 'cupcake-red-velvet',
    name: {
      hi: 'रेड वेलवेट विप्ड कपकेक (2 का पैक)',
      en: 'Red Velvet Whipped Cupcake (Pack of 2)'
    },
    description: {
      hi: 'मुलायम रेड वेलवेट स्पंज पर विप्ड क्रीम चीज़ का खूबसूरत रोज़ेट स्विरल।',
      en: 'Fluffy ruby red mini cakes with piped Madagascar vanilla cream cheese.'
    },
    category: 'cupcakes',
    basePrice: 149,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 160,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    isCustomizable: false
  },
  {
    id: 'cupcake-choco-fudge',
    name: {
      hi: 'डार्क चॉकलेट फज कपकेक (2 का पैक)',
      en: 'Dark Choco Fudge Cupcake (Pack of 2)'
    },
    description: {
      hi: 'सघन चॉकलेट स्पंज, डार्क चॉकलेट बटरक्रीम और चोको स्प्रिंकल्स।',
      en: 'Dense chocolate sponge crowned with rich cocoa buttercream and sparkles.'
    },
    category: 'cupcakes',
    basePrice: 139,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 118,
    isVeg: true,
    isBestseller: false,
    isFestiveSpecial: false,
    preparationTimeMin: 15,
    isCustomizable: false
  }
];

export const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'magic-candles',
    name: {
      hi: 'जादुई स्पार्कलिंग कैंडल्स (5 नग)',
      en: 'Sparkling Magic Candles (5 pcs)'
    },
    price: 49,
    icon: '✨'
  },
  {
    id: 'acrylic-topper',
    name: {
      hi: 'गोल्डन "Happy Birthday" एक्रेलिक टॉपर',
      en: 'Golden Acrylic "Happy Birthday" Topper'
    },
    price: 69,
    icon: '👑'
  },
  {
    id: 'greeting-card',
    name: {
      hi: 'हैंडरिटन विशेज ग्रीटिंग कार्ड',
      en: 'Personalized Handwritten Greeting Card'
    },
    price: 39,
    icon: '💌'
  },
  {
    id: 'party-popper',
    name: {
      hi: 'पार्टी सेलिब्रेशन किट (पॉपर + कैप्स)',
      en: 'Party Celebration Kit (Popper + Caps)'
    },
    price: 99,
    icon: '🎉'
  },
  {
    id: 'extra-choco-dip',
    name: {
      hi: 'एक्स्ट्रा बेल्जियन चॉकलेट सिरप डिप',
      en: 'Extra Warm Belgian Chocolate Drizzle (60ml)'
    },
    price: 50,
    icon: '🍫'
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'FESTIVE20',
    title: {
      hi: 'फेस्टिव 20% डिस्काउंट',
      en: 'Festive 20% Discount'
    },
    description: {
      hi: 'सभी ऑर्डर्स पर 20% की विशेष छूट (अधिकतम ₹200)',
      en: 'Get 20% off up to ₹200 on all bakery orders'
    },
    discountPercentage: 20,
    maxDiscount: 200,
    minOrderAmount: 399
  },
  {
    code: 'SWEET100',
    title: {
      hi: 'फ्लैट ₹100 की छूट',
      en: 'Flat ₹100 Off'
    },
    description: {
      hi: '₹499 या उससे अधिक के केक ऑर्डर पर फ्लैट ₹100 की बचत',
      en: 'Flat ₹100 off on cake orders above ₹499'
    },
    flatDiscount: 100,
    minOrderAmount: 499
  },
  {
    code: 'FIRSTBITE',
    title: {
      hi: 'पहला ऑर्डर 15% छूट',
      en: 'First Order 15% Off'
    },
    description: {
      hi: 'संदीप बेकरी पर आपके पहले ऑर्डर पर 15% की छूट',
      en: '15% discount on your first order with Sandeep Bakery'
    },
    discountPercentage: 15,
    maxDiscount: 150,
    minOrderAmount: 299
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: {
      hi: '🪔 फेस्टिव स्पेशल: रसमलाई केक पर 20% छूट!',
      en: '🪔 Festive Special: 20% Off on Rasmalai Cake!'
    },
    message: {
      hi: 'त्योहारी सीज़न में अपने परिवार के साथ मिठास बांटें। कूपन कोड "FESTIVE20" इस्तेमाल करें।',
      en: 'Celebrate festivals with our signature Rasmalai Fusion Cake. Use code FESTIVE20.'
    },
    date: '10 मिनट पहले',
    couponCode: 'FESTIVE20',
    type: 'festive',
    isRead: false
  },
  {
    id: 'notif-2',
    title: {
      hi: '🎂 केक कस्टमाइज़ेशन अब और आसान!',
      en: '🎂 Cake Customization Made Easy!'
    },
    message: {
      hi: 'अब आप अपना मनपसंद वज़न, फ्लेवर और केक पर लाइव नाम व संदेश लिख सकते हैं।',
      en: 'Choose custom weights, flavors, and preview custom names directly on your cake!'
    },
    date: '1 घंटा पहले',
    type: 'offer',
    isRead: false
  },
  {
    id: 'notif-3',
    title: {
      hi: '🥖 फ्रेश बेक्ड गार्लिक ब्रेड तैयार है',
      en: '🥖 Fresh Baked Garlic Bread Ready'
    },
    message: {
      hi: 'हमारी बेकरी ओवन से अभी-अभी निकली है ताज़ा चीज़ी गार्लिक पुल-अप ब्रेड। अभी ऑर्डर करें!',
      en: 'Piping hot artisan cheese garlic pull-apart loaves just out of our oven.'
    },
    date: '3 घंटे पहले',
    type: 'alert',
    isRead: true
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'अमित शर्मा',
    rating: 5,
    date: 'कल (Yesterday)',
    comment: 'मेरी बहन के जन्मदिन के लिए बेल्जियन चॉकलेट केक मंगाया था। केक पर लिखा नाम बहुत सुंदर था और टेस्ट बिल्कुल लाजवाब!',
    tags: ['बेहतरीन स्वाद 🍰', 'सटीक कस्टमाइज़ेशन ✍️', 'सुपर पैकेजिंग 🎁'],
    itemName: 'बेल्जियन चॉकलेट ट्रफल केक (1.0 kg)',
    verifiedBuyer: true
  },
  {
    id: 'rev-2',
    customerName: 'प्रिया वर्मा',
    rating: 5,
    date: '2 दिन पहले',
    comment: 'रसमलाई केक बहुत ही ताज़ा और सॉफ्ट था! 100% एगलेस होते हुए भी इतना स्पंजी। डिलीवरी बॉय समय से 10 मिनट पहले ही आ गया।',
    tags: ['100% शाकाहारी 🌱', 'समय पर डिलीवरी ⚡', 'ताज़ा और स्पंजी 🤤'],
    itemName: 'रॉयल रसमलाई फ्यूज़न केक',
    verifiedBuyer: true
  },
  {
    id: 'rev-3',
    customerName: 'राहुल खन्ना',
    rating: 5,
    date: '3 दिन पहले',
    comment: 'चीज़ी गार्लिक ब्रेड और चोको लावा कप शाम की चाय के लिए बेस्ट कॉम्बो है। लाइव ऑर्डर ट्रैकिंग से पता चल गया कि राइडर कब पहुंचेगा।',
    tags: ['लाइव ट्रैकिंग 🛵', 'गर्मागर्म डिलीवरी 🔥'],
    itemName: 'चीज़ी गार्लिक पुल-अप ब्रेड',
    verifiedBuyer: true
  },
  {
    id: 'rev-4',
    customerName: 'नेहा गुप्ता',
    rating: 5,
    date: '5 दिन पहले',
    comment: 'रेड वेलवेट केक की क्रीम चीज़ बहुत ऑथेंटिक थी, बिल्कुल ज़्यादा मीठी नहीं थी। बच्चों को बहुत पसंद आई!',
    tags: ['परफेक्ट मिठास ⚖️', 'शानदार क्वालिटी ⭐'],
    itemName: 'रेड वेलवेट क्रीम चीज़ केक',
    verifiedBuyer: true
  }
];
