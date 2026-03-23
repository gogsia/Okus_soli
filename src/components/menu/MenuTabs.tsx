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

// Sample menu data — in production this comes from Sanity CMS
const menuItems: MenuItem[] = [
  {
    id: '1', name: 'Sourdough Boule', category: 'breads',
    description: 'Wild-yeast levain, 24-hour cold ferment. Open crumb, blistered crust.',
    imageUrl: '/images/menu/sourdough.webp', imageAlt: 'Artisan sourdough boule',
    isBakersChoice: true, bakersNote: 'Best within 4 hours of bake. Toast it tomorrow.',
    allergens: ['gluten'],
  },
  {
    id: '2', name: 'Olive & Rosemary Focaccia', category: 'breads',
    description: 'High-hydration dough pressed with Kalamata olives and garden rosemary.',
    imageUrl: '/images/menu/focaccia.webp', imageAlt: 'Olive rosemary focaccia',
    allergens: ['gluten'],
  },
  {
    id: '3', name: 'Seeded Rye', category: 'breads',
    description: 'Dense, earthy rye with sunflower, flax, and pumpkin seeds.',
    imageUrl: '/images/menu/rye.webp', imageAlt: 'Seeded rye bread',
    allergens: ['gluten', 'seeds'],
  },
  {
    id: '4', name: 'Butter Croissant', category: 'pastries',
    description: 'Laminated by hand. 27 layers. Golden, shattering, utterly indecent.',
    imageUrl: '/images/menu/croissant.webp', imageAlt: 'Butter croissant cross-section',
    isBakersChoice: true, bakersNote: 'We start folding at 4am. Worth every layer.',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: '5', name: 'Almond Frangipane Tart', category: 'pastries',
    description: 'Shortcrust, almond cream, toasted flakes. Dusted with powdered sugar.',
    imageUrl: '/images/menu/frangipane.webp', imageAlt: 'Almond frangipane tart',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'], seasonal: true,
  },
  {
    id: '6', name: 'Pain au Chocolat', category: 'pastries',
    description: 'Same dough, different destiny. Two bars of dark 70% couverture.',
    imageUrl: '/images/menu/pain-chocolat.webp', imageAlt: 'Pain au chocolat',
    allergens: ['gluten', 'dairy', 'eggs', 'soy'],
  },
  {
    id: '7', name: 'Huila, Colombia', category: 'coffee',
    description: 'Chocolate, caramel, citrus. Washed process. Medium roast.',
    imageUrl: '/images/menu/colombia.webp', imageAlt: 'Colombian coffee beans',
  },
  {
    id: '8', name: 'Yirgacheffe, Ethiopia', category: 'coffee',
    description: 'Jasmine, blueberry, peach. Natural process. Light roast.',
    imageUrl: '/images/menu/ethiopia.webp', imageAlt: 'Ethiopian coffee beans',
    isBakersChoice: true, bakersNote: 'Our favorite. Drink it black.',
  },
  {
    id: '9', name: 'Antigua, Guatemala', category: 'coffee',
    description: 'Brown sugar, apple, cedar. Washed process. Medium-dark roast.',
    imageUrl: '/images/menu/guatemala.webp', imageAlt: 'Guatemalan coffee beans',
  },
  {
    id: '10', name: 'Avocado Toast', category: 'bites',
    description: 'Sourdough base, smashed avocado, poached egg, chili flakes, olive oil.',
    imageUrl: '/images/menu/avocado-toast.webp', imageAlt: 'Avocado toast on sourdough',
    allergens: ['gluten', 'eggs'],
  },
  {
    id: '11', name: 'Cheese & Herb Scone', category: 'bites',
    description: 'Gruyere, chives, black pepper. Warm from the oven.',
    imageUrl: '/images/menu/scone.webp', imageAlt: 'Cheese and herb scone',
    allergens: ['gluten', 'dairy', 'eggs'], seasonal: true,
  },
  {
    id: '12', name: 'Granola Bowl', category: 'bites',
    description: 'House-made oat granola, Greek yogurt, seasonal fruit, honey drizzle.',
    imageUrl: '/images/menu/granola.webp', imageAlt: 'Granola bowl with fruit',
    allergens: ['dairy', 'nuts', 'oats'],
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
