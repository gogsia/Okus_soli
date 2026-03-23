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
    id: '1', name: 'Kruh od Kiselog Tijesta', category: 'breads',
    description: 'Iz 5-godišnjeg startera Chef Kreše. Otvorena sredina, hrskava korica, svježe pečen svako jutro.',
    imageUrl: '/images/9.jpg', imageAlt: 'Artisan sourdough bread',
    isBakersChoice: true, bakersNote: 'Srce Okusa Soli. Naš starter ima više od 5 godina.',
    allergens: ['gluten'],
  },
  {
    id: '2', name: 'Focaccia', category: 'breads',
    description: 'Focaccia od kiselog tijesta visoke hidratacije, zlatna i hrskava. Poslužena s aromatiziranim maslacem, kaparima, mladim maslinovim uljem i specijalnim solima.',
    imageUrl: '/images/7.jpg', imageAlt: 'Okus Soli focaccia',
    isBakersChoice: true, bakersNote: 'Naš zaštitni znak. Najbolja topla s focaccia pladnjem.',
    allergens: ['gluten', 'dairy'],
  },
  {
    id: '3', name: 'Dnevna Peciva', category: 'breads',
    description: 'Rotirajuća ponuda svježih peciva i buhtli sa šljivama, pečenih svako jutro od naše baze kiselog tijesta.',
    imageUrl: '/images/9.jpg', imageAlt: 'Fresh pastries',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  // ── Breakfast & Brunch ──
  {
    id: '4', name: 'Granola s Jogurtom i Voćem', category: 'breakfast',
    description: 'Domaća granola, kremasti jogurt i sezonsko voće. Lagan i svjež početak dana.',
    imageUrl: '/images/3.jpg', imageAlt: 'Granola bowl with yogurt and fruit',
    allergens: ['dairy', 'nuts', 'oats'],
  },
  {
    id: '5', name: 'Kremasta Kajgana na Briochu', category: 'breakfast',
    description: 'Svilenkasta kajgana poslužena na tostu od briocha. Jednostavno, savršeno.',
    imageUrl: '/images/1.jpg', imageAlt: 'Scrambled eggs on brioche',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    id: '6', name: 'Poširana Jaja na Briochu', category: 'breakfast',
    description: 'Poširana jaja na briochu sa svježom salatom i domaćim pesto od bosiljka.',
    imageUrl: '/images/8.jpg', imageAlt: 'Poached eggs with pesto',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
  },
  {
    id: '7', name: 'Mortadella Sendvič', category: 'breakfast',
    description: 'Premium mortadella s pistacija majonezom na svježem kruhu. Bogato i raskošno.',
    imageUrl: '/images/5.jpg', imageAlt: 'Mortadella sandwich with pistachio mayo',
    isBakersChoice: true, bakersNote: 'Pistacija majoneza se priprema svaki dan u kući.',
    allergens: ['gluten', 'eggs', 'nuts'],
  },
  {
    id: '8', name: 'Vegetarijanski Doručak', category: 'breakfast',
    description: 'Kruh od kiselog tijesta s humusom od cikle, avokadom, fetom, rukolom i tostiranm sjemenkama.',
    imageUrl: '/images/8.jpg', imageAlt: 'Vegetarian breakfast plate',
    allergens: ['gluten', 'dairy', 'seeds'],
  },
  // ── Coffee & Drinks ──
  {
    id: '9', name: 'Specialty Kava', category: 'coffee',
    description: 'Pažljivo odabrana zrna jednog podrijetla, pripremljena s pažnjom. Espresso, cappuccino ili filter.',
    imageUrl: '/images/4.jpg', imageAlt: 'Specialty coffee',
  },
  {
    id: '10', name: 'Svježe Cijeđeni Sokovi', category: 'coffee',
    description: 'Sezonski svježi sokovi, cijeđeni po narudžbi svako jutro.',
    imageUrl: '/images/3.jpg', imageAlt: 'Fresh pressed juices',
  },
  {
    id: '11', name: 'Lokalna Vina', category: 'coffee',
    description: 'Odabrana kolekcija hrvatskih vina iz dalmatinske regije.',
    imageUrl: '/images/4.jpg', imageAlt: 'Local Croatian wines',
  },
  // ── Appetizers ──
  {
    id: '12', name: 'Focaccia Pladanj', category: 'appetizers',
    description: 'Topla focaccia poslužena s aromatiziranim maslacem, kaparima, mladim maslinovim uljem i specijalnim solima.',
    imageUrl: '/images/5.jpg', imageAlt: 'Focaccia platter',
    isBakersChoice: true, bakersNote: 'Savršeno za dijeljenje. Naše maslinovo ulje je lokalno nabavljeno.',
    allergens: ['gluten', 'dairy'],
  },
  {
    id: '13', name: 'Dnevna Juha', category: 'appetizers',
    description: 'Chefova dnevna juha, poslužena s tostiranm domaćim kruhom od kiselog tijesta.',
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
      <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap" role="tablist" aria-label="Kategorije jelovnika">
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
