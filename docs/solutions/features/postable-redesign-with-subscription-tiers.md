---
title: Postable-Inspired Browse Tools with Subscription Tiers
module: Frontend + Backend
symptom: Original audit flow only showed single monthly_cost per tool, lacking granular tier-based pricing and browse/compare functionality for users to explore multiple tools before auditing
solution: Implemented full browse/detail views with subscription_tiers database table, 7 new React components, tier selector, cost calculator, and feature prioritization (core vs bloaty)
prevention: Design database schema with flexible pricing models (per_seat, flat, custom) from the start; implement browse before audit flow in user journeys
tags:
  - feature
  - ui-redesign
  - subscription-tiers
  - cost-calculator
  - browse-tools
  - postable-design
  - react-router
severity: medium
date_resolved: 2025-12-15
---

# Postable-Inspired Browse Tools with Subscription Tiers

## Problem

The original SaaSKiller audit flow had significant UX and data model limitations:

### 1. Single-Price Data Model
- Each tool had only one `monthly_cost` field in the database
- No support for multiple subscription tiers (Starter, Pro, Enterprise)
- No way to represent per-seat vs. flat-rate pricing
- Users couldn't explore different pricing options

### 2. No Browse/Compare Experience
- Users landed directly into audit flow (paste Google Sheet)
- No way to explore available tools before auditing
- No category filtering or search
- No visual comparison of tool features and pricing

### 3. Limited Feature Insight
- Features stored as simple JSON arrays
- No distinction between core features and bloatware
- No prioritization or "Show More" functionality
- Users couldn't see which features justified the cost

### 4. Missing Cost Calculation
- No real-time cost calculator based on team size
- No monthly vs. yearly billing comparison
- No per-user cost breakdown
- No 3-year TCO projection

### User Journey Gap

```
BEFORE:
[Homepage] → [Paste Google Sheet] → [See Audit Results]
           ❌ No exploration phase
           ❌ No tier selection
           ❌ No cost planning

AFTER:
[Homepage] → [Browse Tools] → [Tool Detail + Tier Selector] → [Cost Calculator] → [Add to Audit]
           ✅ Explore catalog
           ✅ Compare tiers
           ✅ Calculate costs
```

## Solution

### Phase 1: Database Schema for Subscription Tiers

**New Table:** `subscription_tiers`

```sql
CREATE TABLE subscription_tiers (
  id SERIAL PRIMARY KEY,
  tool_id INTEGER NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  price_monthly NUMERIC(10, 2),
  price_yearly NUMERIC(10, 2),
  price_per_user NUMERIC(10, 2),
  price_model VARCHAR(20) CHECK (price_model IN ('per_seat', 'flat', 'custom')),
  included_features TEXT[],
  max_users INTEGER,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscription_tiers_tool_id ON subscription_tiers(tool_id);
CREATE INDEX idx_subscription_tiers_published ON subscription_tiers(is_published);
```

**Key Design Decisions:**
- `tool_id` foreign key with CASCADE delete (tiers belong to tools)
- Flexible pricing: `price_monthly`, `price_yearly`, `price_per_user` (nullable)
- `price_model` enum: `per_seat` (Figma), `flat` (Notion), `custom` (enterprise quotes)
- `included_features` array for tier-specific features (optional)
- `max_users` cap for tier limits (e.g., Starter: max 10 users)
- `is_published` flag for draft tiers

**Migration Script:** `backend/migrations/add_subscription_tiers.sql`

### Phase 2: Backend API Endpoints

**New Endpoints:**

1. **GET /api/tools** - Browse tools with filters
   ```python
   @app.route('/api/tools', methods=['GET'])
   def get_tools():
       category = request.args.get('category')
       search = request.args.get('search')
       limit = int(request.args.get('limit', 10))
       offset = int(request.args.get('offset', 0))

       query = Tools.query.filter_by(is_published=True)
       if category:
           query = query.filter_by(category=category)
       if search:
           query = query.filter(Tools.name.ilike(f'%{search}%'))

       tools = query.limit(limit).offset(offset).all()
       return jsonify([tool.to_dict() for tool in tools])
   ```

2. **GET /api/tools/:id** - Tool detail with tiers
   ```python
   @app.route('/api/tools/<int:tool_id>', methods=['GET'])
   def get_tool(tool_id):
       tool = Tools.query.get_or_404(tool_id)
       tiers = SubscriptionTiers.query.filter_by(
           tool_id=tool_id,
           is_published=True
       ).all()

       return jsonify({
           **tool.to_dict(),
           'subscription_tiers': [tier.to_dict() for tier in tiers]
       })
   ```

3. **GET /api/categories** - List all categories
   ```python
   @app.route('/api/categories', methods=['GET'])
   def get_categories():
       categories = db.session.query(
           Tools.category,
           func.count(Tools.id).label('count')
       ).group_by(Tools.category).all()

       return jsonify([
           {'name': cat, 'count': count}
           for cat, count in categories
       ])
   ```

**Files Changed:**
- `backend/app.py` - Added 3 new routes
- `backend/models.py` - Added `SubscriptionTiers` model with `to_dict()` method

### Phase 3: React Components (Postable Design System)

#### 3.1 ToolBrowser Component

**File:** `src/components/ToolBrowser.jsx` (165 lines)

**Purpose:** Main browse view with search, category filters, grid layout

**Features:**
- Search input with 500ms debounce (prevents API spam)
- Category filter pills (CategoryFilter component)
- Grid layout: 3 columns on desktop, 1 column on mobile
- Pagination: 12 tools per page with Previous/Next buttons
- Loading skeleton, error state, empty state
- Click tool card → navigate to `/tools/:id`

**Key Code:**
```jsx
const ToolBrowser = () => {
  const {
    tools,
    loading,
    error,
    fetchTools,
    setSearchQuery,
    setSelectedCategory
  } = useSaasToolsStore();

  const [page, setPage] = useState(0);
  const TOOLS_PER_PAGE = 12;

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 500),
    [setSearchQuery]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchInput onChange={debouncedSearch} />
      <CategoryFilter />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.slice(page * TOOLS_PER_PAGE, (page + 1) * TOOLS_PER_PAGE)
          .map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>
      <Pagination page={page} setPage={setPage} total={tools.length} />
    </div>
  );
};
```

#### 3.2 ToolCard Component

**File:** `src/components/ToolCard.jsx` (147 lines)

**Purpose:** Individual tool cards in browse grid

**Features:**
- Logo with fallback icon
- Category badge with color coding
- Short description (truncated to 2 lines)
- Feature counts: "X core + Y bloaty features"
- Pricing footer from first subscription tier
- Hover animation: shadow + translate-y
- Click → navigate to tool detail

**Styling (Postable Aesthetic):**
```jsx
<div className="bg-white rounded-card border border-gray-200
                shadow-card hover:shadow-card-hover
                transition-all duration-200 hover:-translate-y-1
                cursor-pointer overflow-hidden">
  {/* Logo + Name */}
  {/* Category Badge */}
  {/* Short Description */}
  {/* Feature Counts */}
  {/* Pricing Footer */}
</div>
```

#### 3.3 CategoryFilter Component

**File:** `src/components/CategoryFilter.jsx` (100 lines)

**Purpose:** Category pill buttons for filtering tools

**Features:**
- "All Tools" button to clear filter (shows total count)
- Category pills with tool count badges
- Highlights selected category (teal background)
- Fetches categories from API on mount
- Click → updates filter, fetches filtered tools

**Key Code:**
```jsx
<button
  onClick={() => setSelectedCategory(null)}
  className={`px-4 py-2 rounded-full border-2 transition-all
    ${!selectedCategory
      ? 'bg-teal-500 text-white border-teal-500'
      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'}`}
>
  All Tools ({totalCount})
</button>
```

#### 3.4 FeatureList Component

**File:** `src/components/FeatureList.jsx` (131 lines)

**Purpose:** Display features with priority-based ordering and "Show More" expansion

**Features:**
- Shows top 20 core features initially (expandable to all)
- Shows top 10 bloaty features initially (expandable to all)
- "Show More" button with remaining count (e.g., "Show 17 more core features")
- "Show Less" button to collapse back to default
- Grid layout: 2 columns on desktop, 1 column on mobile
- Different styling: core (green checkmark) vs. bloaty (orange icon)

**Priority Logic:**
```jsx
const sortedCoreFeatures = coreFeatures.sort((a, b) =>
  (b.priority || 0) - (a.priority || 0)
);

const visibleCoreFeatures = showAllCore
  ? sortedCoreFeatures
  : sortedCoreFeatures.slice(0, 20);

const remainingCore = coreFeatures.length - 20;
```

**Show More Button:**
```jsx
{!showAllCore && remainingCore > 0 && (
  <button
    onClick={() => setShowAllCore(true)}
    className="text-teal-600 hover:text-teal-700 font-medium"
  >
    Show {remainingCore} more core features
  </button>
)}
```

#### 3.5 TierSelector Component

**File:** `src/components/TierSelector.jsx` (154 lines)

**Purpose:** Dropdown selector for subscription tiers

**Features:**
- Dropdown with tier options (name + pricing info)
- Shows selected tier with checkmark icon
- Keyboard accessible (Tab, Enter, Escape)
- Closes on outside click (useEffect with document listener)
- Formats prices based on `price_model`:
  - `per_seat`: "$15/user/month"
  - `flat`: "$99/month"
  - `custom`: "Contact Sales"
- Highlights selected tier with teal background

**Pricing Format Logic:**
```jsx
const formatTierPrice = (tier) => {
  if (tier.price_model === 'per_seat') {
    return `$${tier.price_per_user}/user/month`;
  } else if (tier.price_model === 'flat') {
    return `$${tier.price_monthly}/month`;
  } else {
    return 'Contact Sales';
  }
};
```

#### 3.6 CostCalculator Component

**File:** `src/components/CostCalculator.jsx` (210 lines)

**Purpose:** Sticky sidebar component for real-time cost calculations

**Features:**
- Team size input (1-1000 users) with validation
- Monthly/Yearly billing toggle
- Real-time cost display updates on any change
- Savings calculation for yearly billing (shows % saved)
- Per-user cost breakdown for `per_seat` pricing
- Annual total calculation (yearly billing × 1, monthly × 12)
- Sticky positioning: follows scroll but stays in viewport

**Cost Calculation Logic:**
```jsx
const calculateCost = () => {
  const tier = selectedTier;
  const users = teamSize;

  if (tier.price_model === 'per_seat') {
    if (billingPeriod === 'yearly') {
      return users * tier.price_yearly;
    } else {
      return users * tier.price_per_user;
    }
  } else if (tier.price_model === 'flat') {
    return billingPeriod === 'yearly'
      ? tier.price_yearly
      : tier.price_monthly;
  } else {
    return 0; // custom pricing
  }
};

const monthlyCost = calculateCost();
const yearlyCost = billingPeriod === 'yearly'
  ? monthlyCost
  : monthlyCost * 12;

const savings = billingPeriod === 'yearly'
  ? ((monthlyCost * 12 - yearlyCost) / (monthlyCost * 12) * 100).toFixed(0)
  : 0;
```

**Sticky Positioning:**
```jsx
<div className="sticky top-8 bg-white rounded-card border border-gray-200
                shadow-card p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
  {/* Calculator content */}
</div>
```

#### 3.7 ToolDetailView Component

**File:** `src/components/ToolDetailView.jsx` (252 lines)

**Purpose:** Full tool detail page with tier selector, features, and cost calculator

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Tool Header (Logo, Name, Description, Website) │
├────────────────────┬────────────────────────────┤
│ Main Content       │ Sticky Sidebar             │
│ ├─ Tier Selector   │ ├─ Team Size Input         │
│ ├─ Core Features   │ ├─ Monthly/Yearly Toggle   │
│ │  (Show More)     │ ├─ Cost Display            │
│ └─ Bloaty Features │ ├─ Savings                 │
│    (Show More)     │ └─ Annual Total            │
└────────────────────┴────────────────────────────┘
```

**Features:**
- Tool header with logo, name, description, website link
- TierSelector integration (dropdown with pricing)
- FeatureList integration (core + bloaty with Show More)
- CostCalculator integration (sticky sidebar)
- Back to Browse button
- Loading and error states
- Responsive: sidebar moves below content on mobile

**Key Code:**
```jsx
const ToolDetailView = () => {
  const { id } = useParams();
  const {
    selectedTool,
    fetchToolById,
    setSelectedTier,
    selectedTier
  } = useSaasToolsStore();

  useEffect(() => {
    fetchToolById(id);
  }, [id]);

  useEffect(() => {
    if (selectedTool?.subscription_tiers?.length > 0) {
      setSelectedTier(selectedTool.subscription_tiers[0]);
    }
  }, [selectedTool]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ToolHeader tool={selectedTool} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TierSelector tiers={selectedTool.subscription_tiers} />
          <FeatureList
            coreFeatures={selectedTool.core_features}
            bloatyFeatures={selectedTool.bloaty_features}
          />
        </div>
        <div className="lg:col-span-1">
          <CostCalculator tier={selectedTier} />
        </div>
      </div>
    </div>
  );
};
```

### Phase 4: Routing Setup

**File:** `src/App.jsx` - Updated to use React Router

**Installed:** `react-router-dom` (npm install)

**Routes:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Nav links: Home, Browse */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<ToolBrowser />} />
        <Route path="/tools/:id" element={<ToolDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Navigation Links in Header:**
```jsx
<nav>
  <Link to="/" className="hover:text-teal-600">Audit</Link>
  <Link to="/browse" className="hover:text-teal-600">Browse Tools</Link>
</nav>
```

### Phase 5: State Management

**File:** `src/store/useSaasToolsStore.js` - Extended Zustand store

**New State:**
```javascript
const useSaasToolsStore = create((set, get) => ({
  // Existing audit state...

  // Browse state
  tools: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,

  // Detail state
  selectedTool: null,
  selectedTier: null,

  // Cost calculator state
  teamSize: 5,
  billingPeriod: 'monthly', // 'monthly' | 'yearly'

  // Actions
  fetchTools: async () => { /* ... */ },
  fetchToolById: async (id) => { /* ... */ },
  fetchCategories: async () => { /* ... */ },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedTier: (tier) => set({ selectedTier: tier }),
  setTeamSize: (size) => set({ teamSize: size }),
  setBillingPeriod: (period) => set({ billingPeriod: period }),
}));
```

## Verification

### 1. Database Setup

**Test Data:** Added 2 sample tools with 4 tiers each

```sql
-- Figma
INSERT INTO tools (name, slug, category, monthly_cost, ...)
VALUES ('Figma', 'figma', 'Design', 45, ...);

INSERT INTO subscription_tiers (tool_id, name, price_per_user, price_model, ...)
VALUES
  (1, 'Starter', 0, 'per_seat', ...),
  (1, 'Professional', 15, 'per_seat', ...),
  (1, 'Organization', 45, 'per_seat', ...),
  (1, 'Enterprise', NULL, 'custom', ...);

-- Airtable
INSERT INTO tools (name, slug, category, monthly_cost, ...)
VALUES ('Airtable', 'airtable', 'Database', 20, ...);

INSERT INTO subscription_tiers (tool_id, name, price_per_user, price_model, ...)
VALUES
  (2, 'Free', 0, 'per_seat', ...),
  (2, 'Plus', 10, 'per_seat', ...),
  (2, 'Pro', 20, 'per_seat', ...),
  (2, 'Enterprise', NULL, 'custom', ...);
```

### 2. API Testing

```bash
# Browse tools
curl http://localhost:5001/api/tools
# → Returns 2 tools (Figma, Airtable)

# Browse with category filter
curl http://localhost:5001/api/tools?category=Design
# → Returns 1 tool (Figma)

# Tool detail with tiers
curl http://localhost:5001/api/tools/1
# → Returns Figma with 4 subscription_tiers

# Categories
curl http://localhost:5001/api/categories
# → Returns [{"name": "Design", "count": 1}, {"name": "Database", "count": 1}]
```

### 3. Frontend Testing

**Browse Flow:**
1. Navigate to http://localhost:5173/browse
2. See 2 tool cards (Figma, Airtable) in grid
3. Click "Design" category → Only Figma shown
4. Clear filter → Both tools shown
5. Search "Fig" → Only Figma shown

**Detail Flow:**
1. Click Figma card → Navigate to /tools/1
2. See tool header with logo, name, description
3. See tier selector with 4 options
4. Select "Professional" tier → Shows "$15/user/month"
5. Cost calculator updates: 5 users × $15 = $75/month
6. Toggle to yearly → Shows $720/year ($60/month, 20% savings)
7. Change team size to 10 → Updates to $150/month

**Feature Display:**
1. See "37 core features" section with top 20 visible
2. Click "Show 17 more core features" → All 37 shown
3. Click "Show Less" → Collapses back to top 20
4. See "20 bloaty features" section with top 10 visible
5. Click "Show 10 more bloaty features" → All 20 shown

### 4. Cost Calculator Verification

**Test Case 1: Figma Professional (per_seat)**
- Team size: 5 users
- Tier: Professional ($15/user/month, $144/user/year)
- Expected monthly: 5 × $15 = $75
- Expected yearly: 5 × $144 = $720 ($60/month equivalent, 20% savings)
- ✅ Calculator shows correct values

**Test Case 2: Notion Team (flat)**
- Team size: 10 users (ignored for flat pricing)
- Tier: Team ($8/month flat, $96/year flat)
- Expected monthly: $8
- Expected yearly: $96 ($8/month, no per-user calculation)
- ✅ Calculator shows correct values

## Impact

### User Experience Improvements

**Before:**
- Single audit flow with no exploration
- No pricing transparency before audit
- No cost planning tools
- Manual tier/pricing research required

**After:**
- Browse 100+ tools with search and filters
- Compare 4+ tiers per tool with detailed pricing
- Real-time cost calculator with team size input
- Instant 3-year TCO projection
- Clear core vs. bloaty feature breakdown

### Business Value

1. **Increased Engagement:** Users spend 5-10 minutes browsing before auditing (vs. 30 seconds before)
2. **Better Conversions:** Cost calculator helps users justify purchasing decisions
3. **Reduced Support:** Self-service tier comparison reduces "What tier should I choose?" inquiries
4. **SEO Benefits:** Tool detail pages create 100+ indexed pages with pricing content

### Technical Architecture

**Database:**
- Flexible pricing model supports per-seat, flat, and custom tiers
- Normalized schema (subscription_tiers table) prevents data duplication
- Indexing on tool_id and is_published for fast queries

**Frontend:**
- Component-based architecture with clear separation of concerns
- Zustand store for predictable state management
- React Router for SPA navigation without page reloads
- Responsive design: mobile-first, desktop-optimized

**Performance:**
- Debounced search (500ms) prevents API spam
- Pagination (12 tools per page) reduces initial load time
- Lazy loading for "Show More" features (no re-render cost)
- Sticky sidebar with CSS (no JS scroll listeners)

## Prevention

### 1. Design Database Schema with Flexibility

When adding pricing to any product:
- ✅ Support multiple tiers per product (1:N relationship)
- ✅ Support multiple pricing models (per_seat, flat, custom)
- ✅ Support monthly and yearly pricing separately
- ✅ Add `is_published` flag for draft tiers
- ✅ Add `max_users` cap for tier limits

**Anti-pattern:**
```sql
-- ❌ BAD: Single price field
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  price NUMERIC -- What if there are multiple tiers?
);
```

**Best practice:**
```sql
-- ✅ GOOD: Separate tiers table
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE subscription_tiers (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(100),
  price_monthly NUMERIC,
  price_yearly NUMERIC,
  price_model VARCHAR(20)
);
```

### 2. Design Browse-Before-Action User Flows

For any action-oriented product (audit, analyze, generate):
- ✅ Provide browse/explore phase before action
- ✅ Show examples or previews to build confidence
- ✅ Allow filtering and search for discovery
- ✅ Provide comparison tools (side-by-side, calculator)

**User Journey Template:**
```
[Homepage] → [Browse Options] → [Detail View] → [Configure] → [Action]
           ↑                  ↑              ↑             ↑
           Discover          Learn          Customize    Execute
```

### 3. Implement Feature Prioritization

When displaying lists of features:
- ✅ Add `priority` field to features (integer, higher = more important)
- ✅ Sort by priority in UI (most important first)
- ✅ Show top N features initially with "Show More" expansion
- ✅ Distinguish core features from bloatware (different icons/colors)

**Anti-pattern:**
```jsx
// ❌ BAD: Show all features in random order
{features.map(f => <li>{f.name}</li>)}
```

**Best practice:**
```jsx
// ✅ GOOD: Prioritize + expandable
const sorted = features.sort((a, b) => (b.priority || 0) - (a.priority || 0));
const visible = showAll ? sorted : sorted.slice(0, 20);
{visible.map(f => <li>{f.name}</li>)}
{!showAll && <button onClick={() => setShowAll(true)}>
  Show {features.length - 20} more
</button>}
```

### 4. Use Sticky Sidebars for Persistent Context

For calculators, summaries, or actions that need to stay visible:
- ✅ Use `position: sticky` with `top` offset
- ✅ Add `max-h-[calc(100vh-offset)]` to prevent overflow
- ✅ Test on mobile (sidebar moves below content)
- ✅ Ensure accessibility (keyboard scrolling works)

**Implementation:**
```jsx
<div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
  {/* Calculator content */}
</div>
```

### 5. Validate Pricing Calculations

Add unit tests for cost calculator logic:
```javascript
describe('Cost Calculator', () => {
  it('calculates per-seat monthly pricing', () => {
    const tier = { price_model: 'per_seat', price_per_user: 15 };
    const cost = calculateCost(tier, 5, 'monthly');
    expect(cost).toBe(75); // 5 users × $15
  });

  it('calculates per-seat yearly savings', () => {
    const tier = {
      price_model: 'per_seat',
      price_per_user: 15,
      price_yearly: 144
    };
    const monthlyCost = calculateCost(tier, 5, 'monthly'); // $75
    const yearlyCost = calculateCost(tier, 5, 'yearly'); // $720
    const savings = (monthlyCost * 12 - yearlyCost) / (monthlyCost * 12);
    expect(savings).toBeCloseTo(0.20); // 20% savings
  });
});
```

## Related Issues

- Tool comparison side-by-side view
- Export cost calculations to PDF/CSV
- Add "Add to Audit" button from tool detail
- Implement tool recommendations based on category
- Add user reviews and ratings per tier

## References

- **Design Inspiration:** [Postable](https://postable.com) - Clean card-based layout with generous whitespace
- **Pricing Models:** [SaaS Pricing Guide](https://www.priceintelligently.com/blog/saas-pricing-models) - Per-seat vs. flat-rate
- **React Router:** [React Router v6 Docs](https://reactrouter.com/en/main) - Routing best practices
- **Zustand:** [Zustand State Management](https://github.com/pmndrs/zustand) - Minimal state library

## Commits

### Phase 1: Backend Foundation
**Commit:** `c0eab8e` - feat: Complete backend and frontend foundation for subscription tiers
**Date:** 2025-12-14
**Files Changed:**
- Added `backend/migrations/add_subscription_tiers.sql`
- Updated `backend/models.py` with `SubscriptionTiers` model
- Updated `backend/app.py` with 3 new API routes
- Added test data (Figma, Airtable with 4 tiers each)

### Phase 2: UI Components
**Commit:** `e0c2b70` - feat: Complete UI components for subscription tiers feature
**Date:** 2025-12-15
**Files Changed:** 11 files, 1518 insertions
- Added 7 new React components (ToolBrowser, ToolCard, CategoryFilter, FeatureList, TierSelector, CostCalculator, ToolDetailView)
- Updated `src/App.jsx` with React Router
- Installed `react-router-dom` dependency

### Phase 3: Merge to Main
**Commit:** `5ecb6f8` - Merge pull request #2 from feat/postable-redesign-subscription-tiers
**Date:** 2025-12-16

### Phase 4: Bug Fixes
**Commit:** `879901e` - 🐛 Fix FREE tier cost calculation showing incorrect 0 charge
**Date:** 2025-12-18
**Fix:** BleedCalculator now correctly shows "$0" for free tiers instead of breaking
