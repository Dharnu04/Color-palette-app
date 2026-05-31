import { useEffect, useRef, useState } from "react";

import DesignSystem from "./components/DesignSystem";
import Header from "./components/Header";
import GeneratorBox from "./components/GeneratorBox";
import CurrentPalette from "./components/CurrentPalette";
import Feed from "./components/Feed";
import Recents from "./components/Recents";
import Favorites from "./components/Favorites";
import Gradients from "./components/Gradients";
import ContrastChecker from "./components/ContrastChecker";
import Explore from "./components/Explore";
import ThemeToggle from "./components/ThemeToggle";
import ShortcutsModal from "./components/ShortcutsModal";
import Trending from "./components/Trending";
import PaletteMixer from "./components/PaletteMixer";
import FontPairings from "./components/FontPairings";
import BrandKit from "./components/BrandKit";
import BrandBoard from "./components/BrandBoard";
import SocialPreview from "./components/SocialPreview";

import { generateRandomPalette } from "./utils/generatePalette";
import { extractPaletteFromImage } from "./utils/imagePalette";
import { generatePaletteName } from "./utils/namePalette";
import {
  getStoredRecents,
  saveStoredRecents,
  clearStoredRecents,
  getStoredFavorites,
  saveStoredFavorites,
  clearStoredFavorites,
} from "./utils/storage";

const SECTION_TABS = {
  discover: [
    ["popular", "Popular"],
    ["explore", "Explore"],
    ["trending", "Trending"],
  ],
  create: [
    ["mixer", "Mixer"],
    ["gradients", "Gradients"],
    ["contrast", "Contrast"],
  ],
  brand: [
    ["fonts", "Fonts"],
    ["brandkit", "Brand Kit"],
    ["board", "Brand Board"],
    ["designsystem", "Design System"],
  ],
  library: [
    ["favorites", "Favorites"],
    ["recents", "Recents"],
  ],
};

export default function App() {
  const fileInputRef = useRef(null);
  const dragIndex = useRef(null);

  const [activeSection, setActiveSection] = useState("discover");
  const [activeSubTab, setActiveSubTab] = useState("popular");
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("palette-theme") || "light"
  );

  const [seed, setSeed] = useState("creative-studio");

  const [currentColors, setCurrentColors] = useState(() =>
    generateRandomPalette("creative-studio")
  );

  const [paletteName, setPaletteName] = useState(() =>
    generatePaletteName(currentColors)
  );

  const [lockedColors, setLockedColors] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [recents, setRecents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [copiedColor, setCopiedColor] = useState("");
  const [status, setStatus] = useState("Press spacebar to generate instantly.");

  useEffect(() => {
    setRecents(getStoredRecents());
    setFavorites(getStoredFavorites());
  }, []);

  useEffect(() => {
    setPaletteName(generatePaletteName(currentColors));
  }, [currentColors]);

  useEffect(() => {
    localStorage.setItem("palette-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const saveRecent = (colors, source = "Generated") => {
    const item = {
      id: `${Date.now()}-${colors.join("")}`,
      title: source,
      colors,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [
      item,
      ...recents.filter((entry) => entry.colors.join("") !== colors.join("")),
    ].slice(0, 12);

    setRecents(updated);
    saveStoredRecents(updated);
  };

  const applyPaletteWithLocks = (newPalette) => {
    const merged = currentColors.map((color, index) =>
      lockedColors[index] ? color : newPalette[index]
    );

    setCurrentColors(merged);
    saveRecent(merged, "Generated with locks");
  };

  const handleSeedGenerate = () => {
    const value = seed.trim() || Date.now().toString();
    const palette = generateRandomPalette(value);

    applyPaletteWithLocks(palette);
    setStatus(`Generated from seed: ${value}`);
  };

  const handleRandomGenerate = () => {
    const randomSeed = Math.random().toString(36).slice(2, 10);
    const palette = generateRandomPalette(randomSeed);

    setSeed(randomSeed);
    applyPaletteWithLocks(palette);
    setStatus("Fresh palette generated. Press spacebar again.");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setStatus("Extracting colors from image...");

      const palette = await extractPaletteFromImage(file);

      setCurrentColors(palette);
      saveRecent(palette, `Image: ${file.name}`);
      setStatus(`Palette extracted from ${file.name}`);
    } catch (error) {
      setStatus(error.message || "Could not extract palette.");
    } finally {
      event.target.value = "";
    }
  };

  const copyColor = async (color) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(color);

    setTimeout(() => {
      setCopiedColor("");
    }, 1200);
  };

  const copyPalette = async (colors) => {
    await navigator.clipboard.writeText(colors.join(", "));
    setStatus("Palette copied.");
  };

  const usePalette = (colors, title = "Feed palette") => {
    setCurrentColors(colors);
    setLockedColors([false, false, false, false, false]);
    saveRecent(colors, title);
    setStatus(`${title} loaded.`);
  };

  const favoritePalette = (palette) => {
    const item = {
      id: `${Date.now()}-${palette.colors.join("")}`,
      title: palette.title || "Favorite palette",
      colors: palette.colors,
      createdAt: new Date().toLocaleString(),
    };

    const exists = favorites.some(
      (entry) => entry.colors.join("") === palette.colors.join("")
    );

    if (exists) {
      setStatus("Palette already exists in favorites.");
      return;
    }

    const updated = [item, ...favorites].slice(0, 24);

    setFavorites(updated);
    saveStoredFavorites(updated);
    setStatus(`${item.title} added to favorites.`);
  };

  const favoriteCurrentPalette = () => {
    favoritePalette({
      title: paletteName,
      colors: currentColors,
    });
  };

  const openFavorite = (item) => {
    setCurrentColors(item.colors);
    setStatus(`${item.title} opened from favorites.`);
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    saveStoredFavorites(updated);
  };

  const clearFavorites = () => {
    setFavorites([]);
    clearStoredFavorites();
  };

  const toggleLock = (index) => {
    setLockedColors((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleDragStart = (index) => {
    dragIndex.current = index;
  };

  const handleDrop = (dropIndex) => {
    const startIndex = dragIndex.current;

    if (startIndex === null || startIndex === dropIndex) return;

    const updatedColors = [...currentColors];
    const updatedLocks = [...lockedColors];

    const [movedColor] = updatedColors.splice(startIndex, 1);
    const [movedLock] = updatedLocks.splice(startIndex, 1);

    updatedColors.splice(dropIndex, 0, movedColor);
    updatedLocks.splice(dropIndex, 0, movedLock);

    setCurrentColors(updatedColors);
    setLockedColors(updatedLocks);
    dragIndex.current = null;
  };

  const openRecent = (item) => {
    setCurrentColors(item.colors);
    setStatus(`${item.title} restored.`);
  };

  const clearRecents = () => {
    setRecents([]);
    clearStoredRecents();
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const changeSection = (section) => {
    setActiveSection(section);
    setActiveSubTab(SECTION_TABS[section][0][0]);
  };

  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      const tag = event.target.tagName;

      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (event.key === "Escape") {
        setIsShortcutsOpen(false);
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        setIsShortcutsOpen(true);
        return;
      }

      if (isShortcutsOpen) return;

      if (event.code === "Space") {
        event.preventDefault();
        handleRandomGenerate();
      }

      if (event.key.toLowerCase() === "d") toggleTheme();

      if (event.key.toLowerCase() === "f") favoriteCurrentPalette();
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => window.removeEventListener("keydown", handleKeyboardShortcuts);
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950 transition dark:bg-slate-950 dark:text-slate-50">
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header currentColors={currentColors} paletteName={paletteName} />

        <section className="mb-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <GeneratorBox
            seed={seed}
            setSeed={setSeed}
            status={status}
            fileInputRef={fileInputRef}
            onSeedGenerate={handleSeedGenerate}
            onRandomGenerate={handleRandomGenerate}
            onImageUpload={handleImageUpload}
          />

          <CurrentPalette
            colors={currentColors}
            paletteName={paletteName}
            lockedColors={lockedColors}
            copiedColor={copiedColor}
            onCopyColor={copyColor}
            onToggleLock={toggleLock}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            setStatus={setStatus}
          />
        </section>

        <nav className="mb-4 flex w-fit flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-900">
          {[
            ["discover", "Discover"],
            ["create", "Create"],
            ["brand", "Brand"],
            ["library", "Library"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeSection(key)}
              className={`rounded-xl px-5 py-2.5 text-sm font-black ${
                activeSection === key
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <nav className="mb-6 flex w-fit flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-900">
          {SECTION_TABS[activeSection].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${
                activeSubTab === key
                  ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeSection === "discover" && activeSubTab === "popular" && (
          <Feed
            onUsePalette={usePalette}
            onCopyPalette={copyPalette}
            onFavoritePalette={favoritePalette}
          />
        )}

        {activeSection === "discover" && activeSubTab === "explore" && (
          <Explore
            onUsePalette={usePalette}
            onCopyPalette={copyPalette}
            onFavoritePalette={favoritePalette}
          />
        )}

        {activeSection === "discover" && activeSubTab === "trending" && (
          <Trending
            onUsePalette={usePalette}
            onCopyPalette={copyPalette}
            onFavoritePalette={favoritePalette}
          />
        )}

        {activeSection === "create" && activeSubTab === "mixer" && (
          <PaletteMixer
            favorites={favorites}
            onUsePalette={usePalette}
            onCopyPalette={copyPalette}
            onFavoritePalette={favoritePalette}
            setStatus={setStatus}
          />
        )}

        {activeSection === "create" && activeSubTab === "gradients" && (
          <Gradients
            colors={currentColors}
            onRandomGenerate={handleRandomGenerate}
            setStatus={setStatus}
          />
        )}

        {activeSection === "create" && activeSubTab === "contrast" && (
          <ContrastChecker colors={currentColors} setStatus={setStatus} />
        )}

        {activeSection === "create" && activeSubTab === "designsystem" && (
          <DesignSystem paletteName={paletteName} colors={currentColors} />
        )}

        {activeSection === "brand" && activeSubTab === "fonts" && (
          <FontPairings
            paletteName={paletteName}
            colors={currentColors}
            setStatus={setStatus}
          />
        )}

        {activeSection === "brand" && activeSubTab === "brandkit" && (
          <BrandKit
            paletteName={paletteName}
            colors={currentColors}
            setStatus={setStatus}
          />
        )}

        {activeSection === "brand" && activeSubTab === "board" && (
          <BrandBoard
            paletteName={paletteName}
            colors={currentColors}
            setStatus={setStatus}
          />
        )}

        {activeSection === "brand" && activeSubTab === "designsystem" && (
          <DesignSystem paletteName={paletteName} colors={currentColors} />
        )}

        {activeSection === "library" && activeSubTab === "favorites" && (
          <Favorites
            favorites={favorites}
            onOpenFavorite={openFavorite}
            onRemoveFavorite={removeFavorite}
            onClearFavorites={clearFavorites}
          />
        )}

        {activeSection === "library" && activeSubTab === "recents" && (
          <Recents
            recents={recents}
            onOpenRecent={openRecent}
            onClearRecents={clearRecents}
          />
        )}
      </section>
    </main>
  );
}