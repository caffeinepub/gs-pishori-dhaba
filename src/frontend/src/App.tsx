import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChefHat,
  Clock,
  Flame,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Star,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ── Animation variants ─────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    } as Transition,
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } as Transition },
};

// ── Menu Data ──────────────────────────────────────────────────
const menuData = {
  Veg: [
    {
      name: "Dal Makhani",
      desc: "Slow-cooked black lentils in buttery tomato gravy",
      price: "₹120",
      image: "/assets/generated/dish-dal-makhani.dim_600x400.jpg",
    },
    {
      name: "Paneer Butter Masala",
      desc: "Cottage cheese in rich creamy tomato sauce",
      price: "₹180",
      image: "/assets/generated/dish-paneer-butter-masala.dim_600x400.jpg",
    },
    {
      name: "Aloo Gobi",
      desc: "Spiced potatoes and cauliflower, home-style",
      price: "₹100",
      image: "/assets/generated/dish-aloo-gobi.dim_600x400.jpg",
    },
    {
      name: "Shahi Paneer",
      desc: "Royal cottage cheese in cashew & cream gravy",
      price: "₹190",
      image: "/assets/generated/dish-shahi-paneer.dim_600x400.jpg",
    },
    {
      name: "Veg Thali",
      desc: "Complete meal: 2 sabzi, dal, rice, roti, salad",
      price: "₹150",
      image: "/assets/generated/dish-veg-thali.dim_600x400.jpg",
    },
  ],
  "Non-Veg": [
    {
      name: "Butter Chicken",
      desc: "Tender chicken in velvety tomato-butter gravy",
      price: "₹220",
      image: "/assets/generated/dish-butter-chicken.dim_600x400.jpg",
    },
    {
      name: "Chicken Curry",
      desc: "Home-style spiced chicken in onion-tomato masala",
      price: "₹200",
      image: "/assets/generated/dish-chicken-curry.dim_600x400.jpg",
    },
    {
      name: "Mutton Rogan Josh",
      desc: "Slow-braised mutton with Kashmiri spices",
      price: "₹280",
      image: "/assets/generated/dish-mutton-rogan-josh.dim_600x400.jpg",
    },
    {
      name: "Chicken Tikka",
      desc: "Charcoal-grilled marinated chicken pieces",
      price: "₹240",
      image: "/assets/generated/dish-chicken-tikka.dim_600x400.jpg",
    },
    {
      name: "Egg Curry",
      desc: "Boiled eggs in bold Punjabi curry",
      price: "₹130",
      image: "/assets/generated/dish-egg-curry.dim_600x400.jpg",
    },
  ],
  Biryani: [
    {
      name: "Karhal Biryani",
      desc: "Signature long-grain rice with aromatic spices",
      price: "₹180",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Soya Chaap Biryani",
      desc: "Vegetarian soya chaap in fragrant biryani",
      price: "₹160",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Chicken Biryani",
      desc: "Dum-cooked chicken with basmati and saffron",
      price: "₹220",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Mutton Biryani",
      desc: "Tender mutton pieces slow-cooked in aged basmati",
      price: "₹260",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Veg Biryani",
      desc: "Seasonal vegetables in saffron-infused basmati",
      price: "₹140",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
  ],
  Chinese: [
    {
      name: "Veg Noodles",
      desc: "Stir-fried noodles with crisp vegetables",
      price: "₹120",
      image: "/assets/generated/dish-veg-noodles.dim_600x400.jpg",
    },
    {
      name: "Chicken Fried Rice",
      desc: "Wok-tossed rice with chicken and egg",
      price: "₹160",
      image: "/assets/generated/dish-chicken-fried-rice.dim_600x400.jpg",
    },
    {
      name: "Manchurian",
      desc: "Crispy fried balls in tangy Manchurian sauce",
      price: "₹140",
      image: "/assets/generated/dish-manchurian.dim_600x400.jpg",
    },
    {
      name: "Spring Rolls",
      desc: "Crispy vegetable rolls with sweet chilli dip",
      price: "₹110",
      image: "/assets/generated/dish-spring-rolls.dim_600x400.jpg",
    },
    {
      name: "Chilli Paneer",
      desc: "Paneer tossed with peppers in spicy chilli sauce",
      price: "₹170",
      image: "/assets/generated/dish-chilli-paneer.dim_600x400.jpg",
    },
  ],
  Tandoori: [
    {
      name: "Paneer Tikka",
      desc: "Marinated cottage cheese grilled in clay oven",
      price: "₹200",
      image: "/assets/generated/dish-paneer-tikka.dim_600x400.jpg",
    },
    {
      name: "Tandoori Chicken",
      desc: "Charcoal-kissed whole chicken marinated overnight",
      price: "₹240",
      image: "/assets/generated/dish-chicken-tikka.dim_600x400.jpg",
      mustOrder: true,
    },
    {
      name: "Seekh Kebab",
      desc: "Spiced minced meat skewers from the clay oven",
      price: "₹260",
      image: "/assets/generated/dish-seekh-kebab.dim_600x400.jpg",
    },
    {
      name: "Tandoori Roti",
      desc: "Whole wheat flatbread baked in tandoor",
      price: "₹20",
      image: "/assets/generated/dish-tandoori-roti.dim_600x400.jpg",
      mustOrder: true,
    },
    {
      name: "Garlic Naan",
      desc: "Buttery garlic-topped leavened bread from tandoor",
      price: "₹40",
      image: "/assets/generated/dish-garlic-naan.dim_600x400.jpg",
    },
  ],
  Beverages: [
    {
      name: "Sweet Lassi",
      desc: "Chilled creamy yogurt drink with a touch of sweetness",
      price: "₹60",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Salted Lassi",
      desc: "Refreshing yogurt drink with hint of cumin",
      price: "₹50",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Masala Chai",
      desc: "Aromatic spiced tea brewed with milk",
      price: "₹30",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Cold Drink",
      desc: "Chilled aerated beverages (Pepsi / 7Up / Limca)",
      price: "₹40",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
    {
      name: "Buttermilk",
      desc: "Light spiced chaach with mint and cumin",
      price: "₹40",
      image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    },
  ],
};

// ── Reviews ────────────────────────────────────────────────────
const reviews = [
  {
    name: "Rahul Mehta",
    stars: 5,
    text: "The Paneer Tikka Masala and Mutton Kabab are absolutely amazing! Authentic Punjabi flavours that remind me of home. Highly recommended.",
    initials: "RM",
  },
  {
    name: "Sanjay Verma",
    stars: 5,
    text: "Very courteous staff — called to place an order and they were so helpful and polite. Food was delivered through Swiggy before time!",
    initials: "SV",
  },
  {
    name: "Deepika Arora",
    stars: 4,
    text: "Reasonably priced for the quality you get. Tandoori Roti and Tandoori Chicken are must-order items. Great value for money.",
    initials: "DA",
  },
  {
    name: "Manish Gupta",
    stars: 4,
    text: "Good food and cozy ambience. WiFi available which is a nice plus. Perfect for a casual dine-in with family. Will visit again!",
    initials: "MG",
  },
];

// ── Stars component ────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= count ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

// ── Section Wrapper ────────────────────────────────────────────
function Section({
  id,
  className,
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`dhaba-section ${className ?? ""}`}
      style={style}
    >
      {children}
    </section>
  );
}

// ── Section Header ─────────────────────────────────────────────
function SectionHeader({
  overline,
  title,
  subtitle,
  dark = false,
  center = true,
}: {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      <motion.span
        variants={fadeUp}
        className="overline-label"
        style={{ color: "var(--dhaba-saffron)" }}
      >
        {overline}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={`font-display text-4xl md:text-5xl font-bold mt-3 leading-tight tracking-tight ${dark ? "text-white" : ""}`}
        style={dark ? {} : { color: "var(--dhaba-crimson)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 font-body max-w-xl ${center ? "mx-auto" : ""} leading-relaxed ${dark ? "text-white/60" : "text-foreground/60"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// ── Main App ───────────────────────────────────────────────────
export default function App() {
  const { actor } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reservation form
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [resGuests, setResGuests] = useState("");
  const [resStatus, setResStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Contact form
  const [ctName, setCtName] = useState("");
  const [ctPhone, setCtPhone] = useState("");
  const [ctMsg, setCtMsg] = useState("");
  const [ctStatus, setCtStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const navLinks = ["Home", "Menu", "Gallery", "Reviews", "Contact"];

  function scrollTo(id: string) {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  async function handleReservation(e: React.FormEvent) {
    e.preventDefault();
    if (!resName || !resPhone || !resDate || !resTime || !resGuests) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!actor) {
      toast.error("Connection not ready. Please try again.");
      return;
    }
    setResStatus("loading");
    try {
      await actor.reserveTable(
        resName,
        resPhone,
        resDate,
        resTime,
        BigInt(Number(resGuests)),
      );
      setResStatus("success");
      toast.success("Table reserved! We'll see you soon.");
      setResName("");
      setResPhone("");
      setResDate("");
      setResTime("");
      setResGuests("");
    } catch {
      setResStatus("error");
      toast.error("Failed to reserve. Please try again.");
    }
  }

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    if (!ctName || !ctPhone || !ctMsg) {
      toast.error("Please fill all contact fields.");
      return;
    }
    if (!actor) {
      toast.error("Connection not ready. Please try again.");
      return;
    }
    setCtStatus("loading");
    try {
      await actor.submitContactForm(ctName, ctPhone, ctMsg);
      setCtStatus("success");
      toast.success("Message sent! We'll get back to you.");
      setCtName("");
      setCtPhone("");
      setCtMsg("");
    } catch {
      setCtStatus("error");
      toast.error("Failed to send. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />

      {/* ── STICKY HEADER ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border/60 shadow-dhaba-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-[4.25rem]">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
              data-ocid="nav.link"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--dhaba-crimson)" }}
              >
                <Flame className="h-4.5 w-4.5 text-white" />
              </div>
              <span
                className="font-display font-bold text-[1.15rem] leading-none tracking-tight"
                style={{ color: "var(--dhaba-crimson)" }}
              >
                Anshu Dhaba
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link)}
                  className="px-4 py-2 text-[0.85rem] font-subhead font-medium text-foreground/65 hover:text-foreground rounded-md transition-colors"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="ml-4 h-9 px-5 text-sm font-subhead font-semibold rounded-lg"
                style={{ background: "var(--dhaba-crimson)" }}
                data-ocid="nav.primary_button"
              >
                Book a Table
              </Button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-border/60 bg-white px-6 py-4"
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link)}
                  className="block w-full text-left py-3 text-[0.9rem] font-subhead font-medium text-foreground/75 hover:text-foreground border-b border-border/40 last:border-0 transition-colors"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="w-full mt-4 font-subhead font-semibold"
                style={{ background: "var(--dhaba-crimson)" }}
                data-ocid="nav.primary_button"
              >
                Book a Table
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/anshu-dhaba-hero.dim_1200x700.jpg')",
          }}
        />
        {/* Rich layered overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, oklch(0.14 0.06 22 / 0.82) 0%, oklch(0.1 0.04 20 / 0.92) 60%, oklch(0.08 0.03 18 / 0.96) 100%)",
          }}
        />
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 80px, oklch(1 0 0 / 0.015) 80px, oklch(1 0 0 / 0.015) 81px)",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 font-subhead text-[0.7rem] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-white/25 text-white/75 bg-white/5 backdrop-blur-sm">
                <ChefHat className="h-3 w-3" />
                Since 1990 · Pushp Vihar, Delhi
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-5"
            >
              Anshu
              <br />
              <span style={{ color: "var(--dhaba-saffron)" }}>Dhaba</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-white/70 max-w-lg mx-auto mb-10 leading-relaxed"
            >
              Authentic Taste of India — Punjabi, Mughlai, North Indian, Chinese
              &amp; Thai
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                onClick={() => scrollTo("menu")}
                className="h-13 px-9 text-[0.95rem] font-subhead font-bold rounded-xl"
                style={{ background: "var(--dhaba-crimson)", color: "white" }}
              >
                Explore the Menu
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="h-13 px-9 text-[0.95rem] font-subhead font-bold rounded-xl border-white/30 text-white bg-white/8 hover:bg-white/15 backdrop-blur-sm"
              >
                Reserve a Table
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-16 inline-flex flex-col sm:flex-row items-center gap-0 rounded-2xl overflow-hidden border border-white/15 bg-white/6 backdrop-blur-md"
            >
              {[
                { label: "Rating", value: "4.3★" },
                { label: "Price for Two", value: "₹350" },
                { label: "Established", value: "1990" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-8 py-5 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-white/12" : ""}`}
                >
                  <span
                    className="font-display text-2xl font-bold leading-none mb-1"
                    style={{ color: "var(--dhaba-saffron)" }}
                  >
                    {s.value}
                  </span>
                  <span className="font-subhead text-[0.65rem] font-bold tracking-widest uppercase text-white/45">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 7, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.2,
            ease: "easeInOut",
          }}
        >
          <div className="w-5 h-9 rounded-full border border-white/35 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <Section id="about" className="bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 90% 40%, oklch(0.72 0.17 48 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp}
                className="overline-label"
                style={{ color: "var(--dhaba-saffron)" }}
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight tracking-tight"
                style={{ color: "var(--dhaba-crimson)" }}
              >
                A Legacy of
                <br />
                Authentic Flavours
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-foreground/70 text-[1.05rem] leading-relaxed mb-5"
              >
                <strong className="text-foreground/90">Anshu Dhaba</strong> has
                been serving authentic North Indian cuisine since{" "}
                <strong className="text-foreground/90">1990</strong>. Located in
                Pushp Vihar Sector 4, near Amity International School, we are a
                beloved family restaurant known for our Tandoori Roti and
                Tandoori Chicken.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-foreground/70 text-[1.05rem] leading-relaxed mb-10"
              >
                Every dish is prepared with fresh ingredients and traditional
                spices, spanning Chinese, Punjabi, Mughlai, North Indian and
                Thai cuisines. WiFi available. Whether you're here for a quick
                bite or a full family dinner — you're always welcome.
              </motion.p>

              {/* Stat pills */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 mb-10"
              >
                {[
                  { icon: Star, label: "4.3 Star Rating" },
                  { icon: Flame, label: "₹350 for Two" },
                  { icon: ChefHat, label: "Since 1990" },
                  { icon: Wifi, label: "Free WiFi" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-white shadow-dhaba-sm"
                  >
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--dhaba-crimson)" }}
                    />
                    <span className="font-subhead font-semibold text-[0.8rem] text-foreground/80">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  onClick={() => scrollTo("menu")}
                  size="lg"
                  className="font-subhead font-bold rounded-xl px-8"
                  style={{ background: "var(--dhaba-crimson)" }}
                >
                  View Full Menu
                </Button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-dhaba-lg aspect-[4/3]">
                <img
                  src="/assets/generated/dhaba-interior.dim_600x400.jpg"
                  alt="Anshu Dhaba Interior"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.14 0.04 20 / 0.5) 0%, transparent 50%)",
                  }}
                />
                {/* Badge overlay */}
                <div
                  className="absolute bottom-5 left-5 rounded-xl px-4 py-3 shadow-dhaba-md backdrop-blur-sm"
                  style={{ background: "oklch(0.38 0.2 18 / 0.9)" }}
                >
                  <p className="text-white font-display font-bold text-base leading-tight">
                    Anshu Dhaba, Delhi
                  </p>
                  <p className="text-white/75 text-[0.78rem] font-body mt-0.5">
                    Authentic North Indian Cuisine
                  </p>
                </div>
              </div>

              {/* Floating accent */}
              <div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-2xl flex items-center justify-center shadow-dhaba-md rotate-6"
                style={{ background: "var(--dhaba-saffron)" }}
              >
                <Flame className="h-9 w-9 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── MENU ───────────────────────────────────────────────── */}
      <Section
        id="menu"
        className="relative"
        style={{
          background:
            "linear-gradient(155deg, oklch(0.14 0.05 20) 0%, oklch(0.19 0.06 26) 50%, oklch(0.16 0.04 22) 100%)",
        }}
      >
        {/* Subtle noise */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <SectionHeader
            overline="Our Specialities"
            title="The Menu"
            subtitle="From slow-cooked curries to fresh-from-tandoor breads — every dish tells a story."
            dark
            center
          />

          {/* Quick badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-2 mb-10 -mt-6"
          >
            {[
              {
                icon: "⭐",
                label: "Must Order",
                value: "Tandoori Roti & Chicken",
              },
              { icon: "💰", label: "Price for Two", value: "₹350" },
              { icon: "🕐", label: "Opens", value: "11:30 AM" },
              { icon: "📶", label: "WiFi", value: "Available" },
            ].map((info) => (
              <motion.div
                key={info.label}
                variants={fadeUp}
                className="flex items-center gap-2 text-[0.75rem] font-subhead font-medium px-4 py-2 rounded-full border border-white/12 bg-white/6 text-white/65"
              >
                <span>{info.icon}</span>
                <span className="text-white/40">{info.label}:</span>
                <span className="text-white/80">{info.value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="Veg" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 h-auto mb-10 bg-white/6 p-1.5 rounded-xl border border-white/10 w-fit mx-auto">
              {Object.keys(menuData).map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="menu.tab"
                  className="font-subhead font-semibold text-[0.82rem] data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-dhaba-sm text-white/55 rounded-lg px-5 py-2 transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(menuData).map(([cat, items]) => (
              <TabsContent key={cat} value={cat}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {items.map((item) => (
                    <motion.div key={item.name} variants={fadeUp}>
                      <Card className="menu-card overflow-hidden bg-white/7 border border-white/10 text-white rounded-xl">
                        {"image" in item && item.image && (
                          <div className="h-44 overflow-hidden relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {"mustOrder" in item && item.mustOrder && (
                              <span className="absolute top-3 right-3 font-subhead text-[0.65rem] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-amber-400 text-amber-900">
                                Must Order
                              </span>
                            )}
                          </div>
                        )}
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display font-bold text-[1.1rem] leading-snug text-white">
                              {item.name}
                            </h3>
                            <span
                              className="font-subhead font-bold text-base shrink-0 mt-0.5"
                              style={{ color: "var(--dhaba-saffron)" }}
                            >
                              {item.price}
                            </span>
                          </div>
                          <p className="font-body text-[0.82rem] text-white/55 mt-2 leading-relaxed">
                            {item.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Section>

      {/* ── GALLERY ────────────────────────────────────────────── */}
      <Section id="gallery" className="bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader overline="A Glimpse" title="Food Gallery" center />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {[
              {
                id: "feast",
                src: "/assets/generated/anshu-dhaba-hero.dim_1200x700.jpg",
                alt: "Authentic North Indian Feast",
                span: "md:col-span-2",
              },
              {
                id: "interior",
                src: "/assets/generated/dhaba-interior.dim_600x400.jpg",
                alt: "Dhaba Interior",
                span: "",
              },
              {
                id: "butter-chicken",
                src: "/assets/generated/dish-butter-chicken.dim_600x400.jpg",
                alt: "Butter Chicken",
                span: "",
              },
              {
                id: "paneer-tikka",
                src: "/assets/generated/dish-paneer-tikka.dim_600x400.jpg",
                alt: "Paneer Tikka",
                span: "",
              },
              {
                id: "biryani",
                src: "/assets/generated/dish-biryani.dim_600x400.jpg",
                alt: "Biryani",
                span: "md:col-span-2",
              },
            ].map((img) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                className={`gallery-item relative overflow-hidden rounded-xl aspect-video ${img.span} shadow-dhaba-sm`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-subhead font-semibold text-[0.8rem] tracking-wide">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── REVIEWS ────────────────────────────────────────────── */}
      <Section
        id="reviews"
        style={{
          background: "oklch(0.97 0.012 72)",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            overline="Happy Diners"
            title="What Our Guests Say"
            center
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                data-ocid={`reviews.item.${idx + 1}`}
              >
                <Card className="h-full shadow-dhaba-sm hover:shadow-dhaba-md transition-shadow duration-300 bg-white border border-border/60 rounded-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Stars count={review.stars} />
                    <p className="font-body text-foreground/65 mt-4 flex-1 leading-relaxed text-[0.88rem] italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border/50">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[0.8rem] text-white shrink-0"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-subhead font-semibold text-[0.88rem] text-foreground">
                          {review.name}
                        </p>
                        <p className="font-body text-[0.75rem] text-muted-foreground">
                          Verified Diner
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CONTACT & RESERVATION ─────────────────────────────── */}
      <Section id="contact" className="bg-background relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 10% 80%, oklch(0.38 0.2 18 / 0.04) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            overline="Visit Us"
            title="Reservation & Contact"
            center
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column — Info + Message */}
            <div className="space-y-6">
              {/* Address & Info Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Card
                  className="border-none shadow-dhaba-sm rounded-xl overflow-hidden"
                  style={{ background: "var(--dhaba-amber)" }}
                >
                  <CardContent className="p-6 space-y-5">
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--dhaba-crimson)" }}
                    >
                      Find Us
                    </h3>

                    {/* Address */}
                    <div className="flex gap-3 items-start">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        <MapPin className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-subhead font-bold text-[0.78rem] uppercase tracking-wider mb-1"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          Address
                        </p>
                        <p className="font-body text-[0.85rem] text-foreground/70 leading-relaxed">
                          Shop No-7, Near Amity International School, Main
                          Market, Pushp Vihar Sector 4, Delhi-110017
                        </p>
                      </div>
                    </div>

                    {/* Phone numbers — prominently displayed */}
                    <div className="flex gap-3 items-start">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        <Phone className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-subhead font-bold text-[0.78rem] uppercase tracking-wider mb-2.5"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          Phone
                        </p>
                        <div className="flex flex-col gap-2">
                          <a
                            href="tel:+917041960702"
                            className="phone-badge w-fit"
                          >
                            <Phone className="h-3 w-3 shrink-0" />
                            +91 70419 60702
                          </a>
                          <a
                            href="tel:+917947128204"
                            className="phone-badge w-fit"
                          >
                            <Phone className="h-3 w-3 shrink-0" />
                            +91 79 4712 8204
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-3 items-start">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        <Clock className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-subhead font-bold text-[0.78rem] uppercase tracking-wider mb-1"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          Hours
                        </p>
                        <p className="font-body text-[0.85rem] text-foreground/70 leading-relaxed">
                          Opens at 11:30 AM
                          <br />
                          Delivery · Dine-in · Take Away
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Card className="border border-border/70 shadow-dhaba-sm rounded-xl">
                  <CardContent className="p-6">
                    <h3
                      className="font-display font-bold text-lg mb-5"
                      style={{ color: "var(--dhaba-crimson)" }}
                    >
                      Send a Message
                    </h3>
                    <form onSubmit={handleContact} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="ct-name"
                          className="font-subhead text-[0.8rem] font-semibold"
                        >
                          Your Name
                        </Label>
                        <Input
                          id="ct-name"
                          data-ocid="contact.input"
                          placeholder="Enter your name"
                          value={ctName}
                          onChange={(e) => setCtName(e.target.value)}
                          className="mt-1.5 font-body text-[0.88rem] h-10"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="ct-phone"
                          className="font-subhead text-[0.8rem] font-semibold"
                        >
                          Phone
                        </Label>
                        <Input
                          id="ct-phone"
                          data-ocid="contact.phone.input"
                          placeholder="Your phone number"
                          value={ctPhone}
                          onChange={(e) => setCtPhone(e.target.value)}
                          className="mt-1.5 font-body text-[0.88rem] h-10"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="ct-msg"
                          className="font-subhead text-[0.8rem] font-semibold"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="ct-msg"
                          data-ocid="contact.textarea"
                          placeholder="Your message..."
                          rows={3}
                          value={ctMsg}
                          onChange={(e) => setCtMsg(e.target.value)}
                          className="mt-1.5 font-body text-[0.88rem] resize-none"
                        />
                      </div>

                      {ctStatus === "success" && (
                        <div
                          data-ocid="contact.success_state"
                          className="flex items-center gap-2 text-[0.82rem] font-body p-3 rounded-lg bg-green-50 text-green-700 border border-green-200"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          Message sent successfully!
                        </div>
                      )}
                      {ctStatus === "error" && (
                        <div
                          data-ocid="contact.error_state"
                          className="flex items-center gap-2 text-[0.82rem] font-body p-3 rounded-lg bg-red-50 text-red-700 border border-red-200"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          Failed to send. Please try again.
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={ctStatus === "loading"}
                        className="w-full font-subhead font-bold h-10 text-[0.88rem] rounded-lg"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        {ctStatus === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Reservation Form — wide */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Card className="border border-border/70 shadow-dhaba-md rounded-xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        <ChefHat className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3
                          className="font-display font-bold text-2xl leading-tight"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          Reserve a Table
                        </h3>
                        <p className="font-body text-[0.82rem] text-muted-foreground mt-0.5">
                          Pushp Vihar Sector 4, Delhi
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleReservation} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <Label
                            htmlFor="res-name"
                            className="font-subhead text-[0.8rem] font-semibold"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="res-name"
                            data-ocid="reservation.input"
                            placeholder="Your full name"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                            className="mt-1.5 font-body text-[0.88rem] h-11"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="res-phone"
                            className="font-subhead text-[0.8rem] font-semibold"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="res-phone"
                            data-ocid="reservation.phone.input"
                            placeholder="Your phone number"
                            value={resPhone}
                            onChange={(e) => setResPhone(e.target.value)}
                            className="mt-1.5 font-body text-[0.88rem] h-11"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <Label
                            htmlFor="res-date"
                            className="font-subhead text-[0.8rem] font-semibold"
                          >
                            Date
                          </Label>
                          <Input
                            id="res-date"
                            data-ocid="reservation.date.input"
                            type="date"
                            value={resDate}
                            onChange={(e) => setResDate(e.target.value)}
                            className="mt-1.5 font-body text-[0.88rem] h-11"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="res-time"
                            className="font-subhead text-[0.8rem] font-semibold"
                          >
                            Time
                          </Label>
                          <Select value={resTime} onValueChange={setResTime}>
                            <SelectTrigger
                              id="res-time"
                              data-ocid="reservation.time.select"
                              className="mt-1.5 font-body text-[0.88rem] h-11"
                            >
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "12:00 PM",
                                "1:00 PM",
                                "2:00 PM",
                                "6:00 PM",
                                "7:00 PM",
                                "8:00 PM",
                                "9:00 PM",
                                "10:00 PM",
                              ].map((t) => (
                                <SelectItem
                                  key={t}
                                  value={t}
                                  className="font-body"
                                >
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="res-guests"
                          className="font-subhead text-[0.8rem] font-semibold"
                        >
                          Number of Guests
                        </Label>
                        <Select value={resGuests} onValueChange={setResGuests}>
                          <SelectTrigger
                            id="res-guests"
                            data-ocid="reservation.guests.select"
                            className="mt-1.5 font-body text-[0.88rem] h-11"
                          >
                            <SelectValue placeholder="How many guests?" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (n) => (
                                <SelectItem
                                  key={n}
                                  value={String(n)}
                                  className="font-body"
                                >
                                  {n} {n === 1 ? "Guest" : "Guests"}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {resStatus === "success" && (
                        <div
                          data-ocid="reservation.success_state"
                          className="flex items-center gap-3 text-[0.88rem] font-body p-4 rounded-xl bg-green-50 text-green-700 border border-green-200"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-semibold">Table Reserved!</p>
                            <p className="text-green-600/80 text-[0.82rem]">
                              We'll see you soon. Your table is booked.
                            </p>
                          </div>
                        </div>
                      )}
                      {resStatus === "error" && (
                        <div
                          data-ocid="reservation.error_state"
                          className="flex items-center gap-3 text-[0.88rem] font-body p-4 rounded-xl bg-red-50 text-red-700 border border-red-200"
                        >
                          <AlertCircle className="h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-semibold">Reservation Failed</p>
                            <p className="text-red-600/80 text-[0.82rem]">
                              Please try again or call us directly.
                            </p>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="reservation.submit_button"
                        disabled={resStatus === "loading"}
                        size="lg"
                        className="w-full font-subhead font-bold h-12 text-[0.95rem] rounded-xl mt-2"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        {resStatus === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Reserving Your Table...
                          </>
                        ) : (
                          "Confirm Reservation"
                        )}
                      </Button>

                      <p className="text-[0.78rem] text-muted-foreground text-center font-body leading-relaxed">
                        For immediate booking, call us at{" "}
                        <a
                          href="tel:+917041960702"
                          className="font-subhead font-semibold"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          +91 70419 60702
                        </a>{" "}
                        or{" "}
                        <a
                          href="tel:+917947128204"
                          className="font-subhead font-semibold"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          +91 79 4712 8204
                        </a>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="py-14"
        style={{
          background:
            "linear-gradient(155deg, oklch(0.13 0.04 20) 0%, oklch(0.17 0.05 24) 100%)",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 mb-8 border-b border-white/10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--dhaba-saffron)" }}
                >
                  <Flame className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-[1.1rem] text-white leading-tight">
                    Anshu Dhaba
                  </p>
                  <p className="text-white/45 text-[0.72rem] font-subhead tracking-wider uppercase">
                    Delhi · Est. 1990
                  </p>
                </div>
              </div>
              <p className="font-body text-white/55 text-[0.85rem] leading-relaxed max-w-xs">
                Authentic Taste of India since 1990. Punjabi, Mughlai, Chinese,
                North Indian &amp; Thai cuisine in Pushp Vihar, Delhi.
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  {
                    href: "https://instagram.com",
                    label: "Instagram",
                    Icon: SiInstagram,
                  },
                  {
                    href: "https://facebook.com",
                    label: "Facebook",
                    Icon: SiFacebook,
                  },
                  {
                    href: "https://whatsapp.com",
                    label: "WhatsApp",
                    Icon: SiWhatsapp,
                  },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/15"
                    style={{ background: "oklch(0.26 0.06 22)" }}
                  >
                    <Icon className="h-4 w-4 text-white/70" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-subhead font-bold text-[0.78rem] uppercase tracking-[0.15em] text-white/40 mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      data-ocid="footer.link"
                      onClick={() => scrollTo(link)}
                      className="font-body text-white/55 hover:text-white/90 text-[0.88rem] transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours & Contact */}
            <div>
              <h4 className="font-subhead font-bold text-[0.78rem] uppercase tracking-[0.15em] text-white/40 mb-5">
                Opening Hours
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  { day: "Monday – Friday", time: "11:30 AM – 11:00 PM" },
                  { day: "Saturday", time: "11:30 AM – 11:30 PM" },
                  { day: "Sunday", time: "11:30 AM – 10:00 PM" },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span className="font-body text-[0.83rem] text-white/50">
                      {day}
                    </span>
                    <span className="font-subhead text-[0.83rem] font-semibold text-white/75">
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Phone numbers in footer */}
              <div className="space-y-2">
                <h4 className="font-subhead font-bold text-[0.78rem] uppercase tracking-[0.15em] text-white/40 mb-3">
                  Contact
                </h4>
                <a
                  href="tel:+917041960702"
                  className="flex items-center gap-2 font-subhead font-semibold text-[0.88rem] text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" />
                  +91 70419 60702
                </a>
                <a
                  href="tel:+917947128204"
                  className="flex items-center gap-2 font-subhead font-semibold text-[0.88rem] text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" />
                  +91 79 4712 8204
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-[0.8rem] text-white/40">
              © {new Date().getFullYear()} Anshu Dhaba. All rights reserved.
            </p>
            <p className="font-body text-[0.8rem] text-white/35">
              Built with <span className="text-red-400/80">♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/75 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─────────────────────────────────── */}
      <a
        href="https://wa.me/917041960702?text=Hi%2C%20I%20want%20to%20order%20from%20Anshu%20Dhaba"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        title="Order on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 text-white font-subhead font-bold text-[0.85rem] px-5 py-3.5 rounded-2xl shadow-dhaba-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: "#25D366" }}
      >
        <SiWhatsapp className="h-4.5 w-4.5 shrink-0" />
        <span className="hidden sm:inline">Order on WhatsApp</span>
      </a>
    </div>
  );
}
