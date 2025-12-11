# Postable.com Styleguide

## Brand Identity

### Brand Essence
Postable is a greeting card service that emphasizes convenience, quality, and sustainability. The brand personality is warm, friendly, and approachable while maintaining professionalism.

**Tagline:** "Really nice cards, mailed for you."

**Key Value Propositions:**
- Free addressing and mailing services
- 100% recycled paper
- Designer cards from artists across the US
- Transparent, all-inclusive pricing
- Time-saving convenience

---

## Color Palette

### Primary Colors

**Turquoise (Brand Primary)**
- Hex: `#8AE5DD`
- RGB: rgb(138, 229, 221)
- Usage: Primary brand color, accents, icons, decorative elements

**Coral Red (Call-to-Action)**
- Hex: `#FF5132`
- RGB: rgb(255, 81, 50)
- Usage: Primary buttons, important CTAs, promotional elements

**Navy Blue (Text Primary)**
- Hex: `#00265D`
- RGB: rgb(0, 38, 93)
- Usage: Primary text color, headings, navigation

**Cream (Background)**
- Hex: `#FFFEFA`
- RGB: rgb(255, 254, 250)
- Usage: Primary background color, card backgrounds, light sections

### Secondary Colors

**Darker Navy**
- Hex: `#212121`
- Usage: Icons, secondary text elements

---

## Typography

### Font Strategy
Postable uses a clean, modern sans-serif typography system that emphasizes readability and friendliness.

### Headings

**H1 - Hero Heading**
```css
font-size: 48-64px (desktop)
font-weight: 700
color: #FFFEFA (on dark backgrounds) or #00265D (on light backgrounds)
line-height: 1.2
letter-spacing: -0.5px
```

**H2 - Section Headers**
```css
font-size: 36-42px
font-weight: 600
color: #00265D
line-height: 1.3
```

**H4 - Subsection Headers**
```css
font-size: 18-24px
font-weight: 600
color: #00265D
line-height: 1.4
```

**H5 - Small Headers**
```css
font-size: 14-16px
font-weight: 600
color: #00265D
text-transform: uppercase
letter-spacing: 0.5px
```

### Body Text

**Paragraph Text**
```css
font-size: 16-18px
font-weight: 400
color: #00265D
line-height: 1.6
```

---

## UI Components

### Buttons

**Primary Button**
```css
background: #FF5132
color: #FFFEFA
padding: 12px 32px
border-radius: 4px
font-weight: 600
font-size: 16px
border: none
transition: background 0.3s ease

hover:
  background: darken(#FF5132, 10%)
  transform: translateY(-1px)
```

**Button FAB (Floating Action Button) - Small**
```css
width: 44px
height: 44px
border-radius: 50%
background: transparent
border: 2px solid #212121
display: flex
align-items: center
justify-content: center

hover:
  background: rgba(33, 33, 33, 0.05)
```

### Navigation

**Main Header**
```css
background: #FFFEFA
position: sticky
top: 0
z-index: 1000
box-shadow: 0 2px 8px rgba(0, 38, 93, 0.1)
```

**Navigation Links**
```css
font-size: 16px
font-weight: 500
color: #00265D
padding: 12px 20px
transition: color 0.2s ease

hover:
  color: #8AE5DD
```

**Mobile Menu Toggle**
```css
display: block (mobile only)
width: 24px
height: 24px
background: transparent
border: none
```

### Header Banner

**Promotional Banner**
```css
background: #FF5132 or #8AE5DD
color: #FFFEFA
padding: 12px 16px
text-align: center
font-size: 14-16px
font-weight: 500
```

Example: "25% off all cards with code MERRY"

---

## Layout Patterns

### Page Hero

**Standard Hero Layout**
```css
display: flex
align-items: center
min-height: 400-600px
padding: 80px 40px
background: gradient or solid color

Content Alignment: left or center
Text Color: #FFFEFA (on dark) or #00265D (on light)
```

**Hero Structure:**
1. Brow text with 5-star rating
2. H1 headline
3. Supporting paragraph
4. Primary CTA button

### Section Layout

**Standard Section**
```css
padding: 80px 40px
max-width: 1200px
margin: 0 auto
```

**Section Header**
```css
text-align: center
margin-bottom: 48px
```

### Card Grid

**Product Card Grid**
```css
display: grid
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
gap: 24px
padding: 40px 20px
```

---

## Design Elements

### Icons

**Icon System**
- SVG-based icon system
- Stroke width: 2px
- Size: 24x24px (standard)
- Color: #212121 or #00265D
- Style: Outline/stroke icons

**Common Icons:**
- Search (magnifying glass)
- User profile (person silhouette)
- Heart (favorites)
- Menu (hamburger - 3 horizontal lines)
- X (close)

### Rating Stars

**5-Star Display**
```css
width: 160px
height: 30px
fill: #00265D
display: inline-flex
gap: 4px
```

### Illustrations

**Style:**
- Friendly, hand-drawn aesthetic
- Colors: #8AE5DD, #FF5132, #00265D, #FFFEFA
- Simple, clean line work
- Usage: Hero sections, feature explanations, empty states

**Common Illustration Topics:**
- Envelope/mail delivery
- Cards
- Relaxation/ease
- Character illustrations

---

## Content Patterns

### Testimonials

**Testimonial Quote**
```css
font-size: 24-28px
font-weight: 500
color: #00265D
line-height: 1.4
font-style: italic
quotes: """ and """
```

**Testimonial Attribution**
```css
font-size: 16px
font-weight: 400
color: #00265D
margin-top: 16px
```

Format: "— FirstName L."

### Social Proof

**Review Count Display**
```css
font-size: 14px
font-weight: 500
color: #00265D
display: inline-flex
align-items: center
gap: 8px
```

Format: "9,000+ Reviews" or "Over 1,000,000 satisfied customers"

### Press Logos

**Logo Display**
```css
height: 40-50px
width: auto
filter: grayscale(100%)
opacity: 0.7
transition: all 0.3s ease

hover:
  filter: grayscale(0%)
  opacity: 1
```

---

## Interactive Elements

### Card Hover States

```css
transition: all 0.3s ease
cursor: pointer

hover:
  transform: translateY(-4px)
  box-shadow: 0 8px 24px rgba(0, 38, 93, 0.15)
```

### Link Hover States

```css
text-decoration: none
transition: color 0.2s ease

hover:
  color: #8AE5DD
  text-decoration: underline
```

---

## Spacing System

### Margin/Padding Scale
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px
- 4XL: 80px

### Container Widths
- Mobile: 100% (with 20px padding)
- Tablet: 768px
- Desktop: 1024px
- Wide: 1200px
- Max: 1440px

---

## Animation & Transitions

### Standard Timing
```css
transition-duration: 0.2s (fast - hover effects)
transition-duration: 0.3s (standard - most transitions)
transition-duration: 0.5s (slow - page transitions)
transition-timing-function: ease
```

### Micro-interactions
- Button hover: translateY(-1px) + shadow increase
- Card hover: translateY(-4px) + shadow increase
- Icon hover: scale(1.05) or color change

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px
--tablet: 768px
--desktop: 1024px
--wide: 1280px
--ultra-wide: 1920px

/* Common Media Queries */
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) { /* Tablet+ */ }
@media (min-width: 1024px) { /* Desktop+ */ }
```

### Mobile Adaptations
- Stack layouts vertically
- Show mobile menu toggle
- Reduce font sizes by 15-20%
- Increase touch target sizes to 44px minimum
- Show simplified navigation

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements have clear focus states
- Color is not the only means of conveying information

### Focus States
```css
outline: 2px solid #8AE5DD
outline-offset: 2px
```

### Alt Text
- All images have descriptive alt text
- Decorative images use empty alt=""
- Icons paired with aria-labels

---

## Photography & Imagery

### Image Style
- High-quality product photography
- Clean, white backgrounds for cards
- Lifestyle photography with warm tones
- Natural lighting
- Focus on hands, cards, envelopes
- Show cards in context (being written, mailed, received)

### Image Optimization
- Format: WebP with fallback
- Lazy loading enabled
- Responsive images with srcset
- Cloudinary CDN for delivery

### Card Images
```html
Format: https://res.cloudinary.com/postable/image/upload/[transformations]/cards/masters/[ID]
Transformations: q_auto,f_auto (quality and format auto)
Aspect Ratio: Square or 3:4 for cards
```

---

## Voice & Tone

### Brand Voice
- **Warm & Friendly:** Conversational, approachable language
- **Confident:** Direct statements about value and quality
- **Helpful:** Focus on solving customer pain points
- **Honest:** Transparent pricing, no hidden fees

### Writing Style
- Use contractions (we'll, you'll, it's)
- Address the customer directly (you/your)
- Keep sentences concise
- Use active voice
- Emphasize benefits over features

### Example Phrases
- "Really nice cards, mailed for you."
- "Save yourself hours of toil"
- "Let us do it for you!"
- "We're the only stationery company that actually addresses, stamps and mails all of the cards for you."
- "No hidden upcharges"

---

## Key Messaging

### Value Propositions
1. **Time-Saving:** "Save yourself hours of toil"
2. **Quality:** "Designs you can't get anywhere else"
3. **Pricing:** "Transparent pricing" / "All inclusive"
4. **Sustainability:** "100% recycled paper"
5. **Convenience:** "We mail them for you"

### Trust Signals
- "9,000+ Reviews"
- "Over 1,000,000 satisfied customers"
- Press mentions (Today, Forbes, Glamour, etc.)
- "Free addressing and mailing"

---

## Special Features

### Mega Menus
- Multi-column dropdown menus
- Organized by category (Holiday, Birthday, Wedding, etc.)
- Include sidebar with tools and featured content
- Clear visual hierarchy

### Carousels/Sliders
- Testimonial rotation
- Press logo marquee
- Product category showcase
- Auto-play with pause on hover
- Navigation dots or arrows

### Filters & Search
- Search bar in header
- Category filters
- Tag-based navigation
- Clear active states

---

## Email & Form Patterns

### Newsletter Signup
```css
padding: 24px
background: #FFFEFA or light turquoise
border: 1px solid #8AE5DD

Input:
  padding: 12px 16px
  border: 1px solid #00265D
  border-radius: 4px

Submit Button:
  background: #FF5132
  color: #FFFEFA
  padding: 12px 24px
```

### Input Fields
```css
border: 1px solid #00265D
border-radius: 4px
padding: 12px 16px
font-size: 16px
color: #00265D

focus:
  outline: none
  border-color: #8AE5DD
  box-shadow: 0 0 0 3px rgba(138, 229, 221, 0.2)
```

---

## Loading States

### Spinner/Loader
- Color: #8AE5DD
- Size: 32-48px
- Style: Circular spinner or branded animation

### Skeleton Loading
- Background: rgba(0, 38, 93, 0.1)
- Animated shimmer effect
- Matches content layout

---

## Error States

### Error Messages
```css
background: #FFF3F3
border: 1px solid #FF5132
color: #00265D
padding: 12px 16px
border-radius: 4px
font-size: 14px
```

---

## Success States

### Success Messages
```css
background: #F0FFF4
border: 1px solid #8AE5DD
color: #00265D
padding: 12px 16px
border-radius: 4px
font-size: 14px
```

---

## Implementation Notes

### CSS Framework
- Custom CSS (no visible framework like Bootstrap or Tailwind)
- BEM-like naming conventions
- Component-based architecture

### Asset Delivery
- Cloudinary CDN for images
- SVG for icons and logos
- WebP with fallbacks for photos

### Performance
- Lazy loading images
- Deferred JavaScript
- Optimized font loading
- Minified CSS/JS

---

## Brand Assets

### Logo Variants
1. **Full Logo:** Wordmark with icon
2. **Icon Only:** Circular P with envelope
3. **Light Version:** White/cream on dark backgrounds
4. **Dark Version:** Navy on light backgrounds

### Minimum Sizes
- Full logo: 120px width minimum
- Icon only: 32px minimum

### Clear Space
- Minimum clear space: 1x logo height on all sides

---

## Do's and Don'ts

### Do's
✓ Use the primary color palette consistently
✓ Maintain generous whitespace
✓ Use high-quality imagery
✓ Keep messaging warm and friendly
✓ Emphasize convenience and quality
✓ Show social proof prominently
✓ Make CTAs clear and actionable

### Don'ts
✗ Don't use harsh or aggressive language
✗ Don't clutter layouts
✗ Don't use low-quality images
✗ Don't hide pricing or fees
✗ Don't use colors outside the brand palette
✗ Don't make navigation confusing
✗ Don't ignore mobile experience

---

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

---

## Additional Resources

### External References
- Press mentions: Today, Forbes, Glamour, Brides, The New York Times
- Artist collaborations page: postable.com/artists
- Blog: postable.com/blog

### Contact & Support
- Contact form available on site
- FAQ section comprehensive
- Business solutions available

---

## Version History
- **Version 1.0** - Initial styleguide based on postable.com analysis (December 2025)

---

## Notes
This styleguide is based on analysis of postable.com as of December 2025. Always refer to the live site for the most current implementation details.
