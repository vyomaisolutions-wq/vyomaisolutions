export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ServiceDropdownItem {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName: string;
  badge?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
  iconName: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const servicesDropdownItems: ServiceDropdownItem[] = [];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    href: "https://www.linkedin.com/company/vyomai-solutions-pvt-ltd/",
    ariaLabel: "Follow VyomAI on LinkedIn",
    iconName: "Linkedin",
  },
  {
    platform: "Instagram",
    href: "https://www.instagram.com/vyomaisolutions?vrfl=YzA0cWZiYWpsYW9p",
    ariaLabel: "Follow VyomAI on Instagram",
    iconName: "Instagram",
  },
];
