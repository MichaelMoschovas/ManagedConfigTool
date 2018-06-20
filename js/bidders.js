var BIDDERS = {
  '33across': {
    name: '33Across',
    code: '33across',
    parameters: [
      'siteId',
      'productId'
    ],
    adapter: '33across',
    state: 'all'
  },
  a4g: {
    name: 'A4G',
    code: 'a4g',
    parameters: [
      'zoneId'
    ],
    adapter: 'a4g',
    state: 'all'
  },
  aardvark: {
    name: 'Aardvark',
    code: 'aardvark',
    parameters: [
      'ai',
      'sc'
    ],
    adapter: 'aardvark',
    state: 'all'
  },
  adblade: {
    name: 'Adblade',
    code: 'adblade',
    parameters: [
      'partnerId'
    ],
    adapter: 'adblade',
    state: 'legacy'
  },
  adbund: {
    name: 'AdBund',
    code: 'adbund',
    parameters: [
      'sid',
      'bidfloor'
    ],
    adapter: 'adbund',
    state: 'legacy'
  },
  adbutler: {
    name: 'AdButler',
    code: 'adbutler',
    parameters: [
      'accountID',
      'zoneID'
    ],
    adapter: 'adbutler',
    state: 'all'
  },
  adequant: {
    name: 'Adequant',
    code: 'adequant',
    parameters: [],
    adapter: 'adequant',
    state: 'legacy'
  },
  adform: {
    name: 'Adform',
    code: 'adform',
    parameters: [
      'mid'
    ],
    adapter: 'adform',
    state: 'all'
  },
  adgeneration: {
    name: 'Ad Generation',
    code: 'adgeneration',
    parameters: [
      'id'
    ],
    adapter: 'adgeneration',
    state: 'stable'
  },
  adkernel: {
    name: 'AdKernel',
    code: 'adkernel',
    parameters: [
      'host',
      'zoneId'
    ],
    adapter: 'adkernel',
    state: 'all'
  },
  adkerneladn: {
    name: 'AdKernelAdn',
    code: 'adkernelAdn',
    parameters: [
      'pubId'
    ],
    adapter: 'adkernelAdn',
    state: 'all'
  },
  admatic: {
    name: 'AdMatic',
    code: 'admatic',
    parameters: [],
    adapter: 'admatic',
    state: 'stable'
  },
  admedia: {
    name: 'AdMedia',
    code: 'admedia',
    parameters: [
      'aid'
    ],
    adapter: 'admedia',
    state: 'legacy'
  },
  admixer: {
    name: 'AdMixer',
    code: 'admixer',
    parameters: [
      'zone'
    ],
    adapter: 'admixer',
    state: 'all'
  },
  adocean: {
    name: 'AdOcean',
    code: 'adocean',
    parameters: [
      'slaceId',
      'masterId',
      'emiter'
    ],
    adapter: 'adocean',
    state: 'all'
  },
  adsparc: {
    name: 'AdSparc',
    code: 'adsparc',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  adspirit: {
    name: 'AdSpirit',
    code: 'adspirit',
    parameters: [],
    adapter: 'adspirit',
    state: 'stable'
  },
  adsupply: {
    name: 'AdSupply',
    code: 'adsupply',
    parameters: [
      'clientId',
      'siteId',
      'zoneId',
      'endpointUrl'
    ],
    adapter: 'adsupply',
    state: 'legacy'
  },
  adtelligent: {
    name: 'Adtelligent',
    code: 'adtelligent',
    parameters: [
      'aid'
    ],
    adapter: 'adtelligent',
    state: 'all'
  },
  adxcg: {
    name: 'adxcg',
    code: 'adxcg',
    parameters: [
      'adzoneid'
    ],
    adapter: 'adxcg',
    state: 'all'
  },
  adyoulike: {
    name: 'Adyoulike',
    code: 'adyoulike',
    parameters: [
      'placement'
    ],
    adapter: 'adyoulike',
    state: 'all'
  },
  aerserv: {
    name: 'AerServ',
    code: 'aerserv',
    parameters: [
      'plc'
    ],
    adapter: 'aerserv',
    state: 'legacy'
  },
  andbeyond: {
    name: 'AndBeyond',
    code: 'andbeyond',
    parameters: [
      'placement',
      'network'
    ],
    adapter: 'andbeyond',
    state: 'stable'
  },
  aol: {
    name: 'AOL',
    code: 'aol',
    parameters: [
      'placement',
      'network'
    ],
    adapter: 'aol',
    state: 'all'
  },
  appnexus: {
    name: 'AppNexus',
    code: 'appnexus',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  appnexusAst: {
    name: 'AppNexus AST',
    code: 'appnexusAst',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexusAst',
    state: 'legacy'
  },
  archonwarp: {
    name: 'Archon Warp',
    code: 'archon',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  archon: {
    name: 'Archon Warp',
    code: 'archon',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  arteebee: {
    name: 'Arteebee',
    code: 'arteebee',
    parameters: [
      'pub',
      'source'
    ],
    adapter: 'arteebee',
    state: 'all'
  },
  atomx: {
    name: 'Atomx',
    code: 'atomx',
    parameters: [
      'id'
    ],
    adapter: 'atomx',
    state: 'all'
  },
  audienceNetwork: {
    name: 'Audience Network',
    code: 'audienceNetwork',
    parameters: [
      'placementId'
    ],
    adapter: 'audienceNetwork',
    state: 'all'
  },
  automatad: {
    name: 'Automatad',
    code: 'automatad',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  beachfront: {
    name: 'Beachfront',
    code: 'beachfront',
    parameters: [
      'appId',
      'bidfloor'
    ],
    adapter: 'beachfront',
    state: 'all'
  },
  bidfluence: {
    name: 'Bidfluence',
    code: 'bidfluence',
    parameters: [
      'adunitId',
      'pubId'
    ],
    adapter: 'bidfluence',
    state: 'legacy'
  },
  brainy: {
    name: 'brainy',
    code: 'brainy',
    parameters: [
      'accountID',
      'slotID',
      'width',
      'height'
    ],
    adapter: 'brainy',
    state: 'stable'
  },
  brealtime: {
    name: 'bRealTime',
    code: 'brealtime',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  bridgewell: {
    name: 'Bridgewell',
    code: 'bridgewell',
    parameters: [
      'ChannelID'
    ],
    adapter: 'bridgewell',
    state: 'all'
  },
  brightcom: {
    name: 'Brightcom',
    code: 'brightcom',
    parameters: [
      'tagId'
    ],
    adapter: 'brightcom',
    state: 'legacy'
  },
  c1x: {
    name: 'C1X',
    code: 'c1x',
    parameters: [
      'siteId'
    ],
    adapter: 'c1x',
    state: 'stable'
  },
  carambola: {
    name: 'Carambola',
    code: 'carambola',
    parameters: [
      'pid',
      'did',
      'wid'
    ],
    adapter: 'carambola',
    state: 'legacy'
  },
  cxx: {
    name: 'Clickonometrics',
    code: 'cxx',
    parameters: [
      'placementId'
    ],
    adapter: 'cxx',
    state: 'stable'
  },
  clickforce: {
    name: 'Clickforce',
    code: 'clickforce',
    parameters: [
      'zone'
    ],
    adapter: 'clickforce',
    state: 'stable'
  },
  colossusssp: {
    name: 'Colossus',
    code: 'colossusssp',
    parameters: [
      'placement_id'
    ],
    adapter: 'colossusssp',
    state: 'all'
  },
  connectad: {
    name: 'ConnectAd',
    code: 'connectad',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  consumable: {
    name: 'Consumable',
    code: 'consumable',
    parameters: [
      'placement',
      'unitId',
      'unitName',
      'zoneId'
    ],
    adapter: 'consumable',
    state: 'all'
  },
  contentignite: {
    name: 'Content Ignite',
    code: 'contentignite',
    parameters: [
      'accountId',
      'zoneId'
    ],
    adapter: 'contentignite',
    state: 'stable'
  },
  conversant: {
    name: 'Conversant',
    code: 'conversant',
    parameters: [
      'site_id'
    ],
    adapter: 'conversant',
    state: 'all'
  },
  cox: {
    name: 'Cox',
    code: 'cox',
    parameters: [
      'size',
      'id',
      'siteId'
    ],
    adapter: 'cox',
    state: 'all'
  },
  criteo: {
    name: 'Criteo',
    code: 'criteo',
    parameters: [
      'zoneId'
    ],
    adapter: 'criteo',
    state: 'all'
  },
  danmarket: {
    name: 'DAN Marketplace',
    code: 'danmarket',
    parameters: [
      'uid'
    ],
    adapter: 'danmarket',
    state: 'stable'
  },
  danmarketplace: {
    name: 'DAN Marketplace',
    code: 'danmarket',
    parameters: [
      'uid'
    ],
    adapter: 'danmarket',
    state: 'stable'
  },
  defymedia: {
    name: 'Defy Media',
    code: 'defymedia',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  dgads: {
    name: 'dgads',
    code: 'dgads',
    parameters: [
      'site_id',
      'location_id'
    ],
    adapter: 'dgads',
    state: 'stable'
  },
  districtm: {
    name: 'DistrictM',
    code: 'districtm',
    parameters: [
      'placementId'
    ],
    adapter: 'districtm',
    state: 'legacy'
  },
  districtmdmx: {
    name: 'DistrictmDMX',
    code: 'districtmDMX',
    parameters: [
      'id'
    ],
    adapter: 'districtmDMX',
    state: 'legacy'
  },
  engagebdr: {
    name: 'EngageBDR',
    code: 'ebdr',
    parameters: [
      'zoneid'
    ],
    adapter: 'ebdr',
    state: 'all'
  },
  eplanning: {
    name: 'E-Planning',
    code: 'eplanning',
    parameters: [
      'ci'
    ],
    adapter: 'eplanning',
    state: 'all'
  },
  essens: {
    name: 'Essens',
    code: 'essens',
    parameters: [
      'placementID'
    ],
    adapter: 'essens',
    state: 'legacy'
  },
  facebook: {
    name: 'Facebook',
    code: 'audienceNetwork',
    parameters: [
      'placementId'
    ],
    adapter: 'audienceNetwork',
    state: 'all'
  },
  fairtrade: {
    name: 'FairTrade',
    code: 'fairtrade',
    parameters: [
      'uid'
    ],
    adapter: 'fairtrade',
    state: 'stable'
  },
  featureforward: {
    name: 'Feature Forward',
    code: 'featureforward',
    parameters: [
      'placementId'
    ],
    adapter: 'featureforward',
    state: 'legacy'
  },
  fidelity: {
    name: 'Fidelity Media',
    code: 'fidelity',
    parameters: [
      'zoneid'
    ],
    adapter: 'fidelity',
    state: 'all'
  },
  freeWheelssp: {
    name: 'FreeWheel-ssp',
    code: 'freeWheel-ssp',
    parameters: [
      'zoneid'
    ],
    adapter: 'freeWheel-ssp',
    state: 'legacy'
  },
  fyber: {
    name: 'Fyber',
    code: 'fyber',
    parameters: [
      
    ],
    adapter: 'fyber',
    state: 'stable'
  },
  gambid: {
    name: 'GamBid',
    code: 'gambid',
    parameters: [],
    adapter: 'gamma',
    state: 'stable'
  },
  gamma: {
    name: 'Gamma',
    code: 'gamma',
    parameters: [
      'siteId',
      'zoneId'
    ],
    adapter: 'gamma',
    state: 'stable'
  },
  getintent: {
    name: 'GetIntent',
    code: 'getintent',
    parameters: [
      'pid'
    ],
    adapter: 'getintent',
    state: 'all'
  },
  gjirafa: {
    name: 'Gjirafa',
    code: 'gjirafa',
    parameters: [],
    adapter: 'gjirafa',
    state: 'all'
  },
  gourmetads: {
    name: 'Gourmet Ads',
    code: 'gourmetads',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  gumgum: {
    name: 'GumGum',
    code: 'gumgum',
    parameters: [
      'inScreen',
      'inSlot'
    ],
    adapter: 'gumgum',
    state: 'all'
  },
  gxone: {
    name: 'GXOne',
    code: 'gxone',
    parameters: [
      'uid'
    ],
    adapter: 'gxone',
    state: 'stable'
  },
  headbidding: {
    name: 'Head Bidding',
    code: 'headbidding',
    parameters: [
      'zoneId',
      'host'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  hiromedia: {
    name: 'HIRO Media',
    code: 'hiromedia',
    parameters: [
      'accountId'
    ],
    adapter: 'hiromedia',
    state: 'legacy'
  },
  huddledmasses: {
    name: 'Huddled Masses',
    code: 'huddledmasses',
    parameters: [
      'placement_id'
    ],
    adapter: 'huddledmasses',
    state: 'all'
  },
  ias: {
    name: 'Integral Ad Science (IAS)',
    code: 'ias',
    parameters: [
      'pubId',
      'adUnitPath'
    ],
    adapter: 'ias',
    state: 'stable'
  },
  integraladscience: {
    name: 'Integral Ad Science (IAS)',
    code: 'ias',
    parameters: [
      'pubId',
      'adUnitPath'
    ],
    adapter: 'ias',
    state: 'legacy'
  },
  integraladscienceias: {
    name: 'Integral Ad Science (IAS)',
    code: 'ias',
    parameters: [
      'pubId',
      'adUnitPath'
    ],
    adapter: 'ias',
    state: 'stable'
  },
  imonomy: {
    name: 'imonomy',
    code: 'imonomy',
    parameters: [
      'publisher_id'
    ],
    adapter: 'imonomy',
    state: 'legacy'
  },
  improvedigital: {
    name: 'Improve Digital',
    code: 'improvedigital',
    parameters: [
      'publisher_id'
    ],
    adapter: 'improvedigital',
    state: 'all'
  },
  indexexchange: {
    name: 'Index Exchange',
    code: 'ix',
    parameters: [
      'siteID',
      'size'
    ],
    adapter: 'ix',
    state: 'stable'
  },
  ix: {
    name: 'Index Exchange',
    code: 'ix',
    parameters: [
      'siteID',
      'size'
    ],
    adapter: 'ix',
    state: 'stable'
  },
  indexexchangelegacy: {
    name: 'Index Exchange (Legacy)',
    code: 'indexExchange',
    parameters: [
      'id',
      'siteID'
    ],
    adapter: 'indexExchange',
    state: 'legacy'
  },
  inneractive: {
    name: 'Inneractive',
    code: 'inneractive',
    parameters: [
      'appId',
      'adSpotType'
    ],
    adapter: 'inneractive',
    state: 'legacy'
  },
  innity: {
    name: 'Innity',
    code: 'innity',
    parameters: [
      'pub',
      'zone'
    ],
    adapter: 'innity',
    state: 'all'
  },
  inskin: {
    name: 'Inskin',
    code: 'inskin',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'inskin',
    state: 'all'
  },
  insticator: {
    name: 'Insticator',
    code: 'insticator',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  invibes: {
    name: 'Invibes',
    code: 'invibes',
    parameters: [
      'placementId'
    ],
    adapter: 'invibes',
    state: 'all'
  },
  iqm: {
    name: 'iQM',
    code: 'iqm',
    parameters: [
      'publisherId',
      'tagId',
      'placementId',
      'bidfloor'
    ],
    adapter: 'iqm',
    state: 'stable'
  },
  jcm: {
    name: 'J Carter Marketing',
    code: 'jcm',
    parameters: [
      'id',
      'siteID'
    ],
    adapter: 'jcm',
    state: 'all'
  },
  jcartermarketing: {
    name: 'J Carter Marketing',
    code: 'jcm',
    parameters: [
      'id',
      'siteID'
    ],
    adapter: 'jcm',
    state: 'all'
  },
  justpremium: {
    name: 'Justpremium',
    code: 'justpremium',
    parameters: [
      'zone'
    ],
    adapter: 'justpremium',
    state: 'all'
  },
  kargo: {
    name: 'Kargo',
    code: 'kargo',
    parameters: [
      'placementId'
    ],
    adapter: 'kargo',
    state: 'all'
  },
  komoona: {
    name: 'Komoona',
    code: 'komoona',
    parameters: [
      'hbid',
      'placementId'
    ],
    adapter: 'komoona',
    state: 'all'
  },
  kruxlink: {
    name: 'KruxLink',
    code: 'kruxlink',
    parameters: [],
    adapter: 'kruxlink',
    state: 'legacy'
  },
  kumma: {
    name: 'Kumma',
    code: 'kumma',
    parameters: [
      'pubId',
      'siteId'
    ],
    adapter: 'kumma',
    state: 'all'
  },
  lifestreet: {
    name: 'Lifestreet',
    code: 'lifestreet',
    parameters: [
      'jstag_url',
      'slot',
      'adkey',
      'ad_size'
    ],
    adapter: 'lifestreet',
    state: 'all'
  },
  lkqd: {
    name: 'LKQD',
    code: 'lkqd',
    parameters: [
      'placementId',
      'siteId'
    ],
    adapter: 'lkqd',
    state: 'stable'
  },
  lockerdome: {
    name: 'LockerDome',
    code: 'lockerdome',
    parameters: [
      'adUnitId'
    ],
    adapter: 'lockerdome',
    state: 'all'
  },
  madvertise: {
    name: 'Madvertise',
    code: 'madvertise',
    parameters: [
      's'
    ],
    adapter: 'madvertise',
    state: 'stable'
  },
  mantis: {
    name: 'MANTIS',
    code: 'mantis',
    parameters: [
      'property'
    ],
    adapter: 'mantis',
    state: 'all'
  },
  marsmedia: {
    name: 'Marsmedia',
    code: 'marsmedia',
    parameters: [
      'publisherID'
    ],
    adapter: 'marsmedia',
    state: 'all'
  },
  matomy: {
    name: 'Matomy',
    code: 'matomy',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  medianet: {
    name: 'Media.net',
    code: 'medianet',
    parameters: [
      'cid'
    ],
    adapter: 'medianet',
    state: 'all'
  },
  memeglobal: {
    name: 'Meme Global',
    code: 'memeglobal',
    parameters: [
      'tagid'
    ],
    adapter: 'memeglobal',
    state: 'legacy'
  },
  mobfox: {
    name: 'MobFox',
    code: 'mobfox',
    parameters: [
      's'
    ],
    adapter: 'mobfox',
    state: 'all'
  },
  nanointeractive: {
    name: 'Nano Interactive',
    code: 'nanointeractive',
    parameters: [
      'pid'
    ],
    adapter: 'nanointeractive',
    state: 'all'
  },
  nasmediaAdmixer: {
    name: 'Nasmedia Admixer',
    code: 'nasmediaAdmixer',
    parameters: [
      'ax_key'
    ],
    adapter: 'nasmediaAdmixer',
    state: 'stable'
  },
  nginad: {
    name: 'NginAd',
    code: 'nginad',
    parameters: [
      'pzoneid',
      'nginadDomain'
    ],
    adapter: 'nginad',
    state: 'legacy'
  },
  oftmedia: {
    name: 'One Fifty Two Media',
    code: 'oftmedia',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  onefiftytwomedia: {
    name: 'One Fifty Two Media',
    code: 'oftmedia',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  '152media': {
    name: 'One Fifty Two Media',
    code: 'oftmedia',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  oftmedia20: {
    name: 'One Fifty Two Media 2.0',
    code: 'onefiftytwo',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  onefiftytwomedia20: {
    name: 'One Fifty Two Media 2.0',
    code: 'onefiftytwo',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  '152media20': {
    name: 'One Fifty Two Media 2.0',
    code: 'onefiftytwo',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  onevideo: {
    name: 'OneVideo',
    code: 'oneVideo',
    parameters: [
      'pubId'
    ],
    adapter: 'oneVideo',
    state: 'stable'
  },
  onedisplay: {
    name: 'ONE by AOL Display',
    code: 'onedisplay',
    parameters: [
      'placement',
      'network'
    ],
    adapter: 'aol',
    state: 'all'
  },
  onebyaoldisplay: {
    name: 'ONE by AOL Display',
    code: 'onedisplay',
    parameters: [
      'placement',
      'network'
    ],
    adapter: 'aol',
    state: 'all'
  },
  onemobile: {
    name: 'ONE by AOL Mobile',
    code: 'onemobile',
    parameters: [
      'dcn',
      'pos'
    ],
    adapter: 'aol',
    state: 'all'
  },
  onebyaolmobile: {
    name: 'ONE by AOL Mobile',
    code: 'onemobile',
    parameters: [
      'dcn',
      'pos'
    ],
    adapter: 'aol',
    state: 'all'
  },
  oneplanetonly: {
    name: 'Oneplanetonly',
    code: 'oneplanetonly',
    parameters: [
      'siteId',
      'adUnitId'
    ],
    adapter: 'oneplanetonly',
    state: 'stable'
  },
  onetag: {
    name: 'OneTag',
    code: 'onetag',
    parameters: [
      'pubId'
    ],
    adapter: 'onetag',
    state: 'stable'
  },
  openx: {
    name: 'OpenX',
    code: 'openx',
    parameters: [
      'unit',
      'delDomain'
    ],
    adapter: 'openx',
    state: 'all'
  },
  optimatic: {
    name: 'Optimatic',
    code: 'optimatic',
    parameters: [
      'placement',
      'bidfloor'
    ],
    adapter: 'optimatic',
    state: 'all'
  },
  optimera: {
    name: 'Optimera',
    code: 'optimera',
    parameters: [
      'clientId'
    ],
    adapter: 'optimera',
    state: 'stable'
  },
  orbisoft: {
    name: 'Orbisoft',
    code: 'orbisoft',
    parameters: [
      'placementId',
      'requestUrl'
    ],
    adapter: 'orbisoft',
    state: 'all'
  },
  pagescience: {
    name: 'Page Science',
    code: 'pagescience',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'all'
  },
  peak226: {
    name: 'Peak226',
    code: 'peak226',
    parameters: [
      'uid'
    ],
    adapter: 'peak226',
    state: 'stable'
  },
  piximedia: {
    name: 'Piximedia',
    code: 'piximedia',
    parameters: [
      'siteId',
      'placementId'
    ],
    adapter: 'piximedia',
    state: 'legacy'
  },
  platformio: {
    name: 'Platform.io',
    code: 'platformio',
    parameters: [
      'pubId',
      'siteId'
    ],
    adapter: 'platformio',
    state: 'all'
  },
  playgroundxyz: {
    name: 'PlaygroundXYZ',
    code: 'playgroundxyz',
    parameters: [],
    adapter: 'playgroundxyz',
    state: 'stable'
  },
  pollux: {
    name: 'Pollux Network',
    code: 'pollux',
    parameters: [
      'zone'
    ],
    adapter: 'pollux',
    state: 'all'
  },
  pollunetwork: {
    name: 'Pollux Network',
    code: 'pollux',
    parameters: [
      'zone'
    ],
    adapter: 'pollux',
    state: 'all'
  },
  prebidserver: {
    name: 'Prebid Server',
    code: 'prebidserver',
    parameters: [
      'accountId',
      'bidders',
      'enabled',
      'endpoint'
    ],
    adapter: 'prebidserver',
    state: 'all'
  },
  pubgears: {
    name: 'Pubgears',
    code: 'pubgears',
    parameters: [
      'publisherName',
      'pubZone'
    ],
    adapter: 'pubgears',
    state: 'legacy'
  },
  pubmatic: {
    name: 'Pubmatic',
    code: 'pubmatic',
    parameters: [
      'publisherId',
      'adSlot'
    ],
    adapter: 'pubmatic',
    state: 'all'
  },
  pulsepoint: {
    name: 'PulsePoint',
    code: 'pulsepoint',
    parameters: [
      'cf',
      'cp',
      'ct'
    ],
    adapter: 'pulsepoint',
    state: 'all'
  },
  pulsepointLite: {
    name: 'PulsePoint Lite',
    code: 'pulsepointLite',
    parameters: [
      'cf',
      'cp',
      'ct'
    ],
    adapter: 'pulsepointLite',
    state: 'legacy'
  },
  quantcast: {
    name: 'Quantcast',
    code: 'quantcast',
    parameters: [
      'publisherId'
    ],
    adapter: 'quantcast',
    state: 'all'
  },
  quantum: {
    name: 'Quantum',
    code: 'quantum',
    parameters: [
      'placementId'
    ],
    adapter: 'quantum',
    state: 'stable'
  },
  readpeak: {
    name: 'ReadPeak',
    code: 'readpeak',
    parameters: [
      'publisherId'
    ],
    adapter: 'readpeak',
    state: 'all'
  },
  realvu: {
    name: 'RealVu',
    code: 'realvu',
    parameters: [
      'placementId'
    ],
    adapter: 'realvu',
    state: 'legacy'
  },
  rhythmone: {
    name: 'RhythmOne',
    code: 'rhythmone',
    parameters: [
      'placementId'
    ],
    adapter: 'rhythmone',
    state: 'all'
  },
  rockyou: {
    name: 'RockYou',
    code: 'rockyou',
    parameters: [
      'placementId'
    ],
    adapter: 'rockyou',
    state: 'stable'
  },
  roxot: {
    name: 'Roxot',
    code: 'roxot',
    parameters: [
      'publisherId'
    ],
    adapter: 'roxot',
    state: 'legacy'
  },
  rtbdemand: {
    name: 'Rtbdemand bidder',
    code: 'rtbdemand',
    parameters: [
      'zoneid'
    ],
    adapter: 'rtbdemand',
    state: 'all'
  },
  rtbdemandbidder: {
    name: 'Rtbdemand Bidder',
    code: 'rtbdemand',
    parameters: [
      'zoneid'
    ],
    adapter: 'rtbdemand',
    state: 'all'
  },
  rtbdemandadk: {
    name: 'RtbdemandADK',
    code: 'rtbdemandadk',
    parameters: [
      'host',
      'zoneid'
    ],
    adapter: 'rtbdemandadk',
    state: 'stable'
  },
  rtbhouse: {
    name: 'RTBHouse',
    code: 'rtbhouse',
    parameters: [
      'publisherId',
      'region'
    ],
    adapter: 'rtbhouse',
    state: 'stable'
  },
  rubicon: {
    name: 'Rubicon Project',
    code: 'rubicon',
    parameters: [
      'accountId',
      'siteId',
      'zoneId'
    ],
    adapter: 'rubicon',
    state: 'all'
  },
  rubiconproject: {
    name: 'Rubicon Project',
    code: 'rubicon',
    parameters: [
      'accountId',
      'siteId',
      'zoneId'
    ],
    adapter: 'rubicon',
    state: 'all'
  },
  rxrtb: {
    name: 'rxrtb',
    code: 'rxrtb',
    parameters: [
      'id',
      'token',
      'source'
    ],
    adapter: 'rxrtb',
    state: 'stable'
  },
  sara: {
    name: 'SARA',
    code: 'sara',
    parameters: [
      'uid'
    ],
    adapter: 'sara',
    state: 'stable'
  },
  sekindoUM: {
    name: 'SekindoUM',
    code: 'sekindoUM',
    parameters: [
      'spaceId'
    ],
    adapter: 'sekindoUM',
    state: 'all'
  },
  serverbid: {
    name: 'Serverbid',
    code: 'serverbid',
    parameters: [
      'siteId',
      'networkId'
    ],
    adapter: 'serverbid',
    state: 'all'
  },
  sharethrough: {
    name: 'Sharethrough',
    code: 'sharethrough',
    parameters: [
      'pkey'
    ],
    adapter: 'sharethrough',
    state: 'all'
  },
  smartadserver: {
    name: 'Smart AdServer',
    code: 'smartadserver',
    parameters: [
      'domain',
      'siteId',
      'pageId',
      'formatId'
    ],
    adapter: 'smartadserver',
    state: 'all'
  },
  smartyads: {
    name: 'SmartyAds',
    code: 'smartyads',
    parameters: [
      'banner_id'
    ],
    adapter: 'smartyads',
    state: 'all'
  },
  somoaudience: {
    name: 'Somo Audience',
    code: 'somoaudience',
    parameters: [
      'placementId'
    ],
    adapter: 'somoaudience',
    state: 'all'
  },
  sonobi: {
    name: 'Sonobi',
    code: 'sonobi',
    parameters: [
      'placement_id',
      'ad_unit'
    ],
    adapter: 'sonobi',
    state: 'all'
  },
  sovrn: {
    name: 'Sovrn',
    code: 'sovrn',
    parameters: [
      'tagid'
    ],
    adapter: 'sovrn',
    state: 'all'
  },
  spotx: {
    name: 'SpotX',
    code: 'spotx',
    parameters: [
      'channel_id',
      'video_slot',
      'slot'
    ],
    adapter: 'spotx',
    state: 'legacy'
  },
  springserve: {
    name: 'SpringServe',
    code: 'springserve',
    parameters: [
      'impId',
      'supplyPartnerId'
    ],
    adapter: 'springserve',
    state: 'legacy'
  },
  stickyadstv: {
    name: 'StickyAdsTV',
    code: 'stickyadstv',
    parameters: [
      'zoneId'
    ],
    adapter: 'stickyadstv',
    state: 'legacy'
  },
  tapsense: {
    name: 'TapSense',
    code: 'tapsense',
    parameters: [
      'ad_unit_id',
      'user'
    ],
    adapter: 'tapsense',
    state: 'legacy'
  },
  thoughtleadr: {
    name: 'ThoughtLeadr',
    code: 'thoughtleadr',
    parameters: [
      'placementId'
    ],
    adapter: 'thoughtleadr',
    state: 'legacy'
  },
  tremor: {
    name: 'Tremor',
    code: 'tremor',
    parameters: [
      'adCode',
      'supplyCode'
    ],
    adapter: 'tremor',
    state: 'legacy'
  },
  trion: {
    name: 'Trion Interactive',
    code: 'trion',
    parameters: [
      'pubId',
      'sectionId'
    ],
    adapter: 'trion',
    state: 'all'
  },
  trioninteractive: {
    name: 'Trion Interactive',
    code: 'trion',
    parameters: [
      'pubId',
      'sectionId'
    ],
    adapter: 'trion',
    state: 'all'
  },
  triplelift: {
    name: 'TripleLift',
    code: 'triplelift',
    parameters: [
      'inventoryCode'
    ],
    adapter: 'triplelift',
    state: 'legacy'
  },
  trustx: {
    name: 'TrustX',
    code: 'trustx',
    parameters: [
      'uid'
    ],
    adapter: 'trustx',
    state: 'all'
  },
  twenga: {
    name: 'Twenga',
    code: 'twenga',
    parameters: [
      'placementId'
    ],
    adapter: 'twenga',
    state: 'legacy'
  },
  ucfunnel: {
    name: 'ucfunnel',
    code: 'ucfunnel',
    parameters: [
      'adid',
      'width',
      'height'
    ],
    adapter: 'ucfunnel',
    state: 'all'
  },
  underdogmedia: {
    name: 'Underdog Media',
    code: 'underdogmedia',
    parameters: [
      'siteId'
    ],
    adapter: 'underdogmedia',
    state: 'all'
  },
  undertone: {
    name: 'Undertone',
    code: 'undertone',
    parameters: [
      'publisherId'
    ],
    adapter: 'undertone',
    state: 'all'
  },
  unruly: {
    name: 'Unruly',
    code: 'unruly',
    parameters: [
      'siteId',
      'targetingUUID'
    ],
    adapter: 'unruly',
    state: 'all'
  },
  vertamedia: {
    name: 'Vertamedia',
    code: 'vertamedia',
    parameters: [
      'aid',
      'placementId'
    ],
    adapter: 'vertamedia',
    state: 'all'
  },
  vertoz: {
    name: 'Vertoz',
    code: 'vertoz',
    parameters: [
      'placementId'
    ],
    adapter: 'vertoz',
    state: 'all'
  },
  vi: {
    name: 'vi',
    code: 'vi',
    parameters: [
      'pubId',
      'lang',
      'cat',
      'bidFloor'
    ],
    adapter: 'vi',
    state: 'stable'
  },
  vidazoo: {
    name: 'Vidazoo',
    code: 'vidazoo',
    parameters: [
      'cId',
      'pId',
      'bidFloor'
    ],
    adapter: 'vidazoo',
    state: 'stable'
  },
  visx: {
    name: 'VIS.X',
    code: 'visx',
    parameters: [
      'uid'
    ],
    adapter: 'visx',
    state: 'stable'
  },
  vuble: {
    name: 'Vuble',
    code: 'vuble',
    parameters: [
      'env',
      'pubId',
      'zoneId'
    ],
    adapter: 'vuble',
    state: 'stable'
  },
  wideorbit: {
    name: 'WideOrbit',
    code: 'wideorbit',
    parameters: [
      'pbId',
      'pId'
    ],
    adapter: 'wideorbit',
    state: 'legacy'
  },
  widespace: {
    name: 'Widespace',
    code: 'widespace',
    parameters: [
      'sid',
      'cur'
    ],
    adapter: 'widespace',
    state: 'all'
  },
  xaxis: {
    name: 'Xaxis',
    code: 'xhb',
    parameters: [
      'placementId'
    ],
    adapter: 'appnexus',
    state: 'legacy'
  },
  xendiz: {
    name: 'Xendiz',
    code: 'xendiz',
    parameters: [
      'pid'
    ],
    adapter: 'xendiz',
    state: 'stable'
  },
  xhb: {
    name: 'XHB',
    code: 'xhb',
    parameters: [],
    adapter: 'xhb',
    state: 'all'
  },
  yieldbot: {
    name: 'Yieldbot',
    code: 'yieldbot',
    parameters: [
      'psn',
      'slot'
    ],
    adapter: 'yieldbot',
    state: 'all'
  },
  yieldlab: {
    name: 'Yieldlab',
    code: 'yieldlab',
    parameters: [
      'adslotId',
      'supplyId',
      'adSize'
    ],
    adapter: 'yieldlab',
    state: 'stable'
  },
  yieldmo: {
    name: 'Yieldmo',
    code: 'yieldmo',
    parameters: [
      'placementId'
    ],
    adapter: 'yieldmo',
    state: 'stable'
  },
  yieldone: {
    name: 'YIELDONE',
    code: 'yieldone',
    parameters: [
      'placementId'
    ],
    adapter: 'yieldone',
    state: 'stable'
  }
}