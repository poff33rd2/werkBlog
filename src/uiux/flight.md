---
title: "Flight"
description: "A sleek and compact navigation component"
---

{% livepreview { title: "Live Preview" } %}
<div class="flight-preview" data-flight-preview>
  <div class="flight-preview__bar">
    <div class="flight-preview__left"></div>
    <div class="flight-preview__center">FLIGHT</div>
    <div class="flight-preview__right">
      <button type="button" class="flight-preview__btn" data-preview-menu>Menu</button>
    </div>
  </div>
  <div class="flight-preview__body">
    <div class="flight-preview__drawer" data-preview-drawer>
      <a href="#">Studio</a>
      <a href="#">Journal</a>
      <a href="#">Archive</a>
    </div>
  </div>
  <p class="flight-preview__status">Demo preview: use Menu to test interaction.</p>
</div>
<script src="/assets/flight-preview.js"></script>
{% endlivepreview %}

{% getstarted { title: "Get Started" } %}
<p>Before placing this component on another site, confirm:</p>
<ul>
  <li>React app with client component support (<code>'use client'</code>).</li>
  <li>Set your own nav labels and links based on your project structure.</li>
  <li>Styling setup: Tailwind CSS (as written) or mapped custom CSS.</li>
  <li>Your own logo image URL (replace the current Cloudinary <code>src</code>).</li>
  <li>Pick the Next.js or Vite code version below, then customize links/components as needed.</li>
</ul>
{% endgetstarted %}

<section class="props-card" aria-labelledby="flight-props-title">
  <h2 class="props-card__title" id="flight-props-title">Available Props</h2>
  <p class="props-card__intro">Use these props to customize the component from your page code:</p>
  <div class="props-card__table-wrap">
    <table class="props-card__table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>What it controls</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>navItems</code></td>
          <td><code>{ label, href }[]</code></td>
          <td>Studio / Journal / Archive</td>
          <td>Drawer menu labels and links</td>
        </tr>
        <tr>
          <td><code>leftLabel</code></td>
          <td><code>string</code></td>
          <td><code>"Flight Navigation"</code></td>
          <td>Text shown on the left side of the nav bar</td>
        </tr>
        <tr>
          <td><code>homeHref</code></td>
          <td><code>string</code></td>
          <td><code>"/"</code></td>
          <td>Destination when clicking the center logo</td>
        </tr>
        <tr>
          <td><code>logoSrc</code></td>
          <td><code>string</code></td>
          <td>Cloudinary Flight image URL</td>
          <td>Logo image source</td>
        </tr>
        <tr>
          <td><code>logoAlt</code></td>
          <td><code>string</code></td>
          <td><code>"Flight"</code></td>
          <td>Accessible image alt text</td>
        </tr>
        <tr>
          <td><code>scrollBehavior</code></td>
          <td><code>{ hideOnScrollDown, cruiseMode, solidAfterScroll }</code></td>
          <td>All <code>false</code></td>
          <td>Controls hide/show, nav height shrink, and transparent/solid surface behavior on scroll</td>
        </tr>
        <tr>
          <td><code>menuAppear</code></td>
          <td><code>{ mode, direction }</code></td>
          <td><code>{ mode: "none", direction: "down" }</code></td>
          <td>Controls drawer entrance style: no effect, fade from top, or directional slide</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<div class="framework-switch" data-framework-switch hidden>
  <button type="button" class="framework-switch__btn is-active" data-framework-choice="next">Next.js</button>
  <button type="button" class="framework-switch__btn" data-framework-choice="vite">Vite</button>
</div>

<div data-framework-panel="next">
{% codeblock { lang: "jsx", title: "Flight Component", framework: "Next.js + React" } %}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Flight({
  navItems = [
    { label: 'Studio', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  leftLabel = 'Flight Navigation',
  homeHref = '/',
  logoSrc = 'https://res.cloudinary.com/dtkhwq0je/image/upload/v1769378182/Asset_1_dhwm3l.png',
  logoAlt = 'Flight',
  scrollBehavior = {},
  menuAppear = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCruise, setIsCruise] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    hideOnScrollDown = false,
    cruiseMode = false,
    solidAfterScroll = false,
  } = scrollBehavior;
  const { mode = 'none', direction = 'down' } = menuAppear;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (hideOnScrollDown) {
        if (currentScrollY > lastScrollY && currentScrollY > 16) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      if (cruiseMode) {
        setIsCruise(currentScrollY > 8);
      } else {
        setIsCruise(false);
      }

      if (solidAfterScroll) {
        setIsScrolled(currentScrollY > 8);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnScrollDown, cruiseMode, solidAfterScroll]);

  const navVisibilityClass = hideOnScrollDown && isHidden ? '-translate-y-full' : 'translate-y-0';
  const navHeightClass = cruiseMode && isCruise ? 'h-12' : 'h-16';
  const navSurfaceClass = solidAfterScroll
    ? isScrolled
      ? 'bg-black/90'
      : 'bg-transparent'
    : 'bg-black/35 backdrop-blur-2xl backdrop-brightness-65';
  const directionMap = {
    up: '-translate-y-8',
    down: 'translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
  };
  const slideHiddenClass = directionMap[direction] || directionMap.down;
  const drawerOpenClass = isOpen ? 'opacity-100 pointer-events-auto translate-x-0 translate-y-0' : '';
  const drawerClosedClass =
    mode === 'fadeTop'
      ? 'opacity-0 pointer-events-none -translate-y-6'
      : mode === 'slide'
        ? `opacity-0 pointer-events-none ${slideHiddenClass}`
        : 'opacity-0 pointer-events-none';
  const drawerMotionClass =
    mode === 'none'
      ? ''
      : mode === 'fadeTop'
        ? 'transition-all duration-300 ease-out'
        : 'transition-all duration-300 ease-in-out';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navVisibilityClass} ${navSurfaceClass} shadow-[0_12px_40px_rgba(0,0,0,0.18)]`}>
        <div id="nav-shell" className="w-full px-2 sm:px-4 lg:px-6">
          <div id="nav-row" className={`flex justify-between items-center ${navHeightClass}`}>
            {/* Left: Globe + Label */}
            <div id="nav-left" className="flex-1 flex items-center gap-2 text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9Z" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-[var(--font-dm-sans)] text-sm font-extralight tracking-wide text-white">
                {leftLabel}
              </span>
            </div>

            {/* Center: Logo/Brand */}
            <div id="nav-center" className="flex-1 flex justify-center">
              <Link href={homeHref} aria-label="Go to home">
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Menu Toggle */}
            <div id="nav-right" className="flex-1 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group inline-flex items-center justify-center px-4 py-2 rounded-md text-white/70 hover:text-white focus:outline-none transition-colors duration-300"
                aria-label="Toggle drawer menu"
              >
                <span className="text-lg font-semibold text-white/70 group-hover:text-white underline-offset-4 group-hover:underline">
                  {isOpen ? "Close" : "Menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Drawer Menu */}
      <div
        id="drawer"
        className={`fixed top-16 left-0 right-0 bottom-0 z-30 bg-[#FAF9F5] ${drawerMotionClass} ${
          isOpen ? drawerOpenClass : drawerClosedClass
        }`}
      >
        <div id="drawer-content" className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-[var(--font-dm-sans)] text-4xl font-light text-[#1b1a16] hover:text-[#8f7220] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
{% endcodeblock %}

{% codeblock { lang: "tsx", title: "Usage", framework: "Next.js + React" } %}
import { Flight } from "@/components/flight";

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Archive", href: "/archive" },
];

const scrollBehavior = {
  hideOnScrollDown: true,
  cruiseMode: true,
  solidAfterScroll: true,
};

const menuAppear = {
  mode: "slide",
  direction: "down",
};

export default function HomePage() {
  return (
    <>
      <Flight
        navItems={navItems}
        leftLabel="Webstaurants"
        homeHref="/"
        logoSrc="https://res.cloudinary.com/dtkhwq0je/image/upload/v1769378182/Asset_1_dhwm3l.png"
        logoAlt="Webstaurants logo"
        scrollBehavior={scrollBehavior}
        menuAppear={menuAppear}
      />
      <main className="pt-16">{/* page content */}</main>
    </>
  );
}
{% endcodeblock %}

</div>

<div data-framework-panel="vite" hidden>
{% codeblock { lang: "jsx", title: "Flight Component", framework: "Vite + React" } %}
import { useEffect, useState } from 'react';

export function Flight({
  navItems = [
    { label: 'Studio', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  leftLabel = 'Flight Navigation',
  homeHref = '/',
  logoSrc = 'https://res.cloudinary.com/dtkhwq0je/image/upload/v1769378182/Asset_1_dhwm3l.png',
  logoAlt = 'Flight',
  scrollBehavior = {},
  menuAppear = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCruise, setIsCruise] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    hideOnScrollDown = false,
    cruiseMode = false,
    solidAfterScroll = false,
  } = scrollBehavior;
  const { mode = 'none', direction = 'down' } = menuAppear;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (hideOnScrollDown) {
        if (currentScrollY > lastScrollY && currentScrollY > 16) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      if (cruiseMode) {
        setIsCruise(currentScrollY > 8);
      } else {
        setIsCruise(false);
      }

      if (solidAfterScroll) {
        setIsScrolled(currentScrollY > 8);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnScrollDown, cruiseMode, solidAfterScroll]);

  const navVisibilityClass = hideOnScrollDown && isHidden ? '-translate-y-full' : 'translate-y-0';
  const navHeightClass = cruiseMode && isCruise ? 'h-12' : 'h-16';
  const navSurfaceClass = solidAfterScroll
    ? isScrolled
      ? 'bg-black/90'
      : 'bg-transparent'
    : 'bg-black/35 backdrop-blur-2xl backdrop-brightness-65';
  const directionMap = {
    up: '-translate-y-8',
    down: 'translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
  };
  const slideHiddenClass = directionMap[direction] || directionMap.down;
  const drawerOpenClass = isOpen ? 'opacity-100 pointer-events-auto translate-x-0 translate-y-0' : '';
  const drawerClosedClass =
    mode === 'fadeTop'
      ? 'opacity-0 pointer-events-none -translate-y-6'
      : mode === 'slide'
        ? `opacity-0 pointer-events-none ${slideHiddenClass}`
        : 'opacity-0 pointer-events-none';
  const drawerMotionClass =
    mode === 'none'
      ? ''
      : mode === 'fadeTop'
        ? 'transition-all duration-300 ease-out'
        : 'transition-all duration-300 ease-in-out';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navVisibilityClass} ${navSurfaceClass} shadow-[0_12px_40px_rgba(0,0,0,0.18)]`}>
        <div id="nav-shell" className="w-full px-2 sm:px-4 lg:px-6">
          <div id="nav-row" className={`flex justify-between items-center ${navHeightClass}`}>
            <div id="nav-left" className="flex-1 flex items-center gap-2 text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9Z" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-[var(--font-dm-sans)] text-sm font-extralight tracking-wide text-white">
                {leftLabel}
              </span>
            </div>

            <div id="nav-center" className="flex-1 flex justify-center">
              <a href={homeHref} aria-label="Go to home">
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-8 w-auto"
                />
              </a>
            </div>

            <div id="nav-right" className="flex-1 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group inline-flex items-center justify-center px-4 py-2 rounded-md text-white/70 hover:text-white focus:outline-none transition-colors duration-300"
                aria-label="Toggle drawer menu"
              >
                <span className="text-lg font-semibold text-white/70 group-hover:text-white underline-offset-4 group-hover:underline">
                  {isOpen ? "Close" : "Menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="drawer"
        className={`fixed top-16 left-0 right-0 bottom-0 z-30 bg-[#FAF9F5] ${drawerMotionClass} ${
          isOpen ? drawerOpenClass : drawerClosedClass
        }`}
      >
        <div id="drawer-content" className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-[var(--font-dm-sans)] text-4xl font-light text-[#1b1a16] hover:text-[#8f7220] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
{% endcodeblock %}
</div>
<script src="/assets/flight-framework-toggle.js"></script>

{% codeblock { lang: "css", title: "Flight Styles", framework: "CSS" } %}
/*
  Current Flight component styling is mostly inline Tailwind utility classes.
  This is a separated CSS version you can use as a base if you want to move styles out of JSX.
*/

#nav-shell {
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media (min-width: 640px) {
  #nav-shell {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 1024px) {
  #nav-shell {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

#nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

#nav-left,
#nav-center,
#nav-right {
  flex: 1;
}

#nav-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

#nav-center {
  display: flex;
  justify-content: center;
}

#nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

#drawer {
  position: fixed;
  top: 4rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

#drawer.is-open {
  background-color: #faf9f5;
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

#drawer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

{% endcodeblock %}
