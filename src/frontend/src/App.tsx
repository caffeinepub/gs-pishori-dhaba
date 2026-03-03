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
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ── Scroll fade-in variant ─────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } as Transition },
};

// ── Menu Data ──────────────────────────────────────────────────
const menuData = {
  Veg: [
    {
      name: "Dal Makhani",
      desc: "Slow-cooked black lentils in buttery tomato gravy",
      price: "₹120",
    },
    {
      name: "Paneer Butter Masala",
      desc: "Cottage cheese in rich creamy tomato sauce",
      price: "₹180",
    },
    {
      name: "Aloo Gobi",
      desc: "Spiced potatoes and cauliflower, home-style",
      price: "₹100",
    },
    {
      name: "Shahi Paneer",
      desc: "Royal cottage cheese in cashew & cream gravy",
      price: "₹190",
    },
    {
      name: "Veg Thali",
      desc: "Complete meal: 2 sabzi, dal, rice, roti, salad",
      price: "₹150",
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
    },
    {
      name: "Mutton Rogan Josh",
      desc: "Slow-braised mutton with Kashmiri spices",
      price: "₹280",
    },
    {
      name: "Chicken Tikka",
      desc: "Charcoal-grilled marinated chicken pieces",
      price: "₹240",
    },
    {
      name: "Egg Curry",
      desc: "Boiled eggs in bold Punjabi curry",
      price: "₹130",
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
    },
    {
      name: "Chicken Fried Rice",
      desc: "Wok-tossed rice with chicken and egg",
      price: "₹160",
    },
    {
      name: "Manchurian",
      desc: "Crispy fried balls in tangy Manchurian sauce",
      price: "₹140",
    },
    {
      name: "Spring Rolls",
      desc: "Crispy vegetable rolls with sweet chilli dip",
      price: "₹110",
    },
    {
      name: "Chilli Paneer",
      desc: "Paneer tossed with peppers in spicy chilli sauce",
      price: "₹170",
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
      name: "Chicken Tikka",
      desc: "Charcoal-kissed marinated chicken in tandoor",
      price: "₹240",
    },
    {
      name: "Seekh Kebab",
      desc: "Spiced minced meat skewers from the clay oven",
      price: "₹260",
    },
    {
      name: "Tandoori Roti",
      desc: "Whole wheat flatbread baked in tandoor",
      price: "₹20",
    },
    {
      name: "Garlic Naan",
      desc: "Buttery garlic-topped leavened bread from tandoor",
      price: "₹40",
    },
  ],
};

// ── Reviews ────────────────────────────────────────────────────
const reviews = [
  {
    name: "Rajesh Kumar",
    stars: 5,
    text: "Best butter chicken in Delhi! The taste is authentic and reminds me of home-cooked food. Must visit!",
    initials: "RK",
  },
  {
    name: "Priya Sharma",
    stars: 4,
    text: "Very affordable and tasty food. The biryani is amazing. Staff is friendly too.",
    initials: "PS",
  },
  {
    name: "Amit Verma",
    stars: 5,
    text: "Hidden gem in Palika Bazaar. Dal makhani and naan combo is unbeatable. Will visit again!",
    initials: "AV",
  },
  {
    name: "Sunita Gupta",
    stars: 4,
    text: "Great food at great prices. Perfect place for a quick lunch. Paneer tikka is highly recommended.",
    initials: "SG",
  },
];

// ── Stars component ────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= count ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
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

      {/* ── STICKY HEADER ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-dhaba-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--dhaba-crimson)" }}
              >
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <span
                  className="font-display font-bold text-lg leading-tight block"
                  style={{ color: "var(--dhaba-crimson)" }}
                >
                  G S Pishori
                </span>
                <span className="text-xs text-muted-foreground font-body leading-tight block tracking-wider uppercase">
                  Dhaba
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link)}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md transition-colors hover:bg-muted"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="ml-3 font-body"
                style={{ background: "var(--dhaba-crimson)" }}
              >
                Book a Table
              </Button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-background px-4 py-3"
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link)}
                  className="block w-full text-left py-3 text-base font-medium text-foreground/80 hover:text-foreground border-b border-border/50 last:border-0"
                >
                  {link}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="w-full mt-3 font-body"
                style={{ background: "var(--dhaba-crimson)" }}
              >
                Book a Table
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-food.dim_1200x700.jpg')",
          }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.12 0.04 22 / 0.75) 0%, oklch(0.08 0.03 22 / 0.88) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-white/30 text-white/80">
                <ChefHat className="h-3.5 w-3.5" />
                Est. in Delhi's Palika Bazaar
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Welcome to
              <br />
              <span style={{ color: "var(--dhaba-saffron)" }}>G S Pishori</span>
              <br />
              Dhaba
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Authentic Punjabi &amp; Mughlai Taste in the Heart of Delhi
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                onClick={() => scrollTo("menu")}
                className="text-base font-body font-semibold h-14 px-10 rounded-full"
                style={{ background: "var(--dhaba-crimson)", color: "white" }}
              >
                View Menu
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="text-base font-body font-semibold h-14 px-10 rounded-full border-2 border-white/60 text-white bg-transparent hover:bg-white/10"
              >
                Book a Table
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={fadeUp}
              className="mt-14 flex flex-col sm:flex-row gap-8 justify-center"
            >
              {[
                { label: "Rating", value: "4.3★" },
                { label: "For Two", value: "~₹200" },
                { label: "Cuisine", value: "Punjabi" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: "var(--dhaba-saffron)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-white/60 text-sm font-body tracking-widest uppercase mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <Section id="about" className="bg-background relative overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, oklch(0.75 0.16 50 / 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <span
                  className="font-body text-sm font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "var(--dhaba-saffron)" }}
                >
                  Our Story
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{ color: "var(--dhaba-crimson)" }}
              >
                A Legacy of
                <br />
                Authentic Flavours
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-foreground/75 text-lg leading-relaxed mb-6"
              >
                For decades, <strong>G S Pishori Dhaba</strong> has been serving
                authentic Punjabi and Mughlai cuisine in the heart of Delhi's
                iconic Palika Bazaar. What started as a humble kitchen has grown
                into a beloved institution.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-foreground/75 text-lg leading-relaxed mb-8"
              >
                Every dish is crafted with traditional spices, slow-cooked
                gravies, and the same recipes passed down through generations.
                Family-friendly, budget-friendly — every plate made with love.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[
                  { icon: Star, label: "4.3 Stars", sub: "Avg. Rating" },
                  { icon: Flame, label: "₹200", sub: "For Two" },
                  { icon: ChefHat, label: "Decades", sub: "Of Legacy" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="text-center p-4 rounded-xl border border-border"
                    style={{ background: "var(--dhaba-amber)" }}
                  >
                    <Icon
                      className="h-5 w-5 mx-auto mb-2"
                      style={{ color: "var(--dhaba-crimson)" }}
                    />
                    <div
                      className="font-display font-bold text-lg"
                      style={{ color: "var(--dhaba-crimson)" }}
                    >
                      {label}
                    </div>
                    <div className="text-xs text-foreground/60 font-body mt-0.5">
                      {sub}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  onClick={() => scrollTo("menu")}
                  size="lg"
                  className="font-body font-semibold"
                  style={{ background: "var(--dhaba-crimson)" }}
                >
                  Explore Our Menu
                </Button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-dhaba-lg aspect-[4/3]">
                <img
                  src="/assets/generated/dhaba-interior.dim_600x400.jpg"
                  alt="G S Pishori Dhaba Interior"
                  className="w-full h-full object-cover"
                />
                {/* Badge overlay */}
                <div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-3 shadow-dhaba-md"
                  style={{ background: "var(--dhaba-crimson)" }}
                >
                  <p className="text-white font-display font-bold text-lg">
                    Palika Bazaar, Delhi
                  </p>
                  <p className="text-white/80 text-sm font-body">
                    Shop No. 5, Mini Market
                  </p>
                </div>
              </div>

              {/* Floating spice decoration */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-dhaba-md"
                style={{ background: "var(--dhaba-saffron)" }}
              >
                <Flame className="h-10 w-10 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── MENU ──────────────────────────────────────────────── */}
      <Section
        id="menu"
        className="relative"
        style={
          {
            background:
              "linear-gradient(135deg, oklch(0.18 0.04 22) 0%, oklch(0.22 0.06 30) 100%)",
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="font-body text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--dhaba-saffron)" }}
            >
              Our Specialities
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold mt-3 text-white"
            >
              The Menu
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-white/60 font-body max-w-xl mx-auto"
            >
              From slow-cooked curries to fresh-from-tandoor breads — every dish
              tells a story.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="Veg" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 h-auto mb-10 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit mx-auto">
              {Object.keys(menuData).map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="menu.tab"
                  className="font-body font-medium data-[state=active]:text-white data-[state=active]:shadow-dhaba-sm rounded-xl px-5"
                  style={
                    {
                      "--tw-data-active-bg": "var(--dhaba-crimson)",
                    } as React.CSSProperties
                  }
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
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {items.map((item) => (
                    <motion.div key={item.name} variants={fadeUp}>
                      <Card className="menu-card overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm text-white">
                        {"image" in item && item.image && (
                          <div className="h-44 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display font-bold text-xl leading-tight">
                              {item.name}
                            </h3>
                            <span
                              className="font-body font-bold text-lg shrink-0"
                              style={{ color: "var(--dhaba-saffron)" }}
                            >
                              {item.price}
                            </span>
                          </div>
                          <p className="font-body text-sm text-white/60 mt-2 leading-relaxed">
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

      {/* ── GALLERY ───────────────────────────────────────────── */}
      <Section id="gallery" className="bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="font-body text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--dhaba-saffron)" }}
            >
              A Glimpse
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold mt-3"
              style={{ color: "var(--dhaba-crimson)" }}
            >
              Food Gallery
            </motion.h2>
          </motion.div>

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
                src: "/assets/generated/hero-food.dim_1200x700.jpg",
                alt: "Authentic Punjabi Feast",
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-body font-medium text-sm">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <Section
        id="reviews"
        style={
          {
            background:
              "linear-gradient(to bottom right, oklch(0.97 0.015 85) 0%, oklch(0.92 0.04 70) 100%)",
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="font-body text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--dhaba-saffron)" }}
            >
              Happy Diners
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold mt-3"
              style={{ color: "var(--dhaba-crimson)" }}
            >
              What Our Guests Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                data-ocid={`reviews.item.${idx + 1}`}
              >
                <Card className="h-full shadow-dhaba-sm hover:shadow-dhaba-md transition-shadow bg-white border-none">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Stars count={review.stars} />
                    <p className="font-body text-foreground/75 mt-4 flex-1 leading-relaxed text-sm italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-foreground">
                          {review.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
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
              "radial-gradient(ellipse at 20% 80%, oklch(0.42 0.19 22 / 0.05) 0%, transparent 55%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="font-body text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--dhaba-saffron)" }}
            >
              Visit Us
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold mt-3"
              style={{ color: "var(--dhaba-crimson)" }}
            >
              Reservation &amp; Contact
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info + Contact Form */}
            <div className="space-y-8">
              {/* Address block */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <Card
                  className="border-none shadow-dhaba-sm"
                  style={{ background: "var(--dhaba-amber)" }}
                >
                  <CardContent className="p-6 space-y-5">
                    <h3
                      className="font-display text-xl font-bold"
                      style={{ color: "var(--dhaba-crimson)" }}
                    >
                      Find Us
                    </h3>
                    {[
                      {
                        Icon: MapPin,
                        title: "Address",
                        text: "Shop No. 5, Mini Market, Canal Place, Palika Bazaar, Delhi - 110001",
                      },
                      {
                        Icon: Phone,
                        title: "Phone",
                        text: "+91 70419 60702",
                      },
                      {
                        Icon: Clock,
                        title: "Hours",
                        text: "Mon–Sun: 12:00 PM – 11:00 PM",
                      },
                    ].map(({ Icon, title, text }) => (
                      <div key={title} className="flex gap-3 items-start">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "var(--dhaba-crimson)" }}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p
                            className="font-body font-semibold text-sm"
                            style={{ color: "var(--dhaba-crimson)" }}
                          >
                            {title}
                          </p>
                          <p className="font-body text-sm text-foreground/70 leading-relaxed">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
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
                <Card className="border border-border shadow-dhaba-sm">
                  <CardContent className="p-6">
                    <h3
                      className="font-display text-xl font-bold mb-5"
                      style={{ color: "var(--dhaba-crimson)" }}
                    >
                      Send a Message
                    </h3>
                    <form onSubmit={handleContact} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="ct-name"
                          className="font-body text-sm font-medium"
                        >
                          Your Name
                        </Label>
                        <Input
                          id="ct-name"
                          data-ocid="contact.input"
                          placeholder="Enter your name"
                          value={ctName}
                          onChange={(e) => setCtName(e.target.value)}
                          className="mt-1 font-body"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="ct-phone"
                          className="font-body text-sm font-medium"
                        >
                          Phone
                        </Label>
                        <Input
                          id="ct-phone"
                          data-ocid="contact.phone.input"
                          placeholder="Your phone number"
                          value={ctPhone}
                          onChange={(e) => setCtPhone(e.target.value)}
                          className="mt-1 font-body"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="ct-msg"
                          className="font-body text-sm font-medium"
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
                          className="mt-1 font-body resize-none"
                        />
                      </div>

                      {ctStatus === "success" && (
                        <div
                          data-ocid="contact.success_state"
                          className="flex items-center gap-2 text-sm font-body p-3 rounded-lg bg-green-50 text-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          Message sent successfully!
                        </div>
                      )}
                      {ctStatus === "error" && (
                        <div className="flex items-center gap-2 text-sm font-body p-3 rounded-lg bg-red-50 text-red-700">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          Failed to send. Try again.
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={ctStatus === "loading"}
                        className="w-full font-body font-semibold"
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
                <Card className="border border-border shadow-dhaba-md h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-7">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--dhaba-crimson)" }}
                      >
                        <ChefHat className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3
                          className="font-display text-2xl font-bold"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          Reserve a Table
                        </h3>
                        <p className="font-body text-sm text-muted-foreground">
                          Book your spot at G S Pishori Dhaba
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleReservation} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <Label
                            htmlFor="res-name"
                            className="font-body text-sm font-medium"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="res-name"
                            data-ocid="reservation.input"
                            placeholder="Your full name"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                            className="mt-1 font-body"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="res-phone"
                            className="font-body text-sm font-medium"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="res-phone"
                            data-ocid="reservation.phone.input"
                            placeholder="Your phone number"
                            value={resPhone}
                            onChange={(e) => setResPhone(e.target.value)}
                            className="mt-1 font-body"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <Label
                            htmlFor="res-date"
                            className="font-body text-sm font-medium"
                          >
                            Date
                          </Label>
                          <Input
                            id="res-date"
                            data-ocid="reservation.date.input"
                            type="date"
                            value={resDate}
                            onChange={(e) => setResDate(e.target.value)}
                            className="mt-1 font-body"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="res-time"
                            className="font-body text-sm font-medium"
                          >
                            Time
                          </Label>
                          <Select value={resTime} onValueChange={setResTime}>
                            <SelectTrigger
                              id="res-time"
                              data-ocid="reservation.time.select"
                              className="mt-1 font-body"
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
                          className="font-body text-sm font-medium"
                        >
                          Number of Guests
                        </Label>
                        <Select value={resGuests} onValueChange={setResGuests}>
                          <SelectTrigger
                            id="res-guests"
                            data-ocid="reservation.guests.select"
                            className="mt-1 font-body"
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
                          className="flex items-center gap-2 text-sm font-body p-4 rounded-lg bg-green-50 text-green-700 border border-green-200"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-semibold">Table Reserved!</p>
                            <p>We'll see you soon. Your table is booked.</p>
                          </div>
                        </div>
                      )}
                      {resStatus === "error" && (
                        <div
                          data-ocid="reservation.error_state"
                          className="flex items-center gap-2 text-sm font-body p-4 rounded-lg bg-red-50 text-red-700 border border-red-200"
                        >
                          <AlertCircle className="h-5 w-5 shrink-0" />
                          <div>
                            <p className="font-semibold">Reservation Failed</p>
                            <p>Please try again or call us directly.</p>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="reservation.submit_button"
                        disabled={resStatus === "loading"}
                        size="lg"
                        className="w-full font-body font-semibold h-14 text-base mt-2"
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

                      <p className="text-xs text-muted-foreground text-center font-body">
                        For immediate booking, call{" "}
                        <span
                          className="font-semibold"
                          style={{ color: "var(--dhaba-crimson)" }}
                        >
                          +91 70419 60702
                        </span>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.04 22) 0%, oklch(0.18 0.06 28) 100%)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--dhaba-saffron)" }}
                >
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-xl text-white">
                    G S Pishori Dhaba
                  </p>
                  <p className="text-white/50 text-xs font-body">
                    Palika Bazaar, Delhi
                  </p>
                </div>
              </div>
              <p className="font-body text-white/60 text-sm leading-relaxed max-w-xs">
                Authentic Punjabi & Mughlai Taste in the Heart of Delhi.
                Traditional recipes, modern hospitality.
              </p>
              {/* Social links */}
              <div className="flex gap-4 mt-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "oklch(0.3 0.08 22)" }}
                >
                  <SiInstagram className="h-4 w-4 text-white" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "oklch(0.3 0.08 22)" }}
                >
                  <SiFacebook className="h-4 w-4 text-white" />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "oklch(0.3 0.08 22)" }}
                >
                  <SiWhatsapp className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      data-ocid="footer.link"
                      onClick={() => scrollTo(link)}
                      className="font-body text-white/60 hover:text-white text-sm transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-5">
                Opening Hours
              </h4>
              <div className="space-y-3">
                {[
                  { day: "Monday – Friday", time: "12:00 PM – 11:00 PM" },
                  { day: "Saturday", time: "12:00 PM – 11:30 PM" },
                  { day: "Sunday", time: "12:00 PM – 10:00 PM" },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span className="font-body text-sm text-white/60">
                      {day}
                    </span>
                    <span className="font-body text-sm font-medium text-white/80">
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="font-body text-sm text-white/80 font-medium">
                    Currently Open
                  </span>
                </div>
                <p className="font-body text-xs text-white/50">
                  Shop No. 5, Mini Market, Canal Place, Palika Bazaar, Delhi -
                  110001
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-white/50">
              © {new Date().getFullYear()} G S Pishori Dhaba. All rights
              reserved.
            </p>
            <p className="font-body text-sm text-white/40">
              Built with <span className="text-red-400">♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
