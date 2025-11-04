# Project Setup Instructions

## Overview

This project has been set up with:
- ✅ **Next.js 16** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **shadcn/ui** project structure
- ✅ **Waves Background Component** integrated

## Project Structure

The project follows the shadcn/ui convention:

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (demo)
│   └── globals.css        # Global styles with Tailwind
├── components/
│   └── ui/                # UI components (shadcn convention)
│       ├── wave-background.tsx  # Waves component
│       └── waves-demo.tsx       # Demo component
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
├── components.json         # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Why `/components/ui` Directory?

The `/components/ui` directory is the **standard location for shadcn/ui components**. This is important because:

1. **Consistency**: All shadcn/ui components are installed to this directory by default
2. **Tooling**: The shadcn CLI automatically detects and manages components in this location
3. **Best Practice**: Separates reusable UI components from page-specific components
4. **Convention**: Follows the established pattern used by the shadcn/ui ecosystem

If you need to change this location, update `components.json`:

```json
{
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Dependencies Installed

### Core Dependencies
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `typescript` - TypeScript compiler
- `tailwindcss` - Tailwind CSS framework
- `postcss` & `autoprefixer` - CSS processing

### shadcn/ui Dependencies
- `tailwindcss-animate` - Animation utilities
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class name utilities

### Component Dependencies
- `simplex-noise` - Noise generator for wave animations

## Running the Project

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see the waves demo

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

3. **Linting**:
   ```bash
   npm run lint
   ```

## Using the Waves Component

### Basic Usage

```tsx
import { Waves } from "@/components/ui/wave-background"

export default function MyPage() {
  return (
    <div className="relative w-full h-screen">
      <Waves />
    </div>
  )
}
```

### With Custom Props

```tsx
<Waves
  className="opacity-50"
  strokeColor="#00ff00"      // Green lines
  backgroundColor="#000000"  // Black background
  pointerSize={1}             // Larger pointer dot
/>
```

### Component Props

- `className?: string` - Additional CSS classes
- `strokeColor?: string` - Color of the wave lines (default: "#ffffff")
- `backgroundColor?: string` - Background color (default: "#000000")
- `pointerSize?: number` - Size of the pointer dot in rem (default: 0.5)

## Adding More shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

Components will be automatically added to `/components/ui`.

## Troubleshooting

### If shadcn CLI doesn't work

Make sure `components.json` exists and is properly configured. The project structure must match shadcn/ui expectations.

### TypeScript Errors

Ensure all dependencies are installed:
```bash
npm install
```

### Tailwind Not Working

1. Check that `tailwind.config.ts` exists
2. Verify `app/globals.css` includes Tailwind directives
3. Restart the dev server

## Next Steps

1. Run `npm run dev` to start the development server
2. Visit `http://localhost:3000` to see the waves background
3. Customize the component props as needed
4. Integrate the component into your pages

## Component Details

The Waves component creates an interactive wave background with:
- Smooth wave animations using simplex noise
- Mouse/touch interaction that deforms the waves
- Responsive design that adapts to container size
- Customizable colors and pointer size

The component uses `requestAnimationFrame` for smooth 60fps animations and is optimized for performance.

