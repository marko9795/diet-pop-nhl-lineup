import React, { useState, useEffect } from 'react';

// Inline types to avoid import issues
type Position =
  | 'LW1' | 'C1' | 'RW1'
  | 'LW2' | 'C2' | 'RW2'
  | 'LW3' | 'C3' | 'RW3'
  | 'LW4' | 'C4' | 'RW4'
  | 'LD1' | 'RD1'
  | 'LD2' | 'RD2'
  | 'LD3' | 'RD3';

interface Pop {
  id: string;
  name: string;
  brand: string;
  primaryColor: string;
  secondaryColor: string;
  isCustom: boolean;
}

interface Lineup {
  id: string;
  name: string;
  positions: Record<Position, string | null>;
  createdAt: Date;
  updatedAt: Date;
}

// Expanded pop library with hierarchical brand organization
const SAMPLE_POPS: Pop[] = [
  // === COCA-COLA FAMILY ===
  // Core Coca-Cola Products
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    brand: 'Coca-Cola',
    primaryColor: '#C0C0C0',
    secondaryColor: '#FF0000',
    isCustom: false
  },
  {
    id: 'coke-zero',
    name: 'Coke Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#000000',
    secondaryColor: '#FF0000',
    isCustom: false
  },
  {
    id: 'coke-zero-cherry-vanilla',
    name: 'Coke Zero Sugar Cherry Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#8B0000',
    secondaryColor: '#F5DEB3',
    isCustom: false
  },
  {
    id: 'coke-zero-orange-vanilla',
    name: 'Coke Zero Sugar Orange Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#FF8C00',
    secondaryColor: '#F5DEB3',
    isCustom: false
  },
  {
    id: 'tab',
    name: 'Tab Cola',
    brand: 'Coca-Cola',
    primaryColor: '#FF1493',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },

  // Diet Coke Variants
  {
    id: 'diet-coke-cherry',
    name: 'Diet Coke Cherry',
    brand: 'Coca-Cola',
    primaryColor: '#8B0000',
    secondaryColor: '#C0C0C0',
    isCustom: false
  },
  {
    id: 'diet-coke-vanilla',
    name: 'Diet Coke Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#F5DEB3',
    secondaryColor: '#C0C0C0',
    isCustom: false
  },
  {
    id: 'diet-coke-lime',
    name: 'Diet Coke Lime',
    brand: 'Coca-Cola',
    primaryColor: '#32CD32',
    secondaryColor: '#C0C0C0',
    isCustom: false
  },
  {
    id: 'diet-coke-orange-vanilla',
    name: 'Diet Coke Orange Vanilla',
    brand: 'Coca-Cola',
    primaryColor: '#FF8C00',
    secondaryColor: '#F5DEB3',
    isCustom: false
  },
  {
    id: 'diet-coke-twisted-mango',
    name: 'Diet Coke Twisted Mango',
    brand: 'Coca-Cola',
    primaryColor: '#FF8C00',
    secondaryColor: '#FFE4B5',
    isCustom: false
  },
  {
    id: 'diet-coke-caffeine-free',
    name: 'Caffeine-Free Diet Coke',
    brand: 'Coca-Cola',
    primaryColor: '#C0C0C0',
    secondaryColor: '#FF0000',
    isCustom: false
  },

  // Diet Coke 2024 Limited Edition Comeback
  {
    id: 'diet-cherry-coke-retro',
    name: 'Diet Cherry Coke (Retro Edition)',
    brand: 'Coca-Cola',
    primaryColor: '#DC143C',
    secondaryColor: '#C0C0C0',
    isCustom: false
  },

  // Coca-Cola Specialty
  {
    id: 'coke-energy-zero',
    name: 'Coke Energy Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#FF0000',
    secondaryColor: '#000000',
    isCustom: false
  },
  {
    id: 'sprite-zero',
    name: 'Sprite Zero Sugar',
    brand: 'Coca-Cola',
    primaryColor: '#00AF3F',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },
  {
    id: 'fresca',
    name: 'Fresca',
    brand: 'Coca-Cola',
    primaryColor: '#FF69B4',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },
  {
    id: 'diet-barqs',
    name: "Diet Barq's Root Beer",
    brand: 'Coca-Cola',
    primaryColor: '#654321',
    secondaryColor: '#8B4513',
    isCustom: false
  },

  // === PEPSICO FAMILY ===
  // Core Pepsi Products
  {
    id: 'diet-pepsi',
    name: 'Diet Pepsi',
    brand: 'PepsiCo',
    primaryColor: '#004B93',
    secondaryColor: '#B8C5D6',
    isCustom: false
  },
  {
    id: 'pepsi-zero',
    name: 'Pepsi Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#000000',
    secondaryColor: '#004B93',
    isCustom: false
  },

  // Diet Pepsi Variants
  {
    id: 'diet-pepsi-wild-cherry',
    name: 'Diet Pepsi Wild Cherry',
    brand: 'PepsiCo',
    primaryColor: '#DC143C',
    secondaryColor: '#004B93',
    isCustom: false
  },
  {
    id: 'diet-pepsi-caffeine-free',
    name: 'Caffeine-Free Diet Pepsi',
    brand: 'PepsiCo',
    primaryColor: '#004B93',
    secondaryColor: '#B8C5D6',
    isCustom: false
  },
  {
    id: 'diet-pepsi-lime',
    name: 'Diet Pepsi Lime',
    brand: 'PepsiCo',
    primaryColor: '#32CD32',
    secondaryColor: '#004B93',
    isCustom: false
  },

  // Pepsi 2024-2025 New Releases
  {
    id: 'pepsi-zero-wild-cherry-cream',
    name: 'Pepsi Zero Sugar Wild Cherry & Cream',
    brand: 'PepsiCo',
    primaryColor: '#8B0000',
    secondaryColor: '#F5DEB3',
    isCustom: false
  },
  {
    id: 'pepsi-zero-cherries-cream',
    name: 'Pepsi Zero Sugar Cherries and Cream',
    brand: 'PepsiCo',
    primaryColor: '#DC143C',
    secondaryColor: '#FFFACD',
    isCustom: false
  },

  // Mountain Dew Family
  {
    id: 'diet-mountain-dew',
    name: 'Diet Mountain Dew',
    brand: 'PepsiCo',
    primaryColor: '#ADFF2F',
    secondaryColor: '#228B22',
    isCustom: false
  },
  {
    id: 'mtn-dew-zero',
    name: 'Mtn Dew Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#000000',
    secondaryColor: '#ADFF2F',
    isCustom: false
  },

  // Mountain Dew 2024-2025 New Releases
  {
    id: 'mtn-dew-zero-summer-freeze',
    name: 'Mtn Dew Zero Sugar Summer Freeze',
    brand: 'PepsiCo',
    primaryColor: '#FF0000',
    secondaryColor: '#4169E1',
    isCustom: false
  },
  {
    id: 'mtn-dew-zero-cherry-lemon-trolli',
    name: 'Mtn Dew Zero Sugar Cherry Lemon Trolli',
    brand: 'PepsiCo',
    primaryColor: '#DC143C',
    secondaryColor: '#FFFF00',
    isCustom: false
  },
  {
    id: 'mtn-dew-baja-blast-cabo-citrus-zero',
    name: 'Mtn Dew Baja Blast Cabo Citrus Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#40E0D0',
    secondaryColor: '#FF8C00',
    isCustom: false
  },

  // PepsiCo Citrus
  {
    id: 'sierra-mist-zero',
    name: 'Sierra Mist Zero Sugar',
    brand: 'PepsiCo',
    primaryColor: '#FFFF00',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },

  // === DR PEPPER FAMILY ===
  // Core Dr Pepper Products
  {
    id: 'diet-dr-pepper',
    name: 'Diet Dr Pepper',
    brand: 'Dr Pepper',
    primaryColor: '#722F37',
    secondaryColor: '#B8860B',
    isCustom: false
  },
  {
    id: 'dr-pepper-zero',
    name: 'Dr Pepper Zero Sugar',
    brand: 'Dr Pepper',
    primaryColor: '#000000',
    secondaryColor: '#722F37',
    isCustom: false
  },

  // Dr Pepper Variants
  {
    id: 'diet-dr-pepper-cherry',
    name: 'Diet Dr Pepper Cherry',
    brand: 'Dr Pepper',
    primaryColor: '#8B0000',
    secondaryColor: '#722F37',
    isCustom: false
  },
  {
    id: 'diet-dr-pepper-cream-soda',
    name: 'Diet Dr Pepper Cream Soda',
    brand: 'Dr Pepper',
    primaryColor: '#F5DEB3',
    secondaryColor: '#722F37',
    isCustom: false
  },
  {
    id: 'diet-dr-pepper-caffeine-free',
    name: 'Caffeine-Free Diet Dr Pepper',
    brand: 'Dr Pepper',
    primaryColor: '#722F37',
    secondaryColor: '#B8860B',
    isCustom: false
  },

  // Dr Pepper 2024 New Release
  {
    id: 'dr-pepper-zero-creamy-coconut',
    name: 'Dr Pepper Zero Sugar Creamy Coconut',
    brand: 'Dr Pepper',
    primaryColor: '#FFFAF0',
    secondaryColor: '#722F37',
    isCustom: false
  },

  // === CITRUS FAMILY ===
  {
    id: 'diet-7up',
    name: 'Diet 7UP',
    brand: '7UP',
    primaryColor: '#32CD32',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },

  // 7UP 2024 Limited Edition Return
  {
    id: '7up-shirley-temple-zero',
    name: '7UP Shirley Temple Zero Sugar',
    brand: '7UP',
    primaryColor: '#FF69B4',
    secondaryColor: '#32CD32',
    isCustom: false
  },

  // === ORANGE SODA FAMILY ===
  {
    id: 'diet-orange-crush',
    name: 'Diet Orange Crush',
    brand: 'Crush',
    primaryColor: '#FF8C00',
    secondaryColor: '#FFE4B5',
    isCustom: false
  },
  {
    id: 'diet-sunkist',
    name: 'Diet Sunkist Orange',
    brand: 'Sunkist',
    primaryColor: '#FFA500',
    secondaryColor: '#FFFF00',
    isCustom: false
  },
  {
    id: 'diet-fanta-orange',
    name: 'Fanta Zero Orange',
    brand: 'Coca-Cola',
    primaryColor: '#FF6600',
    secondaryColor: '#FFE4B5',
    isCustom: false
  },

  // === ROOT BEER FAMILY ===
  {
    id: 'diet-a-w',
    name: 'Diet A&W Root Beer',
    brand: 'A&W',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    isCustom: false
  },
  {
    id: 'diet-mug',
    name: 'Diet Mug Root Beer',
    brand: 'PepsiCo',
    primaryColor: '#654321',
    secondaryColor: '#D2691E',
    isCustom: false
  },

  // A&W 2024 Limited Edition
  {
    id: 'a-w-zero-ice-cream-sundae',
    name: 'A&W Zero Sugar Ice Cream Sundae',
    brand: 'A&W',
    primaryColor: '#FFFACD',
    secondaryColor: '#8B4513',
    isCustom: false
  },

  // === SPECIALTY SODAS ===
  // Canada Dry Family (Updated 2024 branding)
  {
    id: 'canada-dry-zero-ginger-ale',
    name: 'Canada Dry Zero Sugar Ginger Ale',
    brand: 'Canada Dry',
    primaryColor: '#DAA520',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },
  {
    id: 'canada-dry-zero-fruit-splash',
    name: 'Canada Dry Zero Sugar Fruit Splash',
    brand: 'Canada Dry',
    primaryColor: '#DC143C',
    secondaryColor: '#DAA520',
    isCustom: false
  },
  {
    id: 'diet-schweppes-ginger-ale',
    name: 'Schweppes Diet Ginger Ale',
    brand: 'Schweppes',
    primaryColor: '#FFD700',
    secondaryColor: '#FFFFFF',
    isCustom: false
  },
  {
    id: 'diet-schweppes-tonic',
    name: 'Schweppes Diet Tonic Water',
    brand: 'Schweppes',
    primaryColor: '#E6E6FA',
    secondaryColor: '#4169E1',
    isCustom: false
  }
];

// Simple lineup utility
const createEmptyLineup = (): Lineup => ({
  id: crypto.randomUUID(),
  name: 'My Lineup',
  positions: {
    'LW1': null, 'C1': null, 'RW1': null,
    'LW2': null, 'C2': null, 'RW2': null,
    'LW3': null, 'C3': null, 'RW3': null,
    'LW4': null, 'C4': null, 'RW4': null,
    'LD1': null, 'RD1': null,
    'LD2': null, 'RD2': null,
    'LD3': null, 'RD3': null
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

function App() {
  console.log('🥤 Starting self-contained Diet Pop NHL Lineup App');

  const [currentLineup, setCurrentLineup] = useState<Lineup>(() => createEmptyLineup());
  const [selectedPop, setSelectedPop] = useState<Pop | null>(null);

  const assignPop = (popId: string, position: Position) => {
    setCurrentLineup(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [position]: popId
      },
      updatedAt: new Date()
    }));
    setSelectedPop(null);
  };

  const removePop = (position: Position) => {
    setCurrentLineup(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [position]: null
      },
      updatedAt: new Date()
    }));
  };

  const clearLineup = () => {
    setCurrentLineup(createEmptyLineup());
  };

  const getPopById = (id: string) => SAMPLE_POPS.find(pop => pop.id === id);

  // Simple position renderer
  const renderPosition = (position: Position, label: string) => {
    const popId = currentLineup.positions[position];
    const pop = popId ? getPopById(popId) : null;

    return (
      <div
        key={position}
        className="lineup-position"
        style={{
          border: '2px dashed #6b7280',
          borderRadius: '8px',
          padding: '12px',
          minHeight: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: pop ? '#1e40af' : '#374151',
          borderColor: pop ? '#3b82f6' : '#6b7280'
        }}
        onClick={() => {
          if (pop) {
            removePop(position);
          } else if (selectedPop) {
            assignPop(selectedPop.id, position);
          }
        }}
      >
        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
          {label}
        </div>
        {pop ? (
          <div style={{
            backgroundColor: pop.primaryColor,
            color: pop.primaryColor === '#000000' ? 'white' : 'black',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {pop.name}
          </div>
        ) : (
          <div style={{ color: '#6b7280', fontSize: '12px' }}>Empty</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: 'white', padding: '20px' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1f2937', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          🥤 Diet Pop NHL Lineup
        </h1>
        <p style={{ color: '#9ca3af', margin: '0 0 16px 0' }}>
          Organize your favorite diet sodas into hockey formations
        </p>
        <button
          onClick={clearLineup}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Clear Lineup
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Pop Library */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Pop Library</h2>
          <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
            Selected: {selectedPop ? selectedPop.name : 'None'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
            {SAMPLE_POPS.map(pop => (
              <div
                key={pop.id}
                onClick={() => setSelectedPop(selectedPop?.id === pop.id ? null : pop)}
                style={{
                  backgroundColor: pop.primaryColor,
                  color: pop.primaryColor === '#000000' ? 'white' : 'black',
                  padding: '16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: selectedPop?.id === pop.id ? '3px solid #fbbf24' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                  {pop.name}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {pop.brand}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lineup Card */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>NHL Lineup</h2>
          <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px' }}>

            {/* Forward Lines */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#fbbf24' }}>Forwards</h3>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Line 1</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {renderPosition('LW1', 'LW')}
                  {renderPosition('C1', 'C')}
                  {renderPosition('RW1', 'RW')}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Line 2</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {renderPosition('LW2', 'LW')}
                  {renderPosition('C2', 'C')}
                  {renderPosition('RW2', 'RW')}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Line 3</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {renderPosition('LW3', 'LW')}
                  {renderPosition('C3', 'C')}
                  {renderPosition('RW3', 'RW')}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Line 4</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {renderPosition('LW4', 'LW')}
                  {renderPosition('C4', 'C')}
                  {renderPosition('RW4', 'RW')}
                </div>
              </div>
            </div>

            {/* Defense Pairs */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#10b981' }}>Defense</h3>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Pair 1</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {renderPosition('LD1', 'LD')}
                  {renderPosition('RD1', 'RD')}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Pair 2</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {renderPosition('LD2', 'LD')}
                  {renderPosition('RD2', 'RD')}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Pair 3</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {renderPosition('LD3', 'LD')}
                  {renderPosition('RD3', 'RD')}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        color: '#9ca3af'
      }}>
        <p><strong>How to use:</strong></p>
        <p>1. Click a pop in the library to select it (highlighted in yellow)</p>
        <p>2. Click an empty position to assign the selected pop</p>
        <p>3. Click a filled position to remove the pop</p>
        <p>4. Use "Clear Lineup" to start over</p>
      </div>
    </div>
  );
}

export default App;