'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuCard, MenuItem } from './MenuCard';

function playSfx(url: string) {
  try {
    const audio = new Audio(url);
    audio.volume = 0.25;
    audio.play().catch(() => {});
  } catch {
    // Silently fail if audio blocked
  }
}

import { MENU_CATEGORIES } from '@/lib/constants';

const categories = MENU_CATEGORIES;

// Real Okus Soli by Pa'kai menu items
const menuItems: MenuItem[] = [
  // ── Breads ──
  {
    id: '1', name: 'Sourdough Bread', category: 'breads',
    description: 'From Chef Krešo\u2019s 5-year sourdough starter. Open crumb, blistered crust, baked fresh every morning.',
    imageUrl: '/images/9.jpg', imageAlt: 'Artisan sourdough bread',
    isBakersChoice: true, bakersNote: 'The heart of Okus Soli. Our starter is over 5 years old.',
    allergens: ['gluten'],
  },
  {
    id: '2', name: 'Focaccia', category: 'breads',
    description: 'High-hydration sourdough focaccia, golden and crisp. Served with flavored butter, capers, young olive oil, and specialty salts.',
    imageUrl: '/images/7.jpg', imageAlt: 'Okus Soli focaccia',
    isBakersChoice: true, bakersNote: 'Our signature. Best enjoyed warm with the focaccia platter.',
    allergens: ['gluten', 'dairy'],
  },
  {
    id: '3', name: 'Daily Pastries', category: 'breads',
    description: 'Rotating selection of fresh pastries and plum buns, baked each morning from our sourdough base.',
    imageUrl: '/images/9.jpg', imageAlt: 'Fresh pastries',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  // ── Breakfast & Brunch ──
  {
    id: '4', name: 'Granola with Yogurt & Fruit', category: 'breakfast',
    description: 'House-made granola, creamy yogurt, and seasonal fruit. A light and fresh start to the day.',
    imageUrl: '/images/3.jpg', imageAlt: 'Granola bowl with yogurt and fruit',
    allergens: ['dairy', 'nuts', 'oats'],
  },
  {
    id: '5', name: 'Creamy Scrambled Eggs on Brioche', category: 'breakfast',
    description: 'Silky scrambled eggs served on toasted brioche bread. Simple, perfect.',
    imageUrl: '/images/1.jpg', imageAlt: 'Scrambled eggs on brioche',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: '6', name: 'Poached Eggs on Brioche', category: 'breakfast',
    description: 'Poached eggs on brioche with fresh salad and house-made basil pesto.',
    imageUrl: '/images/8.jpg', imageAlt: 'Poached eggs with pesto',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
  },
  {
    id: '7', name: 'Mortadella Sandwich', category: 'breakfast',
    description: 'Premium mortadella with pistachio mayonnaise on fresh bread. Rich and indulgent.',
    imageUrl: '/images/5.jpg', imageAlt: 'Mortadella sandwich with pistachio mayo',
    isBakersChoice: true, bakersNote: 'The pistachio mayo is made in-house daily.',
    allergens: ['gluten', 'eggs', 'nuts'],
  },
  {
    id: '8', name: 'Vegetarian Breakfast', category: 'breakfast',
    description: 'Sourdough bread with beet hummus, avocado, feta, arugula, and toasted seeds.',
    imageUrl: '/images/8.jpg', imageAlt: 'Vegetarian breakfast plate',
    allergens: ['gluten', 'dairy', 'seeds'],
  },
  // ── Coffee & Drinks ──
  {
    id: '9', name: 'Specialty Coffee', category: 'coffee',
    description: 'Carefully selected single-origin beans, brewed with attention. Espresso, cappuccino, or filter.',
    imageUrl: '/images/4.jpg', imageAlt: 'Specialty coffee',
  },
  {
    id: '10', name: 'Fresh-Pressed Juices', category: 'coffee',
    description: 'Seasonal fresh juices, pressed to order every morning.',
    imageUrl: '/images/3.jpg', imageAlt: 'Fresh pressed juices',
  },
  {
    id: '11', name: 'Local Wines', category: 'coffee',
    description: 'A curated selection of Croatian wines from the Dalmatian region.',
    imageUrl: '/images/4.jpg', imageAlt: 'Local Croatian wines',
  },
  // ── Appetizers ──
  {
    id: '12', name: 'Focaccia Platter', category: 'appetizers',
    description: 'Warm focaccia served with flavored butter, capers, young olive oil, and specialty salts.',
    imageUrl: '/images/5.jpg', imageAlt: 'Focaccia platter',
    isBakersChoice: true, bakersNote: 'Perfect for sharing. Our olive oil is locally sourced.',
    allergens: ['gluten', 'dairy'],
  },
  {
    id: '13', name: 'Daily Soup', category: 'appetizers',
    description: 'Chef\u2019s daily soup, served with toasted homemade sourdough bread.',
    imageUrl: '/images/9.jpg', imageAlt: 'Daily soup with bread',
    allergens: ['gluten'],
  },
];

export function MenuTabs() {
  const [activeTab, setActiveTab] = useState<string>('breads');

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap" role="tablist" aria-label="Menu categories">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => { playSfx(cat.sfx); setActiveTab(cat.id); }}
            className="relative px-6 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 font-sans"
            style={{
              fontWeight: activeTab === cat.id ? 500 : 300,
              color: activeTab === cat.id ? 'var(--color-depth)' : 'var(--text-secondary)',
              background: activeTab === cat.id ? 'var(--color-sun)' : 'transparent',
            }}
            role="tab"
            aria-selected={activeTab === cat.id}
            aria-controls={`panel-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-label={`${activeTab} menu items`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
