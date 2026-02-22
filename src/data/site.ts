export interface SocialLink {
  username: string;
  url: string;
  title: string;
  icon: string;
}

export interface MenuItem {
  name: string;
  url: string;
  icon: string;
  weight: number;
}

function buildSocialLinks(
  social: Record<string, string | undefined>,
): SocialLink[] {
  const urlPatterns: Record<
    string,
    { url: (u: string) => string; title: string; icon: string }
  > = {
    github: {
      url: (u) => `//github.com/${u}`,
      title: "GitHub",
      icon: "fa-github",
    },
    bitbucket: {
      url: (u) => `//bitbucket.com/${u}`,
      title: "Bitbucket",
      icon: "fa-bitbucket",
    },
    instagram: {
      url: (u) => `//instagram.com/${u}`,
      title: "Instagram",
      icon: "fa-instagram",
    },
    youtube: {
      url: (u) => `//youtube.com/${u}`,
      title: "YouTube",
      icon: "fa-youtube",
    },
    medium: {
      url: (u) => `//medium.com/@${u}`,
      title: "Medium",
      icon: "fa-medium",
    },
    linkedin: {
      url: (u) => `//linkedin.com/in/${u}`,
      title: "LinkedIn",
      icon: "fa-linkedin",
    },
    stackoverflow: {
      url: (u) => `//stackoverflow.com/users/${u}`,
      title: "Stack Overflow",
      icon: "fa-stack-overflow",
    },
    facebook: {
      url: (u) => `//facebook.com/${u}`,
      title: "Facebook",
      icon: "fa-facebook",
    },
    twitter: {
      url: (u) => `//twitter.com/${u}`,
      title: "Twitter",
      icon: "fa-twitter",
    },
  };

  const links: SocialLink[] = [];
  for (const [key, value] of Object.entries(social)) {
    if (value && urlPatterns[key]) {
      const pattern = urlPatterns[key];
      links.push({
        username: value,
        url: pattern.url(value),
        title: pattern.title,
        icon: pattern.icon,
      });
    }
  }
  return links;
}

export const siteConfig = {
  title: "It's Ronald",
  description:
    "Website and blog of Ronald Martin: app developer, occasional scholar, and all-around fun guy.",
  baseUrl: "https://itsronald.com",
  navbarTitle: "It's Ronald",
  paginate: 3,

  viewMorePostLink: "/blog/",
  categoriesByCount: true,
  includeReadingTime: true,
  faviconThemeColor: "#2ebaae",

  intro: {
    header: "Ronald Martin",
    paragraph: "His head is trapped in a hexagon!",
    about:
      "Hi! This is where I post occasional thoughts. It's a work in progress.",
    pic: {
      src: "/img/main/ronald-martin.png",
      circle: false,
      imperfect: false,
      width: "150",
      alt: "Ronald Martin",
    },
  },

  postAmount: { sidebar: 2 },

  menu: [
    { name: "Blog", url: "/blog", icon: "fa fa-newspaper-o", weight: 1 },
    {
      name: "Categories",
      url: "/categories",
      icon: "fa fa-map-signs",
      weight: 2,
    },
    { name: "About", url: "/about", icon: "fa fa-info-circle", weight: 3 },
    { name: "Projects", url: "/projects", icon: "fa fa-code", weight: 4 },
  ] satisfies MenuItem[],

  socialLinks: buildSocialLinks({
    github: "ronaldsmartin",
    bitbucket: "ronaldsmartin",
    instagram: "ronaldsmartin",
    youtube: "ronaldsmartin",
    medium: "ronaldsmartin",
    linkedin: "ronaldsmartin",
    stackoverflow: "4499783",
    facebook: "itsronaldmartin",
    twitter: "itsronaldmartin",
  }),

  email: "hello@ronaldsmartin.com",
} as const;
