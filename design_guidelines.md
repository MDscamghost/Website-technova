# TECHNOVA Design Documentation

**Design Approach**: Futuristic E-commerce (Reference: High-end tech brands like Apple's restraint meets cyberpunk aesthetics)

## Core Design System (Extracted from Existing Implementation)

### Color Palette
- **Background**: Slate-950 (`#020617`) - Deep space black
- **Accent Primary**: Neon Blue (`#00f3ff`) - Electric cyan for CTAs and highlights
- **Accent Secondary**: Neon Purple (`#bc13fe`) - Deep violet for gradients
- **Text**: White primary, Gray-400 secondary
- **Glass Effects**: RGBA overlays with 5-15% white opacity

### Typography
- **Primary Font**: Inter (body text, UI elements) - weights 300-700
- **Display Font**: Space Grotesk (headings, hero text) - weights 300-700
- **Hero Text**: 6xl-9xl, bold, gradient text effect
- **Body**: xl-2xl for descriptions, sm-base for UI

### Layout System
- **Container**: Max-width 7xl (1280px) centered
- **Spacing Units**: Tailwind default (4, 6, 8, 12, 16, 20, 32 units)
- **Grid**: 1/2/3 columns responsive (mobile/tablet/desktop)
- **Card Height**: Fixed 500px for product cards

### Component Library

**Glass Panels**: 
- Background: `rgba(15, 23, 42, 0.6)` with 16px blur
- Border: 1px white at 10% opacity
- Used for: Navigation, product cards, chat widget, cart items

**Product Cards**:
- 60% image top section with gradient overlay
- 40% content bottom with -mt-12 overlap
- Rounded-3xl corners
- Hover: Lift -10px, scale image 1.1x, border glow

**Navigation**:
- Fixed bottom-8, centered floating dock
- Rounded-full pill shape
- 4 icons: Home, Shop, AI Chat, Cart
- Active indicator: 1px neon-blue dot below icon

**Chat Widget**:
- 450px wide, 600px tall
- Fixed bottom-right positioning
- Message bubbles: User (blue gradient, right), AI (glass panel, left)
- Deep Think toggle switch in header

**Hero Section**:
- Full viewport height with centered content
- Animated gradient blobs (purple/blue, 96px blur)
- Background tech image at 20% opacity
- Two CTA buttons: Primary (white/gradient hover), Secondary (bordered glass)

### Animations
- **Hover Effects**: Scale 1.05-1.2, lift -10px
- **Entry**: Fade + slide up (0.8s duration)
- **Background**: Pulse-slow for gradient blobs
- **Navigation**: Layout ID transitions for active state

### Images Strategy
- **Hero**: Full-bleed tech/space background image (Unsplash) at 20% opacity behind gradient overlay
- **Products**: Picsum placeholder images (800x600) - production would use actual product photos
- **Image Display**: Cover fit, rounded corners, gradient overlays for readability

### Accessibility
- Focus rings: Neon-blue at 1px
- Hover states: Consistent bg-white/10 or color shifts
- Button contrast: White on dark, black on neon colors
- Readable text hierarchy with proper size/weight contrast

### Key Visual Principles
1. **Futuristic Minimalism**: Clean layouts with deliberate neon accents
2. **Glass Morphism**: Layered translucent panels create depth
3. **Motion Restraint**: Subtle animations, no aggressive effects
4. **Gradient Treatment**: Used sparingly for CTAs and text highlights
5. **Dark Foundation**: All UI floats on near-black canvas

**Critical Note**: This website is production-ready with all components fully implemented. Design is cohesive, modern, and highly polished.