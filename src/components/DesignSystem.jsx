import { useState } from "react";
import {
  BarChart3,
  Bell,
  Check,
  CreditCard,
  LayoutDashboard,
  Mail,
  Search,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { getSuggestedFonts } from "../utils/fontMatcher";
import { getBrandPersonality } from "../utils/personalityUtils";

export default function DesignSystem({ paletteName, colors }) {
  const [view, setView] = useState("saas");

  const fonts = getSuggestedFonts(paletteName);
  const personality = getBrandPersonality(colors);

  const primary = colors[0];
  const secondary = colors[1];
  const accent = colors[2];
  const surface = colors[3];
  const text = colors[4];

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Design System Generator
          </p>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            See your palette in real UI layouts.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Preview buttons, cards, forms, dashboards, and website sections
            using your current palette and brand direction.
          </p>
        </div>

        <div className="flex w-fit rounded-2xl bg-slate-100 p-1 dark:bg-slate-950">
          <button
            onClick={() => setView("saas")}
            className={`rounded-xl px-4 py-2 text-sm font-black ${
              view === "saas"
                ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            SaaS UI
          </button>

          <button
            onClick={() => setView("brand")}
            className={`rounded-xl px-4 py-2 text-sm font-black ${
              view === "brand"
                ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Brand Website
          </button>
        </div>
      </div>

      {view === "saas" ? (
        <SaasPreview
          paletteName={paletteName}
          primary={primary}
          secondary={secondary}
          accent={accent}
          surface={surface}
          text={text}
          fonts={fonts}
          personality={personality}
        />
      ) : (
        <BrandWebsitePreview
          paletteName={paletteName}
          primary={primary}
          secondary={secondary}
          accent={accent}
          surface={surface}
          text={text}
          fonts={fonts}
          personality={personality}
        />
      )}
    </section>
  );
}

function SaasPreview({
  paletteName,
  primary,
  secondary,
  accent,
  surface,
  text,
  fonts,
  personality,
}) {
  return (
    <div
      className="overflow-hidden rounded-[2rem] border border-slate-200"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div
        className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between"
        style={{
          backgroundColor: primary,
          color: text,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: accent, color: primary }}
          >
            <LayoutDashboard size={20} />
          </div>

          <div>
            <h3 className="font-black">{paletteName}</h3>
            <p className="text-xs opacity-70">{fonts.style}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-bold opacity-90">
          <span>Dashboard</span>
          <span>Projects</span>
          <span>Analytics</span>
          <span>Settings</span>
        </div>

        <button
          className="rounded-full px-5 py-2 text-sm font-black"
          style={{ backgroundColor: accent, color: primary }}
        >
          Upgrade
        </button>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Revenue", "₹4.8L", "+18%", BarChart3],
              ["Users", "12.4K", "+9%", Users],
              ["Security", "98%", "Stable", Shield],
              ["Tasks", "76", "Active", Check],
            ].map(([label, value, meta, Icon]) => (
              <div key={label} className="rounded-3xl bg-white p-5 shadow-sm">
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: surface, color: primary }}
                >
                  <Icon size={18} />
                </div>

                <p className="text-sm font-bold text-slate-500">{label}</p>
                <h4 className="mt-1 text-2xl font-black text-slate-950">
                  {value}
                </h4>
                <p className="mt-2 text-xs font-black" style={{ color: accent }}>
                  {meta}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Product Overview
                </p>
                <h4 className="text-2xl font-black text-slate-950">
                  Design activity
                </h4>
              </div>

              <button
                className="rounded-full px-4 py-2 text-sm font-black text-white"
                style={{ backgroundColor: primary }}
              >
                View Report
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {["Brand kit", "UI tokens", "Social preview"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: index === 1 ? primary : "#f8fafc",
                    color: index === 1 ? text : "#020617",
                  }}
                >
                  <p className="text-sm font-black">{item}</p>
                  <p className="mt-2 text-xs opacity-70">
                    Generated from your current palette.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm font-black text-slate-500">
                Form Components
              </p>

              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                  <Search size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-400">
                    Search projects
                  </span>
                </div>

                <input
                  readOnly
                  value="hello@brand.com"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 outline-none"
                />

                <textarea
                  readOnly
                  value="Build a clear and consistent visual system."
                  className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm font-black text-slate-500">
                Pricing Card
              </p>

              <div
                className="rounded-3xl p-5"
                style={{ backgroundColor: primary, color: text }}
              >
                <p className="text-sm font-bold opacity-70">Professional</p>
                <h4 className="mt-2 text-4xl font-black">₹2,999</h4>
                <p className="mt-2 text-sm opacity-70">per project kit</p>

                <button
                  className="mt-6 w-full rounded-full px-5 py-3 text-sm font-black"
                  style={{ backgroundColor: accent, color: primary }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-5">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bell size={16} style={{ color: accent }} />
              <p className="font-black text-slate-950">Notifications</p>
            </div>

            {personality.tone.map((tone) => (
              <div key={tone} className="mb-3 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-800">{tone}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Brand personality match
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-3xl p-5 shadow-sm"
            style={{ backgroundColor: secondary, color: text }}
          >
            <CreditCard size={20} />
            <h4 className="mt-5 text-2xl font-black">Premium UI</h4>
            <p className="mt-2 text-sm opacity-75">
              A polished interface theme from your current palette.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BrandWebsitePreview({
  paletteName,
  primary,
  secondary,
  accent,
  surface,
  text,
  fonts,
  personality,
}) {
  return (
    <div
      className="overflow-hidden rounded-[2rem] border border-slate-200"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="p-8 md:p-12"
        style={{ backgroundColor: primary, color: text }}
      >
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-xl font-black">{paletteName}</div>

          <div className="flex flex-wrap gap-4 text-sm font-bold opacity-80">
            <span>Work</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>

        <div className="max-w-3xl">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black"
            style={{ backgroundColor: accent, color: primary }}
          >
            <Sparkles size={15} />
            {fonts.style}
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Build a brand that feels instantly recognizable.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-80">
            A visual direction shaped by your colors, typography, and brand
            personality.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="rounded-full px-6 py-3 text-sm font-black"
              style={{ backgroundColor: accent, color: primary }}
            >
              Start Project
            </button>

            <button
              className="rounded-full border px-6 py-3 text-sm font-black"
              style={{ borderColor: text, color: text }}
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-3">
        {[
          ["Strategy", Zap],
          ["Identity", Star],
          ["Systems", Shield],
        ].map(([title, Icon], index) => (
          <div
            key={title}
            className="rounded-3xl p-6"
            style={{
              backgroundColor: index === 1 ? primary : "#f8fafc",
              color: index === 1 ? text : "#020617",
            }}
          >
            <div
              className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: accent, color: primary }}
            >
              <Icon size={18} />
            </div>

            <h3 className="text-2xl font-black">{title}</h3>
            <p className="mt-3 text-sm leading-6 opacity-70">
              A reusable section style generated from your current palette.
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 p-5 pt-0 lg:grid-cols-[1fr_0.8fr]">
        <div
          className="rounded-[2rem] p-8"
          style={{ backgroundColor: surface, color: primary }}
        >
          <p className="text-sm font-black uppercase tracking-widest opacity-60">
            Testimonial
          </p>

          <h3 className="mt-6 text-4xl font-black leading-tight">
            “The visual system helped us see the brand clearly before design
            even started.”
          </h3>

          <p className="mt-5 text-sm font-black opacity-70">
            Creative Director, Studio Client
          </p>
        </div>

        <div className="rounded-[2rem] bg-slate-50 p-8">
          <Mail size={22} style={{ color: accent }} />

          <h3 className="mt-5 text-3xl font-black text-slate-950">
            Join the launch list
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Collect leads with a simple section that uses your palette.
          </p>

          <div className="mt-6 flex gap-2 rounded-full bg-white p-2 shadow-sm">
            <input
              readOnly
              value="hello@brand.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold text-slate-500 outline-none"
            />

            <button
              className="rounded-full px-5 py-3 text-sm font-black text-white"
              style={{ backgroundColor: primary }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <footer
        className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
        style={{ backgroundColor: secondary, color: text }}
      >
        <p className="font-black">{paletteName}</p>

        <div className="flex gap-4 text-sm font-bold opacity-75">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Behance</span>
        </div>
      </footer>
    </div>
  );
}