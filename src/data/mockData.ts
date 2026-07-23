import { Product, Review, BlogPost, MemorialStory, CandleTribute } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-cutout-pillow',
    name: 'Custom Pet Cutout Pillow',
    category: 'pillow',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.95,
    reviewCount: 3840,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    badge: '★ Best Seller',
    description: 'Transform your favorite pet photo into an exact 3D plush pillow contoured around their body, ears, and posture.',
    features: [
      'Exact contour shape of your pet photo',
      'Ultra-soft hug-proof plush velvet fabric',
      'Hypoallergenic cotton filing',
      'Dual-sided high-definition eco sublimation printing',
      'Free AI background removal & professional designer contour check'
    ]
  },
  {
    id: 'prod-memorial-pillow',
    name: 'Forever In Our Hearts Memorial Pillow',
    category: 'memorial',
    price: 44.99,
    originalPrice: 64.99,
    rating: 4.99,
    reviewCount: 1290,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    badge: '❤️ Memorial Special',
    description: 'A comforting, gentle companion to hold close when remembering your pet who crossed the Rainbow Bridge. Optional angel wings or halo detail.',
    features: [
      'Includes custom memorial date & pet name inscription',
      'Optional subtle angel halo or rainbow bridge background',
      'Comes wrapped in velvet memory pouch with a sympathy card',
      'Handmade with love in Durgapur, West Bengal'
    ],
    isMemorial: true
  },
  {
    id: 'prod-custom-mug',
    name: 'Custom Pet Ceramic Mug (15 oz)',
    category: 'mug',
    price: 19.99,
    originalPrice: 28.99,
    rating: 4.91,
    reviewCount: 820,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular Gift',
    description: 'Start every morning with your pet\'s adorable face staring right back at you in vibrant 360° high gloss ceramic.',
    features: [
      'Dishwasher & microwave safe ceramic',
      'Includes custom pet portrait & name font',
      'High gloss fade-resistant glaze'
    ]
  },
  {
    id: 'prod-custom-blanket',
    name: 'Cozy Sherpa Pet Blanket',
    category: 'blanket',
    price: 49.99,
    originalPrice: 74.99,
    rating: 4.97,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=800&q=80',
    badge: 'Ultra Soft',
    description: 'Snuggle up in warmth with a full-print fleece & sherpa blanket featuring your favorite pet pictures.',
    features: [
      'Ultra plush fleece front with warm fleece sherpa backing',
      'Available in 50"x60" and 60"x80" sizes',
      'Machine washable, non-fading vivid dyes'
    ]
  },
  {
    id: 'prod-memorial-blanket',
    name: 'Rainbow Bridge Memorial Sherpa Blanket',
    category: 'memorial',
    price: 54.99,
    originalPrice: 79.99,
    rating: 5.0,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    badge: '❤️ Memory Blanket',
    description: 'Wrap yourself in the warm memory of your beloved pet. Inscribed with "Love Never Leaves".',
    features: [
      'Soft pastel rainbow bridge design accents',
      'Custom memorial poem or personal quote printed',
      'Super cozy dual-layer premium sherpa fleece'
    ],
    isMemorial: true
  },
  {
    id: 'prod-custom-tshirt',
    name: 'Personalized Pet Portrait T-Shirt',
    category: 'apparel',
    price: 26.99,
    originalPrice: 38.99,
    rating: 4.88,
    reviewCount: 940,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    badge: '100% Cotton',
    description: 'Wear your pet on your heart with an embroidered-feel custom printed minimalist pet portrait.',
    features: [
      '100% combed ring-spun organic cotton',
      'Breathable, pre-shrunk fabric',
      'Chest-pocket or center logo placement options'
    ]
  },
  {
    id: 'prod-custom-hoodie',
    name: 'Heavyweight Pet Portrait Hoodie',
    category: 'apparel',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.93,
    reviewCount: 510,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    badge: 'Winter Favorite',
    description: 'Ultra cozy fleece-lined hoodie custom printed with your pet photo cutout and name on sleeve.',
    features: [
      '350 GSM cotton-poly premium fleece',
      'Custom sleeve text option (e.g., "Milo\'s Mom")',
      'Kangaroo pocket & double-lined hood'
    ]
  },
  {
    id: 'prod-tote-bag',
    name: 'Custom Pet Canvas Tote Bag',
    category: 'accessories',
    price: 18.99,
    originalPrice: 26.99,
    rating: 4.85,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'Eco Friendly',
    description: 'Durable heavy-duty organic canvas tote bag featuring a high-res cutout portrait of your pet.',
    features: [
      '100% heavy organic cotton canvas',
      'Reinforced shoulder handles',
      'Spacious interior pocket'
    ]
  },
  {
    id: 'prod-keychain',
    name: 'Acrylic Cutout Pet Keychain',
    category: 'accessories',
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.92,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    badge: 'Perfect Stocking Stuffer',
    description: 'Take your pet wherever you go! Clear crystal acrylic keychain precision laser-cut around your pet\'s shape.',
    features: [
      'Scratch-resistant double-sided acrylic',
      'Stainless steel keyring & swivel clip',
      'Lightweight and durable'
    ]
  },
  {
    id: 'prod-memorial-frame',
    name: 'Forever Loved Wooden Memory Frame',
    category: 'memorial',
    price: 34.99,
    originalPrice: 48.99,
    rating: 4.98,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    badge: '❤️ Handcrafted Wood',
    description: 'Solid teak wood photo frame engraved with "In Loving Memory" and custom name with paw prints.',
    features: [
      'Engraved solid teak wood',
      'Includes collar hold hook or dried flower keepsake slot',
      'Glass front pane with tabletop stand & wall hook'
    ],
    isMemorial: true
  }
];

export const MEMORIAL_STORIES: MemorialStory[] = [
  {
    id: 'mem-1',
    petName: 'Barnaby',
    petSpecies: 'Golden Retriever',
    years: '2012 - 2025',
    story: 'Barnaby was our family\'s shadow for 13 wonderful years. When he passed, the house felt so empty. Getting the 24-inch custom cutout pillow felt like Barnaby came back home to sit on his favorite spot on the couch. Whenever we miss him, we hug the pillow and feel his warmth.',
    ownerName: 'Sarah & David M.',
    location: 'Kolkata, India',
    productImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2 weeks ago'
  },
  {
    id: 'mem-2',
    petName: 'Cleo',
    petSpecies: 'Tabby Cat',
    years: '2010 - 2026',
    story: 'Cleo used to sleep right next to my head every single night. The Forever in Our Hearts memorial pillow with her little ear fluff captured perfectly was the best gift my sister gave me. It brought happy tears to my eyes.',
    ownerName: 'Ananya R.',
    location: 'Durgapur, India',
    productImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    dateAdded: '1 month ago'
  },
  {
    id: 'mem-3',
    petName: 'Ollie',
    petSpecies: 'Holland Lop Rabbit',
    years: '2017 - 2026',
    story: 'Exotic pets often don\'t get enough personalized items, but Pawsitive Pillow captured Ollie\'s floppy ears and cute nose line by line. The quality is so soft and comforting.',
    ownerName: 'Michael S.',
    location: 'Mumbai, India',
    productImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
    dateAdded: '3 weeks ago'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Siddharth Mukherjee',
    petName: 'Bruno',
    species: 'dog',
    rating: 5,
    date: 'July 18, 2026',
    verified: true,
    title: 'Unbelievable detail! Looks EXACTLY like Bruno!',
    comment: 'I sent a picture of Bruno sleeping in his funny side position. The cutout pillow was shaped so accurately around his floppy ears and paws! The velvet fabric feels so soft and premium. Fast delivery from Durgapur too!',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-2',
    author: 'Rina Ghosh',
    petName: 'Mimi',
    species: 'cat',
    rating: 5,
    date: 'July 14, 2026',
    verified: true,
    title: 'Brought tears of joy to our family',
    comment: 'Mimi passed away last month and my mom was grieving deeply. When the Forever in Our Hearts memorial pillow arrived, my mom held it and cried happy tears. The craftsmanship is pure love.',
    isMemorial: true,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-3',
    author: 'Rohan Sharma',
    petName: 'Coco & Pepper',
    species: 'dog',
    rating: 5,
    date: 'July 10, 2026',
    verified: true,
    title: 'Ordered 2 pillows as anniversary gifts',
    comment: 'My wife was totally surprised! The background removal was flawless even though my original photo had a dark living room background. 10/10 recommendation!',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-4',
    author: 'Emily Watson',
    petName: 'Peanut',
    species: 'bird',
    rating: 5,
    date: 'July 05, 2026',
    verified: true,
    title: 'Surprised how well they did a parrot cutout!',
    comment: 'Feather colors are super vivid and sharp! I was worried about the thin bird tail shape, but they padded it securely. Love Pawsitive Pillow!',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Pets Become Family: The Science Behind the Bond',
    excerpt: 'Explore the psychological and chemical reasons why pets hold such a profound, irreplaceable place in our hearts.',
    category: 'Pet Relationships',
    author: 'Dr. Alok Verma, Pet Behaviorist',
    date: 'July 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    content: `Pets aren't just animals in our homes—they are family members, confidants, and constant sources of unconditional affection. Science shows that interacting with pets releases oxytocin, the bonding hormone that reduces stress and elevates feelings of security and warmth.

When we create custom items like pet pillows, mugs, or memorial keepsakes, we aren't just buying merchandise; we are honoring a deep emotional relationship that brightens our everyday lives.`
  },
  {
    id: 'blog-2',
    title: 'Choosing the Perfect Pet Photo for a High-Detail Cutout Pillow',
    excerpt: 'Follow these 4 simple photography tips to ensure your pet cutout pillow comes out crisp, vivid, and life-like.',
    category: 'Customization Tips',
    author: 'Pawsitive Design Team',
    date: 'July 10, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    content: `Getting an exact 3D cutout pillow relies heavily on your photo quality! Here are our expert tips:
1. Bright Natural Light: Take photos near a sunny window or outdoors in daylight.
2. Eye Level Perspective: Crouch down to your pet's eye level rather than shooting from above.
3. Complete Posture Visible: Ensure no paws, ears, or tail are hidden behind furniture.
4. Sharp Focus: Tap your phone screen on your pet's eyes/fur before snapping the shot!`
  },
  {
    id: 'blog-3',
    title: 'Grieving & Honoring a Lost Pet: Meaningful Ways to Remember',
    excerpt: 'Navigating the loss of a pet can be overwhelming. Discover comforting rituals and gentle ways to hold their memory close.',
    category: 'Memorial & Healing',
    author: 'Grief Counselor S. Banerjee',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    content: `Losing a pet leaves a unique silence in the home. It is important to validate your grief—their love was real, and so is your sorrow.

Creating a dedicated memory corner with a plush memorial cutout pillow, a photo frame with their collar, or lighting a tribute candle helps transition intense sadness into lasting, grateful remembrance. "Love Never Leaves."`
  }
];

export const INITIAL_CANDLES: CandleTribute[] = [
  {
    id: 'cand-1',
    petName: 'Rusty',
    message: 'Forever running free in the endless golden fields. We love you buddy.',
    sender: 'The Sen Family',
    litAt: 'Just now'
  },
  {
    id: 'cand-2',
    petName: 'Simba',
    message: 'Thank you for 14 years of purrs and gentle headbutts. Sleep peacefully.',
    sender: 'Swarup & Nisha',
    litAt: '1 hour ago'
  },
  {
    id: 'cand-3',
    petName: 'Zoe',
    message: 'My sweetest rescue girl. You changed my whole life.',
    sender: 'Pooja K.',
    litAt: '3 hours ago'
  }
];
