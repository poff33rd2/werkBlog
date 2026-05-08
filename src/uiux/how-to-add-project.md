---
title: "How To Add To My Project"
description: "Quick setup guide for adding components and manipulating blocks"
eleventyExcludeFromCollections: true
---

## Add A Component Fast

1. Copy the component block from a PUI page into your app (for example `Flight` or `Split Accordion`).
2. Paste the component into your codebase:
   - Next.js: `components/flight.jsx` (or `.tsx`)
   - Vite React: `src/components/Flight.jsx` (or `.tsx`)
3. Copy the matching usage snippet into your page file.
4. If the component uses utility classes, make sure Tailwind is configured in your project.
5. Add top spacing to page content when using fixed nav: use `pt-12` or `pt-16` based on final nav height.

<br>
## Manipulate Blocks

Use props to update block content and behavior without rewriting the component.

- `navItems`: controls the drawer links.
- `leftLabel`: changes the left-side nav text.
- `homeHref`: sets the center logo destination.
- `logoSrc` and `logoAlt`: replace brand image + accessible label.
- `scrollBehavior`: controls hide/shrink/solid behavior on scroll.

Example:

{% raw %}
```jsx
const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Archive", href: "/archive" },
];

<Flight
  navItems={navItems}
  leftLabel="Webstaurants"
  homeHref="/"
  logoSrc="/images/logo.png"
  logoAlt="Webstaurants logo"
  scrollBehavior={{
    hideOnScrollDown: true,
    cruiseMode: true,
    solidAfterScroll: true,
  }}
/>
```
{% endraw %}

<br>
## Extend Block Source Code (Add Props + Behavior)

Use this pattern when you want to add new controls to a block component itself.

<br>
### Example 1: Add `menuLabel` and `menuBgColor` to Flight

{% raw %}
```jsx
export function Flight({
  navItems = [],
  menuLabel = "Menu",
  menuBgColor = "#FAF9F5",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : menuLabel}
      </button>

      <div
        id="drawer"
        style={{ backgroundColor: menuBgColor }}
        className={`fixed top-12 left-0 right-0 bottom-0 transition-transform duration-300 ease ${
          isOpen ? "translate-y-0" : "-translate-y-[calc(100%+3rem)]"
        }`}
      >
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
      </div>
    </>
  );
}
```
{% endraw %}

<br>
### Example 2: Add `defaultOpenIndex` to Split Accordion

{% raw %}
```jsx
export function SplitAccordionSection({
  items,
  defaultOpenIndex = 0,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title}>
            <button onClick={() => setOpenIndex(isOpen ? null : index)}>
              {item.title}
            </button>
            {isOpen ? <p>{item.body}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
```
{% endraw %}

<br>
### Example 3: Add `className` for Easy Overrides

{% raw %}
```jsx
export function Flight({ className = "", ...props }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 ${className}`}>
      {/* ... */}
    </nav>
  );
}
```
{% endraw %}

Usage:

{% raw %}
```jsx
<Flight className="border-b border-neutral-200 bg-white/95 backdrop-blur" />
```
{% endraw %}

<br>
## Block-Level Styling Tips

- Keep component styles scoped with prefixed classes (for example `.flight-*`).
- Move repeated inline utility classes into a module CSS file when you stabilize the design.
- If a block is fixed (`position: fixed`), always add page content offset to avoid overlap.

<br>
## Web3 Build References

- Ethereum docs: https://ethereum.org/en/developers/docs/
- Solidity docs: https://docs.soliditylang.org/
- Ethers.js docs: https://docs.ethers.org/
- Viem docs: https://viem.sh/
- Wagmi docs: https://wagmi.sh/
- Thirdweb docs: https://portal.thirdweb.com/
