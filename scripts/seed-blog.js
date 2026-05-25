require('dotenv/config');

const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
  process.exit(1);
}
if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN — create a write token at sanity.io/manage',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

/* ── helpers ─────────────────────────────────────────────────────── */

function blk(key, style, children, markDefs = []) {
  return { _type: 'block', _key: key, style, markDefs, children };
}
function sp(key, text, marks = []) {
  return { _type: 'span', _key: key, text, marks };
}
function bullet(key, text) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [sp(key + 's', text)],
  };
}
function h2(key, text) {
  return blk(key, 'h2', [sp(key + 's', text)]);
}
function h3(key, text) {
  return blk(key, 'h3', [sp(key + 's', text)]);
}
function imgBlock(key, assetRef, alt, caption) {
  return {
    _type: 'image',
    _key: key,
    asset: { _type: 'reference', _ref: assetRef },
    alt,
    caption,
  };
}

async function uploadImage(url, filename) {
  console.log(`  Uploading ${filename}...`);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch image ${url}: ${resp.status}`);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  });
  return asset._id;
}

/* ── image URLs (picsum.photos — reliable seed-based placeholders)
   Replace with real Uzbekistan photos before going live.           */
const IMAGES = {
  cover: 'https://picsum.photos/seed/samarkand-registan/1200/630',
  registan: 'https://picsum.photos/seed/uzbekistan-mosque/1200/700',
  bazaar: 'https://picsum.photos/seed/silk-road-bazaar/1200/700',
};

/* ── main ─────────────────────────────────────────────────────────── */

async function seed() {
  /* 1. Upload images */
  console.log('Uploading images...');
  const [coverRef, registanRef, bazaarRef] = await Promise.all([
    uploadImage(IMAGES.cover, 'registan-samarkand-cover.jpg'),
    uploadImage(IMAGES.registan, 'registan-samarkand-body.jpg'),
    uploadImage(IMAGES.bazaar, 'bazar-ouzbekistan.jpg'),
  ]);

  /* 2. Author */
  console.log('Creating author...');
  const authorDoc = await client.createOrReplace({
    _id: 'author-bahor-voyage',
    _type: 'author',
    name: "L'équipe Bahor-Voyage",
    role: 'Spécialiste Asie centrale',
    bio: "Passionnés d'Ouzbékistan depuis plus de 10 ans, nos conseillers voyagent régulièrement sur place pour vous offrir les itinéraires les plus authentiques.",
  });

  /* 3. Category */
  console.log('Creating category...');
  const catDoc = await client.createOrReplace({
    _id: 'category-guide-voyage',
    _type: 'blogCategory',
    title: 'Guide de voyage',
    slug: { _type: 'slug', current: 'guide-de-voyage' },
    description:
      'Conseils pratiques, itinéraires et inspirations pour préparer votre voyage en Asie centrale.',
    seoTitle: 'Guide de voyage en Ouzbékistan et Asie centrale',
    seoDescription:
      'Tous nos conseils pour préparer votre voyage en Ouzbékistan : visa, budget, meilleure saison, circuits et incontournables.',
  });

  /* 4. Blog post body (Portable Text) */
  const body = [
    /* INTRO */
    blk('b-intro', 'normal', [
      sp('b-intro-s1', 'Planifier un '),
      sp('b-intro-s2', 'voyage en Ouzbékistan', ['strong']),
      sp(
        'b-intro-s3',
        ", c'est s'apprêter à traverser l'un des plus fascinants carrefours de l'histoire humaine. La ",
      ),
      sp('b-intro-s4', 'Route de la Soie', ['em']),
      sp(
        'b-intro-s5',
        " a façonné ces terres pendant des siècles, léguant à Samarcande, Boukhara et Khiva des monuments d'une beauté saisissante. Aujourd'hui, l'Ouzbékistan s'ouvre aux voyageurs du monde entier et offre une expérience authentique, loin des foules touristiques européennes. Ce guide complet vous aidera à préparer chaque étape de votre aventure centrasiatique.",
      ),
    ]),

    /* H2: POURQUOI */
    h2(
      'h2-pourquoi',
      "Pourquoi choisir l'Ouzbékistan pour votre prochain voyage ?",
    ),
    blk('b-pourquoi', 'normal', [
      sp(
        'b-pq-s1',
        "L'Ouzbékistan est l'une des destinations les plus sous-estimées au monde. À mi-chemin entre la Turquie et la Chine, ce pays d'Asie centrale combine une richesse historique hors du commun, une hospitalité légendaire et des paysages variés allant des déserts de sable aux montagnes du Tian-Shan. Depuis la simplification du régime de visa en 2018, le pays accueille chaque année un nombre croissant de voyageurs français en quête d'authenticité.",
      ),
    ]),
    bullet(
      'bl-archi',
      'Une architecture islamique parmi les plus spectaculaires du monde islamique',
    ),
    bullet(
      'bl-gastro',
      'Une gastronomie riche et savoureuse : plov, samsa, shurpa et lagman',
    ),
    bullet(
      'bl-accueil',
      "Des habitants parmi les plus accueillants d'Asie centrale",
    ),
    bullet(
      'bl-budget',
      'Un coût de la vie très accessible pour les voyageurs européens',
    ),
    bullet(
      'bl-vol',
      'Une bonne accessibilité aérienne : vols directs ou avec une escale depuis Paris',
    ),

    /* H2: INCONTOURNABLES */
    h2('h2-incont', "Les incontournables de l'Ouzbékistan"),

    h3('h3-sama', 'Samarcande : la Cité Bleue de la Route de la Soie'),
    blk('b-sama', 'normal', [
      sp(
        'b-sama-s1',
        "Samarcande est sans conteste le joyau de l'Ouzbékistan. Fondée il y a plus de 2 700 ans, elle fut la capitale de l'empire timouride et atteignit son apogée sous le règne de Tamerlan au XIVe siècle. La célèbre ",
      ),
      sp('b-sama-s2', 'place du Régistan', ['strong']),
      sp(
        'b-sama-s3',
        " — entourée de trois majestueuses médersas recouvertes de mosaïques turquoise et bleue — est l'un des ensembles architecturaux les plus impressionnants du monde islamique. Une visite de nuit lors du spectacle son et lumière reste une expérience inoubliable.",
      ),
    ]),
    bullet(
      'bl-sam1',
      'Place du Régistan : medersas Ulugbek, Shir-Dor et Tilla-Kori',
    ),
    bullet('bl-sam2', 'Mausolée de Gür-e-Amir — tombeau de Tamerlan'),
    bullet('bl-sam3', 'Nécropole du Chah-i-Zinda — allée des mausolées'),
    bullet(
      'bl-sam4',
      "Observatoire d'Ulugbek — héritage scientifique du XVe siècle",
    ),
    blk(
      'b-sama-link',
      'normal',
      [
        sp(
          'bsl-s1',
          'Vous souhaitez découvrir Samarcande lors de votre séjour ? Notre ',
        ),
        sp('bsl-s2', 'circuit Samarcande-Boukhara 8 jours', ['lk-sama']),
        sp(
          'bsl-s3',
          ' vous emmène au cœur de ces deux joyaux de la Route de la Soie.',
        ),
      ],
      [
        {
          _key: 'lk-sama',
          _type: 'link',
          href: '/circuits/samarcande-boukhara',
          blank: false,
          rel: '',
        },
      ],
    ),

    h3('h3-bkhara', 'Boukhara : Cité Sainte et Musée à Ciel Ouvert'),
    blk('b-bkhara', 'normal', [
      sp(
        'b-bk-s1',
        "Inscrite au Patrimoine Mondial de l'UNESCO, Boukhara est souvent considérée comme la ville la mieux conservée d'Asie centrale. Ses ",
      ),
      sp('b-bk-s2', '140 monuments architecturaux', ['strong']),
      sp(
        'b-bk-s3',
        " s'étendent sur plus de 2 500 ans d'histoire. Le minaret Kalyan (XIIe siècle), visible à des kilomètres à la ronde, est le symbole indiscutable de la ville. Le soir, le bazar Toqi Sarrafon et les caravansérails rénovés révèlent leur charme à la lumière des torches.",
      ),
    ]),
    bullet(
      'bl-bk1',
      'Minaret Kalyan et mosquée Kalon — le cœur spirituel de Boukhara',
    ),
    bullet(
      'bl-bk2',
      'Citadelle Ark — forteresse millénaire des émirs de Boukhara',
    ),
    bullet(
      'bl-bk3',
      "Mausolée des Samanides (Xe siècle) — joyau de l'architecture islamique",
    ),
    bullet('bl-bk4', 'Bazars couverts Toqi Sarrafon et Toqi Telpak Furushon'),

    h3('h3-khiva', 'Khiva : la Perle du Désert'),
    blk('b-khiva', 'normal', [
      sp(
        'b-kh-s1',
        "Nichée aux portes du désert du Kyzyl-Koum, la cité fortifiée d'Ichon-Qala (vieille ville de Khiva) est un véritable musée à ciel ouvert. Classée à l'UNESCO, cette ville de 2 500 ans — avec ses remparts en pisé, ses minarets inachevés et ses palais ornés de céramiques bleues — constitue l'étape la plus photogénique de tout ",
      ),
      sp('b-kh-s2', 'circuit en Ouzbékistan', ['strong']),
      sp(
        'b-kh-s3',
        '. La visite idéalement au lever ou coucher du soleil, quand la lumière caresse les murs ocres de la cité.',
      ),
    ]),

    h3('h3-tashkent', 'Tachkent : La Capitale entre Modernité et Traditions'),
    blk('b-tashkent', 'normal', [
      sp(
        'b-tk-s1',
        "Tachkent, capitale de l'Ouzbékistan avec ses 2,5 millions d'habitants, est souvent l'étape d'arrivée et de départ des voyageurs. Ne la négligez pas : le ",
      ),
      sp('b-tk-s2', 'Bazar Chorsu', ['strong']),
      sp(
        'b-tk-s3',
        ", l'un des plus grands bazars couverts d'Asie centrale, vaut à lui seul le détour. Le vieux quartier islamique de Khast Imam abrite de magnifiques mosquées, médersas et un exemplaire du Coran de Osman (VIIe siècle), l'un des plus anciens du monde.",
      ),
    ]),

    /* BODY IMAGE 1 */
    imgBlock(
      'img-registan',
      registanRef,
      'La place du Régistan à Samarcande illuminée au coucher du soleil, Ouzbékistan',
      "La place du Régistan à Samarcande — l'un des chefs-d'œuvre de l'architecture islamique médiévale",
    ),

    /* H2: NOS CIRCUITS */
    h2('h2-circuits', "Nos circuits pour découvrir l'Ouzbékistan"),
    blk('b-circuits-intro', 'normal', [
      sp(
        'bc-s1',
        'Chez Bahor-Voyage, nous proposons plusieurs formules adaptées à votre temps disponible et vos envies. Tous nos circuits sont encadrés par des guides francophones passionnés et incluent les hébergements, transferts et visites des principaux sites.',
      ),
    ]),

    blk(
      'b-c1',
      'normal',
      [
        sp('bc1-s1', '🗺 '),
        sp('bc1-s2', 'Circuit Samarcande-Boukhara — 8 jours', ['lk-c1']),
        sp(
          'bc1-s3',
          ' : Le circuit idéal pour une première découverte. En 8 jours depuis Paris, vous parcourez les deux joyaux de la Route de la Soie avec hébergement en riad traditionnel.',
        ),
      ],
      [
        {
          _key: 'lk-c1',
          _type: 'link',
          href: '/circuits/samarcande-boukhara',
          blank: false,
          rel: '',
        },
      ],
    ),
    blk(
      'b-c2',
      'normal',
      [
        sp('bc2-s1', '🗺 '),
        sp('bc2-s2', 'Grand Circuit Ouzbékistan — 18 jours', ['lk-c2']),
        sp(
          'bc2-s3',
          " : Notre circuit phare pour explorer l'Ouzbékistan en profondeur. De Tachkent à Khiva en passant par Samarcande, Boukhara et Nurata, ce voyage de 18 jours est idéal pour les voyageurs souhaitant une immersion totale.",
        ),
      ],
      [
        {
          _key: 'lk-c2',
          _type: 'link',
          href: '/circuits/grand-circuit-18j',
          blank: false,
          rel: '',
        },
      ],
    ),
    blk(
      'b-c3',
      'normal',
      [
        sp('bc3-s1', '🗺 '),
        sp('bc3-s2', 'Immersion totale — 14 jours', ['lk-c3']),
        sp(
          'bc3-s3',
          " : 14 jours d'exploration entre sites historiques, rencontres avec les artisans locaux et nuits en maisons d'hôtes traditionnelles (bed & breakfast ouzbeks).",
        ),
      ],
      [
        {
          _key: 'lk-c3',
          _type: 'link',
          href: '/circuits/immersion-totale-14j',
          blank: false,
          rel: '',
        },
      ],
    ),
    blk(
      'b-c4',
      'normal',
      [
        sp('bc4-s1', '🗺 '),
        sp('bc4-s2', 'Voyage solidaire — 11 jours', ['lk-c4']),
        sp(
          'bc4-s3',
          " : Un circuit alliant découverte culturelle et engagement social, avec soutien de projets éducatifs dans les régions rurales d'Ouzbékistan.",
        ),
      ],
      [
        {
          _key: 'lk-c4',
          _type: 'link',
          href: '/circuits/voyage-solidaire-11j',
          blank: false,
          rel: '',
        },
      ],
    ),
    blk(
      'b-all-circuits',
      'normal',
      [
        sp('bac-s1', "→ Retrouvez l'ensemble de nos formules sur notre "),
        sp('bac-s2', 'page circuits Ouzbékistan', ['lk-all']),
        sp('bac-s3', '.'),
      ],
      [
        {
          _key: 'lk-all',
          _type: 'link',
          href: '/circuits',
          blank: false,
          rel: '',
        },
      ],
    ),

    /* BODY IMAGE 2 */
    imgBlock(
      'img-bazaar',
      bazaarRef,
      "Épices colorées dans un bazar traditionnel d'Ouzbékistan — safran, cumin et poivre",
      "Les bazars d'Ouzbékistan regorgent d'épices, de soieries et d'artisanat local",
    ),

    /* H2: PRÉPARER SON VOYAGE */
    h2('h2-pratique', 'Comment préparer son voyage en Ouzbékistan'),

    h3('h3-visa', "Visa et formalités d'entrée"),
    blk('b-visa', 'normal', [
      sp(
        'b-v-s1',
        "Excellente nouvelle pour les citoyens français : l'Ouzbékistan a ",
      ),
      sp('b-v-s2', "supprimé l'obligation de visa", ['strong']),
      sp(
        'b-v-s3',
        " pour les ressortissants de l'Union européenne depuis 2019. Vous pouvez séjourner jusqu'à ",
      ),
      sp('b-v-s4', '30 jours sans visa', ['strong']),
      sp(
        'b-v-s5',
        ", sur simple présentation d'un passeport valide 6 mois après votre date de retour. Pour les séjours plus longs ou les nationalités non exemptées, un e-visa est disponible sur le portail officiel du gouvernement ouzbek.",
      ),
    ]),

    h3('h3-saison', 'Quand partir en Ouzbékistan ?'),
    blk('b-saison-intro', 'normal', [
      sp(
        'bs-s1',
        "Le climat de l'Ouzbékistan est continental, avec des étés très chauds et des hivers froids. Les ",
      ),
      sp('bs-s2', "meilleures saisons pour visiter l'Ouzbékistan", ['strong']),
      sp('bs-s3', ' sont :'),
    ]),
    bullet(
      'bl-spring',
      'Printemps (avril-juin) : températures agréables (20-30 °C), cerisiers en fleurs dans les jardins de Samarcande, idéal pour les visites en plein air',
    ),
    bullet(
      'bl-autumn',
      "Automne (septembre-novembre) : lumière dorée magnifique sur les monuments, chaleurs plus douces après l'été torride, saison des fruits (raisins, melons, figues)",
    ),
    bullet(
      'bl-avoid',
      'À éviter : juillet-août, températures pouvant dépasser 40 °C dans les plaines',
    ),

    h3('h3-budget', 'Budget moyen pour un voyage en Ouzbékistan'),
    blk('b-budget', 'normal', [
      sp('bb-s1', "L'Ouzbékistan est une destination "),
      sp('bb-s2', 'très accessible financièrement', ['strong']),
      sp('bb-s3', ' pour les voyageurs européens. Voici quelques repères :'),
    ]),
    bullet(
      'bl-bd1',
      "Hébergement : 25-70 € la nuit en maison d'hôtes traditionnelle (petit-déjeuner inclus)",
    ),
    bullet(
      'bl-bd2',
      'Repas : 5-15 € dans un restaurant local (plov, samsa, brochettes)',
    ),
    bullet(
      'bl-bd3',
      'Train rapide Afrosiyob Tachkent-Samarcande : 15-20 € (2h de trajet)',
    ),
    bullet('bl-bd4', 'Entrées sites touristiques : 3-8 € en moyenne'),
    bullet(
      'bl-bd5',
      'Budget indicatif pour 10 jours tout compris (vol + hébergement + visites) : 1 500 à 2 500 € par personne depuis Paris',
    ),

    /* H2: FAQ */
    h2('h2-faq', 'FAQ — Questions fréquentes sur le voyage en Ouzbékistan'),

    h3(
      'h3-faq1',
      'Faut-il un visa pour aller en Ouzbékistan depuis la France ?',
    ),
    blk('b-faq1', 'normal', [
      sp(
        'bf1-s1',
        "Non. Les citoyens français bénéficient d'une exemption de visa pour des séjours touristiques jusqu'à 30 jours. Il suffit d'un passeport valide. Pour un séjour plus long, un e-visa en ligne est disponible en quelques clics.",
      ),
    ]),

    h3('h3-faq2', 'Quelle est la langue parlée en Ouzbékistan ?'),
    blk('b-faq2', 'normal', [
      sp(
        'bf2-s1',
        "La langue officielle est l'ouzbek. Le russe reste largement parlé dans les villes et parmi les professionnels du tourisme. Chez Bahor-Voyage, tous nos ",
      ),
      sp('bf2-s2', 'guides locaux parlent couramment le français', ['strong']),
      sp(
        'bf2-s3',
        ', vous assurant une immersion culturelle sans barrière linguistique.',
      ),
    ]),

    h3('h3-faq3', "L'Ouzbékistan est-il un pays sûr pour les touristes ?"),
    blk('b-faq3', 'normal', [
      sp(
        'bf3-s1',
        "Oui. L'Ouzbékistan est considéré comme l'un des pays les plus sûrs d'Asie centrale. Le gouvernement a fait du tourisme une priorité nationale depuis 2016. Les voyageurs français y sont accueillis très chaleureusement. Le Ministère des Affaires étrangères français classe l'Ouzbékistan en zone verte (vigilance normale).",
      ),
    ]),

    h3('h3-faq4', 'Comment se déplacer entre les villes en Ouzbékistan ?'),
    blk('b-faq4', 'normal', [
      sp('bf4-s1', 'Le '),
      sp('bf4-s2', 'train rapide Afrosiyob', ['strong']),
      sp(
        'bf4-s3',
        " (similaire au TGV) relie Tachkent à Samarcande en 2 heures et à Boukhara en 3 heures à moins de 20 €. Des vols intérieurs desservent Urgench (pour Khiva) et Nukus. Dans le cadre d'un circuit organisé avec Bahor-Voyage, tous les transferts entre villes sont inclus et planifiés.",
      ),
    ]),

    h3('h3-faq5', 'Quelle monnaie utiliser en Ouzbékistan ?'),
    blk('b-faq5', 'normal', [
      sp('bf5-s1', 'La monnaie locale est le '),
      sp('bf5-s2', 'soum ouzbek (UZS)', ['strong']),
      sp(
        'bf5-s3',
        ". Les euros et dollars s'échangent facilement dans les banques et bureaux de change officiels. Les paiements par carte se développent dans les hôtels et restaurants des zones touristiques. Prévoyez du cash pour les marchés et petits commerces.",
      ),
    ]),

    h3(
      'h3-faq6',
      'Quels vaccins sont recommandés avant de partir en Ouzbékistan ?',
    ),
    blk('b-faq6', 'normal', [
      sp(
        'bf6-s1',
        "Consultez votre médecin ou un centre de vaccinations internationales 4 à 6 semaines avant le départ. Sont généralement recommandés : mise à jour des vaccins courants (DTP, hépatite A et B), et selon la durée et le type de séjour, une protection contre la fièvre typhoïde. Aucun vaccin n'est obligatoire pour entrer en Ouzbékistan.",
      ),
    ]),

    /* H2: CTA */
    h2('h2-cta', "Prêt à vivre l'aventure de la Route de la Soie ?"),
    blk('b-cta-1', 'normal', [
      sp(
        'bc1a-s1',
        "L'Ouzbékistan vous attend avec ses mosquées turquoise, ses bazars colorés, son thé vert servi sous les platanes centenaires et une hospitalité qui vous marquera pour la vie. Que vous choisissiez une escapade de 8 jours ou une immersion complète de 18 jours, ",
      ),
      sp('bc1a-s2', 'Bahor-Voyage vous accompagne à chaque étape', ['strong']),
      sp(
        'bc1a-s3',
        ' avec des guides francophones, des hébergements soigneusement sélectionnés et une organisation sans stress.',
      ),
    ]),
    blk(
      'b-cta-2',
      'normal',
      [
        sp('bc2a-s1', 'Découvrez dès maintenant '),
        sp('bc2a-s2', 'tous nos circuits Ouzbékistan', ['lk-circ']),
        sp(
          'bc2a-s3',
          ' et choisissez la formule qui correspond à vos envies. Des questions sur votre itinéraire, les dates ou les tarifs ? ',
        ),
        sp('bc2a-s4', 'Contactez notre équipe', ['lk-contact']),
        sp(
          'bc2a-s5',
          ' — nous vous répondons sous 24 h et établissons un devis personnalisé gratuitement.',
        ),
      ],
      [
        {
          _key: 'lk-circ',
          _type: 'link',
          href: '/circuits',
          blank: false,
          rel: '',
        },
        {
          _key: 'lk-contact',
          _type: 'link',
          href: '/contact',
          blank: false,
          rel: '',
        },
      ],
    ),
  ];

  /* 5. Blog post */
  console.log('Creating blog post...');
  const post = await client.createOrReplace({
    _id: 'blog-voyage-ouzbekistan-guide-complet',
    _type: 'blogPost',
    title:
      'Voyage en Ouzbékistan : Guide Complet pour Explorer la Route de la Soie (2025)',
    slug: { _type: 'slug', current: 'voyage-ouzbekistan-guide-complet' },
    excerpt:
      "Partez à la découverte de l'Ouzbékistan : Samarcande, Boukhara, Khiva... Nos conseils pratiques et circuits pour explorer la Route de la Soie en 2025.",
    author: { _type: 'reference', _ref: authorDoc._id },
    categories: [{ _type: 'reference', _ref: catDoc._id }],
    tags: [
      'Ouzbékistan',
      'Route de la Soie',
      'Samarcande',
      'Boukhara',
      'Khiva',
      'circuit Asie centrale',
      'visa Ouzbékistan',
    ],
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: coverRef },
      alt: "La place du Régistan à Samarcande, Ouzbékistan — chef-d'œuvre de l'architecture de la Route de la Soie",
      caption: "Samarcande, capitale culturelle de l'Ouzbékistan",
    },
    body,
    relatedTours: [
      {
        _type: 'object',
        _key: 'rt1',
        label: 'Circuit Samarcande-Boukhara 8 jours',
        href: '/circuits/samarcande-boukhara',
      },
      {
        _type: 'object',
        _key: 'rt2',
        label: 'Grand Circuit Ouzbékistan 18 jours',
        href: '/circuits/grand-circuit-18j',
      },
      {
        _type: 'object',
        _key: 'rt3',
        label: 'Immersion totale 14 jours',
        href: '/circuits/immersion-totale-14j',
      },
      {
        _type: 'object',
        _key: 'rt4',
        label: 'Voyage solidaire 11 jours',
        href: '/circuits/voyage-solidaire-11j',
      },
    ],
    /* SEO */
    seoTitle:
      'Voyage en Ouzbékistan 2025 : Guide Complet de la Route de la Soie',
    metaDescription:
      'Tout savoir pour voyager en Ouzbékistan : Samarcande, Boukhara, Khiva, visa, budget, quand partir. Circuits francophones au départ de Paris.',
    focusKeyword: 'voyage en Ouzbékistan',
    secondaryKeywords: [
      'circuit Ouzbékistan',
      'Samarcande',
      'Boukhara',
      'Route de la Soie',
      'que voir en Ouzbékistan',
      'visa Ouzbékistan',
    ],
    ogTitle: 'Voyage en Ouzbékistan : Guide Complet 2025 — Bahor-Voyage',
    ogDescription:
      'Samarcande, Boukhara, Khiva… Préparez votre voyage en Ouzbékistan avec notre guide expert. Circuits au départ de Paris avec guides francophones.',
    twitterTitle:
      'Voyage en Ouzbékistan 2025 — Guide Complet de la Route de la Soie',
    twitterDescription:
      'Tout savoir pour partir en Ouzbékistan : visa gratuit, meilleure saison, budget, circuits et incontournables.',
    publishedAt: new Date('2025-05-25T08:00:00.000Z').toISOString(),
    isFeatured: true,
  });

  console.log(`\n✅ Done!`);
  console.log(`   Author   : ${authorDoc._id}`);
  console.log(`   Category : ${catDoc._id}`);
  console.log(`   Post     : ${post._id}`);
  console.log(`\n→ View in Studio : http://localhost:3000/studio`);
  console.log(
    `→ Preview article : http://localhost:3000/blog/voyage-ouzbekistan-guide-complet`,
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
