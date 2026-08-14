import { useEffect, useMemo, useRef, useState } from 'react';
import retechLogoTransparent from './assets/companies/retech-logo-transparent.png';
import motorImg from './assets/companies/motor.png';
import laserImg from './assets/companies/laser.png';
import solutionsImg from './assets/companies/solutions.png';
import retechmotorsImg from './assets/companies/retechmotors.png';
import heroTechCollage from './assets/companies/hero_tech_collage.jpg';
import retechBackgroundAdVideo from './assets/companies/retech_background_ad.mp4';
import retechRdUnitreeVideo from './assets/companies/retech_rd_unitree.mp4';
import solderingDrivesVideo from './assets/companies/also_include_soldering_drives_.mp4';
import bldcMotorVideo from './assets/companies/d_bldc_motor_animation_video.mp4';
import amdImg from './assets/companies/amd.jpg';
import ardhikaImg from './assets/companies/ardhika.jpg';
import boschImg from './assets/companies/bosch.jpg';
import botberryImg from './assets/companies/botberry.jpg';
import changepondImg from './assets/companies/changepond.jpg';
import chipedgeImg from './assets/companies/chipedge.jpg';
import codentrixImg from './assets/companies/codentrix.jpg';
import deloitteImg from './assets/companies/deloitte.jpg';
import econImg from './assets/companies/econ.jpg';
import fizixImg from './assets/companies/fizix.jpg';
import furigenceImg from './assets/companies/furigence.jpg';
import hexawareImg from './assets/companies/hexaware.jpg';
import ltImg from './assets/companies/lt.jpg';
import seaconvoyImg from './assets/companies/seaconvoy.jpg';
import srmtechImg from './assets/companies/srmtech.jpg';
import tcsImg from './assets/companies/tcs.jpg';
import valeoImg from './assets/companies/valeo.jpg';
import visaiyonImg from './assets/companies/visaiyon.jpg';
import xeragoImg from './assets/companies/xerago.jpg';
import zohoImg from './assets/companies/zoho.jpg';
import rajarajanPhoto from './assets/leadership/rajarajan.png';
import {
  Menu,
  X,
  ArrowLeft,
  Building2,
  GraduationCap,
  Handshake,
  Star,
  Phone,
  Briefcase,
  Users,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Lock,
  Edit2,
  Trash2,
  Plus,
  Save,
  LogOut,
  Upload,
  RotateCcw,
  Wrench,
  Cpu,
  CalendarDays,
  Network,
  MonitorCog,
  ExternalLink,
  Home,
  Rocket,
  FlaskConical,
  Bell,
  Play,
  ChevronRight,
  ChevronDown,
  Globe,
  Youtube,
} from 'lucide-react';
import IndustrialVisits from './components/IndustrialVisits';
import WorkshopsAndCourses from './components/WorkshopsAndCourses';
import TechTalks from './components/TechTalks';
import Partnerships from './components/Partnerships';
import FieldsOfFocus from './components/FieldsOfFocus';
import RetechCareers from './components/RetechCareers';
import { RetechMotorsPage, RetechLasersPage, ResearchDevelopmentPage } from './components/rd/RetechDivisions';

import rd02 from './assets/rd/rd_02.jpeg';
import rd03 from './assets/rd/rd_03.jpeg';
import rd04 from './assets/rd/rd_04.jpeg';
import rd05 from './assets/rd/rd_05.jpeg';
import rd06 from './assets/rd/rd_06.jpeg';
import rd07 from './assets/rd/rd_07.jpeg';
import rd08 from './assets/rd/rd_08.jpeg';
import rd09 from './assets/rd/rd_09.jpeg';
import rd10 from './assets/rd/rd_10.jpeg';
import rd11 from './assets/rd/rd_11.jpeg';
import rd12 from './assets/rd/rd_12.jpeg';
import rd13 from './assets/rd/rd_13.jpeg';
import rd14 from './assets/rd/rd_14.jpeg';
import rd15 from './assets/rd/rd_15.jpeg';
import rd16 from './assets/rd/rd_16.jpeg';

const motorsPhotos = [
  { src: rd02, alt: 'BLDC motor driver board', caption: 'Custom BLDC motor driver PCB, close-up' },
  { src: rd07, alt: 'Motor driver boards', caption: 'Motor control boards on the bench' },
  { src: rd15, alt: 'Motor bench testing', caption: 'Bench testing a driver board with a lab power supply' },
  { src: rd16, alt: 'BLDC motor housing', caption: 'Finished BLDC motor assembly' },
  { src: rd13, alt: 'Motor test rig', caption: 'Motor mounted on the dynamometer test rig' },
  { src: rd14, alt: 'Motor testing setup', caption: 'Wiring up a motor for a bench test' },
];

const lasersPhotos = [
  { src: laserImg, alt: 'Retech Lasers', caption: 'Retech Lasers precision machinery' },
];

const rndPhotos = [
  { src: rd05, alt: 'Humanoid robot leg CAD design', caption: 'CAD design review of a humanoid robot leg' },
  { src: rd06, alt: 'Fusion 360 humanoid leg model', caption: 'Humanoid robot leg assembly in Fusion 360' },
  { src: rd09, alt: 'BLDC driver 3D model', caption: '3D model of a BLDC motor driver board' },
  { src: rd03, alt: 'Spinner motor control software', caption: 'Spinner — our in-house motor control & monitoring software' },
  { src: rd04, alt: 'Spinner software close-up', caption: 'Real-time position, velocity, and torque monitoring in Spinner' },
  { src: rd08, alt: 'Workstation with Nvidia GPU', caption: 'Development workstation with an Nvidia GeForce RTX GPU' },
  { src: rd10, alt: 'Nvidia GeForce RTX GPU', caption: 'Nvidia GeForce RTX GPU used for neural network training' },
  { src: rd11, alt: 'AI vision model testing on GPU', caption: 'Testing a vision-language model on an Nvidia RTX GPU' },
  { src: rd12, alt: 'GPU monitoring during model testing', caption: 'Monitoring GPU utilization while testing robotic AI models' },
];


const ADMIN_PASSWORD = 'retech2026';
const ADMIN_KEY = 'retech_admin_v1';
const REVIEWS_KEY = 'retech_reviews_v1';

// --- Logo persistence keys ---
// We persist ONLY admin-uploaded logos (stable base64 data URLs) and a list of
// hidden default logo names. Default logos always come fresh from imports, so
// build-time asset hash changes can never produce stale/broken src URLs.
const UPLOADED_LOGOS_KEY = 'retech_logos_v2';      // array of { id, name, src }
const HIDDEN_LOGOS_KEY = 'retech_hidden_logos_v1'; // array of default logo names
const LEGACY_LOGOS_KEY = 'retech_logos_v1';        // old combined cache — cleared on load

const CONTACTS_KEY = 'retech_contacts_v1';

const SITE_URL = 'https://retechsolutions.in/';
const DEFAULT_SEO = {
  title: 'Retech Solutions | Engineering R&D, Academic Programs & Industrial Solutions',
  description: 'Retech Solutions delivers engineering R&D, industrial technology, academic certification, workshops, internships, motors, lasers and industry-academia programs in Chennai.',
};
const SECTION_SEO = {
  home: DEFAULT_SEO,
  about: {
    title: 'About Retech Solutions | Engineering Innovation in Chennai',
    description: 'Learn about Retech Solutions, our engineering expertise, technology ventures, research focus and industry-academia initiatives in Chennai.',
  },
  events: {
    title: 'Engineering Events & Collaborations | Retech Solutions',
    description: 'Explore industrial visits, workshops, tech talks, networking events and engineering collaborations organized by Retech Solutions.',
  },
  'events-iv': {
    title: 'Industrial Visits for Engineering Students | Retech Solutions',
    description: 'Industry exposure and practical industrial visits for engineering students at Retech Solutions in Chennai.',
  },
  'events-workshops': {
    title: 'Engineering Workshops & Value Added Courses | Retech Solutions',
    description: 'Hands-on engineering workshops and value-added technology courses designed to build practical, industry-ready skills.',
  },
  'events-techtalks': {
    title: 'Engineering Tech Talks | Retech Solutions',
    description: 'Technical talks on emerging engineering, robotics, electronics, AI, motor control, laser technology and industrial innovation.',
  },
  products: {
    title: 'Engineering Ventures | Retech Motors & Retech Lasers',
    description: 'Explore Retech Solutions ventures including Retech Motors and Retech Lasers for advanced engineering and industrial applications.',
  },
  'retech-motors': {
    title: 'Retech Motors | BLDC Motors, Drivers & Motor Control R&D',
    description: 'Explore Retech Motors engineering work in BLDC motors, motor drivers, embedded control, testing and advanced motion systems.',
  },
  'retech-lasers': {
    title: 'Retech Lasers | Precision Laser & Industrial Machinery',
    description: 'Discover Retech Lasers precision machinery, laser technology and industrial engineering solutions.',
  },
  rnd: {
    title: 'Engineering Research & Development | Retech Solutions',
    description: 'Retech Solutions R&D spans robotics, BLDC motor control, embedded systems, AI vision, electronics and advanced engineering prototypes.',
  },
  services: {
    title: 'Engineering Services & Industry Solutions | Retech Solutions',
    description: 'Engineering services from Retech Solutions covering technology development, prototyping, industrial solutions and academic collaboration.',
  },
  'industry-academia': {
    title: 'Industry Academia Initiatives | Retech Solutions',
    description: 'Connect education with industry through practical training, engineering exposure, internships, workshops and collaborative programs.',
  },
  'clients-reviews': {
    title: 'Clients, Industry Partners & Reviews | Retech Solutions',
    description: 'See companies, partners and student experiences connected with Retech Solutions engineering programs and industry initiatives.',
  },
  'product-updates': {
    title: 'Product & Technology Updates | Retech Solutions',
    description: 'Latest engineering product, research and technology updates from Retech Solutions and its ventures.',
  },
  'academic-certification': {
    title: 'Academic Certification Programmes | Retech Solutions Chennai',
    description: 'Register for Retech Solutions academic certification programmes focused on practical engineering, technology and industry-ready skills.',
  },
  contacts: {
    title: 'Contact Retech Solutions | West Tambaram, Chennai',
    description: 'Contact Retech Solutions in West Tambaram, Chennai for engineering R&D, industrial solutions, academic programs and collaborations.',
  },
  'retech-careers': {
    title: 'Engineering Careers at Retech Solutions | Chennai',
    description: 'Explore career opportunities at Retech Solutions for engineers and technology professionals in Chennai.',
  },
};

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', content);
}

const navItems = [
  { label: 'HOME', key: 'home', icon: Home },
  { label: 'ABOUT US', key: 'about', icon: Users },
  { label: 'EVENTS & COLLABORATIONS', key: 'events', icon: CalendarDays },
  { label: 'VENTURES', key: 'products', icon: Rocket },
  { label: 'RESEARCH', key: 'rnd', icon: FlaskConical },
  { label: 'SERVICES', key: 'services', icon: Wrench },
  { label: 'CLIENTS & REVIEWS', key: 'clients-reviews', icon: Star },
  { label: 'PRODUCT UPDATES', key: 'product-updates', icon: Bell },
  { label: 'CONTACTS', key: 'contacts', icon: Phone },
  { label: 'ACADEMIC CERTIFICATION', key: 'academic-certification', icon: GraduationCap },
  { label: 'CAREERS', key: 'retech-careers', icon: Briefcase },
];

// --- Breadcrumb config: label + parent for every routable section key ---
const BREADCRUMB_LABELS = {
  home: 'Home',
  about: 'About Us',
  events: 'Events & Collaborations',
  'events-iv': 'Industrial Visits',
  'events-workshops': 'Workshops & Courses',
  'events-techtalks': 'Tech Talks',
  'events-fields': 'Fields of Focus',
  'events-networking': 'Networking Events',
  partnerships: 'Partnerships',
  'partnerships-mous': 'MOUs (Partnerships)',
  'partnerships-consultancy': 'Consultancy Works',
  'partnerships-vendors': 'Trusted Vendors',
  products: 'Ventures',
  'retech-motors': 'Retech Motors',
  'retech-lasers': 'Retech Lasers',
  rnd: 'Research',
  services: 'Services',
  'industry-academia': 'Industry Academia Initiatives',
  'our-companies': 'Our Companies',
  'clients-reviews': 'Clients & Reviews',
  'product-updates': 'Product Updates',
  contacts: 'Contacts',
  'academic-certification': 'Academic Certification Programmes',
  'retech-careers': 'Careers',
  admin: 'Admin',
};
const BREADCRUMB_PARENTS = {
  'events-iv': 'events',
  'events-workshops': 'events',
  'events-techtalks': 'events',
  'events-fields': 'events',
  'events-networking': 'events',
  partnerships: 'events',
  'partnerships-mous': 'partnerships',
  'partnerships-consultancy': 'partnerships',
  'partnerships-vendors': 'partnerships',
  'retech-motors': 'products',
  'retech-lasers': 'products',
};

function Breadcrumbs({ activeSection, goToSection }) {
  if (activeSection === 'home') return null;
  const chain = [];
  let cursor = activeSection;
  let guard = 0;
  while (cursor && guard < 6) {
    chain.unshift(cursor);
    cursor = BREADCRUMB_PARENTS[cursor];
    guard += 1;
  }
  const crumbs = ['home', ...chain];
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 rounded-full bg-white/5 px-4 py-2.5 text-[13px] font-bold ring-1 ring-white/10 backdrop-blur-sm animate-section-in">
      {crumbs.map((key, idx) => {
        const isLast = idx === crumbs.length - 1;
        const label = key === 'home' ? 'Home' : (BREADCRUMB_LABELS[key] || key);
        return (
          <span key={`${key}-${idx}`} className="flex items-center gap-1.5">
            {idx === 0 && <Home size={13} className="text-cyan-300" />}
            {isLast ? (
              <span className="text-white/60">{label}</span>
            ) : (
              <button type="button" onClick={() => goToSection(key)} className="text-cyan-300 transition hover:text-cyan-100 hover:underline">
                {label}
              </button>
            )}
            {!isLast && <ChevronRight size={13} className="text-white/30" />}
          </span>
        );
      })}
    </nav>
  );
}

const DEFAULT_CONTACTS = {
  phone1: '044-4207 7204',
  phone2: '+91 90428 70115',
  whatsapp: '+91 90428 70115',
  email: 'info@retechsolutsions.in',
  address: 'No:31, 1st Floor Ayyasamy Street, Rajaji Rd, West Tambaram, Chennai, Tamil Nadu 600045',
  mapUrl: 'https://maps.app.goo.gl/2jpCA6kd2EwUdwyF9',
  facebook: 'https://www.facebook.com/retechsolution/',
  instagram: 'https://www.instagram.com/retechsolutions/',
  linkedin: 'https://www.linkedin.com/company/retechsolutionspvtltd/',
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

const companyCards = [
  {
    title: 'Retech Motors',
    desc: 'Our optimized motors are tailored to meet your requirements, making electromagnetics more accessible than ever.',
    image: motorImg,
    link: 'https://retechmotors.com/',
  },
  {
    title: 'Retech Lasers',
    desc: 'Our machinery incorporates cutting-edge laser technology for optimal performance and top-quality results.',
    image: laserImg,
    link: 'https://retechlasers.com/',
  },
  {
    title: 'Retech Solutions',
    desc: 'A premier provider of internships and training programs for aspiring engineers.',
    image: solutionsImg,
    link: 'https://retechsolutions.in/',
  },
];

// Default logos. These are NEVER serialized to localStorage — they always come
// from the freshly-imported (hashed) asset URLs at runtime.
const companyLogos = [
  { name: 'codentrix', src: codentrixImg },
  { name: 'tcs', src: tcsImg },
  { name: 'lt', src: ltImg },
  { name: 'ardhika', src: ardhikaImg },
  { name: 'zoho', src: zohoImg },
  { name: 'chipedge', src: chipedgeImg },
  { name: 'amd', src: amdImg },
  { name: 'furigence', src: furigenceImg },
  { name: 'hexaware', src: hexawareImg },
  { name: 'valeo', src: valeoImg },
  { name: 'fizix', src: fizixImg },
  { name: 'botberry', src: botberryImg },
  { name: 'changepond', src: changepondImg },
  { name: 'deloitte', src: deloitteImg },
  { name: 'xerago', src: xeragoImg },
  { name: 'visaiyon', src: visaiyonImg },
  { name: 'econ', src: econImg },
  { name: 'seaconvoy', src: seaconvoyImg },
  { name: 'srmtech', src: srmtechImg },
  { name: 'bosch', src: boschImg },
];

const reviewCards = [
  {
    name: 'Adithya Ramesh',
    initial: 'A',
    course: 'B.E. CSE, 2nd Year',
    institute: "St. Joseph's Institute of Technology",
    short: 'Industrial visit to Retech Lasers gave us real exposure to PlotBot machines, components, and working process.',
    highlight: 'It works with the combination of software and hardware, and it was really awesome.',
    full: `I am Adithya Ramesh, a B.E. CSE 2nd year student. This is my post about the experience of an Industrial Visit to Retech Lasers Private Limited, a homegrown innovation company from Tambaram, Chennai, arranged by our St. Joseph's Institute of Technology.

PlotBot Pro and PlotBot Plus are the machines that were introduced to us. We were shown a live demo of PlotBot Plus, and they explained the parts and materials used in the manufacturing of PlotBot Pro and PlotBot Plus, such as stepper motor, CO₂ laser tube, distilled water for the cooling system, and more. They also shared a few insights about the PlotBot fiber cutting machine.

It works with the combination of software and hardware, and it was really awesome.

Thanks to Retech Lasers Private Limited and our CSE department for organizing this visit.`,
  },
  {
    name: 'Student Review',
    initial: 'S',
    course: 'B.E. CSE',
    institute: "St. Joseph's Institute of Technology",
    short: 'Industrial visit to Retech Lasers with live demo and software-hardware integration.',
    highlight: 'It was cool to see both hardware and software work together so seamlessly.',
    full: `Hello Connections!!

Today we had an industrial visit to Retech Lasers Private Limited, Tambaram, arranged by our college - St. Joseph's Institute of Technology.

They introduced us to their machine PlotBot Pro and PlotBot Plus. We saw live demos of their PlotBot Plus laser Machine and got to explore its internal components - stepper motors, CO2 laser tube, embedded board, and a distilled water based cooling system.

Their PlotBot software is used to create model layouts, set laser speed etc. They also use C++ and Python within the software for creating models and handling design.

It was cool to see both hardware and software work together so seamlessly.

Thanks to the Retech Lasers Private Limited team and our CSE department for organizing this visit. It was a useful and insightful experience.`,
  },
];

function LazyImg({ src, alt, className = '', priority = false, ...rest }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // A cached image can finish loading before React attaches onLoad, which would
  // otherwise leave it stuck at opacity-0 (invisible). Reconcile that on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else { setError(true); setLoaded(true); }
    }
  }, [src]);

  return (
    <div className="relative h-full w-full">
      {!loaded && !error && <div className="absolute inset-0 rounded-2xl animate-shimmer" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <Building2 size={48} />
        </div>
      )}
    </div>
  );
}

function NavButton({ item, activeSection, onClick, mobile = false, depth = 0, vertical = false }) {
  const Icon = item.icon;
  const isActive = activeSection === item.key || activeSection.startsWith(`${item.key}-`);
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const handleClick = () => {
    if (item.external) {
      window.open(item.external, '_blank', 'noopener,noreferrer');
      return;
    }
    if (hasChildren) {
      setOpen((v) => !v);
      return;
    }
    onClick(item.key);
  };
  if (vertical) {
    return (
      <div className="relative w-full">
        <button
          type="button"
          onClick={handleClick}
          className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/20 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/40'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
              isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/5 text-slate-400 group-hover:text-cyan-300'
            }`}
          >
            <Icon size={16} strokeWidth={2.2} />
          </span>
          <span className="flex-1 leading-tight">{item.label}</span>
          {hasChildren ? (
            open ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
          ) : isActive ? (
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          ) : null}
        </button>
        {hasChildren && open && (
          <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
            {item.children.map((child) => (
              <NavButton key={child.label} item={child} activeSection={activeSection} onClick={() => onClick(child.key)} mobile depth={depth + 1} vertical />
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`relative ${mobile ? 'w-full' : ''}`} onMouseEnter={() => hasChildren && setOpen(true)} onMouseLeave={() => hasChildren && setOpen(false)}>
      <button type="button" onClick={handleClick}
        className={`${mobile ? 'w-full justify-start px-5 py-4 text-[18px]' : 'nav-item-animated shrink-0 px-4 py-3 text-[13px] xl:px-5 xl:py-3.5 xl:text-[13.5px]'} flex items-center gap-1.5 whitespace-nowrap rounded-lg font-bold transition-all duration-300 ${isActive ? 'bg-white/16 text-white shadow-lg shadow-blue-900/20' : 'text-white hover:bg-white/10 hover:text-white'}`}>
        <Icon className="nav-icon" size={mobile ? 21 : 15} strokeWidth={2.2} />
        <span>{item.label}</span>
        {hasChildren && <span className="ml-0.5 text-[12px] transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>}
        <span className={`nav-underline ${isActive ? 'nav-underline-active' : ''}`} />
      </button>
      {hasChildren && open && (
        <div className={`${mobile ? 'relative mt-1 w-full' : 'absolute right-0 top-[calc(100%-2px)] z-[200] w-[340px]'} rounded-2xl border border-white/20 bg-[#062454]/95 p-2 shadow-2xl backdrop-blur-2xl animate-dropdown-in`}>
          {item.children.map((child) => <NavButton key={child.label} item={child} activeSection={activeSection} onClick={() => onClick(child.key)} mobile depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}
function PremiumCard({ children, className = '' }) {
  return <div className={`min-w-0 rounded-[28px] bg-white/75 shadow-xl ring-1 ring-white/60 backdrop-blur-xl ${className}`}>{children}</div>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const hashSection = window.location.hash.replace(/^#/, '');
    return hashSection && BREADCRUMB_LABELS[hashSection] ? hashSection : 'home';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placedCount, setPlacedCount] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);

  const [isAdmin, setIsAdmin] = useState(() => loadJSON(ADMIN_KEY, false) === true);
  const [showLogin, setShowLogin] = useState(false);
  const [reviewsList, setReviewsList] = useState(() => loadJSON(REVIEWS_KEY, reviewCards));

  // --- Logo state: only uploads + hidden-default list are persisted ---
  const [uploadedLogos, setUploadedLogos] = useState(() => loadJSON(UPLOADED_LOGOS_KEY, []));
  const [hiddenDefaults, setHiddenDefaults] = useState(() => loadJSON(HIDDEN_LOGOS_KEY, []));

  const [contactsData, setContactsData] = useState(() => loadJSON(CONTACTS_KEY, DEFAULT_CONTACTS));

  // One-time cleanup of the legacy combined cache that stored stale asset hashes.
  useEffect(() => {
    try { localStorage.removeItem(LEGACY_LOGOS_KEY); } catch {}
  }, []);

  useEffect(() => { saveJSON(REVIEWS_KEY, reviewsList); }, [reviewsList]);
  useEffect(() => { saveJSON(UPLOADED_LOGOS_KEY, uploadedLogos); }, [uploadedLogos]);
  useEffect(() => { saveJSON(HIDDEN_LOGOS_KEY, hiddenDefaults); }, [hiddenDefaults]);
  useEffect(() => { saveJSON(CONTACTS_KEY, contactsData); }, [contactsData]);


  // Keep shareable hash navigation and page-specific SEO metadata in sync.
  useEffect(() => {
    const seo = SECTION_SEO[activeSection] || DEFAULT_SEO;
    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:url"]', `${SITE_URL}${activeSection === 'home' ? '' : `#${activeSection}`}`);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
    setMetaContent('meta[name="robots"]', activeSection === 'admin' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    const expectedHash = activeSection === 'home' ? '' : `#${activeSection}`;
    if (window.location.hash !== expectedHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${expectedHash}`);
    }
  }, [activeSection]);

  useEffect(() => {
    const onHashChange = () => {
      const section = window.location.hash.replace(/^#/, '');
      if (section && BREADCRUMB_LABELS[section]) setActiveSection(section);
      else if (!section) setActiveSection('home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Derived, render-time logo list: fresh defaults (minus hidden) + uploads.
  const logos = useMemo(() => [
    ...companyLogos
      .filter((l) => !hiddenDefaults.includes(l.name))
      .map((l) => ({ ...l, id: `default:${l.name}`, isDefault: true })),
    ...uploadedLogos.map((l) => ({ ...l, isDefault: false })),
  ], [hiddenDefaults, uploadedLogos]);

  const addLogo = ({ name, src }) => {
    setUploadedLogos((prev) => [
      ...prev,
      { id: `upload:${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, src },
    ]);
  };

  const removeLogo = (logoOrId) => {
    const id = typeof logoOrId === 'string' ? logoOrId : logoOrId?.id;
    if (!id) return;
    if (id.startsWith('default:')) {
      const name = id.slice('default:'.length);
      setHiddenDefaults((prev) => (prev.includes(name) ? prev : [...prev, name]));
    } else {
      setUploadedLogos((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const restoreDefaultLogos = () => setHiddenDefaults([]);

  const tryLogin = (pw) => {
    if (pw === ADMIN_PASSWORD) {
      setIsAdmin(true);
      saveJSON(ADMIN_KEY, true);
      setShowLogin(false);
      goToSection('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    saveJSON(ADMIN_KEY, false);
    if (activeSection === 'admin') setActiveSection('home');
  };

  const goToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eventCards = [
    { title: 'Industrial Visits', desc: 'Hands-on exposure to real engineering, manufacturing, and technology environments.', icon: <GraduationCap size={28} />, section: 'events-iv' },
    { title: 'Workshops & Value Added Courses', desc: 'Practical workshops and industry-oriented courses for engineering students.', icon: <Sparkles size={28} />, section: 'events-workshops' },
    { title: 'Tech Talks', desc: 'Technical sessions covering emerging technologies and engineering practice.', icon: <Star size={28} />, section: 'events-techtalks' },
    { title: 'Fields of Focus', desc: 'Explore the technical domains and learning areas we actively work in.', icon: <Building2 size={28} />, section: 'events-fields' },
    { title: 'Networking Events', desc: 'Connect students, engineers, companies, mentors, and technology communities.', icon: <Network size={28} />, section: 'events-networking' },
  ];

  useEffect(() => {
    if (activeSection !== 'clients-reviews') return;
    let current = 0;
    setPlacedCount(0);
    const timer = setInterval(() => {
      current += 10;
      setPlacedCount(current >= 500 ? 500 : current);
      if (current >= 500) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020b1a] text-slate-900">
      <Background isHome={activeSection === 'home'} />
      <SiteStyles />

      {/* Top header — transparent, floats directly over the hero video/background (no separate solid bar) */}
      <header className="sticky top-0 z-[100] bg-gradient-to-b from-black/55 via-black/25 to-transparent">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" onClick={() => goToSection('home')} className="flex shrink-0 items-center gap-3">
            <img src={retechLogoTransparent} alt="Retech Solutions" className="h-11 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:h-[3.3rem]" />
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:block">Engineered with Precision</span>
          </button>

          <nav className="hidden flex-1 flex-wrap items-center justify-end gap-1.5 py-1 lg:flex">
            {navItems.map((item) => (
              <NavButton key={item.key} item={item} activeSection={activeSection} onClick={(key) => goToSection(key)} />
            ))}
          </nav>

          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-xl p-2 text-white ring-1 ring-white/20 transition hover:bg-white/10 lg:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-[#020b1a]/98 px-4 py-6 lg:hidden">
          <div className="mb-6 flex items-center justify-between">
            <img src={retechLogoTransparent} alt="Retech" className="h-[3.3rem] w-auto object-contain" />
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-xl p-2 text-white ring-1 ring-white/20">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto pb-20">
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                item={item}
                activeSection={activeSection}
                onClick={(key) => {
                  goToSection(key);
                  setMobileMenuOpen(false);
                }}
                mobile
                vertical
              />
            ))}
          </div>
        </div>
      )}

      <main className={`relative z-20 ${activeSection === 'home' ? '' : 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'}`}>
        <Breadcrumbs activeSection={activeSection} goToSection={goToSection} />
        {activeSection === 'home' && <HomePage goToSection={goToSection} />}
        {activeSection === 'about' && <AboutUsPage goToSection={goToSection} />}
        {activeSection === 'products' && <ProductsPage goToSection={goToSection} />}
        {activeSection === 'industry-academia' && <IndustryAcademiaPage goToSection={goToSection} />}
        {activeSection === 'our-companies' && <OurCompanies />}
        {activeSection === 'services' && <ServicesPage goToSection={goToSection} />}
        {activeSection === 'events' && <EventsPage cards={eventCards} goToSection={goToSection} />}
        {activeSection === 'events-iv' && <PageWithBack goToSection={goToSection}><IndustrialVisits isAdmin={isAdmin} /></PageWithBack>}
        {activeSection === 'events-workshops' && <PageWithBack goToSection={goToSection}><WorkshopsAndCourses isAdmin={isAdmin} /></PageWithBack>}
        {activeSection === 'events-techtalks' && <PageWithBack goToSection={goToSection}><TechTalks isAdmin={isAdmin} /></PageWithBack>}
        {activeSection === 'events-fields' && <PageWithBack goToSection={goToSection}><FieldsOfFocus isAdmin={isAdmin} /></PageWithBack>}
        {activeSection === 'events-networking' && <PageWithBack goToSection={goToSection}><NetworkingEvents /></PageWithBack>}
        {(activeSection === 'partnerships' || activeSection.startsWith('partnerships-')) && <Partnerships activeSection={activeSection} setActiveSection={setActiveSection} isAdmin={isAdmin} />}
        {activeSection === 'retech-motors' && <PageWithBack goToSection={goToSection}><RetechMotorsPage photos={motorsPhotos} /></PageWithBack>}
        {activeSection === 'retech-lasers' && <PageWithBack goToSection={goToSection}><RetechLasersPage photos={lasersPhotos} /></PageWithBack>}
        {activeSection === 'rnd' && <PageWithBack goToSection={goToSection}><ResearchDevelopmentPage photos={rndPhotos} /></PageWithBack>}
        {activeSection === 'clients-reviews' && <ClientsAndReviewsPage logos={logos} reviews={reviewsList} selectedReview={selectedReview} setSelectedReview={setSelectedReview} />}
        {activeSection === 'product-updates' && <ProductUpdatesPage />}
        {activeSection === 'academic-certification' && <AcademicCertificationPage />}
        {activeSection === 'contacts' && <ContactSection contacts={contactsData} isAdmin={isAdmin} onAdminClick={() => setShowLogin(true)} onLogout={logoutAdmin} goToSection={goToSection} />}
        {activeSection === 'retech-careers' && <RetechCareers isAdmin={isAdmin} />}
        {activeSection === 'admin' && isAdmin && <AdminPanel reviewsList={reviewsList} setReviewsList={setReviewsList} logos={logos} addLogo={addLogo} removeLogo={removeLogo} restoreDefaultLogos={restoreDefaultLogos} hiddenCount={hiddenDefaults.length} contactsData={contactsData} setContactsData={setContactsData} logoutAdmin={logoutAdmin} goToSection={goToSection} />}
      </main>

      <Footer goToSection={goToSection} contacts={contactsData} />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSubmit={tryLogin} />}
    </div>
  );
}


function AcademicCertificationPage() {
  const formUrl = 'https://docs.google.com/forms/d/1eChfi8N4XWrG7m5pUtpl_sBZBjdwJoE0jKbQXrauruM/viewform?embedded=true';
  const formDirectUrl = 'https://docs.google.com/forms/d/1eChfi8N4XWrG7m5pUtpl_sBZBjdwJoE0jKbQXrauruM/viewform';

  return (
    <section className="animate-section-in pb-10">
      <div className="mb-6 overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-blue-950/90 via-slate-950/90 to-cyan-950/80 p-6 shadow-2xl sm:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200 ring-1 ring-cyan-300/20">
              <GraduationCap size={16} /> Industry-Oriented Learning
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Academic Certification Programmes</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Register for Retech Solutions academic certification programmes designed to strengthen practical engineering, technology, and industry-ready skills.
            </p>
          </div>
          <a
            href={formDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Open Registration Form <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-white/15">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
          <h2 className="text-xl font-bold text-slate-900">Programme Registration</h2>
          <p className="mt-1 text-sm text-slate-600">Complete the Google Form below to submit your registration details.</p>
        </div>
        <iframe
          src={formUrl}
          title="Retech Academic Certification Programme Registration"
          className="block min-h-[1150px] w-full border-0 bg-white"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}

function Background({ isHome = true }) {
  // Background videos only play on the homepage; other pages use a plain gradient.
  const sequence = [retechBackgroundAdVideo, retechRdUnitreeVideo, solderingDrivesVideo, bldcMotorVideo];
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    const video = document.querySelector('[data-retech-background-video]');
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [videoIndex, isHome]);

  if (!isHome) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#071a3b] via-[#0a2454] to-[#040e22]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.10),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.10),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(rgba(56,189,248,0.35) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        <div className="absolute inset-0 pointer-events-none tech-particles" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#071a3b]">
      {/* Retech ad → R&D/Unitree → soldering → BLDC motor animation, then loop. Always muted. */}
      {/* Slightly scaled + repositioned to crop out the watermark in the source clips' bottom-right corner. */}
      <video
        key={videoIndex}
        data-retech-background-video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.92]"
        style={{ transform: 'scale(1.3)', transformOrigin: '20% 30%' }}
        src={sequence[videoIndex]}
        autoPlay
        muted
        playsInline
        loop={false}
        preload="metadata"
        poster={heroTechCollage}
        onEnded={() => setVideoIndex((current) => (current + 1) % sequence.length)}
        aria-hidden="true"
      />
      {/* Lighter overlays so videos read more clearly (higher video opaqueness). */}
      <div className="absolute inset-0 bg-[#071a3b]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.08),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(rgba(56,189,248,0.35) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      <div className="absolute inset-0 pointer-events-none tech-particles" />
      <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent animate-data-beam" />
      <div className="absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-data-beam-reverse" />
    </div>
  );
}

function SiteStyles() {
  return (
    <style>{`
      /* Layout reset: neutralize the Vite/React scaffold so the app fills
         the viewport edge-to-edge on white (kills the dark mobile gutter). */
      :root { color-scheme: dark; background-color: #071a3b; }
      html, body { margin: 0; background-color: #071a3b; }
      html, body { overflow-x: clip; }
      body { display: block; min-width: 0; }
      #root { width: 100%; max-width: none; margin: 0; padding: 0; text-align: left; background-color: #071a3b; }

      /* Bright corporate contrast: keep dark-background copy crisp and readable. */
      .text-white\\/80, .text-white\\/85, .text-white\\/75, .text-white\\/70, .text-white\\/60, .text-white\\/50 {
        color: #ffffff !important;
      }
      @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .animate-scroll { animation: scroll 30s linear infinite; }
      @keyframes sweepLoop { 0%{transform:translateX(-120%);opacity:0} 10%{opacity:.95} 65%{transform:translateX(520%);opacity:.95} 80%,100%{opacity:0} }
      .animate-sweep-loop { animation: sweepLoop 3s linear infinite; }
      @keyframes logoFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-2px) scale(1.018)} }
      .animate-logo-float { animation: logoFloat 3.8s ease-in-out infinite; transform-origin:center; }
      @keyframes navReveal { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      @keyframes navGlow { 0%,100% { box-shadow:0 0 0 rgba(103,232,249,0); } 50% { box-shadow:0 0 26px rgba(103,232,249,.16); } }
      @keyframes dropdownIn { from { opacity:0; transform:translateY(8px) scale(.98); } to { opacity:1; transform:translateY(0) scale(1); } }
      @keyframes footerGlow { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
      @keyframes sectionIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
      .nav-item-animated { animation:navReveal .65s both; }
      .nav-item-animated:nth-child(2) { animation-delay:.04s; } .nav-item-animated:nth-child(3) { animation-delay:.08s; } .nav-item-animated:nth-child(4) { animation-delay:.12s; } .nav-item-animated:nth-child(5) { animation-delay:.16s; } .nav-item-animated:nth-child(6) { animation-delay:.20s; }
      .nav-item-animated:hover { animation:navGlow 2s ease-in-out infinite; transform:translateY(-2px); }
      .nav-icon { transition:transform .35s ease, filter .35s ease; }
      .nav-item-animated:hover .nav-icon { transform:rotate(-8deg) scale(1.12); filter:drop-shadow(0 0 8px rgba(165,243,252,.85)); }
      .animate-dropdown-in { animation:dropdownIn .22s ease-out both; }
      .animate-section-in { animation:sectionIn .65s cubic-bezier(.2,.8,.2,1) both; }
      .retech-footer-animated { background-image:linear-gradient(120deg,#087fd0,#0a9cf2,#0755a5,#0a9cf2); background-size:300% 300%; animation:footerGlow 12s ease infinite; }
      .retech-footer-grid { background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px); background-size:44px 44px; mask-image:linear-gradient(to bottom,transparent,black 20%,black 80%,transparent); opacity:.35; }
      @media (prefers-reduced-motion: reduce) {
        .animate-logo-float, .animate-sweep-loop, .nav-item-animated, .animate-dropdown-in, .animate-section-in, .retech-footer-animated { animation: none !important; }
      }
      @keyframes motorFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
      .animate-motor-float { animation: motorFloat 5s ease-in-out infinite; }
      @keyframes motorExplode { 0%{transform:scale(.18) rotate(-8deg);opacity:0;filter:blur(8px)} 60%{opacity:1;filter:blur(0)} 100%{transform:scale(1) rotate(0deg);opacity:1;filter:blur(0)} }
      .animate-motor-explode { animation: motorExplode 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .feature-card-float { animation: cardFloat 6s ease-in-out infinite; }
      .feature-card-float:nth-child(2) { animation-delay:.7s; }
      .feature-card-float:nth-child(3) { animation-delay:1.4s; }
      .feature-card-float:nth-child(4) { animation-delay:2.1s; }
      @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      .animate-shimmer { background: linear-gradient(90deg,#e2e8f0 25%,#f8fafc 50%,#e2e8f0 75%); background-size:800px 100%; animation:shimmer 1.4s infinite linear; }
      @keyframes orbFloat { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-18px) translateX(10px)} }
      .animate-orb-float { animation: orbFloat 7s ease-in-out infinite; }
      .animate-orb-float-slow { animation: orbFloat 10s ease-in-out infinite; }
      @keyframes pulseSoft { 0%,100%{opacity:.55; transform:scale(1)} 50%{opacity:.9; transform:scale(1.08)} }
      .animate-pulse-soft { animation: pulseSoft 5s ease-in-out infinite; }
      .animate-pulse-soft-delay { animation: pulseSoft 6s ease-in-out infinite; animation-delay:1.2s; }
      @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      .animate-spin-slow { animation: spinSlow 26s linear infinite; }
      .animate-spin-slow-reverse { animation: spinSlow 34s linear infinite reverse; }
      /* Modern enterprise motion language: inspired by contemporary technology sites,
         but implemented as original Retech-specific animations. */
      .tech-particles { opacity:.22; background-image:radial-gradient(circle,rgba(125,211,252,.9) 1px,transparent 1.5px); background-size:58px 58px; animation:particleDrift 22s linear infinite; mask-image:radial-gradient(circle at center,black,transparent 80%); }
      @keyframes particleDrift { from{transform:translate3d(0,0,0)} to{transform:translate3d(58px,58px,0)} }
      .animate-data-beam { animation:dataBeam 5.5s ease-in-out infinite; }
      .animate-data-beam-reverse { animation:dataBeam 7s ease-in-out infinite reverse; }
      @keyframes dataBeam { 0%,100%{transform:scaleX(.25);opacity:0} 45%{transform:scaleX(1);opacity:.7} 70%{transform:scaleX(.5);opacity:.25} }
      .header-tech-nav { isolation:isolate; }
      .header-scanline { position:absolute; inset:0; pointer-events:none; opacity:.22; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.5) 48%,transparent 52%); background-size:240% 100%; animation:headerSweep 7s linear infinite; }
      @keyframes headerSweep { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      .header-glow-orb { position:absolute; width:240px; height:240px; border-radius:999px; filter:blur(50px); opacity:.18; pointer-events:none; }
      .header-glow-one { right:12%; top:-150px; background:#7dd3fc; animation:headerOrb 8s ease-in-out infinite; }
      .header-glow-two { left:18%; bottom:-190px; background:#2563eb; animation:headerOrb 10s ease-in-out infinite reverse; }
      @keyframes headerOrb { 0%,100%{transform:translate3d(0,0,0) scale(1)} 50%{transform:translate3d(30px,18px,0) scale(1.12)} }
      .nav-item-animated { position:relative; overflow:hidden; }
      .nav-item-animated::before { content:""; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.14) 48%,transparent 72%); transform:translateX(-120%); transition:transform .6s ease; pointer-events:none; }
      .nav-item-animated:hover::before { transform:translateX(120%); }
      .nav-icon { transition:transform .35s ease, filter .35s ease; }
      .nav-item-animated:hover .nav-icon { transform:translateY(-2px) rotate(-5deg) scale(1.12); filter:drop-shadow(0 0 8px rgba(255,255,255,.7)); }
      .nav-underline { position:absolute; left:16px; right:16px; bottom:5px; height:2px; border-radius:999px; background:linear-gradient(90deg,transparent,#fff,transparent); transform:scaleX(0); transform-origin:center; transition:transform .3s ease; opacity:.9; }
      .nav-item-animated:hover .nav-underline, .nav-underline-active { transform:scaleX(1); }
      .footer-tech { isolation:isolate; }
      .footer-grid-lines { position:absolute; inset:0; pointer-events:none; opacity:.12; background-image:linear-gradient(rgba(255,255,255,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.45) 1px,transparent 1px); background-size:72px 72px; mask-image:linear-gradient(to bottom,transparent,black 20%,black 80%,transparent); animation:gridDrift 18s linear infinite; }
      @keyframes gridDrift { from{transform:translate3d(0,0,0)} to{transform:translate3d(72px,72px,0)} }
      .footer-orb { position:absolute; width:260px; height:260px; border-radius:999px; filter:blur(55px); opacity:.18; pointer-events:none; }
      .footer-orb-one { left:-120px; top:-80px; background:#7dd3fc; animation:footerOrb 9s ease-in-out infinite; }
      .footer-orb-two { right:-100px; bottom:-120px; background:#1d4ed8; animation:footerOrb 11s ease-in-out infinite reverse; }
      @keyframes footerOrb { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
      @keyframes modalFade { from{opacity:0} to{opacity:1} }
      .animate-modal-fade { animation: modalFade .22s ease-out both; }
      @keyframes modalPop { from{opacity:0;transform:scale(.92) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
      .animate-modal-pop { animation: modalPop .28s cubic-bezier(.22,1,.36,1) both; }
      @media (max-width: 640px), (prefers-reduced-motion: reduce) {
        .animate-orb-float, .animate-orb-float-slow,
        .animate-pulse-soft, .animate-pulse-soft-delay,
        .animate-spin-slow, .animate-spin-slow-reverse,
        .feature-card-float { animation: none !important; }
      }
    `}</style>
  );
}

function InitialsAvatar({ name, className = '' }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-black text-white ${className}`}>
      {initials}
    </div>
  );
}

function AboutUsPage({ goToSection }) {
  return (
    <div className="py-12">
      <section className="mx-auto max-w-6xl rounded-[34px] border border-white/15 bg-[#061f47]/90 p-8 shadow-2xl backdrop-blur-xl sm:p-12 animate-section-in">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">About Retech</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl">Engineering ideas into working systems.</h1>
        <p className="mt-7 max-w-4xl text-xl font-medium leading-9 text-white">Retech Solutions brings software, electronics, embedded systems, robotics, manufacturing, data and engineering education together under one innovation ecosystem.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-cyan-300/20 bg-white/10 p-6">
            <p className="text-3xl font-black text-cyan-300">01</p>
            <h3 className="mt-3 text-xl font-black text-white">Build</h3>
            <p className="mt-2 text-white">From prototypes to production-ready engineering systems.</p>
          </div>
          <div className="rounded-3xl border border-cyan-300/20 bg-white/10 p-6">
            <p className="text-3xl font-black text-cyan-300">02</p>
            <h3 className="mt-3 text-xl font-black text-white">Research</h3>
            <p className="mt-2 text-white">Applied R&D across robotics, AI, electronics and software.</p>
          </div>
          <div className="rounded-3xl border border-cyan-300/20 bg-white/10 p-6">
            <p className="text-3xl font-black text-cyan-300">03</p>
            <h3 className="mt-3 text-xl font-black text-white">Connect</h3>
            <p className="mt-2 text-white">Industry-academia initiatives that turn learning into real exposure.</p>
          </div>
        </div>
        <button onClick={() => goToSection('contacts')} className="mt-10 rounded-full bg-white px-7 py-4 font-black text-[#06315d] transition hover:-translate-y-1">Talk to Retech →</button>
      </section>

      <section className="mx-auto mt-8 max-w-6xl rounded-[34px] border border-white/15 bg-[#061f47]/90 p-8 shadow-2xl backdrop-blur-xl sm:p-12 animate-section-in">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Retech Lasers Pvt. Ltd.</p>
        <p className="mt-6 text-base leading-8 text-white/85">
          Retech Lasers is a Chennai-based startup leading the way in CNC laser technology. We design, build, and manufacture laser cutting and engraving machines entirely in-house — including our own proprietary control software tailored to our hardware — giving us full control over quality, performance, and support. We've delivered over 700 laser cutting machines across India, serving hobbyists, educators, and industrial manufacturers alike.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Entry / Hobbyist</p>
            <h3 className="mt-2 text-xl font-black text-white">PlotBot Plus</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">40W CO₂ laser, 2×1.5 ft bed — compact and affordable for hobbyists, education, and small businesses.</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Professional / Industrial</p>
            <h3 className="mt-2 text-xl font-black text-white">PlotBot Pro</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">130W CO₂ laser, 4×3 ft bed — high-speed production for workshops, furniture, and signage.</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Industrial / Metal</p>
            <h3 className="mt-2 text-xl font-black text-white">PlotBot Fiber</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">3kW fiber laser, 10×5 ft work area — heavy-duty metal cutting for fabrication and automotive.</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
          <a href="https://retechlasers.com/" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-cyan-200 transition hover:bg-white/20">retechlasers.com ↗</a>
          <a href="https://retechsolutions.in/" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-cyan-200 transition hover:bg-white/20">retechsolutions.in ↗</a>
          <a href="https://in.linkedin.com/company/retechsolutionspvtltd" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-cyan-200 transition hover:bg-white/20">Retech Solutions on LinkedIn ↗</a>
        </div>
      </section>
    </div>
  );
}

function ProductsPage() {
  const products = [
    { title: 'Retech Lasers', desc: 'Precision laser cutting and engineering machines.', link: 'https://retechlasers.com/', icon: Sparkles },
    { title: 'Retech Motors', desc: 'Motor and drive engineering for practical applications.', link: 'https://retechmotors.com/', icon: Wrench },
  ];
  return <div className="py-12"><div className="mb-10"><p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Ventures / Products</p><h1 className="mt-2 text-5xl font-black text-white sm:text-6xl">Products built for engineering.</h1></div><div className="grid gap-7 md:grid-cols-2">{products.map((p) => { const I=p.icon; return <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="group rounded-[32px] border border-white/15 bg-[#061f47]/90 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/50"><div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white"><I size={30}/></div><h2 className="text-3xl font-black text-white">{p.title}</h2><p className="mt-3 text-lg leading-8 text-white">{p.desc}</p><span className="mt-6 inline-block font-black text-cyan-300">Visit venture →</span></a>})}</div></div>;
}

function ProductUpdatesPage() {
  const updates = [
    { date: 'Aug 2026', tag: 'Retech Motors', title: 'Spinner v2 — real-time motor telemetry', desc: 'Upgraded our in-house Spinner software with live position, velocity, and torque monitoring across multiple motor drivers simultaneously.' },
    { date: 'Jul 2026', tag: 'Retech Lasers', title: 'PlotBot firmware update', desc: 'Improved cut precision and added new safety interlocks across the PlotBot laser engraving machine line.' },
    { date: 'Jun 2026', tag: 'R&D', title: 'Humanoid leg actuator revision', desc: 'Updated CAD and BLDC driver design for our humanoid robotics leg assembly, improving torque density and thermal performance.' },
    { date: 'May 2026', tag: 'Services', title: 'RTX 50 Series workstation builds', desc: 'Now offering customised PC building services for GPU-accelerated robotics and AI workloads using the NVIDIA GeForce RTX 50 series.' },
  ];
  return (
    <div className="py-12">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Product Updates</p>
        <h1 className="mt-2 text-5xl font-black text-white sm:text-6xl">What's new at Retech.</h1>
        <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-white">Releases, upgrades, and milestones across our motors, lasers, and R&D ventures.</p>
      </div>
      <div className="space-y-6">
        {updates.map((u) => (
          <div key={u.title} className="rounded-[28px] border border-white/15 bg-[#061f47]/90 p-7 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/50 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-300">{u.tag}</span>
              <span className="text-sm font-semibold text-white/60">{u.date}</span>
            </div>
            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">{u.title}</h2>
            <p className="mt-3 text-base leading-7 text-white/80">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustryAcademiaPage() {
  const items = ['IV Workshops','Value Added Courses','Seminars',"MoU's",'Associations with TNSDC','Naan Muthalvan','ICT Academy'];
  return <div className="py-12"><div className="mb-10"><p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Industry Academia Initiatives</p><h1 className="mt-2 text-5xl font-black text-white sm:text-6xl">Connect education with industry.</h1><p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-white">Programs and collaborations that create practical exposure, technology awareness and career pathways.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((x,i)=><div key={x} className="group rounded-3xl border border-white/15 bg-[#061f47]/90 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/50"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300"><GraduationCap size={24}/></div><p className="mt-5 text-xl font-black text-white">{x}</p><span className="mt-3 block text-sm font-semibold text-cyan-200">Explore initiative →</span></div>)}</div></div>;
}

function HomePage({ goToSection }) {
  const capabilities = [
    { icon: <Cpu size={28} />, title: 'Embedded & Edge AI', text: 'Hardware-aware AI systems, computer vision, GPU computing and intelligent edge devices.' },
    { icon: <Wrench size={28} />, title: 'Robotics & Automation', text: 'Robotic systems, motion control, machine integration and industrial automation.' },
    { icon: <MonitorCog size={28} />, title: 'Engineering Software', text: 'Engineering applications, monitoring tools, dashboards and software-hardware integration.' },
    { icon: <Sparkles size={28} />, title: 'R&D & Prototyping', text: 'Rapid prototyping, experimental engineering and product development from concept to proof.' },
  ];

  const focus = [
    'Artificial Intelligence & Computer Vision',
    'Robotics, Automation & Motion Control',
    'Embedded Systems & IoT',
    'GPU Computing & Edge Acceleration',
    'Mechanical & Electrical Product Engineering',
    'Industrial Software & Digital Engineering',
  ];

  const stats = [
    { value: '50+', label: 'Engineering Projects', icon: <Cpu size={22} /> },
    { value: '700+', label: 'Laser Machines Delivered', icon: <MonitorCog size={22} /> },
    { value: '5000+', label: 'Students Trained', icon: <Users size={22} /> },
    { value: '20+', label: 'Industry Collaborations', icon: <Globe size={22} /> },
  ];

  return (
    <div className="relative">
      {/* Full-viewport hero — uses the same site-wide background videos (no static image) */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Minimal readability wash — kept light so the video stays clearly visible */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#020b1a]/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a]/55 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-cyan-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              We Engineer The Future
            </p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl xl:text-[3.75rem]">
              Engineering Ideas
              <br />
              into Working
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                Systems.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base font-semibold leading-7 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-lg sm:leading-8">
              Retech Solutions brings software, electronics, embedded systems, robotics, manufacturing, data and engineering education together under one innovation ecosystem.
            </p>
            <button
              type="button"
              onClick={() => goToSection('services')}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-cyan-400/20 hover:text-white"
            >
              <Play size={16} className="fill-current" />
              Discover More
            </button>
          </div>
        </div>

        {/* Stats bar — translucent so the background video stays visible through it */}
        <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 bg-black/10 px-4 py-6 text-center transition hover:bg-cyan-950/30 sm:py-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {s.icon}
                </div>
                <p className="text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl">{s.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability grid */}
      <section className="relative bg-[#f5f8fc] px-6 py-20 text-slate-900 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">What we do</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">From engineering idea to working system.</h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              A modern engineering company needs software thinking, hardware discipline and rapid experimentation in the same room. Retech brings those capabilities together for students, startups and industrial technology projects.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article key={item.title} className="group rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,.06)] transition duration-300 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_24px_60px_rgba(14,165,233,.14)]">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f5ff] text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">{item.icon}</div>
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                <div className="mt-7 text-sm font-black text-sky-600">Discover →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technology focus */}
      <section className="relative overflow-hidden bg-[#061b38] px-6 py-24 text-white sm:px-10 lg:px-16">
        <div className="absolute right-[-8rem] top-[-8rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Technology focus</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Where software meets the physical world.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              We focus on engineering domains where computation, electronics, mechanics and intelligent machines have to work together reliably.
            </p>
            <button type="button" onClick={() => goToSection('rnd')} className="mt-8 rounded-full border border-cyan-300/50 px-6 py-3 text-sm font-black uppercase tracking-wide text-cyan-200 transition hover:bg-cyan-300 hover:text-[#061b38]">
              Explore R&D →
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {focus.map((item, i) => (
              <div key={item} className="flex items-start gap-4 border-t border-white/15 py-5">
                <span className="font-mono text-xs font-bold text-cyan-300">0{i + 1}</span>
                <span className="text-base font-bold leading-6 text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0a9cf2] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-white/75">Build the next system</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Engineering Precision. Delivering Innovation.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">Partner with Retech for practical engineering, industrial exposure, technology development and ambitious prototypes.</p>
          </div>
          <button type="button" onClick={() => goToSection('contacts')} className="shrink-0 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-[#06315d] shadow-xl transition hover:-translate-y-1 hover:bg-cyan-50">
            Contact Retech →
          </button>
        </div>
      </section>
    </div>
  );
}

function OurCompanies() {
  return (
    <div className="mx-auto max-w-7xl py-10">
      <section className="mb-14 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl text-white">Our Companies</h2>
        <div className="mx-auto mb-10 mt-6 h-1 w-20 rounded-full bg-sky-400" />
        <div className="mx-auto max-w-5xl space-y-7 text-[17px] leading-8 text-white">
          <p>Welcome to our organization, where we proudly oversee three renowned startups that have emerged from our flagship venture, Retech Projects. As a trusted partner for engineering students, Retech Projects offers comprehensive support and guidance for coursework, engineering student internships, and project work, while conducting extensive research activities for our affiliated enterprises.</p>
          <p>One of our prominent startups, <span className="font-bold text-cyan-200">Retech Lasers</span>, specializes in the manufacturing of cutting-edge machinery powered by laser technology. Furthermore, we are actively involved in the concurrent design and development of BLDC motors through our leading initiative, <span className="font-bold text-cyan-200">Retech Motors</span>.</p>
          <p>Our commitment lies in creating exceptional opportunities for young graduates. Therefore, we wholeheartedly invite individuals who share our vision to join us on this remarkable journey. Explore the possibilities and be a part of our mission today.</p>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {companyCards.map((card) => (
          <a key={card.title} href={card.link} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]">
            <div className="p-5 text-center font-semibold text-slate-700">{card.title}</div>
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-100 p-6"><LazyImg src={card.image} alt={card.title} className="relative z-10 h-40 w-full object-contain transition duration-500 group-hover:scale-110" /></div>
            <div className="p-5 text-center text-sm leading-6 text-slate-600">{card.desc}</div>
            <div className="px-5 pb-6 text-center text-sm font-semibold text-blue-600">Visit Website →</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ServicesPage({ goToSection }) {
  const services = [
    { title: 'Customised PC Building Workstations — NVIDIA GeForce RTX 50 Series', desc: 'Purpose-built workstations for AI, GPU computing, CAD, simulation, computer vision and software development using the NVIDIA GeForce RTX 50 Series.', icon: <MonitorCog size={30} /> },
    { title: 'PlotBot Machine Service Engineering', desc: 'Service, troubleshooting, maintenance, calibration and engineering support for PlotBot laser machines and associated systems.', icon: <Wrench size={30} /> },
    { title: 'Robotics', desc: 'Robotic systems, automation, integration and intelligent machine development.', icon: <Cpu size={30} /> },
    { title: 'Motor Drive Designing & Quality Control', desc: 'Motor-control electronics, drive design, testing, validation and quality assurance.', icon: <Wrench size={30} /> },
    { title: 'PCB Designing', desc: 'Schematic capture, PCB layout, prototyping and engineering validation.', icon: <Cpu size={30} /> },
    { title: 'UI/UX Designing', desc: 'Human-centred interfaces for products, dashboards, applications and engineering tools.', icon: <Sparkles size={30} /> },
    { title: 'Embedded Software Engineering', desc: 'Firmware, device drivers, real-time software and hardware-software integration.', icon: <Cpu size={30} /> },
    { title: 'Full Stack Web Development', desc: 'Modern web applications, APIs, dashboards and full-stack digital platforms.', icon: <Building2 size={30} /> },
    { title: 'Data Driven Analytics', desc: 'Data pipelines, analytics dashboards, predictive insights and decision-support systems.', icon: <Network size={30} /> },
    { title: 'Embedded Systems Engineering', desc: 'Connected embedded products, controllers, IoT systems and edge computing.', icon: <Cpu size={30} /> },
  ];
  return (
    <div className="py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Engineering Services</p>
        <h2 className="text-4xl font-black text-white sm:text-5xl">Services</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold text-white">Practical engineering services built around precision, performance, and real-world technology requirements.</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.title} className="group rounded-[30px] border border-white/15 bg-[#0b2148]/92 p-8 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-cyan-900/40">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-cyan-900/30 group-hover:scale-105">
              {service.icon}
            </div>
            <h3 className="text-2xl font-black text-white">{service.title}</h3>
            <p className="mt-4 text-base font-medium leading-7 text-white">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage({ cards, goToSection }) {
  return (
    <div className="py-8">
      <div className="mb-9">
        <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-300">Student & Industry Connect</p>
        <h2 className="text-4xl font-black text-white sm:text-5xl">Events</h2>
        <p className="mt-3 max-w-3xl text-lg font-semibold text-white">Workshops, technical programs, industrial exposure, and networking opportunities.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => (
          <button key={item.title} type="button" onClick={() => goToSection(item.section)} className="group rounded-[28px] border border-white/15 bg-[#0b2148]/90 p-8 text-center shadow-xl backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/50">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-400 to-blue-600 text-white shadow-lg">{item.icon}</div>
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-2 text-sm font-medium leading-6 text-white">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function NetworkingEvents() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/15 bg-[#0b2148]/92 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg"><Network size={38} /></div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Connect • Collaborate • Grow</p>
        <h2 className="mt-3 text-4xl font-black text-white">Networking Events</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-white">Industry meetups, engineering communities, student–company interactions, mentor sessions, and technology networking opportunities.</p>
      </div>
    </div>
  );
}

function ClientsAndReviewsPage({ logos, reviews, selectedReview, setSelectedReview }) {
  const list = logos || [];
  return (
    <div className="py-8">
      <section className="mb-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Our prominent clients</p>
          <h2 className="mt-2 text-4xl font-black text-white sm:text-5xl">Trusted by organisations and technology teams</h2>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/95 py-8 shadow-2xl">
          <div className="flex w-max gap-8 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
            {[...list, ...list].map((logo, i) => (
              <div key={`${logo.id}-${i}`} className="flex min-w-[190px] items-center justify-center rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200">
                <LazyImg src={logo.src} alt={logo.name} className="h-20 w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-7 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Client Reviews</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">What people say about Retech</h2>
          <p className="mx-auto mt-3 max-w-2xl font-medium text-white">Client testimonials can be maintained through the existing review management panel.</p>
        </div>
        <ReviewStrip reviews={reviews} selectedReview={selectedReview} setSelectedReview={setSelectedReview} />
      </section>

      <section>
        <div className="mb-7 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Student Outcomes</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Companies Our Students Joined</h2>
          <p className="mx-auto mt-3 max-w-2xl font-medium text-white">Students build practical skills through Retech programs and progress into opportunities across engineering and technology organisations.</p>
        </div>
        <CompaniesJoinedInline logos={list} />
        <div className="mt-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">Student Reviews</p>
          <h3 className="mt-2 text-3xl font-black text-white">Experiences from our students</h3>
        </div>
        <div className="mt-6"><ReviewStrip reviews={reviews} selectedReview={selectedReview} setSelectedReview={setSelectedReview} /></div>
      </section>
    </div>
  );
}

function ReviewStrip({ reviews, selectedReview, setSelectedReview }) {
  const items = reviews || [];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((review, index) => (
        <button key={`${review.name}-${index}`} type="button" onClick={() => setSelectedReview(review)} className="text-left rounded-[28px] border border-white/15 bg-[#0b2148]/90 p-7 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40">
          <div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-black text-white">{review.initial}</div><div><p className="font-black text-white">{review.name}</p><p className="text-sm font-medium text-cyan-200">{review.course}</p></div></div>
          <p className="mt-5 font-semibold leading-7 text-white">“{review.short}”</p>
          <p className="mt-4 text-sm font-bold text-cyan-300">Read full review →</p>
        </button>
      ))}
    </div>
  );
}

function CompaniesJoinedInline({ logos }) {
  const list = logos || [];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/95 py-8 shadow-2xl">
      <div className="flex w-max gap-8 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
        {[...list, ...list].map((logo, i) => (
          <div key={`${logo.id}-students-${i}`} className="flex min-w-[190px] items-center justify-center rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200">
            <LazyImg src={logo.src} alt={logo.name} className="h-20 w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillDevelopment({ cards, goToSection }) {
  return (
    <div className="py-8">
      <div className="mb-8"><p className="mb-2 text-sm font-black uppercase tracking-widest text-cyan-300">Student & Industry Connect</p><h2 className="text-3xl font-black text-white sm:text-4xl">Events</h2><p className="mt-3 max-w-3xl font-semibold text-white">Select an event category below.</p></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <button key={item.title} type="button" onClick={() => goToSection(item.section)} className="group relative overflow-hidden rounded-[28px] bg-white/70 p-8 text-center shadow-xl ring-1 ring-white/40 backdrop-blur-xl transition hover:-translate-y-3 hover:scale-[1.04]">
            <div className="relative z-10 mb-5 flex justify-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg transition group-hover:scale-110">{item.icon}</div></div>
            <h3 className="relative z-10 text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="relative z-10 mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function PageWithBack({ children }) {
  return <>{children}</>;
}

function ReviewsSection({ reviews, selectedReview, setSelectedReview }) {
  // Read-only on the public page. All add / edit / delete happens in the Admin Panel.
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToReview = (index) => {
    setActiveIndex(index);
    scrollerRef.current?.children?.[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const nextReview = () => scrollToReview((activeIndex + 1) % reviews.length);
  const prevReview = () => scrollToReview((activeIndex - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (!reviews.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % reviews.length;
        scrollerRef.current?.children?.[next]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="relative py-10">
      <div className="pointer-events-none absolute -right-24 top-6 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-6 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />

      <div className="relative mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-200">
            <Star size={28} />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">Student Experience</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-950">Reviews & Testimonials</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={prevReview}
            className="rounded-full bg-white/80 px-4 py-3 font-bold text-slate-700 shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-1 hover:bg-blue-50 hover:text-blue-700"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={nextReview}
            className="rounded-full bg-white/80 px-4 py-3 font-bold text-slate-700 shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-1 hover:bg-blue-50 hover:text-blue-700"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="relative flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth rounded-[2rem] py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review, i) => (
          <div
            key={`${review.name}-${i}`}
            className={`group relative min-w-[340px] max-w-[340px] snap-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-8 text-left shadow-xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_90px_rgba(59,130,246,0.25)] md:min-w-[420px] md:max-w-[420px] ${
              activeIndex === i ? 'scale-100 opacity-100' : 'scale-95 opacity-75'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedReview(review);
                setActiveIndex(i);
              }}
              className="block w-full text-left"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_45%)]" />
              <div className="relative z-10 mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-bold text-white shadow-lg">
                  {review.initial}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{review.name}</h3>
                  <p className="text-sm text-blue-600">{review.course}</p>
                  <p className="text-xs text-slate-500">{review.institute}</p>
                </div>
              </div>

              <div className="relative z-10 mb-4 flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="relative z-10 text-sm leading-7 text-slate-700">{review.short}</p>
              <p className="relative z-10 mt-3 text-sm font-semibold text-slate-900">{review.highlight}</p>
              <p className="relative z-10 mt-5 text-sm font-bold text-blue-600">Tap to read full review →</p>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToReview(i)}
            className={`h-2 rounded-full transition-all ${activeIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
          />
        ))}
      </div>

      {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
    </div>
  );
}

function ReviewEditModal({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial || { name: '', initial: '', course: '', institute: '', short: '', highlight: '', full: '' });
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const submit = () => {
    if (!form.name.trim()) return alert('Name is required');
    const initialChar = form.initial?.trim() || form.name.trim()[0]?.toUpperCase() || '?';
    onSave({ ...form, initial: initialChar });
  };
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-extrabold text-slate-900">{initial ? 'Edit Review' : 'Add Review'}</h3>
          <button type="button" onClick={onCancel} className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"><X size={20} /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Student Name *"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.name} onChange={(e) => update('name', e.target.value)} /></Field>
          <Field label="Initial (1 letter)"><input className="rounded-xl border border-slate-300 px-3 py-2" maxLength={1} value={form.initial} onChange={(e) => update('initial', e.target.value)} placeholder="Auto from name" /></Field>
          <Field label="Course"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.course} onChange={(e) => update('course', e.target.value)} /></Field>
          <Field label="Institute"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.institute} onChange={(e) => update('institute', e.target.value)} /></Field>
        </div>
        <div className="mt-4 grid gap-4">
          <Field label="Short Summary"><textarea rows={2} className="rounded-xl border border-slate-300 px-3 py-2" value={form.short} onChange={(e) => update('short', e.target.value)} /></Field>
          <Field label="Highlight Quote"><textarea rows={2} className="rounded-xl border border-slate-300 px-3 py-2" value={form.highlight} onChange={(e) => update('highlight', e.target.value)} /></Field>
          <Field label="Full Review"><textarea rows={8} className="rounded-xl border border-slate-300 px-3 py-2" value={form.full} onChange={(e) => update('full', e.target.value)} /></Field>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl bg-slate-200 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-300">Cancel</button>
          <button type="button" onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"><Save size={16} /> Save</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function ReviewModal({ review, onClose }) {
  const paragraphs = String(review.full || '').split(String.fromCharCode(10) + String.fromCharCode(10));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md animate-modal-fade">
      <div className="relative max-h-[86vh] w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.35)] animate-modal-pop">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-50 via-cyan-50 to-white" />

        <div className="relative border-b border-slate-100 bg-white/80 px-6 py-5 backdrop-blur-xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full bg-white/80 p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:scale-110 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={22} />
          </button>

          <h3 className="pr-12 text-2xl font-extrabold text-slate-900">{review.name}</h3>
          <p className="mt-1 text-sm font-semibold text-blue-600">{review.course}</p>
          <p className="text-xs text-slate-500">{review.institute}</p>

          <div className="mt-4 flex gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={17} fill="currentColor" />
            ))}
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
          <div className="space-y-4 text-sm leading-8 text-slate-700 md:text-base">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection({ contacts, isAdmin, onAdminClick, onLogout, goToSection }) {
  const c = contacts || DEFAULT_CONTACTS;
  const waNumber = (c.whatsapp || '').replace(/[^0-9]/g, '');
  return (
    <div className="py-10">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-[0_10px_30px_rgba(59,130,246,0.45)]">
          <Phone size={28} />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">Let&apos;s Connect</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-950">Contact Us</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PremiumCard className="p-8">
          <h3 className="mb-7 text-2xl font-bold text-slate-950">Contact Details</h3>
          <div className="space-y-5">
            <ContactItem icon={<Phone />} title="Phone Numbers">
              <a href={`tel:${(c.phone1 || '').replace(/[^0-9+]/g, '')}`}>{c.phone1}</a>
              <a href={`tel:${(c.phone2 || '').replace(/[^0-9+]/g, '')}`}>{c.phone2}</a>
            </ContactItem>
            <ContactItem icon={<Phone />} title="WhatsApp">
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer">{c.whatsapp}</a>
            </ContactItem>
            <ContactItem icon={<Mail />} title="Email">
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </ContactItem>
            <ContactItem icon={<MapPin />} title="Address">
              <a href={c.mapUrl} target="_blank" rel="noreferrer">{c.address}</a>
            </ContactItem>
          </div>
        </PremiumCard>

        <PremiumCard className="p-8">
          <h3 className="mb-7 text-2xl font-bold text-slate-950">Connect With Us</h3>
          <SocialItem icon={<Facebook />} title="Facebook" url={c.facebook} text={c.facebook?.replace(/^https?:\/\//, '')} />
          <SocialItem icon={<Instagram />} title="Instagram" url={c.instagram} text={c.instagram?.replace(/^https?:\/\//, '')} />
          <SocialItem icon={<Linkedin />} title="LinkedIn" url={c.linkedin} text={c.linkedin?.replace(/^https?:\/\//, '')} />

          <div className="mt-8 border-t border-slate-200 pt-7">
            <h4 className="mb-4 font-bold text-slate-700">Quick Contact</h4>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${(c.phone2 || '').replace(/[^0-9+]/g, '')}`} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700">Call Now</a>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:bg-green-700">WhatsApp</a>
            </div>
          </div>
        </PremiumCard>
      </div>

      <div className="mt-12">
        <div className="mb-6 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Our Websites</p>
          <h3 className="mt-2 text-2xl font-extrabold text-slate-950">Retech Group</h3>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">Explore our engineering, laser technology, and motor development initiatives.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { title: 'Retech Solutions', url: 'https://retechsolutions.in/', desc: 'Engineering solutions, projects, training, and innovation.' },
            { title: 'Retech Lasers', url: 'https://retechlasers.com/', desc: 'Laser machinery, PlotBot systems, and service engineering.' },
            { title: 'Retech Motors', url: 'https://retechmotors.com/', desc: 'BLDC motor research, design, and development.' },
          ].map((site) => (
            <a
              key={site.title}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-extrabold text-slate-900">{site.title}</h4>
                <ExternalLink size={18} className="text-blue-600 transition group-hover:translate-x-1" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{site.desc}</p>
              <p className="mt-4 text-sm font-bold text-blue-600">Visit Website →</p>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => (isAdmin ? goToSection('admin') : onAdminClick())}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-600"
          title={isAdmin ? 'Admin panel' : 'Admin access'}
          aria-label="Admin"
        >
          <Lock size={13} /> Admin
        </button>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="group/item flex gap-4 rounded-2xl p-3 transition hover:bg-blue-50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm transition group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-slate-700">{title}</p>
        <div className="mt-2 grid gap-1 [overflow-wrap:anywhere] text-slate-600 [&_a]:text-blue-600 [&_a]:transition hover:[&_a]:text-blue-700">
          {children}
        </div>
      </div>
    </div>
  );
}

function SocialItem({ icon, title, url, text }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="group/social mb-5 flex gap-4 rounded-2xl p-3 transition hover:-translate-y-1 hover:bg-blue-50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm transition group-hover/social:scale-110 group-hover/social:bg-blue-600 group-hover/social:text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-slate-700">{title}</p>
        <p className="mt-1 block [overflow-wrap:anywhere] text-blue-600">{text}</p>
      </div>
    </a>
  );
}

function CompaniesJoinedPage({ placedCount, logos }) {
  const list = logos || [];
  return (
    <div className="py-10">
      <div className="mb-6 flex flex-col items-center gap-3">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl text-slate-900">Companies Our Students Joined</h2>
      </div>
      <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-slate-600">
        Our students begin with structured internship training at Retech Solutions. With practical knowledge,
        project exposure, and confidence gained during the internship program, many moved forward and secured
        opportunities in reputed companies.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        <PremiumCard className="p-7 text-center"><p className="text-5xl font-black text-blue-700">{placedCount}+</p><p className="mt-2 font-semibold text-slate-600">Students Trained</p></PremiumCard>
        <PremiumCard className="p-7 text-center"><p className="text-5xl font-black text-cyan-700">50+</p><p className="mt-2 font-semibold text-slate-600">Companies Joined by Students</p></PremiumCard>
        <PremiumCard className="p-7 text-center"><p className="text-5xl font-black text-indigo-700">95%</p><p className="mt-2 font-semibold text-slate-600">Career Growth</p></PremiumCard>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white py-8 shadow-md ring-1 ring-slate-200">
        <div className="flex w-max gap-10 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
          {[...list, ...list].map((logo, i) => (
            <div key={`${logo.id}-${i}`} className="group relative flex min-w-[190px] items-center justify-center overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] hover:ring-blue-200">
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_65%)]" />
              <LazyImg src={logo.src} alt={logo.name} className="relative z-10 h-20 w-full object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer({ goToSection, contacts }) {
  const c = contacts || DEFAULT_CONTACTS;
  return (
    <footer className="relative z-20 overflow-hidden bg-[#0A9CF2] text-white footer-tech">
      <div className="footer-grid-lines" />
      <div className="footer-orb footer-orb-one" />
      <div className="footer-orb footer-orb-two" />
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-6 py-12 md:grid-cols-4 md:py-16 relative z-10">
        <div>
          <LazyImg
            src={retechLogoTransparent}
            alt="Retech Solutions Logo"
            className="mb-4 h-20 w-[255px] object-contain"
          />
          <p className="mb-4 text-sm font-semibold italic tracking-wide text-white">
            "Engineering Precision. Delivering Innovation."
          </p>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/retechsolution/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/retechsolutionspvtltd/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://www.instagram.com/retechsolutions/"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xl font-bold leading-8">
            Get in Touch with Us for the Best Quality services and products.
          </h4>
        </div>

        <div>
          <h4 className="mb-6 text-xl font-bold">Quick Links</h4>
          <div className="space-y-4 text-white">
            <button
              type="button"
              onClick={() => goToSection('home')}
              className="block transition hover:text-white"
            >
              Know More About Us
            </button>

            <a
              href="https://retechlasers.com/"
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-white"
            >
              Visit Store
            </a>

            <button
              type="button"
              onClick={() => goToSection('contacts')}
              className="block transition hover:text-white"
            >
              Let&apos;s Connect
            </button>
          </div>
        </div>

        <div>
          <h4 className="mb-6 text-xl font-bold">Important Links</h4>
          <div className="space-y-4 text-white">
            <a
              href="https://retechsolutions.in/"
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-white"
            >
              Retech Solutions
            </a>

            <a
              href="https://retechlasers.com/"
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-white"
            >
              Retech Lasers
            </a>

            <a
              href="https://retechmotors.com/"
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-white"
            >
              Retech Motors
            </a>

            <a href="#" className="block transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-white md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026</p>
          <div className="flex items-center gap-4">
            <p>Retech Solutions Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LoginModal({ onClose, onSubmit }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!onSubmit(pw)) setError('Wrong password');
  };
  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md animate-modal-fade">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl animate-modal-pop">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white"><Lock size={20} /></div>
            <h3 className="text-xl font-bold text-slate-900">Admin Login</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"><X size={18} /></button>
        </div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
        <input
          type="password"
          value={pw}
          autoFocus
          onChange={(e) => { setPw(e.target.value); setError(''); }}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Enter admin password"
        />
        {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700">Log In</button>
      </form>
    </div>
  );
}

function AdminPanel({ reviewsList, setReviewsList, logos, addLogo, removeLogo, restoreDefaultLogos, hiddenCount, contactsData, setContactsData, logoutAdmin, goToSection }) {
  const [tab, setTab] = useState('reviews');
  const tabs = [
    { key: 'reviews', label: 'Reviews' },
    { key: 'logos', label: 'Company Logos' },
    { key: 'contacts', label: 'Contact Info' },
    { key: 'pages', label: 'Other Pages' },
  ];
  return (
    <div className="py-10">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg">
          <Lock size={28} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Restricted</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-950">Admin Panel</h2>
        </div>
        <button type="button" onClick={logoutAdmin} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-red-600">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold transition ${tab === t.key ? 'border-b-2 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'reviews' && <ReviewsAdmin reviewsList={reviewsList} setReviewsList={setReviewsList} />}
      {tab === 'logos' && <LogosAdmin logos={logos} addLogo={addLogo} removeLogo={removeLogo} restoreDefaultLogos={restoreDefaultLogos} hiddenCount={hiddenCount} />}
      {tab === 'contacts' && <ContactsAdmin contactsData={contactsData} setContactsData={setContactsData} />}
      {tab === 'pages' && <OtherPagesTab goToSection={goToSection} />}
    </div>
  );
}

function ReviewsAdmin({ reviewsList, setReviewsList }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [adding, setAdding] = useState(false);
  const remove = (i) => { if (window.confirm('Delete this review?')) setReviewsList(reviewsList.filter((_, idx) => idx !== i)); };
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Manage Reviews ({reviewsList.length})</h3>
        <button type="button" onClick={() => setAdding(true)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"><Plus size={16} /> Add Review</button>
      </div>
      <div className="grid gap-3">
        {reviewsList.map((r, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{r.initial}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-900">{r.name}</p>
              <p className="truncate text-sm text-slate-500">{r.course} — {r.institute}</p>
            </div>
            <button type="button" onClick={() => setEditingIndex(i)} className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-blue-100 hover:text-blue-700"><Edit2 size={16} /></button>
            <button type="button" onClick={() => remove(i)} className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-red-100 hover:text-red-700"><Trash2 size={16} /></button>
          </div>
        ))}
        {reviewsList.length === 0 && <p className="text-center text-slate-400">No reviews yet.</p>}
      </div>
      {(adding || editingIndex !== null) && (
        <ReviewEditModal
          initial={editingIndex !== null ? reviewsList[editingIndex] : null}
          onCancel={() => { setAdding(false); setEditingIndex(null); }}
          onSave={(data) => {
            if (editingIndex !== null) {
              setReviewsList(reviewsList.map((r, idx) => idx === editingIndex ? data : r));
            } else {
              setReviewsList([...reviewsList, data]);
            }
            setAdding(false);
            setEditingIndex(null);
          }}
        />
      )}
    </div>
  );
}

function LogosAdmin({ logos, addLogo, removeLogo, restoreDefaultLogos, hiddenCount }) {
  const list = logos || [];
  const upload = (file) => {
    if (!file) return;
    if (file.size > 600 * 1024) { alert('Logo too large — keep under 500 KB.'); return; }
    const reader = new FileReader();
    reader.onload = () => addLogo({ name: file.name.replace(/\.[^.]+$/, ''), src: String(reader.result) });
    reader.readAsDataURL(file);
  };
  const remove = (logo) => { if (window.confirm('Remove this logo?')) removeLogo(logo); };
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Company Logos ({list.length})</h3>
        <div className="flex gap-2">
          {hiddenCount > 0 && (
            <button type="button" onClick={restoreDefaultLogos} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200">
              <RotateCcw size={16} /> Restore defaults ({hiddenCount})
            </button>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            <Upload size={16} /> Upload Logo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((logo) => (
          <div key={logo.id} className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            {logo.isDefault && <span className="absolute left-1 top-1 z-20 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-semibold text-white">default</span>}
            <LazyImg src={logo.src} alt={logo.name} className="relative z-10 h-20 w-full object-contain" />
            <button type="button" onClick={() => remove(logo)} className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"><Trash2 size={14} /></button>
          </div>
        ))}
        {list.length === 0 && <p className="col-span-full text-center text-slate-400">No logos yet.</p>}
      </div>
    </div>
  );
}

function ContactsAdmin({ contactsData, setContactsData }) {
  const [form, setForm] = useState(contactsData || DEFAULT_CONTACTS);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const save = () => { setContactsData(form); alert('Contact info saved.'); };
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone 1"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.phone1 || ''} onChange={(e) => update('phone1', e.target.value)} /></Field>
        <Field label="Phone 2"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.phone2 || ''} onChange={(e) => update('phone2', e.target.value)} /></Field>
        <Field label="WhatsApp"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.whatsapp || ''} onChange={(e) => update('whatsapp', e.target.value)} /></Field>
        <Field label="Email"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.email || ''} onChange={(e) => update('email', e.target.value)} /></Field>
      </div>
      <Field label="Address"><textarea rows={2} className="rounded-xl border border-slate-300 px-3 py-2" value={form.address || ''} onChange={(e) => update('address', e.target.value)} /></Field>
      <Field label="Google Maps URL"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.mapUrl || ''} onChange={(e) => update('mapUrl', e.target.value)} /></Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Facebook URL"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.facebook || ''} onChange={(e) => update('facebook', e.target.value)} /></Field>
        <Field label="Instagram URL"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.instagram || ''} onChange={(e) => update('instagram', e.target.value)} /></Field>
        <Field label="LinkedIn URL"><input className="rounded-xl border border-slate-300 px-3 py-2" value={form.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} /></Field>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"><Save size={16} /> Save Contact Info</button>
      </div>
    </div>
  );
}

function OtherPagesTab({ goToSection }) {
  const links = [
    { label: 'Industrial Visits', key: 'events-iv', icon: GraduationCap },
    { label: 'Workshops & Courses', key: 'events-workshops', icon: Sparkles },
    { label: 'Tech Talks', key: 'events-techtalks', icon: Star },
    { label: 'Fields of Focus', key: 'events-fields', icon: Building2 },
    { label: 'MOUs (Partnerships)', key: 'partnerships-mous', icon: Handshake },
    { label: 'Consultancy Works', key: 'partnerships-consultancy', icon: Handshake },
    { label: 'Trusted Vendors', key: 'partnerships-vendors', icon: Handshake },
    { label: 'Careers in Retech', key: 'retech-careers', icon: Briefcase },
  ];
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-slate-900">Manage these pages directly</h3>
      <p className="mb-5 text-sm text-slate-600">When you're logged in as admin, every page below has its own Upload / Add / Edit / Delete buttons. Click a tile to jump there.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <button key={l.key} type="button" onClick={() => goToSection(l.key)} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Icon size={20} /></div>
              <span className="font-semibold text-slate-700">{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}