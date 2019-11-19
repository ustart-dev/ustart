/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'uStart', // Title for your website.
  // tagline: 'NodeJS framework for building GraphQL backends using Apollo, Sequelize, Mongoose, Graphql shield and other great tools',
  tagline: 'uStart makes it quick and easy to start and maintain a new backend project.',
  url: 'https://ustart-dev.github.io', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'ustart-dev.github.io',
  organizationName: 'ustart-dev',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'
  cname: "ustart.dev",

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    {
      href: 'https://github.com/ustart-dev',
      label: 'GitHub',
    },
    // {doc: 'doc4', label: 'API'},
    // {page: 'help', label: 'Help'},
  ],

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'img/icono-ustart.svg',
  footerIcon: 'img/icono-ustart.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#0091C8',
    secondaryColor: '#0076a3',
  },

  gaTrackingId: 'UA-129019450-2',

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} USTART SPA`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/ustart-dev-500x500-bg-white.png',
  twitterImage: 'img/ustart-dev-500x500-bg-white.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/ustart-dev/ustart',

  // Algolia search
  algolia: {
    apiKey: '18e736bc88a7fcb9ff490ed829bdcd07',
    indexName: 'ustart',
    // algoliaOptions: {} // Optional, if provided by Algolia
  },

  scrollToTop: true
};

module.exports = siteConfig;
