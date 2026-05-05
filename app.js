// ==================== app.js ====================
// ========== Block 1: main app + route data ==========
// ========== MIÉRCOLES: 130 puntos exactos del KML ==========
const MIER_PTS=[
{n:'Grupo 13 (Tornamesa Catedral)',lat:13.7205165,lng:-89.7268171},{n:'Grupo 14 (Mitad de Catedral)',lat:13.7205139,lng:-89.7271903},{n:'Grupo 15 (Portón de Catedral)',lat:13.7206729,lng:-89.7275041},
{n:'Grupo 16 (Despensa de Don Juan)',lat:13.7209203,lng:-89.7273058},{n:'Grupo 17 (Omnisport)',lat:13.7213138,lng:-89.7270429},{n:'Grupo 18 (Casa de la Cultura)',lat:13.7216413,lng:-89.7267932},
{n:'Grupo 19 (Parada de Buses 53E)',lat:13.7214223,lng:-89.726466},{n:'Grupo 20 (Piedra Lisa)',lat:13.7211645,lng:-89.7261092},{n:'Grupo 21 (Sede Nuevas Ideas)',lat:13.7209411,lng:-89.7257749},
{n:'Grupo 1 (Ferretería Salaverría)',lat:13.720697,lng:-89.7254305},{n:'Grupo 2 (Mitad del Puente)',lat:13.7205279,lng:-89.7251279},{n:'Grupo 3 (Imprenta)',lat:13.7202957,lng:-89.7247966},
{n:'Grupo 4 (Boris Olivares)',lat:13.7200858,lng:-89.7244155},{n:'Grupo 5 (Casa de la Mujer)',lat:13.7197654,lng:-89.7239408},{n:'Grupo 6 (Medardo)',lat:13.7194539,lng:-89.7241446},
{n:'Grupo 7 (Mercado El Ángel)',lat:13.7191287,lng:-89.7243735},{n:'Grupo 8 (Vía Ferreá)',lat:13.7189568,lng:-89.7240933},{n:'Grupo 9 (Portón COED Thomas Jefferson)',lat:13.7187273,lng:-89.7237472},
{n:'Grupo 10 (Esquina COED Thomas Jefferson)',lat:13.718493,lng:-89.7233502},{n:'Grupo 11 (El Palace)',lat:13.7182673,lng:-89.7229471},{n:'Grupo 12 (Pizza Cristian)',lat:13.7179755,lng:-89.722467},
{n:'Grupo 13 (Moto Repuestos Paíz)',lat:13.7177858,lng:-89.7221313},{n:'Grupo 14 (Autorepuestos Yamasay)',lat:13.717567,lng:-89.7217987},{n:'Grupo 15 (Hotel Florencia)',lat:13.7173679,lng:-89.7214472},
{n:'Grupo 16 (Peluqería Miriam)',lat:13.7170813,lng:-89.7210503},{n:'Grupo 17 (Casa Rosada)',lat:13.7168588,lng:-89.7206806},{n:'Grupo 18 (Tienda R y R)',lat:13.7166102,lng:-89.7203138},
{n:'Grupo 19 (Cruz calle)',lat:13.716998,lng:-89.720059},{n:'Grupo 20 (Esquina Colonia Nueva)',lat:13.7173567,lng:-89.7197927},{n:'Grupo 21 (Poste donde Salen los Buses)',lat:13.7170799,lng:-89.7193483},
{n:'Grupo 1 (Cruzona)',lat:13.716749,lng:-89.7189781},{n:'Grupo 2 (Poste)',lat:13.7165128,lng:-89.7186527},{n:'Grupo 3 (Esquina)',lat:13.7162861,lng:-89.7182665},
{n:'Grupo 4 (Salida de calle)',lat:13.7160858,lng:-89.7179126},{n:'Grupo 5 (Cruz Calle)',lat:13.7159294,lng:-89.7175397},{n:'Grupo 6 (Cancha Miguel Mojica)',lat:13.7157731,lng:-89.7171455},
{n:'Grupo 7 (Cruz Calle)',lat:13.7156298,lng:-89.7166385},{n:'Grupo 8 (Salida de calle)',lat:13.7154552,lng:-89.716212},{n:'Grupo 9 (Casa Comunal)',lat:13.7153223,lng:-89.7157266},
{n:'Grupo 10 (Esquina)',lat:13.7158932,lng:-89.7155525},{n:'Grupo 11 (Esquina)',lat:13.7164039,lng:-89.7154345},{n:'Grupo 12 (Esquina)',lat:13.716925,lng:-89.715295},
{n:'Grupo 13 (Ing. Larín)',lat:13.7174149,lng:-89.7151233},{n:'Grupo  14 (Mitad poste)',lat:13.7175169,lng:-89.7155916},{n:'Grupo 15 (Cruz Calle)',lat:13.7176524,lng:-89.7160583},
{n:'Grupo 16 (Mitad poste)',lat:13.7177671,lng:-89.7164982},{n:'Grupo 17 (Cruz calle )',lat:13.7178817,lng:-89.7169488},{n:'Grupo 18 (Poste)',lat:13.7180172,lng:-89.7173596},
{n:'Grupo 19 (Poste)',lat:13.718111,lng:-89.717774},{n:'Grupo 20 (Poste)',lat:13.7181844,lng:-89.718194},{n:'Grupo 21 (poste)',lat:13.7182261,lng:-89.7185668},
{n:'Grupo 1 (Poste)',lat:13.7182417,lng:-89.7188941},{n:'Grupo 2 (Ex-Panes con Gallina)',lat:13.7182807,lng:-89.7192159},{n:'Grupo 4 (Entrada al  Balsamar)',lat:13.7184155,lng:-89.7197969},{n:'Grupo 5 (Brandón Pérez)',lat:13.718749,lng:-89.7196788},{n:'Grupo 6 (Poste)',lat:13.7190461,lng:-89.7195447},
{n:'Grupo 7 (Casa Comunal)',lat:13.7193874,lng:-89.7193731},{n:'Grupo 8 (Poste)',lat:13.7195382,lng:-89.7198259},{n:'Grupo 9 (Poste)',lat:13.7196711,lng:-89.7202362},
{n:'Grupo 10 (Poste)',lat:13.7198066,lng:-89.7206171},{n:'Grupo 11 (Super Berny)',lat:13.7199577,lng:-89.7210034},{n:'Grupo 12 (Ex-Refrigerio)',lat:13.7196294,lng:-89.7212298},
{n:'Grupo 13 (Tonicentro)',lat:13.7192281,lng:-89.7215463},{n:'Grupo 14 (Poste)',lat:13.7194209,lng:-89.7218897},{n:'Grupo 15 (Poste)',lat:13.7196242,lng:-89.722174},
{n:'Grupo 16 (Poste)',lat:13.7198482,lng:-89.7224422},{n:'Grupo 17 (Poste vía ferrea)',lat:13.7200619,lng:-89.7227641},{n:'Grupo 18 (Poste)',lat:13.7203068,lng:-89.723102},
{n:'Grupo 19 (Donde reparan motos)',lat:13.7205205,lng:-89.7234078},{n:'Grupo 20 (Poste)',lat:13.7207081,lng:-89.7237416},{n:'Grupo 21 (Poli)',lat:13.7209062,lng:-89.7240527},
{n:'Grupo 1 (Esquina Ex-Poli)',lat:13.7211042,lng:-89.7243693},{n:'Grupo 2  (Ex-Poli)',lat:13.7214878,lng:-89.7241446},{n:'Grupo 3 (Ex-Administración de Renta)',lat:13.7219099,lng:-89.7238979},
{n:'Grupo 4 (Ex-Sastrería Vega)',lat:13.722128,lng:-89.72414},{n:'Grupo 5 (Angelo)',lat:13.722412,lng:-89.7244244},{n:'Grupo 6 (Hamburguesa)',lat:13.7226683,lng:-89.7246667},
{n:'Grupo 7 (Caja de Crédito)',lat:13.7228981,lng:-89.7249521},{n:'Grupo 8 (Direct Englisg)',lat:13.7232585,lng:-89.7246912},{n:'Grupo 9 (Edwin Ortiz Sonic)',lat:13.723579,lng:-89.7244525},
{n:'Grupo 10 (Canchita Élite)',lat:13.7239959,lng:-89.7241305},{n:'Grupo 11 (Iglesia San Sebastián)',lat:13.7243838,lng:-89.7238489},{n:'Grupo 12 (Car wash)',lat:13.7249519,lng:-89.7234948},
{n:'Grupo 13 (Salida de buses 53E)',lat:13.7253584,lng:-89.7232212},{n:'Grupo 14 (Mitad Poste)',lat:13.7257535,lng:-89.7229441},{n:'Grupo 15 (Ex-Paletas de la 14)',lat:13.7261704,lng:-89.7226973},
{n:'Grupo 16 (Hernán Conde)',lat:13.726502,lng:-89.7224281},{n:'Grupo 17 (Cruz Calle)',lat:13.7268303,lng:-89.7221975},{n:'Grupo 18 (Cruz Calle)',lat:13.7272107,lng:-89.7219614},
{n:'Grupo 19 (Mitad Poste)',lat:13.7269762,lng:-89.7215966},{n:'Grupo 20 (Cruz Calle)',lat:13.7267573,lng:-89.7212158},{n:'Grupo 21 (Mitad Poste)',lat:13.7265697,lng:-89.7209636},
{n:'Grupo 1 (Esquina Giro)',lat:13.7263508,lng:-89.7206632},{n:'Grupo 2 (Giro)',lat:13.7268355,lng:-89.7204647},{n:'Grupo 3 (Nevadas)',lat:13.726997,lng:-89.7207652},
{n:'Grupo 4 (Esquina de las Nevadas)',lat:13.7271377,lng:-89.7209905},{n:'grupo 5 (Casa de doble planta)',lat:13.7273652,lng:-89.7213355},{n:'Grupo 6 (Cruz Calle)',lat:13.7275997,lng:-89.7216628},
{n:'Grupo 7 (El Coctelón)',lat:13.727927,lng:-89.7214498},{n:'Grupo 8 (Esquina Paletas)',lat:13.7282553,lng:-89.7211923},{n:'Grupo 9 (Entrada al Redondel)',lat:13.7285753,lng:-89.7209379},
{n:'Grupo 10 (Primer Salida de calle)',lat:13.7284242,lng:-89.7206214},{n:'Grupo11 (Segunda Salida)',lat:13.7285753,lng:-89.7202727},{n:'Grupo 12 (Poste entre 3 y 4 salida)',lat:13.7289505,lng:-89.7202244},
{n:'Grupo 13 (Poste pasada la iglesia)',lat:13.7291486,lng:-89.7206643},{n:'Grupo 14 (Rutilio Durán)',lat:13.7289714,lng:-89.7209594},{n:'Grupo 15 (Diver)',lat:13.7291251,lng:-89.7212946},
{n:'Grupo  16 (Casa Comunal)',lat:13.7288094,lng:-89.7214407},{n:'Grupo 17 (Bajada Última)',lat:13.728455,lng:-89.7216123},{n:'Grupo 18 (Iglesía Evangélica Última)',lat:13.7281237,lng:-89.7218016},
{n:'Grupo 19 (Esquina última)',lat:13.727785,lng:-89.7220001},{n:'Grupo 20 (Portón Blanco Última)',lat:13.7274338,lng:-89.7223149},{n:'Grupo 21 (Intersección Última)',lat:13.7270957,lng:-89.722655},
{n:'Grupo 1 (Gimnasio Última)',lat:13.7267674,lng:-89.7229662},{n:'Grupo 2 (Poste Última)',lat:13.7264722,lng:-89.7233149},{n:'Grupo 3 (Ex-Sede NI Última)',lat:13.7260831,lng:-89.7236116},
{n:'Grupo 4 (Catracho Última)',lat:13.72572,lng:-89.7238697},{n:'Grupo 5 (Salarrué parvularia Última)',lat:13.7253162,lng:-89.7241462},{n:'Grupo 6 (Pizza Cristian Última)',lat:13.7248107,lng:-89.7245056},
{n:'Grupo 7 (Ex-Salarrué Tercer Ciclo Última)',lat:13.724472,lng:-89.7247792},{n:'Grupo 8 (Cruz Calle Última)',lat:13.7240342,lng:-89.7251118},{n:'Grupo 9 (Ex-Dua Última)',lat:13.7237007,lng:-89.7253532},
{n:'Grupo 10 (Esquina Antes del Puente Última)',lat:13.7233672,lng:-89.7255732},{n:'Grupo 11 (Giro Última)',lat:13.7230389,lng:-89.7258038},{n:'Grupo 12 (Canchita Última)',lat:13.7233359,lng:-89.7260923},
{n:'Grupo 13 (Cruza Calle Última)',lat:13.7236225,lng:-89.726323},{n:'Grupo 14 (Sopa de Pata Última)',lat:13.7239326,lng:-89.7265791},{n:'Grupo 15 (Giro Última)',lat:13.7242348,lng:-89.7269224},
{n:'Grupo 16 (Entrada Última)',lat:13.7239691,lng:-89.7271584}
];

// ========== MIÉRCOLES: Reference waypoints (key landmarks) ==========
const MIER_WP_REF=[
{n:"Catedral",lat:13.7205165,lng:-89.7268171},
{n:"Omnisport",lat:13.7213138,lng:-89.7270429},
{n:"Mitad del Puente",lat:13.7205279,lng:-89.7251279},
{n:"Mercado El Ángel",lat:13.7191287,lng:-89.7243735},
{n:"COED Thomas Jefferson",lat:13.7187273,lng:-89.7237472},
{n:"Hotel Florencia",lat:13.7173679,lng:-89.7214472},
{n:"Tienda R y R",lat:13.7166102,lng:-89.7203138},
{n:"Cruzona",lat:13.716749,lng:-89.7189781},
{n:"Villa Lilian",lat:13.7156298,lng:-89.7166385},
{n:"Balzamar",lat:13.7184155,lng:-89.7197969},
{n:"Salarrue",lat:13.72572,lng:-89.7238697},
{n:"Col. 14",lat:13.7271377,lng:-89.7209905},
];

// ========== LUNES: 103 puntos exactos del KML ==========
const LUN_PTS=[
{n:'Grupo 19 (Levanta)',lat:13.7205038,lng:-89.7268142},{n:'Grupo 20 (Saca)',lat:13.7204777,lng:-89.7271632},{n:'Grupo 21 (Minuto de silencio)',lat:13.7206679,lng:-89.7275011},
{n:'Grupo 1 (B. Agrícola)',lat:13.7203631,lng:-89.7277349},{n:'Grupo 2 (P. 2001)',lat:13.7199461,lng:-89.7279817},{n:'Grupo 3 (Claro)',lat:13.7195387,lng:-89.7282346},
{n:'Grupo 4 (Selim)',lat:13.7192524,lng:-89.7284855},{n:'Grupo 5 (Agroservicio)',lat:13.718882,lng:-89.7287269},{n:'Grupo 6 (P. Lupita)',lat:13.718582,lng:-89.7289339},
{n:'Grupo 7 (H. Veracruz)',lat:13.7182537,lng:-89.7291377},{n:'Grupo 8 (C. Crédito)',lat:13.7179107,lng:-89.7293711},{n:'Grupo 9 (Megaplaza)',lat:13.7175267,lng:-89.7295749},
{n:'Grupo 10 (Flores)',lat:13.7177899,lng:-89.7300121},{n:'Grupo 11',lat:13.7180374,lng:-89.730401},{n:'Grupo 12',lat:13.7176713,lng:-89.7306562},
{n:'Grupo 13 (F. Lozano)',lat:13.7173416,lng:-89.7309029},{n:'Grupo 14',lat:13.717571,lng:-89.731273},{n:'Grupo 15',lat:13.7178359,lng:-89.7316597},
{n:'Grupo 16 (Panes Dalila)',lat:13.7182059,lng:-89.7314237},{n:'Grupo 17 (Dr. Arbizú)',lat:13.718526,lng:-89.7311732},{n:'Grupo 18',lat:13.7187814,lng:-89.7314924},
{n:'Grupo 19',lat:13.7190133,lng:-89.731782},{n:'Grupo 20 (Jugos)',lat:13.7186785,lng:-89.7320336},{n:'Grupo 21',lat:13.7183089,lng:-89.7322888},
{n:'Grupo 1 (Pupusería)',lat:13.7180018,lng:-89.7325207},{n:'Grupo 2',lat:13.7177069,lng:-89.7327523},{n:'Grupo 3',lat:13.7174209,lng:-89.7329489},
{n:'Grupo 4',lat:13.7170964,lng:-89.7331018},{n:'Grupo 5 (Alexis)',lat:13.7166855,lng:-89.7332318},{n:'Grupo 6',lat:13.7161983,lng:-89.7333429},
{n:'Grupo 7',lat:13.7157251,lng:-89.7334055},{n:'Grupo 8',lat:13.7152247,lng:-89.733444},{n:'Grupo 9',lat:13.7146337,lng:-89.7335051},
{n:'Grupo 10 (William Mendoza)',lat:13.7140187,lng:-89.7335748},{n:'Grupo 11',lat:13.7133942,lng:-89.7336122},{n:'Grupo 12',lat:13.7128443,lng:-89.7336364},
{n:'Grupo 13',lat:13.7126762,lng:-89.7332711},{n:'Grupo 14',lat:13.7123899,lng:-89.7327963},{n:'Grupo 15',lat:13.7121459,lng:-89.732339},
{n:'Grupo 16',lat:13.7119606,lng:-89.7319596},{n:'Grupo 17',lat:13.7117834,lng:-89.7316056},{n:'Grupo 18',lat:13.7115932,lng:-89.7312381},
{n:'Grupo 19',lat:13.711403,lng:-89.7308894},{n:'Grupo 20',lat:13.7111737,lng:-89.7305327},{n:'Grupo 21 (Sensunapán)',lat:13.7110173,lng:-89.7302323},
{n:'Grupo 1',lat:13.7113676,lng:-89.7300127},{n:'Grupo 2',lat:13.7117526,lng:-89.7297767},{n:'Grupo 3',lat:13.7121196,lng:-89.729558},
{n:'Grupo 4',lat:13.7124658,lng:-89.7293766},{n:'Grupo 5',lat:13.7128431,lng:-89.7291289},{n:'Grupo 6',lat:13.7132183,lng:-89.7288773},
{n:'Grupo 7 (P. Antorchas)',lat:13.7136069,lng:-89.7286467},{n:'Grupo 8',lat:13.7140058,lng:-89.7284135},{n:'Grupo 9',lat:13.714381,lng:-89.7281936},
{n:'Grupo 10',lat:13.7147903,lng:-89.7279647},{n:'Grupo 11',lat:13.7152687,lng:-89.7276823},{n:'Grupo 12 (Canchita)',lat:13.7157475,lng:-89.7274007},
{n:'Grupo 13',lat:13.716155,lng:-89.7271571},{n:'Grupo 14',lat:13.71658,lng:-89.7268705},{n:'Grupo 15',lat:13.716968,lng:-89.7266286},
{n:'Grupo 16',lat:13.7173743,lng:-89.7263993},{n:'Grupo 17 (COED BRITO)',lat:13.7177813,lng:-89.7261697},{n:'Grupo 18 (CNR)',lat:13.7181252,lng:-89.7259767},
{n:'Grupo 19 (TELAS)',lat:13.7185029,lng:-89.7257623},{n:'Grupo 20 (MODA FASHION)',lat:13.7188385,lng:-89.725575},{n:'Grupo 21 (SELECTOS)',lat:13.7192706,lng:-89.7253634},
{n:'Grupo 1 (Quesos)',lat:13.7196094,lng:-89.7251757},{n:'Grupo 2 (Amperio)',lat:13.719969,lng:-89.724996},{n:'Grupo 3',lat:13.7203285,lng:-89.7248304},
{n:'Grupo 4 (F. Generosa)',lat:13.7207418,lng:-89.7245964},{n:'Grupo 5 (Esquina IPS)',lat:13.7210786,lng:-89.7243618},{n:'Grupo 6 (Ex IPS)',lat:13.7214746,lng:-89.7241486},
{n:'Grupo 7 (Administración)',lat:13.7218648,lng:-89.7238889},{n:'Grupo 8 (Car Wash)',lat:13.7216677,lng:-89.7236013},{n:'Grupo 9 (AHSEC)',lat:13.7214827,lng:-89.7232847},
{n:'Grupo 10 (Uniformate)',lat:13.7212065,lng:-89.7229307},{n:'Grupo 11 (Librería)',lat:13.7215833,lng:-89.7226518},{n:'Grupo 12 (P. UNAB)',lat:13.721903,lng:-89.7224202},
{n:'Grupo 13 (ITDEM)',lat:13.7222126,lng:-89.7221862},{n:'Grupo 14',lat:13.7226048,lng:-89.7219108},{n:'Grupo 15',lat:13.7229571,lng:-89.7216379},
{n:'Grupo 16 (Luz Clarita)',lat:13.7232658,lng:-89.7214544},{n:'Grupo 17 (Última)',lat:13.7233944,lng:-89.7211656},{n:'Grupo 18',lat:13.7231467,lng:-89.7209014},
{n:'Grupo 19',lat:13.7229592,lng:-89.7206788},{n:'Grupo 20 (Ida)',lat:13.7227292,lng:-89.7204053},{n:'Grupo 21 (Ida)',lat:13.7230478,lng:-89.7201119},
{n:'Grupo 1 (Ida)',lat:13.7232966,lng:-89.7198558},{n:'Grupo 2 (Regreso)',lat:13.7235413,lng:-89.7195569},{n:'Grupo 3 (Regreso)',lat:13.7232521,lng:-89.7197886},
{n:'Grupo 4 (Regreso)',lat:13.7229667,lng:-89.7200247},{n:'Grupo 5 (Regreso)',lat:13.7226892,lng:-89.7203539},{n:'Grupo 6',lat:13.722384,lng:-89.720583},
{n:'Grupo 7',lat:13.7220443,lng:-89.7208097},{n:'Grupo 8',lat:13.7216614,lng:-89.721066},{n:'Grupo 9',lat:13.7212652,lng:-89.7213262},
{n:'Grupo 10',lat:13.7208859,lng:-89.7216059},{n:'Grupo 11',lat:13.7205267,lng:-89.7218667},{n:'Grupo 12',lat:13.720169,lng:-89.7221217},
{n:'Grupo 13',lat:13.7198094,lng:-89.7223679},{n:'Grupo 14',lat:13.7194821,lng:-89.7225958},{n:'Grupo 15',lat:13.7196932,lng:-89.7229097},
{n:'Grupo 16 (Entra)',lat:13.7199589,lng:-89.7232262}
];
// Lunes reference waypoints
const LUN_WP_REF=[
{n:"Catedral",lat:13.7205038,lng:-89.7268142},
{n:"Veracruz",lat:13.7182537,lng:-89.7291377},
{n:"Megaplaza",lat:13.7175267,lng:-89.7295749},
{n:"Sensunapán",lat:13.7110173,lng:-89.7302323},
{n:"COED Brito",lat:13.7177813,lng:-89.7261697},
{n:"Selectos",lat:13.7192706,lng:-89.7253634},
{n:"IPS",lat:13.7210786,lng:-89.7243618},
];

// ========== VIERNES MAÑANA: 44 puntos exactos del KML ==========
const VIER_PTS=[
{n:'Iglesia el pilar',lat:13.7236207,lng:-89.7273996},{n:'Esquina',lat:13.7239621,lng:-89.7271582},{n:'AHJN',lat:13.7242369,lng:-89.727519},
{n:'Punto 4',lat:13.7244897,lng:-89.7278543},{n:'Punto 5',lat:13.724758,lng:-89.7282432},{n:'Punto 6',lat:13.7249612,lng:-89.7285329},
{n:'San Vicente de Paul',lat:13.7246585,lng:-89.7287919},{n:'Minuto de Silencio',lat:13.7242416,lng:-89.7290869},{n:'Casa de Ancianas',lat:13.7239754,lng:-89.7287756},
{n:'Ex - Pupusería Cony',lat:13.7237357,lng:-89.7284537},{n:'Parqueo',lat:13.7234647,lng:-89.7286737},{n:'Hospital',lat:13.7231312,lng:-89.7289419},
{n:'UMA',lat:13.7228811,lng:-89.7286308},{n:'Tortodromo',lat:13.722657,lng:-89.7282123},{n:'UMA',lat:13.7223126,lng:-89.7284374},
{n:'Punto 16',lat:13.7219322,lng:-89.7286949},{n:'Punto 17',lat:13.7216892,lng:-89.7283505},{n:'Banco Hipotecario',lat:13.7214234,lng:-89.728034},
{n:'Foto Richard',lat:13.7212098,lng:-89.7276746},{n:'Despensa',lat:13.7209336,lng:-89.7272991},{n:'Punto 21',lat:13.7207199,lng:-89.7269236},
{n:'Librería el Shadai',lat:13.7204802,lng:-89.7266125},{n:'Colegio San Antonio',lat:13.720204,lng:-89.726827},{n:'Ex - RAF',lat:13.7198965,lng:-89.7270577},
{n:'Electrónica 2001',lat:13.7201362,lng:-89.7273903},{n:'Banco Agrícola',lat:13.7203331,lng:-89.727731},{n:'Portón de la electrónica 2001',lat:13.7199632,lng:-89.727977},
{n:'Claro',lat:13.7195853,lng:-89.7282318},{n:'Casa Blanca',lat:13.719219,lng:-89.7284956},{n:'Agroservicio',lat:13.7188751,lng:-89.7287397},
{n:'Pan Lilian',lat:13.718578,lng:-89.7289409},{n:'Ermita de Veracruz',lat:13.7182706,lng:-89.7291447},{n:'Punto 33',lat:13.7185103,lng:-89.7295337},
{n:'Punto 34',lat:13.718737,lng:-89.7298824},{n:'Punto 35',lat:13.7190262,lng:-89.7296946},{n:'Agroservicio',lat:13.7193485,lng:-89.7294867},
{n:'Mercado',lat:13.7197134,lng:-89.7292397},{n:'Punto 38',lat:13.7200493,lng:-89.7290125},{n:'Punto 39',lat:13.7204859,lng:-89.7286913},
{n:'Cortesías',lat:13.7208368,lng:-89.7284344},{n:'Librería San Salvador',lat:13.7206101,lng:-89.7281149},{n:'Banco Agricola',lat:13.7203834,lng:-89.7277152},
{n:'Portón de Catedral',lat:13.7206883,lng:-89.7275023},{n:'Última Cargada',lat:13.7204668,lng:-89.7271617}
];
const VIER_WP_REF=[
{n:"Iglesia El Pilar",lat:13.7236207,lng:-89.7273996},
{n:"San Vicente de Paul",lat:13.7246585,lng:-89.7287919},
{n:"Hospital",lat:13.7231312,lng:-89.7289419},
{n:"Banco Hipotecario",lat:13.7214234,lng:-89.728034},
{n:"Ermita Veracruz",lat:13.7182706,lng:-89.7291447},
{n:"Catedral",lat:13.7206883,lng:-89.7275023},
];

const SE_PTS=[
{n:'Grupo 5 (5:00 p.m.)',lat:13.720176844529918,lng:-89.72718212753534},
{n:'Grupo 6 (5:10 p.m.)',lat:13.720487245232983,lng:-89.72720425575972},
{n:'Grupo 7 (5:20 p.m.)',lat:13.720654659502582,lng:-89.72751438617706},
{n:'Grupo 8 (5:30 p.m.)',lat:13.720397023874723,lng:-89.72774639725685},
{n:'Grupo 9 (5:40 p.m.)',lat:13.720664430759763,lng:-89.72813565284014},
{n:'Grupo 10 (5:50 p.m.)',lat:13.720844547527644,lng:-89.72841460257769},
{n:'Grupo 11 (6:00 p.m.)',lat:13.721157878718463,lng:-89.72823422402143},
{n:'Grupo 12 (6:10 p.m.)',lat:13.721409325067965,lng:-89.72802735865116},
{n:'Grupo 13 (6:20 p.m.)',lat:13.721169604201897,lng:-89.72764480859041},
{n:'Grupo 14 (6:29 p.m.)',lat:13.720969945195804,lng:-89.72732964903116},
{n:'Grupo 15 (6:38 p.m.)',lat:13.720716544124542,lng:-89.72693402320147},
{n:'Grupo 16 (18:45 p.m.)',lat:13.720509393431142,lng:-89.72658935934305},
{n:'Grupo 17 (6:50 p.m.)',lat:13.72084487323596,lng:-89.72635667771101},
{n:'Grupo 18 (6:55 p.m.)',lat:13.721170255617624,lng:-89.7261169552803},
{n:'Grupo 19 (7:00 p.m.)',lat:13.721510294381202,lng:-89.72589734941721},
{n:'Grupo 20 (7:05 p.m.)',lat:13.72188192622113,lng:-89.72566433250904},
{n:'Grupo 21 (7:10 p.m.)',lat:13.722109595217074,lng:-89.72599290311337},
{n:'Grupo 1 (7:15 p.m.)',lat:13.722352572185093,lng:-89.72634997218847},
{n:'Grupo 2 (7:20 p.m.)',lat:13.722564281134416,lng:-89.72666077315807},
{n:'Grupo 3 (7:25 p.m.)',lat:13.722785435355922,lng:-89.72699336707592},
{n:'Grupo 4 (7:30 p.m.)',lat:13.723065542023596,lng:-89.72736820578575},
{n:'Grupo 5 (7:35 p.m.)',lat:13.723290604231721,lng:-89.72770113497972},
{n:'Grupo 6 (7:40 p.m.)',lat:13.723501660925383,lng:-89.72803205251694},
{n:'Grupo 7 (7:45 p.m.)',lat:13.72377655547009,lng:-89.72844310104847},
{n:'Grupo 8 (7:50 p.m.)',lat:13.72400357121976,lng:-89.72876161336899},
{n:'Grupo 9 (7:55 p.m.)',lat:13.724216255790235,lng:-89.7290888428688},
{n:'Grupo 10 (8:00 p.m.)',lat:13.723872963907112,lng:-89.72932487726212},
{n:'Grupo 11 (8:05 p.m.)',lat:13.723568430364555,lng:-89.72953744232655},
{n:'Grupo 12 (8:10 p.m.)',lat:13.723199406836201,lng:-89.729776494205},
{n:'Grupo 13 (8:15 p.m.)',lat:13.72284243383284,lng:-89.73000951111317},
{n:'Grupo 14 (8:20 p.m.)',lat:13.722497511409491,lng:-89.73020564764738},
{n:'Grupo 15 (8:25 p.m.)',lat:13.722146400055484,lng:-89.730408154428},
{n:'Grupo 16 (8:30 p.m.)',lat:13.7217151642413,lng:-89.7306552529335},
{n:'Grupo 17 (8:35 p.m.)',lat:13.721701810249506,lng:-89.73014529794455},
{n:'Grupo 18 (8:40 p.m.)',lat:13.721656211247424,lng:-89.7297677770257},
{n:'Grupo 19 (8:45 p.m.)',lat:13.721441244403946,lng:-89.72944356501102},
{n:'Grupo 20 (8:50 p.m.)',lat:13.721246145537643,lng:-89.72914215177298},
{n:'Grupo 21 (8:55 p.m.)',lat:13.721075148902083,lng:-89.72884174436331},
{n:'Grupo 1 (9:00 p.m.)',lat:13.720838359069566,lng:-89.72844779491425},
{n:'Grupo 2 (9:05 p.m.)',lat:13.72062762568893,lng:-89.72813934087753},
{n:'Grupo 3 (9:10 p.m.)',lat:13.720357287381027,lng:-89.72774337977171},
{n:'Grupo 4 (9:15 p.m.)',lat:13.719975881841114,lng:-89.72798075526953},
{n:'Grupo 5 (21:20 p.m.)',lat:13.71958144727892,lng:-89.7282325476408},
{n:'Grupo 6 (9:25 p.m.)',lat:13.719200040478109,lng:-89.7285021096468},
{n:'Grupo 7 (9:32 p.m.)',lat:13.718877261053146,lng:-89.72873479127884},
{n:'Grupo 8 (9:39 p.m.)',lat:13.718597475097567,lng:-89.72892388701439},
{n:'Grupo 9 (9:45 p.m.)',lat:13.718271763436944,lng:-89.72913779318333},
{n:'Grupo 10 (9:50 p.m.)',lat:13.718026502258176,lng:-89.72884174436331},
{n:'Grupo 11 (9:55 p.m.)',lat:13.717759743792705,lng:-89.72853496670723},
{n:'Grupo 12 (10:00 p.m.)',lat:13.71814571290298,lng:-89.72826942801476},
{n:'Grupo 13 (10:05 p.m.)',lat:13.71847403043139,lng:-89.7280478104949},
{n:'Grupo 14 (10:10 p.m.)',lat:13.71879485614395,lng:-89.72781546413898},
{n:'Grupo 15 (10:15 p.m.)',lat:13.719178869288271,lng:-89.72755294293165},
{n:'Grupo 16 (10:20 p.m.)',lat:13.719501322588265,lng:-89.72732193768024},
{n:'Grupo 17 (10:25 p.m.)',lat:13.71989315160803,lng:-89.72705405205488},
{n:'Grupo 18 (10:29 p.m.)',lat:13.719663200492016,lng:-89.72670402377844},
{n:'Grupo 19 (10:33 p.m.)',lat:13.719397421017739,lng:-89.72632817924023},
{n:'Grupo 20 (10:37 p.m.)',lat:13.719092881666777,lng:-89.7258996963501},
{n:'Grupo 21 (10:41 p.m.)',lat:13.718868792565793,lng:-89.72558554261923},
{n:'Grupo 1 (10:45 p.m.)',lat:13.718674668694877,lng:-89.72526300698519},
{n:'Grupo 2 (10:49 p.m.)',lat:13.71844634494324,lng:-89.72490459680557},
{n:'Grupo 3 (10:53 p.m.)',lat:13.718263946351541,lng:-89.72463168203831},
{n:'Grupo 4 (10:58 p.m.)',lat:13.718037250761418,lng:-89.72427394241095},
{n:'Grupo 5 (11:05 p.m.)',lat:13.71776658375713,lng:-89.72385853528976},
{n:'Grupo 6 (11:08 p.m.)',lat:13.718193592571144,lng:-89.7235668450594},
{n:'Grupo 7 (11:11 p.m.)',lat:13.718498784512121,lng:-89.72334790974855},
{n:'Grupo 8 (11:15 p.m.)',lat:13.71823495799087,lng:-89.72287081182003},
{n:'Grupo 9 (11:20 p.m.)',lat:13.718015428042191,lng:-89.72246713936329},
{n:'Grupo 10 (11:25 p.m.)',lat:13.718294563267897,lng:-89.72223345190287},
{n:'Grupo 11 (11:30 p.m.)',lat:13.718553178338283,lng:-89.72201820462942},
{n:'Grupo 12 (23:35 p.m.)',lat:13.718921883462249,lng:-89.72176607698202},
{n:'Grupo 13 (11:41 p.m.)',lat:13.718631674795711,lng:-89.7213925793767},
{n:'Grupo 14 (11:47 p.m.)',lat:13.718370454117846,lng:-89.72107574343681},
{n:'Grupo 15 (11:53 p.m.)',lat:13.718124215905922,lng:-89.7207636013627},
{n:'Grupo 16 (12:00 a.m.)',lat:13.717807297827056,lng:-89.72036261111498},
{n:'Grupo 17 (12:07 a.m.)',lat:13.718324528756645,lng:-89.72005616873503},
{n:'Grupo 18 (12:14 a.m.)',lat:13.718614,lng:-89.719745},
{n:'Grupo 19 (12:21 a.m.)',lat:13.719032299459988,lng:-89.71954889595509},
{n:'Grupo 20 (12:30 a.m.)',lat:13.719369,lng:-89.719423},
{n:'Grupo 21 (12:36 a.m.)',lat:13.719546,lng:-89.71984},
{n:'Grupo 1 (12:42 a.m.)',lat:13.719651,lng:-89.72014},
{n:'Grupo 2 (12:48 a.m.)',lat:13.719812375604278,lng:-89.72057551145554},
{n:'Grupo 3 (12:54 a.m.)',lat:13.719954385011699,lng:-89.72098387777805},
{n:'Grupo 4 (1:00 a.m.)',lat:13.720442948830366,lng:-89.72064021974802},
{n:'Grupo 5 (1:05 a.m.)',lat:13.720453371514088,lng:-89.7210244461894},
{n:'Grupo 6 (1:10 a.m.)',lat:13.720455977184935,lng:-89.72148142755032},
{n:'Grupo 7 (1:15 a.m.)',lat:13.720487570941794,lng:-89.72182877361774},
{n:'Grupo 8 (1:20 a.m.)',lat:13.720642933993425,lng:-89.72210638225079},
{n:'Grupo 9 (1:25 a.m.)',lat:13.72096636240622,lng:-89.72256034612656},
{n:'Grupo 10 (1:30 a.m.)',lat:13.72121455188293,lng:-89.72293149679899},
{n:'Grupo 11 (1:35 a.m.)',lat:13.721532768190174,lng:-89.72337942570448},
{n:'Grupo 12 (1:39 a.m.)',lat:13.721791379692093,lng:-89.72370967268944},
{n:'Grupo 13 (1:43 a.m.)',lat:13.72199983208065,lng:-89.72400639206171},
{n:'Grupo 14 (1:48 a.m.)',lat:13.722121081101054,lng:-89.7242207147344},
{n:'Grupo 15 (1:54 a.m.)',lat:13.72242813601662,lng:-89.72442548722029},
{n:'Grupo 16 (2:00  a.m.)',lat:13.722630399428667,lng:-89.7246303409338},
{n:'Grupo 17 (2:04  a.m.)',lat:13.722881192789236,lng:-89.72494181245565},
{n:'Grupo 18 (2:08  a.m.)',lat:13.723229371698645,lng:-89.72470879554749},
{n:'Grupo 19 (2:16 a.m.)',lat:13.72358699552231,lng:-89.72447041422129},
{n:'Grupo 20 (2:20 a.m.)',lat:13.724028650421102,lng:-89.72413547337055},
{n:'Grupo 21 (2:24 a.m.)',lat:13.72440483811946,lng:-89.72385752946138},
{n:'Grupo 1 (2:28 a.m.)',lat:13.724874501914375,lng:-89.72354337573051},
{n:'Grupo 2 (2:32  a.m.)',lat:13.725357844255528,lng:-89.72320809960365},
{n:'Grupo 3 (2:36 a.m.)',lat:13.725764645764116,lng:-89.72294323146343},
{n:'Grupo 4 (2:40  a.m.)',lat:13.726170795165407,lng:-89.72267601639032},
{n:'Grupo 5 (2:45  a.m.)',lat:13.726489330450786,lng:-89.7224560752511},
{n:'Grupo 6 (2:50  a.m.)',lat:13.726831967105129,lng:-89.72220327705145},
{n:'Grupo 7 (2:55  a.m.)',lat:13.727203916214659,lng:-89.72196087241173},
{n:'Grupo 8 (3:00  a.m.)',lat:13.72761625140328,lng:-89.72166683524847},
{n:'Grupo 9 (3:05  a.m.)',lat:13.727954652331663,lng:-89.72142174839973},
{n:'Grupo 10 (3:10  a.m.)',lat:13.728284258926305,lng:-89.72118068486452},
{n:'Grupo 11 (3:16  a.m.)',lat:13.728603117039015,lng:-89.72093928605318},
{n:'Grupo 12 (3:22  a.m.)',lat:13.729015101021028,lng:-89.72096033206779},
{n:'Grupo 13 (3:28  a.m.)',lat:13.729160562732929,lng:-89.7205575431613},
{n:'Grupo 14 (3:34  a.m.)',lat:13.728893319049938,lng:-89.72019770292873},
{n:'Grupo 15 (3:40  a.m.)',lat:13.728471592111369,lng:-89.72033351358968},
{n:'Grupo 16 (3:46 a.m.)',lat:13.728253317615481,lng:-89.72054734826088},
{n:'Grupo 17 (3:52  a.m.)',lat:13.727782619463616,lng:-89.72064924438621},
{n:'Grupo 18 (3:58  a.m.)',lat:13.727511702028318,lng:-89.72075689584017},
{n:'Grupo 19 (4:04  a.m.)',lat:13.727098063857369,lng:-89.72098287194967},
{n:'Grupo 20 (4:10  a.m.)',lat:13.726817962004533,lng:-89.72049470990896},
{n:'Grupo 21 (4:16)',lat:13.726387386178496,lng:-89.72067844122648},
{n:'Grupo 1 (4:22  a.m.)',lat:13.726582806469823,lng:-89.72098186612129},
{n:'Grupo 2 (4:28  a.m.)',lat:13.726744028087593,lng:-89.72122494131327},
{n:'Grupo 3 (4:34  a.m.)',lat:13.726966481168166,lng:-89.72157698124647},
{n:'Grupo 4 (4:40  a.m.)',lat:13.727231926368907,lng:-89.72194042056799},
{n:'Grupo 5 (4:45  a.m.)',lat:13.727472618137853,lng:-89.72229480743408},
{n:'Grupo 6 (4:52  a.m.)',lat:13.727082104574729,lng:-89.72269479185343},
{n:'Grupo 7 (5:00  a.m.)',lat:13.726779,lng:-89.723023},
{n:'Grupo 8 (5:07 a.m.)',lat:13.726384,lng:-89.723397},
{n:'Grupo 9 (5:14 a.m.)',lat:13.726054,lng:-89.723652},
{n:'Grupo 10 (5:21  a.m.)',lat:13.72571,lng:-89.72389},
{n:'Grupo 11 (5:28  a.m.)',lat:13.725305,lng:-89.724191},
{n:'Grupo 12 (5:35  a.m.)',lat:13.724793727625476,lng:-89.7245230525732},
{n:'Grupo 13 (5:42  a.m.)',lat:13.724391809984159,lng:-89.72483485937119},
{n:'Grupo 14 (5:50  a.m.)',lat:13.724027021901623,lng:-89.72511615604162},
{n:'Grupo 15 (5:58  a.m.)',lat:13.723704574820681,lng:-89.72533609718084},
{n:'Grupo 16 (6:06  a.m.)',lat:13.723292884166149,lng:-89.72561907023191},
{n:'Grupo 17 (6:14  a.m.)',lat:13.722969133254791,lng:-89.72585912793875},
{n:'Grupo 18 (6:22  a.m.)',lat:13.72269912335024,lng:-89.7260569408536},
{n:'Grupo 19 (6:30  a.m.)',lat:13.72234084676078,lng:-89.72630504518747},
{n:'Grupo 20 (6:38  a.m.)',lat:13.721967261407146,lng:-89.72657293081284},
{n:'Grupo 21 (6:46  a.m.)',lat:13.721650999932331,lng:-89.72678113728762},
{n:'Grupo 1 (6:54  a.m.)',lat:13.721301190142391,lng:-89.72703762352467},
{n:'Grupo 2 (7:00  a.m.)',lat:13.72094453995935,lng:-89.72728203982115},
{n:'Grupo 3 (7:10  a.m.)',lat:13.72066768784541,lng:-89.72747448831797},
{n:'Grupo 4 (7:20  a.m.)',lat:13.720462817070816,lng:-89.72722504287958}
];
const SE_WP_REF=[
{n:'Catedral',lat:13.7205,lng:-89.7272},
{n:'Sto Domingo',lat:13.7212,lng:-89.7266}
];

// ========== STATE ==========
let gmap, infoWin, routeLine, routeClickLine;
let currentDay = 0; // 0=lunes,1=martes,2=miercoles,3=viernes,4=santo_entierro
window.currentDay = 0;
let positions = [];
let changes = [], myCarries = [];
let allMarkers = [], wpMarkers = [], showAll = true, dragMode = false;
let dayNames = ['Lunes Santo','Martes Santo','Miércoles Santo','Viernes Mañana','Santo Entierro'];
let dayDates = ['2026-03-30','2026-03-31','2026-04-01','2026-04-03','2026-04-03']; // Semana Santa 2026
let dayHours = [15, 15, 15, 6, 17];
let daySaca = [19, 17, 13, 16, 5];
let daySacaManual = [true, true, false, false, true];

function isDayPast(dayIdx){
  if(!dayDates[dayIdx]) return false;
  var now=new Date();
  // Get departure time
  var depH=15,depM=0;
  if(dayHours[dayIdx]){
    var parsed=parseTimeStr(dayHours[dayIdx]);
    depH=parsed.h;depM=parsed.m;
  }
  // Calculate end time from route
  var dayPtsArr=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
  var pts=savedPositions[dayIdx]?savedPositions[dayIdx]:dayPtsArr[dayIdx];
  var totalPts=Array.isArray(pts)?pts.length:44;
  var mn=6; // default
  if(dayIdx===currentDay&&$('cMn')) mn=+$('cMn').value||6;
  // End = departure + (totalPts-1)*mn + 30 min buffer
  var endMin=depH*60+depM+(totalPts-1)*mn+30;
  
  if(endMin<1440){ // ends before midnight (same day)
    var endH=Math.floor(endMin/60);
    var endM=Math.round(endMin%60);
    var endDate=new Date(dayDates[dayIdx]+'T'+String(endH).padStart(2,'0')+':'+String(endM).padStart(2,'0')+':00');
    return now>endDate;
  } else {
    // Goes past midnight — past after 3:30 AM next day
    var nextDay=new Date(dayDates[dayIdx]+'T03:30:00');
    nextDay.setDate(nextDay.getDate()+1);
    return now>nextDay;
  }
}

function detectToday(){
  const now=new Date();
  let checkDate=new Date(now);
  if(now.getHours()<5) checkDate.setDate(checkDate.getDate()-1);
  var y=checkDate.getFullYear();
  var m=String(checkDate.getMonth()+1).padStart(2,'0');
  var dd=String(checkDate.getDate()).padStart(2,'0');
  const today=y+'-'+m+'-'+dd;
  let todayIdx=-1;
  // Find the LATEST active day that matches today (SE over Viernes)
  for(var ii=dayDates.length-1;ii>=0;ii--){
    if(dayDates[ii]===today&&!isDayPast(ii)){
      todayIdx=ii;
      break; // take the latest non-past match
    }
  }
  // If no active day, find the latest matching date
  if(todayIdx===-1){
    for(var jj=dayDates.length-1;jj>=0;jj--){
      if(dayDates[jj]===today){todayIdx=jj;break;}
    }
  }
  // Mark labels in dropdown
  var ds=document.getElementById('daySelector');
  var labels=['Lun','Mar','Mié','Vie','SE'];
  if(ds){
    for(var j=0;j<ds.options.length;j++){
      var idx=+ds.options[j].value;
      var isToday=(dayDates[idx]===today&&!isDayPast(idx));
      var isPast=(dayDates[idx]===today&&isDayPast(idx));
      ds.options[j].textContent=labels[idx]+(isToday?' ← HOY':(isPast?' ✅':''));
    }
    if(todayIdx>=0) ds.value=todayIdx;
  }
  document.querySelectorAll('.day').forEach(function(btn,i){
    btn.classList.remove('today','past');
    if(dayDates[i]===today) btn.classList.add('today');
  });
  return todayIdx;
}

let savedPositions = [null, null, null, null, null];
let savedPositionsW = [null, null, null, null, null];
var positionsW = []; // women's route (only when different from men)
var routeLineW = null;
var editingWomen = false; // toggle in editor
let savedRefs = [null, null, null, null, null];

// ========== MARTES: 80 puntos exactos del KML ==========
const MART_PTS=[
{n:'Grupo 17 (Iglesia Nuestra Señora de los Ángeles)',lat:13.7196467,lng:-89.7232526},{n:'Grupo 18 (Portón Sur)',lat:13.7195529,lng:-89.7235905},{n:'Grupo 19 (Puerta Sur de la Iglesia)',lat:13.7193151,lng:-89.7232576},
{n:'Grupo 20 (Pan Bueno)',lat:13.719101,lng:-89.7229067},{n:'Grupo 21 (Frío Repuestos)',lat:13.7194552,lng:-89.7226028},{n:'Grupo 1 (Centro Cultural de Yoga)',lat:13.7193188,lng:-89.7223546},
{n:'Grupo 2 (Vidrería Emmanuel)',lat:13.7191243,lng:-89.7220811},{n:'Grupo 3 (Parqueo de BOU)',lat:13.7189043,lng:-89.7217834},{n:'Grupo 4 (Pampero)',lat:13.7186277,lng:-89.7214121},
{n:'Grupo 5 (Colegio Ensueño)',lat:13.7183617,lng:-89.7210784},{n:'Grupo 6 (Comedor San Antonio)',lat:13.7181254,lng:-89.7207834},{n:'Grupo 7 (Radio Sensunat)',lat:13.7178022,lng:-89.7203751},
{n:'Grupo 8 (Raúl)',lat:13.7176153,lng:-89.7206005},{n:'Grupo 9 (Iglesia Evangélica)',lat:13.7178681,lng:-89.721027},{n:'Grupo 10 (N & J Tramitaciones)',lat:13.7180831,lng:-89.7213484},
{n:'Grupo 11 (Suministros Eléctricos)',lat:13.7182955,lng:-89.7216879},{n:'Grupo 12 (BOU)',lat:13.7185138,lng:-89.7220346},{n:'Grupo 13 (Poste a la mitad)',lat:13.7182362,lng:-89.7222463},
{n:'Grupo 14 (Pizza Cristian)',lat:13.7179834,lng:-89.7224636},{n:'Grupo 15 (El Palace)',lat:13.7182623,lng:-89.722933},{n:'Grupo 16 (COED Thomas Jefferson)',lat:13.7184811,lng:-89.7233434},
{n:'Grupo 17 (Farmacia San Roque)',lat:13.7181228,lng:-89.7235982},{n:'Grupo 18 (Caja de Crédito)',lat:13.7177567,lng:-89.7238664},{n:'Grupo 19 (Depósito de Telas)',lat:13.7179794,lng:-89.7242151},
{n:'Grupo 20 (Ferrocarril)',lat:13.7181957,lng:-89.7245383},{n:'Grupo 21 (Farmacia El Ángel)',lat:13.7184087,lng:-89.7248545},{n:'Grupo 1 (Farmacia San Roque)',lat:13.7186212,lng:-89.7252279},
{n:'Grupo 2 (Moda Fashion)',lat:13.7188478,lng:-89.7255819},{n:'Grupo 3 (Él Sótano)',lat:13.719095,lng:-89.7259706},{n:'Grupo 4 (Calzado Maga)',lat:13.719366,lng:-89.72633},
{n:'Grupo 5 (Calzado Chepe)',lat:13.7196735,lng:-89.7267377},{n:'Grupo 6 (Ex-RAF)',lat:13.719887,lng:-89.7270533},{n:'Grupo 7 (Caja de Crédito)',lat:13.7195336,lng:-89.7272889},
{n:'Grupo 8 (C.E Fray Patricio Ruíz)',lat:13.7191648,lng:-89.7275598},{n:'Grupo 9 (Iglesia Mormones)',lat:13.7188175,lng:-89.7277764},{n:'Grupo 10 (PNC)',lat:13.7184449,lng:-89.7280559},
{n:'Grupo 11 (Gerardo Mancía)',lat:13.7181112,lng:-89.7282812},{n:'Grupo 12 (ELIM)',lat:13.7177465,lng:-89.7285387},{n:'Grupo 13 (Mitad Poste)',lat:13.7180163,lng:-89.7288646},
{n:'Grupo 14 (Ermita de Veracruz)',lat:13.7182351,lng:-89.7291543},{n:'Grupo 15 (Gimnasio Brizuela)',lat:13.7184854,lng:-89.7295014},{n:'Grupo 16 (Deposito de Gaseosas)',lat:13.7187251,lng:-89.729877},
{n:'Grupo 17 (Hotel Sol y Luna)',lat:13.7189961,lng:-89.7302739},{n:'Grupo 18 (Esquina y giro)',lat:13.7192515,lng:-89.7306548},{n:'Grupo 19 (Panes San Antonio)',lat:13.7189005,lng:-89.7309044},
{n:'Grupo 20 (Clínica Dr. Arbizú)',lat:13.718548,lng:-89.731178},{n:'Grupo 21 (Tuning A&C)',lat:13.7181813,lng:-89.7314293},{n:'Grupo 1 (Esquina)',lat:13.7178412,lng:-89.7316599},
{n:'Grupo 2 (Barbería y Salón de Belleza)',lat:13.7175294,lng:-89.731884},{n:'Grupo 3 (Tienda Claro)',lat:13.717234,lng:-89.7320906},{n:'Grupo 4 (Poste Mitad)',lat:13.7174835,lng:-89.7324413},
{n:'Grupo 5 (Esquina)',lat:13.7177075,lng:-89.7327418},{n:'Grupo 6 (Mitad Poste)',lat:13.7180072,lng:-89.7330556},{n:'Grupo 7 (Altar)',lat:13.7182261,lng:-89.7333399},
{n:'Grupo 8 (Ing. Valle)',lat:13.7185179,lng:-89.7330931},{n:'Grupo 9 (Esquina)',lat:13.718757,lng:-89.7328387},{n:'Grupo 10 (Mitad Poste)',lat:13.719101,lng:-89.7325664},
{n:'Grupo 11 (Esquina y Giro)',lat:13.7194085,lng:-89.7322797},{n:'Grupo 12 (Alfombra de Frutas)',lat:13.7196817,lng:-89.7325776},{n:'Grupo 13 (Última Esquina Poste)',lat:13.7199449,lng:-89.7329021},
{n:'Grupo 14 (Mitad Poste)',lat:13.7202706,lng:-89.7330738},{n:'Grupo 15 (Poste en medio de los árboles)',lat:13.7207135,lng:-89.7331811},{n:'Grupo 16 (Esquina y Giro)',lat:13.7211044,lng:-89.7332414},
{n:'Grupo 17 (C.E República de Haití)',lat:13.7211851,lng:-89.7328611},{n:'Grupo 18 (Poste)',lat:13.7212723,lng:-89.7324564},{n:'Grupo 19 (Parada de Buses 53 D)',lat:13.7213844,lng:-89.7320608},
{n:'Grupo 20 (Poste)',lat:13.7214651,lng:-89.7316925},{n:'Grupo 21 (Esquina)',lat:13.7215705,lng:-89.7313298},{n:'Grupo 1 (Última Poste Mitad)',lat:13.7216541,lng:-89.7309929},
{n:'Grupo 2 (Calle a San Antonio)',lat:13.7217213,lng:-89.7305916},{n:'Grupo 3 (Bazar Juanita García)',lat:13.7217213,lng:-89.7301732},{n:'Grupo 4 (Little Caesars)',lat:13.7216379,lng:-89.7297548},
{n:'Grupo 5 (Importadora Santa Lucía)',lat:13.7214607,lng:-89.7294436},{n:'Grupo 6 (Ex-Casa Enrique)',lat:13.7212315,lng:-89.7291486},{n:'Grupo 7 (Anthonys)',lat:13.7210595,lng:-89.728816},
{n:'Grupo 8 (Bomba)',lat:13.7208302,lng:-89.7284566},{n:'Grupo 9 (Librería San Salvador)',lat:13.7206217,lng:-89.7281253},{n:'Grupo 10 (Banco Agrícola)',lat:13.7203716,lng:-89.7277498},
{n:'Grupo 11 (Entra a Catedral)',lat:13.7206894,lng:-89.7274977},{n:'Grupo 12 (Mitad de Catedral)',lat:13.7205435,lng:-89.7271543}
];

let MART_WP_REF = [
{n:"Iglesia El Ángel",lat:13.7196467,lng:-89.7232526},
{n:"Pizza Cristian",lat:13.7179834,lng:-89.7224636},
{n:"COED Thomas Jefferson",lat:13.7184811,lng:-89.7233434},
{n:"Ermita Veracruz",lat:13.7182351,lng:-89.7291543},
{n:"Hotel Sol y Luna",lat:13.7189961,lng:-89.7302739},
{n:"C.E. Rep. de Haití",lat:13.7211851,lng:-89.7328611},
{n:"Little Caesars",lat:13.7216379,lng:-89.7297548},
{n:"Catedral",lat:13.7205435,lng:-89.7271543},
];

// ========== LOCAL STORAGE ==========
const SAVE_KEY = 'semanaSanta_v47';
function getWPs(){return currentDay===0?LUN_WP_REF:currentDay===1?MART_WP_REF:currentDay===2?MIER_WP_REF:currentDay===3?VIER_WP_REF:currentDay===4?SE_WP_REF:[];}
function saveAll() {
  try {
    savedPositions[currentDay] = positions.map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
    if(positionsW.length>0) savedPositionsW[currentDay] = positionsW.map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
    savedRefs[currentDay] = getWPs().map(w=>({lat:w.lat,lng:w.lng,n:w.n}));
    const data = {
      sp: savedPositions, sr: savedRefs, spw: savedPositionsW,
      sc: daySaca, sh: dayHours, sm: daySacaManual, sd: dayDates, smj: daySacaMuj,
      cfg: {g:+$('cG').value,t:+$('cType').value,mn:+$('cMn').value,color:+($('cColor')?$('cColor').value:0),cortH:VIER_CORTESIAS_CHANGE,cortM:VIER_CORTESIAS_CHANGE_M,cortMin:VIER_CORTESIAS_MIN},
      cd: currentDay,
      ga: liveGrupoData ? {d:currentDay, data:liveGrupoData} : null
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch(e) {}
}
// Separate function to sync positions - only call after actual edits
function syncAndSave(){
  saveAll();
  if(typeof syncPositions==='function') syncPositions();
}
function loadSaved() {
  try {
    let raw = localStorage.getItem(SAVE_KEY);
    if(!raw){
      for(let v=44;v>=13;v--){
        raw=localStorage.getItem('semanaSanta_v'+v);
        if(raw){
          localStorage.setItem(SAVE_KEY,raw);
          localStorage.removeItem('semanaSanta_v'+v);
          break;
        }
      }
    }
    if(!raw) return false;
    const d = JSON.parse(raw);
    // Load saved positions (admin uses these, shared users use KML)
    if(d.sp) savedPositions = d.sp;
    if(d.spw) savedPositionsW = d.spw;
    // Only load refs if user added custom ones
    if(d.sr) savedRefs = d.sr;
    if(d.sc) daySaca = d.sc;
    if(d.sh) dayHours = d.sh;
    if(d.sm) daySacaManual = d.sm;
    if(d.sd) dayDates = d.sd;
    if(d.smj) daySacaMuj = d.smj;
    if(d.cfg){$('cG').value=d.cfg.g||5;$('cType').value=d.cfg.t||21;$('cMn').value=d.cfg.mn||6;if(d.cfg.color!==undefined)$('cColor').value=d.cfg.color;$('colorDiv').style.display=(+$('cType').value===27)?'block':'none';if(d.cfg.cortH)VIER_CORTESIAS_CHANGE=d.cfg.cortH;if(d.cfg.cortM)VIER_CORTESIAS_CHANGE_M=d.cfg.cortM;if(d.cfg.cortMin)VIER_CORTESIAS_MIN=d.cfg.cortMin;}
    // currentDay is now managed by lastViewedDay in localStorage, not saved data
    // Restore grupo actual
    if(d.ga&&d.ga.data&&d.ga.d===currentDay){
      liveGrupoData=d.ga.data;
      currentGrupoActual=d.ga.data.cambio||0;
      if(d.ga.data.desfase!==undefined) virgenDesfase=d.ga.data.desfase;
      if(d.ga.data.movidos!==undefined) virgenMovidos=d.ga.data.movidos;
      if(d.ga.data.sacaMuj) daySacaMuj[currentDay]=d.ga.data.sacaMuj;
      // Validate: cambio can't exceed day's total points
      var dayTotals=[LUN_PTS.length,MART_PTS.length,MIER_PTS.length,VIER_PTS.length];
      var maxForDay=dayTotals[currentDay]||44;
      if(currentGrupoActual>maxForDay+30){currentGrupoActual=0;liveGrupoData=null;}
    }
    if(savedRefs[0]&&savedRefs[0].length){LUN_WP_REF.length=0;savedRefs[0].forEach(r=>LUN_WP_REF.push(r));}
    if(savedRefs[1]&&savedRefs[1].length){MART_WP_REF.length=0;savedRefs[1].forEach(r=>MART_WP_REF.push(r));}
    if(savedRefs[2]&&savedRefs[2].length){MIER_WP_REF.length=0;savedRefs[2].forEach(r=>MIER_WP_REF.push(r));}
    if(savedRefs[3]&&savedRefs[3].length){VIER_WP_REF.length=0;savedRefs[3].forEach(r=>VIER_WP_REF.push(r));}
    if(savedRefs[4]&&savedRefs[4].length){SE_WP_REF.length=0;savedRefs[4].forEach(r=>SE_WP_REF.push(r));}
    return true;
  } catch(e){return false;}
}
async function resetData(){
  if(!await customConfirm('¿Borrar TODO el progreso guardado?')) return;
  localStorage.removeItem(SAVE_KEY);
  savedPositions=[null,null,null,null,null];savedRefs=[null,null,null,null,null];
  location.reload();
}

// Touch guard
let lastMulti = 0;
document.addEventListener('touchstart', e => { if(e.touches.length>1) lastMulti=Date.now(); }, {passive:true});
function isZoom() { return Date.now()-lastMulti<500; }

// ========== URL PARAMS & SHARING ==========
// Default to PUBLIC (shared) — admin status comes from Firebase Auth
let isShared = true;
let isSEMode = false;
let explicitDay = false;
function readParams(){
  const p = new URLSearchParams(window.location.search);
  // Legacy: ?se=1 → day 4 + SE theme
  if(p.has('se')){
    currentDay=4;isSEMode=true;explicitDay=true;
  }
  // Legacy: ?dia=N
  if(p.has('dia')){
    const d=parseInt(p.get('dia'));
    if(d>=0&&d<=4){currentDay=d;explicitDay=true;}
    if(d===4) isSEMode=true;
  }
  // Legacy: ?saca=N sets default group
  if(p.has('saca')) $('cS').value=p.get('saca');
  // Public group picker: shown for everyone except admins (auth flips this later)
  if(isShared){
    var storageKey=isSEMode?'sharedUserSE':'sharedUser';
    const saved=localStorage.getItem(storageKey);
    if(saved){
      const s=JSON.parse(saved);
      sharedPickedType=+s.t||21;
      sharedPickedColor=+s.color||0;
      sharedLastGroup=+s.g||0;
      $('cType').value=s.t;
      $('cG').value=s.g;
      if(s.color!==undefined) $('cColor').value=s.color;
      $('colorDiv').style.display=(+s.t===27)?'block':'none';
      if(isSEMode){
        var isM3=(+s.t===27);
        $('cS').value=isM3?defaultSacaM[4]:defaultSacaH[4];
      }
    } else {
      if(isSEMode){
        var step1El=document.getElementById('step1');
        if(step1El){
          step1El.innerHTML='<div style="font-size:20px;margin-bottom:4px">⚰️</div><div style="font-size:16px;color:#d4af37;font-weight:700;margin-bottom:4px">SANTO ENTIERRO DE CRISTO</div><div style="font-size:12px;color:#ccc;margin-bottom:16px" id="sharedDayLabel"></div><div style="font-size:14px;color:#eee;margin-bottom:14px;font-weight:600">¿Qué cargás?</div><div style="display:flex;gap:12px;justify-content:center"><div onclick="pickType(21)" style="cursor:pointer;flex:1;background:#0a0a0a;border:2px solid #d4af37;border-radius:14px;padding:12px;text-align:center"><img src="se-entierro.jpg" style="width:100%;border-radius:10px;margin-bottom:8px"><div style="font-size:14px;color:#d4af37;font-weight:700">CARGADOR</div><div style="font-size:11px;color:#aaa">22 grupos</div></div><div onclick="pickType(27)" style="cursor:pointer;flex:1;background:#0a0a0a;border:2px solid #d4af37;border-radius:14px;padding:12px;text-align:center"><img src="se-virgen.jpg" style="width:100%;border-radius:10px;margin-bottom:8px"><div style="font-size:14px;color:#d4af37;font-weight:700">CARGADORA</div><div style="font-size:11px;color:#aaa">23 grupos</div></div></div>';
        }
      }
      $('sharedModal').style.display='flex';
      $('sharedDayLabel').textContent=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
    }
  }
  // Apply SE theme if day 4
  if(isSEMode){
    $('hTitle').textContent='⚰️ Santo Entierro';
    $('hTitle').style.color='#d4af37';
    document.body.classList.add('se-mode');
    var opts=$('cType').options;
    for(var oi=0;oi<opts.length;oi++){
      if(opts[oi].value==='21') opts[oi].textContent='Hombres (22 grupos)';
      if(opts[oi].value==='27') opts[oi].textContent='Mujeres (23 grupos)';
    }
    var ds2=document.getElementById('daySelector');
    if(ds2) ds2.value=4;
  }
}

let sharedPickedType=21;
let sharedPickedColor=0;
let sharedLastGroup=0;

function pickType(t){
  sharedPickedType=t;
  $('step1').style.display='none';
  if(t===27){
    $('step2').style.display='block';
  } else {
    showGroupGrid(t);
  }
}

function pickColor(c){
  sharedPickedColor=c;
  $('step2').style.display='none';
  showGroupGrid(sharedPickedType);
}

function showGroupGrid(t){
  $('step3').style.display='block';
  const colores=['🟡','🔴','🔵'];
  var gridCount=isSEMode?(t===27?23:22):t;
  $('step3label').textContent=isSEMode?(t===27?'23 grupos · Virgen Dolorosa':'22 grupos · Santo Entierro'):t===27?'Cargadora '+colores[sharedPickedColor]+' · '+t+' grupos':t+' grupos';
  let h='';
  for(let i=1;i<=gridCount;i++){
    const isLast=(i===sharedLastGroup);
    const goldBg=isSEMode?(isLast?'background:#d4af37;color:#000;border-color:#d4af37':'background:rgba(212,175,55,.15);color:#d4af37;border-color:#8B7355'):'';
    const purpleBg=!isSEMode?(isLast?'background:#7c3aed;color:#fff;border-color:#c084fc':'background:rgba(124,58,237,.15);color:#c084fc;border-color:#7c3aed'):'';
    const bg=isSEMode?goldBg:purpleBg;
    h+='<button onclick="pickGroup('+i+')" style="padding:10px 0;border:1px solid;border-radius:8px;'+bg+';font-size:16px;font-weight:700;cursor:pointer;font-family:inherit">'+i+'</button>';
  }
  $('groupGrid').innerHTML=h;
}

function pickGroup(g){
  $('cType').value=sharedPickedType;
  $('cG').value=g;
  if(sharedPickedType===27) $('cColor').value=sharedPickedColor;
  $('colorDiv').style.display=(sharedPickedType===27)?'block':'none';
  const isM=(sharedPickedType===27);
  $('cS').value=isM?defaultSacaM[currentDay]:defaultSacaH[currentDay];
  localStorage.setItem(isSEMode?'sharedUserSE':'sharedUser',JSON.stringify({t:sharedPickedType,g:g,color:sharedPickedColor}));
  $('sharedModal').style.display='none';
  calc();
}

function reopenGroupSelector(){
  // Reset modal to step 1 (type selection)
  $('step1').style.display='block';
  $('step2').style.display='none';
  $('step3').style.display='none';
  $('sharedDayLabel').textContent=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
  $('sharedModal').style.display='flex';
}

function shareWhatsApp(){
  // Single public link — auto-detects today's day (incl. Santo Entierro)
  const link=window.location.origin+window.location.pathname;
  const isSE=(currentDay===4);
  const msg=(isSE?'⚰️ *Santo Entierro de Cristo · Sonsonate*\n\n':'✝️ *Procesión de Semana Santa · Sonsonate*\n\n')
    +'Rastreo en vivo de la procesión\n'
    +'Abrí el link, elegí tu grupo y mirá tus cargadas:\n'+link;
  if(navigator.share){
    navigator.share({title:isSE?'Santo Entierro · Sonsonate':'Procesión Semana Santa · Sonsonate',text:msg,url:link}).catch(function(){});
  } else {
    window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
  }
}

function showOffSeasonBanner(){
  if(document.getElementById('offSeasonBanner')) return;
  var b=document.createElement('div');
  b.id='offSeasonBanner';
  b.style.cssText='padding:8px 12px;background:rgba(124,58,237,.15);border-bottom:1px solid rgba(124,58,237,.3);text-align:center;font-size:11px;color:#c084fc;line-height:1.4';
  b.innerHTML='📜 Semana Santa terminó. Estás viendo el resultado del último día. Volvé el próximo año.';
  var hdr=document.querySelector('.hdr');
  if(hdr&&hdr.nextSibling) hdr.parentNode.insertBefore(b,hdr.nextSibling);
  else document.body.insertBefore(b,document.body.firstChild);
}

const $ = id => document.getElementById(id);
function _escapeHtml(s){
  return String(s==null?'':s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
}

// Non-blocking alert that replaces the native one. Native browser alerts
// pause the entire JS thread and on PWAs are sometimes suppressed entirely;
// this modal shows the same message without freezing the page.
function customAlert(message){
  var overlay = document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px';
  overlay.innerHTML='<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:20px;max-width:340px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.6);font-family:Georgia,serif"><div id="customAlertMsg" style="color:#eee;font-size:14px;line-height:1.5;margin-bottom:16px;white-space:pre-wrap;word-wrap:break-word"></div><button id="customAlertOK" style="width:100%;padding:10px;background:rgba(124,58,237,.2);border:1px solid #7c3aed;color:#c084fc;font-weight:700;font-size:14px;border-radius:8px;cursor:pointer;font-family:inherit">OK</button></div>';
  document.body.appendChild(overlay);
  overlay.querySelector('#customAlertMsg').textContent = String(message==null?'':message);
  var btn = overlay.querySelector('#customAlertOK');
  var close = function(){ overlay.remove(); document.removeEventListener('keydown', onKey); };
  var onKey = function(e){ if(e.key==='Enter'||e.key==='Escape') close(); };
  btn.addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
  document.addEventListener('keydown', onKey);
  setTimeout(function(){ btn.focus(); }, 0);
}
window.alert = customAlert;

function _customDialog(opts){
  // Shared modal scaffold for confirm/prompt. Returns a Promise.
  return new Promise(function(resolve){
    var overlay = document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px';
    var inputHtml = opts.input ? '<input id="cdInput" type="text" style="width:100%;background:rgba(0,0,0,.4);border:1px solid #666;color:#fff;padding:10px;border-radius:6px;font-size:14px;font-family:inherit;margin-bottom:12px">' : '';
    var okLabel = opts.okLabel || 'OK';
    var cancelLabel = opts.cancelLabel || 'Cancelar';
    overlay.innerHTML =
      '<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:20px;max-width:340px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.6);font-family:Georgia,serif">' +
      '<div id="cdMsg" style="color:#eee;font-size:14px;line-height:1.5;margin-bottom:14px;white-space:pre-wrap;word-wrap:break-word"></div>' +
      inputHtml +
      '<div style="display:flex;gap:8px">' +
      '<button id="cdCancel" style="flex:1;padding:10px;background:none;border:1px solid #666;color:#aaa;font-weight:600;font-size:13px;border-radius:8px;cursor:pointer;font-family:inherit">'+cancelLabel+'</button>' +
      '<button id="cdOK" style="flex:1;padding:10px;background:rgba(124,58,237,.2);border:1px solid #7c3aed;color:#c084fc;font-weight:700;font-size:14px;border-radius:8px;cursor:pointer;font-family:inherit">'+okLabel+'</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#cdMsg').textContent = String(opts.message==null?'':opts.message);
    var input = overlay.querySelector('#cdInput');
    if(input){ input.value = opts.defaultValue || ''; setTimeout(function(){ input.focus(); input.select(); }, 0); }
    else { setTimeout(function(){ overlay.querySelector('#cdOK').focus(); }, 0); }
    var close = function(result){
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };
    var doOK = function(){ close(opts.input ? input.value : true); };
    var doCancel = function(){ close(opts.input ? null : false); };
    var onKey = function(e){
      if(e.key==='Enter'){ e.preventDefault(); doOK(); }
      else if(e.key==='Escape'){ e.preventDefault(); doCancel(); }
    };
    overlay.querySelector('#cdOK').addEventListener('click', doOK);
    overlay.querySelector('#cdCancel').addEventListener('click', doCancel);
    overlay.addEventListener('click', function(e){ if(e.target===overlay) doCancel(); });
    document.addEventListener('keydown', onKey);
  });
}

function customConfirm(message){
  return _customDialog({message: message, input: false, okLabel: 'Sí', cancelLabel: 'No'});
}

function customPrompt(message, defaultValue){
  return _customDialog({message: message, input: true, defaultValue: defaultValue, okLabel: 'OK', cancelLabel: 'Cancelar'});
}

// Centralized error logger for swallowed exceptions. Silent by default; turn on
// in the browser console with `window._debug = true` to surface every catch
// that was previously empty. Useful for diagnosing field issues without
// flooding logs in production.
function _logErr(label, err){
  try{
    if(window._debug || (typeof localStorage!=='undefined' && localStorage.getItem('debug')==='1')){
      console.warn('['+label+']', err);
    }
  }catch(_){/* localStorage unavailable in private mode */}
}
function cfg() {
  var mujGrupos=isSEMode?23:27;
  var st=getStartTime();
  return {g:+$('cG').value||5, t:+$('cType').value||21, s:+$('cS').value||19, h:st.h, hm:st.m, mn:+$('cMn').value||6, color:+($('cColor')?$('cColor').value:0), mujG:mujGrupos};
}
function getMujCount(){return isSEMode?23:27;}
function getHomCount(){return isSEMode?22:21;}
// Default sacas: [lun, mar, mie, vie] per type
const defaultSacaH = [19, 17, 13, 16, 5]; // hombres 21 grupos
const defaultSacaM = [19, 27, 13, 22, 6]; // mujeres 27 grupos
function localDateStr(dt){var y=dt.getFullYear();var m=String(dt.getMonth()+1).padStart(2,'0');var d=String(dt.getDate()).padStart(2,'0');return y+'-'+m+'-'+d;}
function getStartTime(){
  var h=+($('cHour')?$('cHour').value:15);
  var m=+($('cMin')?$('cMin').value:0);
  return{h:h,m:m};
}
function parseTimeStr(v){
  if(typeof v==='number') return{h:v,m:0};
  if(typeof v==='string'&&v.indexOf(':')>=0){var p=v.split(':');return{h:parseInt(p[0])||15,m:parseInt(p[1])||0};}
  return{h:parseInt(v)||15,m:0};
}
function updateStartTime(){
  var st=getStartTime();
  dayHours[currentDay]=String(st.h).padStart(2,'0')+':'+String(st.m).padStart(2,'0');
  calc();
  
  // Only auto-position if this day is TODAY
  var now=new Date();
  var checkDate=new Date(now);
  if(now.getHours()<5) checkDate.setDate(checkDate.getDate()-1);
  var todayStr=localDateStr(checkDate);
  var isToday=(dayDates[currentDay]===todayStr);
  
  if(positions.length>0&&!isShared&&isToday){
    var mn=+$('cMn').value||6;
    var departMs=new Date(dayDates[currentDay]+'T'+String(st.h).padStart(2,'0')+':'+String(st.m).padStart(2,'0')+':00').getTime();
    var elapsed=Date.now()-departMs;
    
    if(elapsed>0){
      var expectedCambio=Math.floor(elapsed/(mn*60000))+1;
      expectedCambio=Math.min(expectedCambio,positions.length);
      expectedCambio=Math.max(1,expectedCambio);
      
      if(expectedCambio!==currentGrupoActual){
        currentGrupoActual=expectedCambio;
        var sacaH=daySaca[currentDay]||16;
        var grp=((sacaH-1+expectedCambio-1)%getHomCount())+1;
        var nombre=(expectedCambio<=changes.length&&changes[expectedCambio-1])?changes[expectedCambio-1].n||'':'';
        // Set timestamp to the calculated time for this cambio (not Date.now)
        var correctTs=departMs+(expectedCambio-1)*mn*60000;
        liveGrupoData={cambio:expectedCambio,grp:grp,nombre:nombre,tot:positions.length,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:correctTs,autoSet:true};
        try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
        saveAll();
        db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
      }
      window._autoTimeOffset=0;
      if(typeof syncAutoState==='function') syncAutoState();
    } else {
      currentGrupoActual=0;
      liveGrupoData={cambio:0,grp:0,nombre:'',tot:positions.length,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
      db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
      window._autoTimeOffset=0;
      if(typeof syncAutoState==='function') syncAutoState();
    }
  }
  
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  if(window._autoTimeRunning) autoTimeStep();
  forceAndaPosition();
}
function updateRhythm(){
  calc();
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  if(window._autoTimeRunning) autoTimeStep();
  forceAndaPosition();
}
function forceAndaPosition(){
  if(!positions.length) return;
  if(Date.now()-window._lastRealGPS<GPS_TIMEOUT) return;
  var _stF=getStartTime();
  var mn=window._realRhythm||(+$('cMn').value)||6;
  var dateStr=dayDates[currentDay]||localDateStr(new Date());
  var startTime=new Date(dateStr+'T'+String(_stF.h).padStart(2,'0')+':'+String(_stF.m).padStart(2,'0')+':00').getTime();
  var now=Date.now()+(window._autoTimeOffset*60000);
  var elapsed=now-startTime;
  if(elapsed<0) return;
  var mnMs=mn*60000;
  var exactPos=elapsed/mnMs;
  var camb=Math.floor(exactPos)+1;
  var frac=exactPos-Math.floor(exactPos);
  camb=Math.min(camb,positions.length);
  camb=Math.max(1,camb);
  // Interpolate Jesus
  var idxA=Math.min(camb-1,positions.length-1);
  var idxB=Math.min(camb,positions.length-1);
  var ptA=positions[idxA],ptB=positions[idxB];
  var jLat=ptA.lat+(ptB.lat-ptA.lat)*frac;
  var jLng=ptA.lng+(ptB.lng-ptA.lng)*frac;
  db.ref('jesus').set({lat:jLat,lng:jLng,t:Date.now()});
  // Interpolate Virgen
  var vRoute=(positionsW.length>=2)?positionsW:positions;
  var vExact=Math.max(0,exactPos-virgenDesfase);
  var vC=Math.floor(vExact);
  var vF=vExact-vC;
  var vA=Math.min(vC,vRoute.length-1);
  var vB=Math.min(vC+1,vRoute.length-1);
  var vLat=vRoute[vA].lat+(vRoute[vB].lat-vRoute[vA].lat)*vF;
  var vLng=vRoute[vA].lng+(vRoute[vB].lng-vRoute[vA].lng)*vF;
  db.ref('virgen').set({lat:vLat,lng:vLng,t:Date.now()});
}
function setStartTimeUI(h,m){
  if($('cHour')) $('cHour').value=h;
  if($('cMin')){
    // Snap to nearest 5
    var snapped=Math.round(m/5)*5;if(snapped>=60)snapped=55;
    $('cMin').value=snapped;
  }
}
function changeDayDate(val){
  dayDates[currentDay]=val;
  // Auto-fill using Semana Santa intervals
  // Gaps: Lun→Mar:1, Mar→Mie:1, Mie→Vie:2 (skip Jueves), Vie→SE:0
  var gaps=[0,1,1,2,0]; // gap FROM previous day TO this day
  var d=new Date(val+'T12:00:00');
  for(var i=currentDay-1;i>=0;i--){
    d.setDate(d.getDate()-gaps[i+1]);
    dayDates[i]=localDateStr(d);
  }
  d=new Date(val+'T12:00:00');
  for(var j=currentDay+1;j<dayDates.length;j++){
    d.setDate(d.getDate()+gaps[j]);
    dayDates[j]=localDateStr(d);
    d=new Date(dayDates[j]+'T12:00:00');
  }
  // Auto-calculate sacas: each day's saca = previous day's last group + 1
  for(var k=1;k<5;k++){
    if(k===4) continue;
    var prevLast=getLastGroup(k-1);
    if(prevLast>0){
      var isM=(+$('cType').value===27);
      var grpCount=isM?getMujCount():getHomCount();
      var nextSaca=(prevLast%grpCount)+1;
      if(isM){daySacaMuj[k]=nextSaca;}
      else{daySaca[k]=nextSaca;}
    }
  }
  // Auto-complete past days in Firebase
  var now=new Date();
  for(var p=0;p<dayDates.length;p++){
    var ddPast=isDayPast(p);
    if(ddPast&&p!==currentDay){
      var dayPts=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
      var pts=dayPts[p]||[];
      var totP=savedPositions[p]?savedPositions[p].length:pts.length;
      if(totP>0){
        var sacaP=daySaca[p]||17;
        var lastGrpP=((sacaP-1+totP-1)%getHomCount())+1;
        var pastData={cambio:totP,grp:lastGrpP,nombre:'',tot:totP,desfase:0,movidos:0,sacaMuj:daySacaMuj[p]||22,t:Date.now()};
        db.ref('grupoActual/day'+p).set(pastData);
      }
    }
  }
  detectToday();
  // Reset avance for current day
  currentGrupoActual=0;
  liveGrupoData={cambio:0,grp:0,nombre:'',tot:positions.length||44,desfase:0,movidos:0,sacaMuj:daySacaMuj[currentDay]||6,t:Date.now()};
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  var bc2=document.getElementById('bannersContainer');if(bc2) bc2.innerHTML='';
  // Update UI
  var isM2=(+$('cType').value===27);
  $('cS').value=isM2?daySacaMuj[currentDay]:daySaca[currentDay];
  if($('cDate')) $('cDate').value=dayDates[currentDay];
  calc();
  renderLive();
  updateBanners();
  saveAll();
  syncConfig();
}
function openCfg(){
  $('cfgP').style.display='block';
  $('cfgOverlay').style.display='block';
  // Show cortesias config only for Viernes
  var cc=document.getElementById('cortesiasConfig');
  if(cc) cc.style.display=(currentDay===3)?'block':'none';
  if(cc&&currentDay===3){
    var ch=document.getElementById('cortCambioH');if(ch) ch.value=VIER_CORTESIAS_CHANGE;
    var cm=document.getElementById('cortCambioM');if(cm) cm.value=VIER_CORTESIAS_CHANGE_M;
    var cmin=document.getElementById('cortMinutos');if(cmin) cmin.value=VIER_CORTESIAS_MIN;
  }
  updateAdminLiveControls();
}
function closeCfg(){
  $('cfgP').style.display='none';
  $('cfgOverlay').style.display='none';
}
function updateAdminLiveControls(){
  var el=$('adminLiveControls');
  if(!el||isShared) return;
  var h='';
  // Grupo actual +/-
  var sacaDef=daySaca[currentDay]||16;
  var adminGText='#'+sacaDef;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    var adminTot=positions.length||changes.length;
    if(liveGrupoData.cambio>adminTot){adminGText='✅#'+(((sacaDef-1+adminTot-1)%getHomCount())+1);}
    else{adminGText='#'+(((sacaDef-1+liveGrupoData.cambio-1)%getHomCount())+1);}
  }
  h+='<div style="display:flex;gap:6px;margin-bottom:8px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#aaa">'+(isSEMode?'SE:':'Jesús:')+'</span>';
  h+='<button onclick="advanceGrupo(-1);updateAdminLiveControls()" style="padding:8px 16px;border:1px solid #666;border-radius:8px;background:rgba(255,255,255,.05);color:#ccc;font-size:18px;font-weight:700;cursor:pointer">−</button>';
  h+='<span onclick="setGrupoManual();updateAdminLiveControls()" style="font-size:22px;font-weight:700;color:#c084fc;min-width:50px;text-align:center;cursor:pointer;text-decoration:underline">'+adminGText+'</span>';
  h+='<button onclick="advanceGrupo(1);updateAdminLiveControls()" style="padding:8px 16px;border:1px solid #7c3aed;border-radius:8px;background:rgba(124,58,237,.3);color:#c084fc;font-size:18px;font-weight:700;cursor:pointer">+</button>';
  h+='</div>';
  // GPS + Auto toggles
  h+='<div style="display:flex;gap:6px;margin-bottom:8px;justify-content:center">';
  h+='<button onclick="autoAdvanceGPS=!autoAdvanceGPS;updateAdminLiveControls();if(typeof renderLive===\'function\')renderLive();" style="flex:1;padding:8px;border:1px solid '+(autoAdvanceGPS?'#4CAF50':'#666')+';border-radius:8px;background:'+(autoAdvanceGPS?'rgba(76,175,80,.15)':'rgba(255,255,255,.05)')+';color:'+(autoAdvanceGPS?'#4CAF50':'#888')+';font-size:13px;cursor:pointer;font-family:inherit">'+(autoAdvanceGPS?'📡 GPS: ON':'📡 GPS: OFF')+'</button>';
  var autoLabel=window._autoTimeRunning?(window._autoRemote?'⏱ Auto: ON 📡':'⏱ Auto: ON'):'⏱ Auto: OFF';
  h+='<button onclick="toggleAutoTime();updateAdminLiveControls();" style="flex:1;padding:8px;border:1px solid '+(window._autoTimeRunning?'#f44336':'#666')+';border-radius:8px;background:'+(window._autoTimeRunning?'rgba(244,67,54,.15)':'rgba(255,255,255,.05)')+';color:'+(window._autoTimeRunning?'#f44336':'#888')+';font-size:13px;cursor:pointer;font-family:inherit">'+autoLabel+'</button>';
  h+='</div>';
  // Ritmo offset
  if(window._autoTimeRunning){
    h+='<div style="display:flex;gap:6px;margin-bottom:8px;align-items:center;justify-content:center">';
    h+='<span style="font-size:12px;color:#f44336">Ritmo:</span>';
    h+='<button onclick="adjustAutoTime(-5);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:14px;cursor:pointer">-5m</button>';
    h+='<button onclick="adjustAutoTime(-1);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:14px;cursor:pointer">-1m</button>';
    h+='<span style="font-size:14px;font-weight:700;color:#f44336;min-width:40px;text-align:center">'+(window._autoTimeOffset>0?'+':'')+window._autoTimeOffset+'m</span>';
    h+='<button onclick="adjustAutoTime(1);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #f44336;border-radius:6px;background:rgba(244,67,54,.15);color:#f44336;font-size:14px;cursor:pointer">+1m</button>';
    h+='<button onclick="adjustAutoTime(5);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #f44336;border-radius:6px;background:rgba(244,67,54,.15);color:#f44336;font-size:14px;cursor:pointer">+5m</button>';
    h+='</div>';
  }
  // Show real rhythm from GPS (info only)
  if(window._realRhythm){
    h+='<div style="text-align:center;margin-bottom:6px;padding:4px;background:rgba(76,175,80,.08);border-radius:6px;font-size:12px;color:#4CAF50">📡 Ritmo real GPS: <b>'+window._realRhythm+' min/cambio</b> (config: '+($('cMn').value||6)+' min)</div>';
  }
  // Desfase Virgen
  h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#93c5fd">Desfase Virgen:</span>';
  h+='<button onclick="changeDesfase(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
  h+='<span style="font-size:18px;font-weight:700;color:#93c5fd;min-width:30px;text-align:center">'+virgenDesfase+'</span>';
  h+='<button onclick="changeDesfase(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #3b82f6;border-radius:6px;background:rgba(59,130,246,.2);color:#93c5fd;font-size:16px;cursor:pointer">+</button>';
  h+='</div>';
  // Movidos Virgen
  h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#f59e0b">Movidos Virgen:</span>';
  h+='<button onclick="changeMovidos(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
  h+='<span style="font-size:18px;font-weight:700;color:#f59e0b;min-width:30px;text-align:center">'+(virgenMovidos>0?'+':'')+virgenMovidos+'</span>';
  h+='<button onclick="changeMovidos(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #f59e0b;border-radius:6px;background:rgba(245,158,11,.2);color:#f59e0b;font-size:16px;cursor:pointer">+</button>';
  h+='</div>';
  // Virgen own rhythm - only when she has her own route
  if(positionsW.length>=2){
    var vMnDisplay=virgenMn||+$('cMn').value||6;
    h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#3b82f6">Ritmo Virgen:</span>';
    h+='<button onclick="changeVirgenMn(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#3b82f6;min-width:40px;text-align:center">'+vMnDisplay+'</span>';
    h+='<button onclick="changeVirgenMn(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #3b82f6;border-radius:6px;background:rgba(59,130,246,.2);color:#93c5fd;font-size:16px;cursor:pointer">+</button>';
    h+='<span style="font-size:10px;color:#888">min</span>';
    h+='</div>';
  }
  // Cortesías config (only Viernes)
  if(currentDay===3){
    var isMujC=(+$('cType').value===27);
    var cortV=isMujC?VIER_CORTESIAS_CHANGE_M:VIER_CORTESIAS_CHANGE;
    h+='<div style="border-top:1px solid rgba(255,152,0,.2);padding-top:6px;margin-top:6px">';
    h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#ff9800">✝️ Cortesías cambio:</span>';
    h+='<button onclick="changeCortesias(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#ff9800;min-width:30px;text-align:center">'+cortV+'</span>';
    h+='<button onclick="changeCortesias(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #ff9800;border-radius:6px;background:rgba(255,152,0,.2);color:#ff9800;font-size:16px;cursor:pointer">+</button>';
    h+='</div>';
    h+='<div style="display:flex;gap:6px;margin-bottom:4px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#ff9800">⏸️ Pausa:</span>';
    h+='<button onclick="VIER_CORTESIAS_MIN=Math.max(5,VIER_CORTESIAS_MIN-5);calc();renderLive();updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#ff9800;min-width:40px;text-align:center">'+VIER_CORTESIAS_MIN+'</span>';
    h+='<button onclick="VIER_CORTESIAS_MIN=Math.min(90,VIER_CORTESIAS_MIN+5);calc();renderLive();updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #ff9800;border-radius:6px;background:rgba(255,152,0,.2);color:#ff9800;font-size:16px;cursor:pointer">+</button>';
    h+='<span style="font-size:10px;color:#888">min</span>';
    h+='</div>';
    h+='</div>';
  }
  el.innerHTML=h;
}
function changeCortesias(delta){
  var isMujC=(+$('cType').value===27);
  if(isMujC){
    VIER_CORTESIAS_CHANGE_M=Math.max(1,Math.min(100,VIER_CORTESIAS_CHANGE_M+delta));
  } else {
    VIER_CORTESIAS_CHANGE=Math.max(1,Math.min(100,VIER_CORTESIAS_CHANGE+delta));
  }
  calc();
  if(typeof renderLive==='function') renderLive();
}
function onTypeChange(){
  $('colorDiv').style.display=(+$('cType').value===27)?'block':'none';
  const isM=(+$('cType').value===27);
  $('cS').value=isM?(daySacaMuj[currentDay]||defaultSacaM[currentDay]):(daySaca[currentDay]||defaultSacaH[currentDay]);
  calc();
}
function fmt(min) {
  let h=Math.floor(min/60), m=Math.round(min%60);
  if(m===60){h++;m=0;}
  // Normalize to 0-23 range (handles past midnight)
  h=h%24;if(h<0)h+=24;
  var ampm=h>=12?'PM':'AM';
  var h12=h%12;if(h12===0)h12=12;
  return h12+':'+String(m).padStart(2,'0')+' '+ampm;
}
function hd(a,b){const R=6371000,d1=(b.lat-a.lat)*Math.PI/180,d2=(b.lng-a.lng)*Math.PI/180;const x=Math.sin(d1/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(d2/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
function placeAlong(path,intv){const r=[];if(path.length<2)return r;let a=0;for(let i=1;i<path.length;i++){const p=path[i-1],q=path[i],s=hd(p,q);if(s<.1)continue;let u=0;while(a+(s-u)>=intv){const ad=intv-a;u+=ad;const f=u/s;r.push({lat:p.lat+(q.lat-p.lat)*f,lng:p.lng+(q.lng-p.lng)*f});a=0;}a+=(s-u);}return r;}

// ========== INIT ==========
function initMap() {
  gmap = new google.maps.Map($('map'), {
    center:{lat:13.721,lng:-89.726}, zoom:15,
    mapTypeControl:false, streetViewControl:false, fullscreenControl:false,
    gestureHandling:'greedy',
    minZoom:15, maxZoom:21,
    restriction:{
      latLngBounds:{north:13.732,south:13.714,east:-89.718,west:-89.735},
      strictBounds:true
    },
    styles:[]
  });
  infoWin = new google.maps.InfoWindow();
  // Re-render markers on zoom change (show/hide others based on zoom)
  let zoomTimer=null;
  gmap.addListener('idle',function(){
    clearTimeout(zoomTimer);
    zoomTimer=setTimeout(function(){renderMarkers();},800);
  });
  const hasSaved = loadSaved();
  readParams();
  // Auto-detect today's day for everyone (skipped only if URL forced a day)
  if(!explicitDay){
    const todayIdx = detectToday();
    if(todayIdx>=0){
      currentDay = todayIdx;
      if(currentDay===4) isSEMode=true;
    } else {
      // Off-season — fall back to last viewed day and show a banner
      var lastDay=+(localStorage.getItem('lastViewedDay')||0);
      if(lastDay>=0&&lastDay<=4) currentDay=lastDay;
      if(currentDay===4) isSEMode=true;
      try{ showOffSeasonBanner(); }catch(e){_logErr("swallow",e);}
    }
  }
  // Apply admin/public UI based on current auth state
  applyAuthMode();
  // Restore day tabs and dropdown
  document.querySelectorAll('.day').forEach((b,i)=>b.classList.toggle('a',i===currentDay));
  var dsInit=document.getElementById('daySelector');
  if(dsInit) dsInit.value=currentDay;
  // Apply SE theme if needed
  if(currentDay===4){
    isSEMode=true;
    $('hTitle').textContent='⚰️ Santo Entierro';
    $('hTitle').style.color='#d4af37';
    document.body.classList.add('se-mode');
    var optsInit=$('cType').options;
    for(var oii=0;oii<optsInit.length;oii++){
      if(optsInit[oii].value==='21') optsInit[oii].textContent='Hombres (22 grupos)';
      if(optsInit[oii].value==='27') optsInit[oii].textContent='Mujeres (23 grupos)';
    }
  }
  $('cS').value = (+$('cType').value===27)?daySacaMuj[currentDay]:daySaca[currentDay];
  var _st1=parseTimeStr(dayHours[currentDay]);setStartTimeUI(_st1.h,_st1.m);
  if($('cDate')) $('cDate').value=dayDates[currentDay]||'';

  window.currentDay=currentDay;
  loadDay(currentDay);
  setTimeout(function(){restoreMapView();},1000);
  window._mapReady=true;
  // Show urna button only for admin (after isShared is set)
  if(typeof showUrnaButton==='function') showUrnaButton();
  if(typeof showAdminTools==='function') showAdminTools();
  if(typeof startDayListeners==='function') startDayListeners();
  // Editor: push dates to Firebase so shared users can detect today
  if(!isShared){
    setTimeout(function(){
      db.ref('config/dates').set(dayDates);
      syncConfig();
    },2000);
  }
  // Shared: fetch dates from Firebase FIRST, then detect today and switch
  if(isShared){
    db.ref('config/dates').once('value',function(snap){
      var dd=snap.val();
      if(dd&&Array.isArray(dd)){
        for(var ddi=0;ddi<dd.length;ddi++){if(dd[ddi]) dayDates[ddi]=dd[ddi];}
        var todayD=detectToday();
        if(todayD>=0&&todayD!==currentDay){
          switchDay(todayD);
        }
      }
    });
    // Also keep listening for future changes
    db.ref('config/dates').on('value',function(snap){
      var dd=snap.val();
      if(!dd||!Array.isArray(dd)) return;
      for(var ddi=0;ddi<dd.length;ddi++){if(dd[ddi]) dayDates[ddi]=dd[ddi];}
      var todayD=detectToday();
      if(todayD>=0&&todayD!==currentDay) switchDay(todayD);
    });
  }
  // Ensure grupo actual displays after everything loads
  if(typeof updateGrupoUI==='function') setTimeout(updateGrupoUI,500);
  // Auto-start if today is procession day and near departure (editor only)
  if(!isShared) setTimeout(function(){if(typeof startAutoIfNeeded==='function')startAutoIfNeeded();},3000);
}

// ========== DAY SWITCHING ==========
function getLastGroup(day){
  // Calculate which group "enters" (last change) for a given day
  const s=daySaca[day]||19;
  const t=+$('cType').value||21;
  const pts=day===0?LUN_PTS:day===1?MART_PTS:day===2?MIER_PTS:day===3?VIER_PTS:day===4?SE_PTS:[];
  const tot=pts.length;
  if(tot===0) return s;
  return ((s-1+tot-1)%t)+1;
}

function switchDay(d) {
  // Save current day's state
  if(+$('cType').value===27){
    daySacaMuj[currentDay]=+$('cS').value||13;
  } else {
    daySaca[currentDay]=+$('cS').value||19;
  }
  var _st3=getStartTime();dayHours[currentDay]=String(_st3.h).padStart(2,'0')+':'+String(_st3.m).padStart(2,'0');
  saveAll();

  // Stop auto timer before switching day
  if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
  window._autoTimeRunning=false;
  window._autoTimeOffset=0;

  // Auto-calculate saca for the new day if not manually set
  if(d>0 && !daySacaManual[d]){
    const prevDay=d-1;
    const lastGrp=getLastGroup(prevDay);
    const t=+$('cType').value||21;
    daySaca[d]=((lastGrp)%t)+1;
  }

  currentDay = d;
  window.currentDay=d;
  try{localStorage.setItem('lastViewedDay',d);}catch(e){_logErr("swallow",e);}
  isSEMode=(d===4);
  document.querySelectorAll('.day').forEach((b,i) => b.classList.toggle('a',i===d));
  var ds=document.getElementById('daySelector');
  if(ds) ds.value=d;

  // Apply/remove SE theme
  if(isSEMode){
    $('hTitle').textContent='⚰️ Santo Entierro';
    $('hTitle').style.color='#d4af37';
    document.body.classList.add('se-mode');
    // Update group count labels
    var opts=$('cType').options;
    for(var oi=0;oi<opts.length;oi++){
      if(opts[oi].value==='21') opts[oi].textContent='Hombres (22 grupos)';
      if(opts[oi].value==='27') opts[oi].textContent='Mujeres (23 grupos)';
    }
  } else {
    document.body.classList.remove('se-mode');
    var opts2=$('cType').options;
    for(var oi2=0;oi2<opts2.length;oi2++){
      if(opts2[oi2].value==='21') opts2[oi2].textContent='Hombres (21 grupos)';
      if(opts2[oi2].value==='27') opts2[oi2].textContent='Mujeres (27 grupos)';
    }
  }

  // Restore config for this day
  var isM=(+$('cType').value===27);
  $('cS').value = isM?daySacaMuj[d]:daySaca[d];
  var _st2=parseTimeStr(dayHours[d]);setStartTimeUI(_st2.h,_st2.m);
  if($('cDate')) $('cDate').value=dayDates[d]||'';

  // Save map view if locked before switching
  if(mapLocked[currentDay]){
    mapSavedView[currentDay]={lat:gmap.getCenter().lat(),lng:gmap.getCenter().lng(),zoom:gmap.getZoom()};
  }

  // Reset grupo actual for new day BEFORE loading
  currentGrupoActual=0;
  liveGrupoData=null;
  var bc=document.getElementById('bannersContainer');if(bc) bc.innerHTML='';
  // If this day is TODAY, clear stale completed data from Firebase
  var nowDate=localDateStr(new Date());
  if(dayDates[d]===nowDate){
    // Clear any stale completed data
    try{localStorage.removeItem('grupoActual_day'+d);}catch(e){_logErr("swallow",e);}
    db.ref('grupoActual/day'+d).once('value',function(snap){
      var gd=snap.val();
      if(gd&&gd.cambio>0&&gd.cambio>=(positions.length||44)){
        // Stale completed data - reset
        var resetData={cambio:0,grp:0,nombre:'',tot:positions.length||44,desfase:0,movidos:0,sacaMuj:daySacaMuj[d]||22,t:Date.now()};
        db.ref('grupoActual/day'+d).set(resetData);
        currentGrupoActual=0;
        liveGrupoData=resetData;
        if(typeof renderLive==='function') renderLive();
        updateBanners();
      }
    });
  }
  loadDay(d);
  // Restore saved map view if locked
  restoreMapView();
  if(typeof stopDayListeners==='function') stopDayListeners();
  if(typeof startDayListeners==='function') startDayListeners();
  if(typeof populateAlertSelects==='function') populateAlertSelects();
  setTimeout(function(){
    if(typeof renderLive==='function') renderLive();
    updateBanners();
  },500);
}

function loadDay(d) {
  // Clear map
  allMarkers.forEach(m=>m.setMap(null));
  wpMarkers.forEach(m=>m.setMap(null));
  wMarkers.forEach(function(m){m.setMap(null);});
  allMarkers=[]; wpMarkers=[]; wMarkers=[];
  if(routeLine){routeLine.setMap(null);routeLine=null;}
  if(routeClickLine){routeClickLine.setMap(null);routeClickLine=null;}
  if(routeLineW){routeLineW.setMap(null);routeLineW=null;}
  if(routeClickLineW){routeClickLineW.setMap(null);routeClickLineW=null;}
  $('noti').classList.remove('show');
  editingWomen=false;
  var bw=document.getElementById('bRouteW');
  if(bw){bw.textContent='🔵 Ruta mujeres';bw.style.background='rgba(0,0,0,.6)';}

  // Admin: load saved edits if available. Shared: always KML
  const dayPts=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
  if(!isShared && savedPositions[d] && savedPositions[d].length>0){
    positions = savedPositions[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
  } else if(dayPts[d] && dayPts[d].length>0){
    positions = dayPts[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n}));
  } else {
    positions = [];
  }
  // Load women's positions
  if(savedPositionsW[d] && savedPositionsW[d].length>0){
    positionsW = savedPositionsW[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
  } else {
    positionsW = [];
  }
  if(positions.length>0){
    drawRouteLine();
    calc();
    fitBounds();
  }
}

// ========== MIÉRCOLES: draw polyline through exact points ==========
var routeClickLineW=null;
function drawRouteLine() {
  // Men's route (purple)
  var path = positions.map(function(p){return{lat:p.lat,lng:p.lng};});
  if(routeLine){
    routeLine.setPath(path);
    routeLine.setOptions({strokeOpacity:editingWomen?.4:.8,strokeWeight:editingWomen?3:5});
  } else {
    routeLine = new google.maps.Polyline({path:path, map:gmap, strokeColor:'#9333ea', strokeWeight:editingWomen?3:5, strokeOpacity:editingWomen?.4:.8, zIndex:1});
  }
  // Men's click line
  if(!editingWomen){
    if(routeClickLine){
      routeClickLine.setPath(path);
      routeClickLine.setMap(gmap);
    } else {
      routeClickLine = new google.maps.Polyline({path:path, map:gmap, strokeColor:'#9333ea', strokeWeight:25, strokeOpacity:0.01, zIndex:2});
      routeClickLine.addListener('click', function(e){
        if(isZoom()||!editMode) return;
        insertAtPosition(e.latLng.lat(), e.latLng.lng(), e.edge);
      });
    }
  } else if(routeClickLine){
    routeClickLine.setMap(null);
  }
  // Women's route (blue)
  if(positionsW.length>=2){
    var pathW=positionsW.map(function(p){return{lat:p.lat,lng:p.lng};});
    if(routeLineW){
      routeLineW.setPath(pathW);
      routeLineW.setOptions({strokeOpacity:editingWomen?.9:.6,strokeWeight:editingWomen?5:3,zIndex:editingWomen?3:0});
    } else {
      routeLineW=new google.maps.Polyline({path:pathW, map:gmap, strokeColor:'#3b82f6', strokeWeight:editingWomen?5:3, strokeOpacity:editingWomen?.9:.6, zIndex:editingWomen?3:0});
    }
    if(editingWomen){
      if(routeClickLineW){
        routeClickLineW.setPath(pathW);
        routeClickLineW.setMap(gmap);
      } else {
        routeClickLineW=new google.maps.Polyline({path:pathW, map:gmap, strokeColor:'#3b82f6', strokeWeight:25, strokeOpacity:0.01, zIndex:4});
        routeClickLineW.addListener('click', function(e){
          if(isZoom()||!editMode) return;
          insertAtPositionW(e.latLng.lat(), e.latLng.lng(), e.edge);
        });
      }
    } else if(routeClickLineW){
      routeClickLineW.setMap(null);
    }
  } else {
    if(routeLineW){routeLineW.setMap(null);routeLineW=null;}
    if(routeClickLineW){routeClickLineW.setMap(null);routeClickLineW=null;}
  }
}

var mapLocked=[false,false,false,false,false];
var mapSavedView=[null,null,null,null,null];
function fitBounds() {
  if(mapLocked[currentDay]) return;
  if(positions.length<2) return;
  const b = new google.maps.LatLngBounds();
  positions.forEach(p=>b.extend(p));
  gmap.fitBounds(b,{top:80,bottom:80,left:20,right:20});
}
function toggleMapLock(){
  if(mapLocked[currentDay]){
    // Unlock: remove restrictions
    mapLocked[currentDay]=false;
    mapSavedView[currentDay]=null;
    gmap.setOptions({restriction:null,maxZoom:21});
  } else {
    // Lock: save current view and restrict
    var center=gmap.getCenter();
    var zoom=gmap.getZoom();
    var bounds=gmap.getBounds();
    mapLocked[currentDay]=true;
    mapSavedView[currentDay]={lat:center.lat(),lng:center.lng(),zoom:zoom,bounds:{north:bounds.getNorthEast().lat(),south:bounds.getSouthWest().lat(),east:bounds.getNorthEast().lng(),west:bounds.getSouthWest().lng()}};
    // Expand bounds slightly so user can pan a little
    var latPad=(bounds.getNorthEast().lat()-bounds.getSouthWest().lat())*0.3;
    var lngPad=(bounds.getNorthEast().lng()-bounds.getSouthWest().lng())*0.3;
    gmap.setOptions({
      restriction:{latLngBounds:{north:bounds.getNorthEast().lat()+latPad,south:bounds.getSouthWest().lat()-latPad,east:bounds.getNorthEast().lng()+lngPad,west:bounds.getSouthWest().lng()-lngPad},strictBounds:true},
      maxZoom:21,
      minZoom:zoom
    });
  }
  var btn=document.getElementById('mapLockBtn');
  if(btn){
    btn.textContent=mapLocked[currentDay]?'🔒 Mapa fijo':'🔓 Mapa libre';
    btn.style.background=mapLocked[currentDay]?'rgba(76,175,80,.85)':'rgba(0,0,0,.6)';
  }
  try{localStorage.setItem('mapLocks',JSON.stringify({l:mapLocked,v:mapSavedView}));}catch(e){_logErr("swallow",e);}
  if(typeof syncConfig==='function') syncConfig();
}
function restoreMapView(){
  var sv=mapSavedView[currentDay];
  if(sv&&mapLocked[currentDay]){
    gmap.setCenter({lat:sv.lat,lng:sv.lng});
    gmap.setZoom(sv.zoom);
    var latPad=(sv.bounds.north-sv.bounds.south)*0.3;
    var lngPad=(sv.bounds.east-sv.bounds.west)*0.3;
    gmap.setOptions({
      restriction:{latLngBounds:{north:sv.bounds.north+latPad,south:sv.bounds.south-latPad,east:sv.bounds.east+lngPad,west:sv.bounds.west-lngPad},strictBounds:true},
      maxZoom:21,
      minZoom:sv.zoom
    });
  } else {
    gmap.setOptions({restriction:null,maxZoom:21,minZoom:null});
  }
  var btn=document.getElementById('mapLockBtn');
  if(btn){
    btn.textContent=mapLocked[currentDay]?'🔒 Mapa fijo':'🔓 Mapa libre';
    btn.style.background=mapLocked[currentDay]?'rgba(76,175,80,.85)':'rgba(0,0,0,.6)';
  }
}
// Load saved locks
try{var ml=JSON.parse(localStorage.getItem('mapLocks')||'{}');if(ml.l)mapLocked=ml.l;if(ml.v)mapSavedView=ml.v;}catch(e){_logErr("swallow",e);}

// ========== INSERT CHANGE (tap on route line) ==========
function insertAtPosition(lat,lng,edge) {
  if(!editMode||isShared) return;
  if(positions.length<2) return;

  // Google Maps gives us the edge (segment) index that was clicked
  // edge = index of segment between positions[edge] and positions[edge+1]
  let insertIdx;
  if(typeof edge==='number' && edge>=0 && edge<positions.length){
    insertIdx=edge+1; // insert after the start of the clicked segment
  } else {
    // Fallback: find closest segment
    let bestSeg=0, bestD=Infinity;
    for(let i=0;i<positions.length-1;i++){
      const d=distToSegment({lat,lng},positions[i],positions[i+1]);
      if(d<bestD){bestD=d;bestSeg=i;}
    }
    insertIdx=bestSeg+1;
  }

  pushMapHistory();
  positions.splice(insertIdx,0,{lat,lng,n:''});

  drawRouteLine();
  calc();
  if(typeof syncPositions==='function') syncPositions();

  const c=cfg();
  const grp=((c.s-1+insertIdx)%((c.t===27)?getMujCount():getHomCount()))+1;
  const num=insertIdx+1;
  infoWin.setContent('<div style="text-align:center;font-family:Georgia;color:#111;font-size:13px"><b style="color:#2e7d32;font-size:15px">✅ Cambio #'+num+'</b><br>Grupo <b>#'+grp+'</b><br><span style="font-size:11px;color:#777">Secuencia actualizada</span></div>');
  infoWin.setPosition({lat,lng});
  infoWin.open(gmap);
  setTimeout(()=>infoWin.close(),2500);
}

// Distance from point p to line segment a→b
function distToSegment(p,a,b){
  const dx=b.lng-a.lng, dy=b.lat-a.lat;
  const len2=dx*dx+dy*dy;
  if(len2===0) return hd(p,a);
  let t=((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/len2;
  t=Math.max(0,Math.min(1,t));
  const proj={lat:a.lat+t*dy, lng:a.lng+t*dx};
  return hd(p,proj);
}

// ========== WOMEN'S ROUTE ==========
var mapHistory=[];
var mapHistoryW=[];

function pushMapHistory(){
  mapHistory.push(positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};}));
  if(mapHistory.length>20) mapHistory.shift();
}
function pushMapHistoryW(){
  mapHistoryW.push(positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};}));
  if(mapHistoryW.length>20) mapHistoryW.shift();
}

function undoMapEdit(){
  if(editingWomen){
    if(mapHistoryW.length===0){alert('No hay cambios para deshacer');return;}
    positionsW=mapHistoryW.pop();
    drawRouteLine();
    renderMarkersW();
    syncPositionsW();
  } else {
    if(mapHistory.length===0){alert('No hay cambios para deshacer');return;}
    positions=mapHistory.pop();
    drawRouteLine();
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
    calc();
    if(typeof syncPositions==='function') syncPositions();
  }
}

function toggleEditWomen(){
  editingWomen=!editingWomen;
  var btn=document.getElementById('bRouteW');
  if(btn){
    btn.textContent=editingWomen?'🔵 Editando mujeres':'🔵 Ruta mujeres';
    btn.style.background=editingWomen?'rgba(59,130,246,.85)':'rgba(0,0,0,.6)';
  }
  if(editingWomen&&positionsW.length===0){
    // Copy men's route as starting point
    positionsW=positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    syncPositionsW();
  }
  // Redraw lines with correct emphasis and click targets
  drawRouteLine();
  if(editingWomen){
    renderMarkersW();
  } else {
    // Clear women's markers, show men's
    wMarkers.forEach(function(m){m.setMap(null);});
    wMarkers=[];
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
    calc();
  }
}

var wMarkers=[];
function renderMarkersW(){
  // Recreate only if count changed
  if(wMarkers.length!==positionsW.length){
    wMarkers.forEach(function(m){m.setMap(null);});
    wMarkers=[];
    for(var i=0;i<positionsW.length;i++){
      var mk=new google.maps.Marker({
        position:{lat:positionsW[i].lat,lng:positionsW[i].lng},map:gmap,
        label:{text:String(i+1),color:'#fff',fontWeight:'bold',fontSize:'10px'},
        icon:{path:google.maps.SymbolPath.CIRCLE,scale:dragMode?14:10,fillColor:'#3b82f6',fillOpacity:1,strokeColor:'#fff',strokeWeight:2},
        zIndex:3000, draggable:dragMode&&editMode, optimized:true
      });
      (function(mk2,idx){
        mk2.addListener('click',function(){
          if(dragMode) return;
          var del=editMode?'<br><button onclick="deletePointW('+idx+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;cursor:pointer">🗑️ Eliminar</button>':'';
          infoWin.setContent('<div style="text-align:center;color:#111;font-size:13px"><b style="color:#3b82f6">🔵 Punto #'+(idx+1)+'</b><br><span style="font-size:11px">Ruta mujeres</span>'+del+'</div>');
          infoWin.open(gmap,mk2);
        });
        mk2.addListener('dragend',function(){
          var p=mk2.getPosition();
          positionsW[idx]={lat:p.lat(),lng:p.lng(),n:positionsW[idx].n||''};
          drawRouteLine();
          syncPositionsW();
        });
        mk2.addListener('drag',function(){
          var p=mk2.getPosition();
          positionsW[idx]={lat:p.lat(),lng:p.lng(),n:positionsW[idx].n||''};
          // Update line in real-time during drag
          if(routeLineW) routeLineW.setPath(positionsW.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
        });
      })(mk,i);
      wMarkers.push(mk);
    }
  } else {
    // Just update positions and draggable state
    for(var j=0;j<wMarkers.length;j++){
      wMarkers[j].setPosition({lat:positionsW[j].lat,lng:positionsW[j].lng});
      wMarkers[j].setDraggable(dragMode&&editMode);
      wMarkers[j].setIcon({path:google.maps.SymbolPath.CIRCLE,scale:dragMode?14:10,fillColor:'#3b82f6',fillOpacity:1,strokeColor:'#fff',strokeWeight:2});
      wMarkers[j].setLabel({text:String(j+1),color:'#fff',fontWeight:'bold',fontSize:'10px'});
    }
  }
  // Hide men's markers when editing women
  allMarkers.forEach(function(m){m.setMap(null);});
}

function deletePointW(idx){
  if(idx<0||idx>=positionsW.length) return;
  pushMapHistoryW();
  positionsW.splice(idx,1);
  infoWin.close();
  drawRouteLine();
  renderMarkersW();
  syncPositionsW();
}

function insertAtPositionW(lat,lng,edge){
  if(!editMode||isShared) return;
  if(positionsW.length<2) return;
  var insertIdx;
  if(typeof edge==='number'&&edge>=0&&edge<positionsW.length){
    insertIdx=edge+1;
  } else {
    var bestSeg=0,bestD=Infinity;
    for(var i=0;i<positionsW.length-1;i++){
      var d=distToSegment({lat:lat,lng:lng},positionsW[i],positionsW[i+1]);
      if(d<bestD){bestD=d;bestSeg=i;}
    }
    insertIdx=bestSeg+1;
  }
  pushMapHistoryW();
  positionsW.splice(insertIdx,0,{lat:lat,lng:lng,n:''});
  drawRouteLine();
  renderMarkersW();
  syncPositionsW();
}

function syncPositionsW(){
  if(isShared) return;
  db.ref('positions_w/day'+currentDay).set(
    positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};})
  );
  savedPositionsW[currentDay]=positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
  saveAll();
}

// Snap a GPS point to the nearest position on the route
// Get effective cambio for current user (Virgen is ~5 behind Jesus)
function getEffCambio(){
  // Use liveGrupoData.cambio, fall back to currentGrupoActual
  var c=0;
  if(window.liveGrupoData&&window.liveGrupoData.cambio){
    c=window.liveGrupoData.cambio;
  } else if(window.currentGrupoActual>0){
    c=window.currentGrupoActual;
  }
  if(c===0) return 0;
  var cc=cfg();
  if(cc.t===27){
    var desf=(window.liveGrupoData&&window.liveGrupoData.desfase!==undefined)?window.liveGrupoData.desfase:virgenDesfase;
    c=Math.max(0,c-desf);
  }
  return c;
}

function snapToRoute(p){
  var pts=positions;
  if(!pts||pts.length<2){
    var dayPtsArr=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
    pts=dayPtsArr[currentDay]||[];
  }
  if(pts.length<2) return p;
  
  // If grupo actual is set, only search nearby segments (±15 changes)
  var startIdx=0, endIdx=pts.length-1;
  var effSnap=getEffCambio();
  if(effSnap>0){
    var curr=effSnap-1;
    startIdx=Math.max(0,curr-15);
    endIdx=Math.min(pts.length-1,curr+15);
  }
  
  let bestD=Infinity, bestProj=p;
  for(let i=startIdx;i<endIdx;i++){
    const a=pts[i], b=pts[i+1];
    const dx=b.lng-a.lng, dy=b.lat-a.lat;
    const len2=dx*dx+dy*dy;
    if(len2===0) continue;
    let t=((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/len2;
    t=Math.max(0,Math.min(1,t));
    const proj={lat:a.lat+t*dy, lng:a.lng+t*dx};
    const d=hd(p,proj);
    if(d<bestD){bestD=d;bestProj=proj;}
  }
  return bestProj;
}

// ========== CALCULATE ==========
// Viernes special timing
var VIER_CORTESIAS_CHANGE = 40; // cortesías at this change (hombres)
var VIER_CORTESIAS_CHANGE_M = 40; // cortesías for mujeres (different route)
var VIER_CORTESIAS_MIN = 45;    // 45 min pause (11:30-12:15)

function getCortesiasChange(){
  var isMuj=(+$('cType').value===27);
  return isMuj?VIER_CORTESIAS_CHANGE_M:VIER_CORTESIAS_CHANGE;
}
const VIER_LAST_EXTRA = 0.10;     // last change 10% longer

function calcTime(num, tot, c) {
  var departMin=c.h * 60 + (c.hm||0);
  if(currentDay !== 3) {
    return departMin + (num-1) * c.mn;
  }
  // VIERNES: uses c.mn rhythm but adds cortesías pause
  var cortChange=getCortesiasChange();
  var elapsed = 0;
  for(var i = 2; i <= num; i++) {
    elapsed += c.mn;
    if(i === cortChange) {
      elapsed += VIER_CORTESIAS_MIN;
    }
  }
  return departMin + elapsed;
}

function calc() {
  const c=cfg();
  const tot=positions.length;
  // Keep shared user prefs updated
  if(isShared) localStorage.setItem('sharedUser',JSON.stringify({t:c.t,g:c.g,color:c.color}));

  changes=positions.map((p,i)=>{
    const num=i+1;
    const grupoCnt=(c.t===27)?getMujCount():getHomCount();
    const grp=((c.s-1+i)%grupoCnt)+1;
    const timeMin=calcTime(num, tot, c);
    const isCortesia=(currentDay===3 && num===getCortesiasChange());
    return {num,grp,time:fmt(timeMin),lat:p.lat,lng:p.lng,n:p.n||'',mine:grp===c.g,cortesia:isCortesia};
  });
  myCarries=changes.filter(ch=>ch.mine);
  const isMujeres=c.t===27;
  const colores=['🟡','🔴','🔵'];
  const colorNames=['Amarillo','Rojo','Azul'];
  const colorHex=['#fbbf24','#ef4444','#3b82f6'];
  myCarries.forEach((mc,i)=>{
    mc.ci=i+1;
    if(isMujeres){
      mc.colorIdx=c.color;
      mc.colorIcon=colores[mc.colorIdx];
      mc.colorName=colorNames[mc.colorIdx];
      mc.colorHex=colorHex[mc.colorIdx];
      // Santos rotate colors each change
      const santoColor=(mc.colorIdx+i)%3;
      mc.santoColorIcon=colores[santoColor];
      mc.carryLabel='👑 Virgen + '+mc.santoColorIcon+' Santo';
    }
  });

  let totalM=0;
  for(let i=1;i<positions.length;i++) totalM+=hd(positions[i-1],positions[i]);
  const km=(totalM/1000).toFixed(2);

  // Estimated end time - use real average if available
  let endTime=tot>0?calcTime(tot,tot,c):c.h*60+(c.hm||0);
  let endLabel='Asienta (est.)';
  const realAvg=getRealAvg();
  if(realAvg && doneCount()>0){
    // Project from last recorded carry
    const recorded=myCarries.filter(x=>isDone(x.ci)).map(x=>({num:x.num,t:getEntry(x.ci).t})).sort((a,b)=>b.num-a.num);
    if(recorded.length>0){
      const last=recorded[0];
      const changesLeft=tot-last.num;
      const estMs=last.t+changesLeft*realAvg*60000;
      const estDate=new Date(estMs);
      const h=estDate.getHours(),m=estDate.getMinutes();
      endTime=h*60+m;
      endLabel='Asienta (real)';
    }
  }
  // Last group that enters
  const lastGrpCnt=(c.t===27)?getMujCount():getHomCount();
  const lastGrp=((c.s-1+tot-1)%lastGrpCnt)+1;

  let extra=currentDay===3?' · ✝️ Cortesías ~11:30-12:00':'';
  const dateStr=dayDates[currentDay]?dayDates[currentDay].slice(5).replace('-','/'):'';
  var titleIcon=isSEMode?'⚰️':'✝️';
  var titleText=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
  $('hTitle').textContent=titleIcon+' '+titleText;
  $('hTitle').style.color=isSEMode?'#d4af37':'#c084fc';
  var depTimeStr=fmt(c.h*60+(c.hm||0));
  if(isShared){
    $('hSub').textContent=dateStr+' · Sale '+depTimeStr+' · Grupo #'+c.g;
  } else {
    $('hSub').textContent=dateStr+' · Sale '+depTimeStr+' · '+c.mn+'min · #'+c.g+' · Saca #'+c.s+' → #'+lastGrp+extra;
  }
  const isMuj=c.t===27;

  renderTable();
  renderLive();
  renderMarkers();
  renderWPmarkers();
  saveAll();
  if(typeof populateAlertSelects==='function') populateAlertSelects();
}

// ========== WAYPOINT REFERENCE MARKERS ==========
function renderWPmarkers() {
  wpMarkers.forEach(m=>m.setMap(null));
  wpMarkers=[];
  const wps = getWPs();
  wps.forEach((wp,i)=>{
    const mk=new google.maps.Marker({
      position:{lat:wp.lat,lng:wp.lng}, map:gmap,
      label:{text:'◆',color:'#c084fc',fontWeight:'bold',fontSize:'12px'},
      icon:{path:google.maps.SymbolPath.CIRCLE,scale:(dragMode&&editMode)?16:12,
        fillColor:'#222',fillOpacity:.9,
        strokeColor:'#7c3aed',strokeWeight:2},
      zIndex:5000, draggable:dragMode&&editMode,
      optimized:!(dragMode&&editMode)
    });
    mk.addListener('click',function(){
      if(isZoom())return;
      const ren=editMode?'<br><button onclick="renameRef('+i+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#7c3aed;color:#fff;font-size:12px;font-weight:600;cursor:pointer">✏️ Renombrar</button>':'';
      const del=editMode?'<br><button onclick="deleteRef('+i+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🗑️ Eliminar</button>':'';
      const drag=(dragMode&&editMode)?'<br><i style="font-size:11px;color:#777">Arrastrá para mover</i>':'';
      const svBtn='<br><button onclick="openStreetView('+wp.lat+','+wp.lng+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#1a73e8;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🛣️ Street View</button>';
      infoWin.setContent('<div style="text-align:center;font-family:Georgia;color:#111;font-size:13px"><b style="font-size:15px">'+_escapeHtml(wp.n)+'</b><br><span style="font-size:12px;color:#555">Referencia</span>'+drag+ren+del+svBtn+'</div>');
      infoWin.open(gmap,mk);
    });
    if(dragMode&&editMode){
      mk.addListener('dragend',function(){
        const p=mk.getPosition();
        wps[i].lat=p.lat(); wps[i].lng=p.lng();
        saveAll();
      });
    }
    wpMarkers.push(mk);
  });
}

async function addRef(){
  const name=await customPrompt('Nombre de la referencia:');
  if(!name) return;
  const center=gmap.getCenter();
  const wps=getWPs();
  wps.push({n:name,lat:center.lat(),lng:center.lng()});
  renderWPmarkers();
  saveAll();
}

function deleteRef(i){
  const wps=getWPs();
  if(i<0||i>=wps.length) return;
  wps.splice(i,1);
  infoWin.close();
  renderWPmarkers();
  saveAll();
}

async function renameRef(i){
  const wps=getWPs();
  if(i<0||i>=wps.length) return;
  const name=await customPrompt('Nuevo nombre para referencia:',wps[i].n);
  if(name===null) return;
  wps[i].n=name;
  infoWin.close();
  renderWPmarkers();
  saveAll();
}

async function renameChange(ci){
  if(ci<0||ci>=positions.length) return;
  const name=await customPrompt('Nuevo nombre para este cambio:',positions[ci].n||'');
  if(name===null) return;
  positions[ci].n=name;
  infoWin.close();
  calc();
  if(typeof syncPositions==='function') syncPositions();
}

function exportPoints(){
  // Generate JSON of current day's positions
  const day=dayNames[currentDay];
  const pts=positions.map((p,i)=>({n:p.n||'Punto '+(i+1),lat:Math.round(p.lat*10000000)/10000000,lng:Math.round(p.lng*10000000)/10000000}));
  const json=JSON.stringify(pts);
  
  // Also generate refs
  const wps=getWPs();
  const refs=wps.map(w=>({n:w.n,lat:Math.round(w.lat*10000000)/10000000,lng:Math.round(w.lng*10000000)/10000000}));
  
  const txt='📍 '+day+' ('+pts.length+' cambios, '+refs.length+' refs)\n\nPUNTOS:\n'+json+'\n\nREFS:\n'+JSON.stringify(refs);
  
  // Try share, fallback to clipboard
  if(navigator.share){
    navigator.share({title:day+' - Puntos exportados',text:txt}).catch(()=>{
      copyToClip(txt);
    });
  } else {
    copyToClip(txt);
  }
}

function copyToClip(txt){
  navigator.clipboard.writeText(txt).then(()=>{
    alert('✅ Copiado al portapapeles. Pegalo en WhatsApp y mandámelo.');
  }).catch(()=>{
    // Fallback: show in modal so user can copy manually
    customPrompt('Copiá este texto y mandámelo por WhatsApp:',txt);
  });
}

// ========== MARKERS ==========
function renderMarkers() {
  const zoom=gmap?gmap.getZoom():15;
  const showOthers=showAll&&(zoom>=15||editMode);
  const bounds=gmap?gmap.getBounds():null;
  
  var step=1;
  if(!editMode&&changes.length>60){
    if(zoom<=14) step=8;
    else if(zoom<=15) step=5;
    else if(zoom<=16) step=3;
  }

  // Recreate if changes count changed
  if(allMarkers.length>0&&allMarkers.length!==changes.length){
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
  }

  // First time: create all markers
  if(allMarkers.length===0&&changes.length>0){
    changes.forEach(function(ch,ci){
      var m=ch.mine;
      var sc=m?13:7;
      var fc=m?'#c084fc':'#5599ff';
      if(m){var mc2=myCarries.find(function(x){return x.num===ch.num});if(mc2&&mc2.colorHex) fc=mc2.colorHex;}
      var lbl={text:String(ch.grp),color:m?'#111':'#fff',fontWeight:'bold',fontSize:m?'12px':'9px'};
      var mk=new google.maps.Marker({
        position:{lat:ch.lat,lng:ch.lng},map:null,
        label:lbl,
        icon:{path:google.maps.SymbolPath.CIRCLE,scale:sc,fillColor:fc,fillOpacity:m?1:.35,strokeColor:m?'#fff':fc,strokeWeight:m?2:0},
        zIndex:m?3000:100, draggable:false,
        optimized:true, clickable:true
      });
      mk._isMine=m;mk._ci=ci;mk._ch=ch;
      // Click handler
      (function(mk2,ch2,ci2,m2){
        mk2.addListener('click',function(){
          if(isZoom())return;
          var tag=m2?'<br><b style="color:#7c3aed">✝️ Tu cargada #'+ch2.ci+'</b>':'';
          var colorTag='';if(m2){var mc3=myCarries.find(function(x){return x.num===ch2.num});if(mc3&&mc3.carryLabel) colorTag='<br><span style="font-size:12px">'+_escapeHtml(mc3.carryLabel)+'</span>';}
          var ref=ch2.n?'<br><span style="font-size:12px;color:#555">'+_escapeHtml(ch2.n)+'</span>':'';
          var svBtn2='<br><button onclick="openStreetView('+positions[ci2].lat+','+positions[ci2].lng+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#1a73e8;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🛣️ Street View</button>';
          var ren=editMode?'<br><button onclick="renameChange('+ci2+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#7c3aed;color:#fff;font-size:12px;font-weight:600;cursor:pointer">✏️ Renombrar</button>':'';
          var del=editMode?'<br><button onclick="deleteChange('+ci2+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🗑️ Eliminar</button>':'';
          infoWin.setContent('<div style="text-align:center;font-family:Georgia;min-width:150px;color:#111;font-size:13px"><b style="font-size:15px">Grupo #'+ch2.grp+'</b><br>Cambio #'+ch2.num+'<br><b>~'+ch2.time+'</b>'+tag+colorTag+ref+ren+del+svBtn2+'</div>');
          infoWin.open(gmap,mk2);
        });
        mk2.addListener('drag',function(){
          var p=mk2.getPosition();
          positions[ci2]={lat:p.lat(),lng:p.lng(),n:positions[ci2].n||''};
          if(routeLine) routeLine.setPath(positions.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
          if(routeClickLine) routeClickLine.setPath(positions.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
        });
        mk2.addListener('dragend',function(){
          var p=mk2.getPosition();
          positions[ci2]={lat:p.lat(),lng:p.lng(),n:positions[ci2].n||''};
          drawRouteLine();calc();
          if(typeof syncPositions==='function') syncPositions();
        });
      })(mk,ch,ci,m);
      allMarkers.push(mk);
    });
  }

  // Show/hide based on zoom, bounds, step
  for(var mi=0;mi<allMarkers.length;mi++){
    var mk=allMarkers[mi];
    var visible=true;
    if(!mk._isMine&&!showOthers) visible=false;
    if(!mk._isMine&&step>1&&mi%step!==0) visible=false;
    if(bounds&&!bounds.contains(mk.getPosition())) visible=false;
    mk.setMap(visible?gmap:null);
    // Update draggable for edit mode
    if(dragMode&&editMode&&mk.getDraggable()!==true){
      mk.setDraggable(true);
      mk.setIcon({path:google.maps.SymbolPath.CIRCLE,scale:mk._isMine?20:14,fillColor:mk._isMine?'#c084fc':'#5599ff',fillOpacity:mk._isMine?1:.35,strokeColor:mk._isMine?'#fff':'#5599ff',strokeWeight:mk._isMine?2:0});
    } else if(!dragMode&&mk.getDraggable()===true){
      mk.setDraggable(false);
      mk.setIcon({path:google.maps.SymbolPath.CIRCLE,scale:mk._isMine?13:7,fillColor:mk._isMine?'#c084fc':'#5599ff',fillOpacity:mk._isMine?1:.35,strokeColor:mk._isMine?'#fff':'#5599ff',strokeWeight:mk._isMine?2:0});
    }
  }
}

// ========== DELETE CHANGE ==========
function deleteChange(ci) {
  if(ci<0||ci>=positions.length) return;
  pushMapHistory();
  const removed = positions[ci];
  positions.splice(ci, 1);
  infoWin.close();
  drawRouteLine();
  calc();
  if(typeof syncPositions==='function') syncPositions();
}

// ========== TABLE ==========
function getCarryRef(mc){
  var cc=cfg();
  if(cc.t===27&&window.liveGrupoData&&window.liveGrupoData.movidos){
    var adjIdx=mc.num-1-window.liveGrupoData.movidos;
    if(adjIdx>=0&&adjIdx<positions.length){
      var adjName=positions[adjIdx].n||'';
      if(adjName) return adjName;
      return nearWP({lat:positions[adjIdx].lat,lng:positions[adjIdx].lng});
    }
  }
  return mc.n||nearWP(mc);
}

function renderTable() {
  let h='<div class="th"><span>#</span><span>Ubicación / Referencia</span><span style="text-align:right">Hora</span></div>';
  myCarries.forEach((mc,i)=>{
    const ref=_escapeHtml(getCarryRef(mc));
    const label=_escapeHtml(mc.carryLabel||'');
    h+='<div class="tr" onclick="zoomTo('+i+')"><span class="rn">'+mc.ci+'</span><div><div style="font-weight:600">'+ref+'</div><div class="rs">Cambio #'+mc.num+(label?' · '+label:'')+'</div></div><div class="rt">'+_escapeHtml(mc.time)+'</div></div>';
  });
  $('tbl').innerHTML=h;
}

// ========== EN VIVO ==========
// Store: {dayNum: {ci: timestamp_ms, ...}}
let carryTimes = {};
const COMP_KEY = 'ssLive_v2';

function loadCompleted(){
  try{
    const raw=localStorage.getItem(COMP_KEY);
    if(raw) carryTimes=JSON.parse(raw);
  }catch(e){_logErr("swallow",e);}
}
function saveCompleted(){
  try{localStorage.setItem(COMP_KEY,JSON.stringify(carryTimes));}catch(e){_logErr("swallow",e);}
}
loadCompleted();

function getDayTimes(){
  if(!carryTimes[currentDay]) carryTimes[currentDay]={};
  return carryTimes[currentDay];
}
function getEntry(ci){
  const v=getDayTimes()[String(ci)];
  if(!v) return null;
  // Support old format (just number) and new {t,manual}
  if(typeof v==='number') return {t:v,manual:false};
  return v;
}
function isDone(ci){return getDayTimes().hasOwnProperty(String(ci));}
function doneCount(){return Object.keys(getDayTimes()).length;}

function markDone(ci){
  getDayTimes()[String(ci)]={t:Date.now(),manual:false};
  saveCompleted();
  renderLive();
  calc();
}

function markDoneWithTime(ci){
  const panel=$('livePanel');
  const existing=document.getElementById('timePicker');
  if(existing) existing.remove();

  let hOpts='';
  for(let h=1;h<=12;h++) hOpts+='<option value="'+h+'">'+h+'</option>';
  let mOpts='';
  for(let m=0;m<60;m+=5) mOpts+='<option value="'+m+'">'+String(m).padStart(2,'0')+'</option>';

  const div=document.createElement('div');
  div.id='timePicker';
  div.style.cssText='background:rgba(0,0,0,.85);border:2px solid #c084fc;border-radius:12px;padding:16px;margin:10px 0;text-align:center';
  div.innerHTML='<div style="color:#c084fc;font-size:14px;font-weight:700;margin-bottom:10px">🕐 ¿A qué hora cargaste #'+ci+'?</div>'
    +'<div style="display:flex;gap:8px;justify-content:center;align-items:center;margin-bottom:12px">'
    +'<select id="tpH" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit">'+hOpts+'</select>'
    +'<span style="color:#fff;font-size:20px;font-weight:700">:</span>'
    +'<select id="tpM" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit">'+mOpts+'</select>'
    +'<select id="tpAP" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit"><option>AM</option><option>PM</option></select>'
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:center">'
    +'<button onclick="confirmTimePick('+ci+')" style="background:#4CAF50;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">✅ Confirmar</button>'
    +'<button onclick="document.getElementById(\'timePicker\').remove()" style="background:rgba(255,255,255,.1);color:#ccc;border:1px solid #666;border-radius:8px;padding:12px 16px;font-size:14px;cursor:pointer;font-family:inherit">Cancelar</button>'
    +'</div>';

  // Pre-select the PROJECTED time of this carry
  const mc=myCarries.find(x=>x.ci===ci);
  if(mc){
    const est=getEstimate(mc);
    const tp=est.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if(tp){
      let eh=parseInt(tp[1]), em=parseInt(tp[2]);
      const epm=tp[3].toUpperCase()==='PM';
      div.querySelector('#tpAP').selectedIndex=epm?1:0;
      div.querySelector('#tpH').value=eh;
      div.querySelector('#tpM').value=Math.floor(em/5)*5;
    }
  }

  // Insert after the button
  const btn=panel.querySelector('.live-btn-done');
  if(btn) btn.parentNode.insertBefore(div, btn.nextSibling.nextSibling);
  else panel.appendChild(div);
}

function confirmTimePick(ci){
  let h=parseInt($('tpH').value);
  const m=parseInt($('tpM').value);
  const ap=$('tpAP').value;
  if(ap==='PM'&&h<12) h+=12;
  if(ap==='AM'&&h===12) h=0;
  const now=new Date();
  now.setHours(h,m,0,0);
  getDayTimes()[String(ci)]={t:now.getTime(),manual:true};
  saveCompleted();
  renderLive();
  calc();
}

function undoLast(){
  const dt=getDayTimes();
  const keys=Object.keys(dt);
  if(keys.length===0) return;
  // Sort by timestamp descending, remove most recent
  keys.sort((a,b)=>{
    const ta=typeof dt[a]==='object'?dt[a].t:dt[a];
    const tb=typeof dt[b]==='object'?dt[b].t:dt[b];
    return tb-ta;
  });
  delete dt[keys[0]];
  saveCompleted();
  renderLive();
  calc();
}

async function resetLive(){
  if(!await customConfirm('¿Reiniciar cargadas de '+dayNames[currentDay]+'?')) return;
  carryTimes[currentDay]={};
  saveCompleted();
  renderLive();
  calc();
}

// Calculate real average min/change, ignoring outliers
function getRealAvg(){
  const entries=[];
  myCarries.forEach(mc=>{
    const e=getEntry(mc.ci);
    if(e) entries.push({ci:mc.ci, num:mc.num, t:e.t});
  });
  if(entries.length<2) return null;
  entries.sort((a,b)=>a.num-b.num);
  
  // Calculate per-segment rates
  const rates=[];
  for(let i=1;i<entries.length;i++){
    const diffMin=(entries[i].t-entries[i-1].t)/60000;
    const diffChanges=entries[i].num-entries[i-1].num;
    if(diffMin>0&&diffChanges>0) rates.push(diffMin/diffChanges);
  }
  if(rates.length===0) return null;
  
  // Find median
  const sorted=[...rates].sort((a,b)=>a-b);
  const median=sorted[Math.floor(sorted.length/2)];
  
  // Keep only rates within 2x of median (ignore extreme outliers)
  const filtered=rates.filter(r=>r>=median*0.3&&r<=median*2.5);
  if(filtered.length===0) return median;
  
  return filtered.reduce((a,b)=>a+b,0)/filtered.length;
}

// Get last recorded time and project forward
function getEstimate(mc){
  // 1. If we have registered carries, project from last one
  const recorded=myCarries.filter(x=>isDone(x.ci)).map(x=>({num:x.num,t:getEntry(x.ci).t})).sort((a,b)=>b.num-a.num);
  const avg=getRealAvg();
  if(recorded.length>0&&avg){
    const last=recorded[0];
    if(mc.num<=last.num) return fmtClock(last.t); // already passed
    return fmtClock(last.t+(mc.num-last.num)*avg*60000);
  }

  // 2. If GPS is actively tracking, use real rhythm
  if(window._lastRealGPS&&(Date.now()-window._lastRealGPS<GPS_TIMEOUT)&&window._realRhythm>0){
    var cc=cfg();
    var dateStr=dayDates[currentDay]||localDateStr(new Date());
    var departMs=new Date(dateStr+'T'+String(cc.h).padStart(2,'0')+':'+String(cc.hm||0).padStart(2,'0')+':00').getTime();
    if(Date.now()>departMs){
      return fmtClock(departMs+(mc.num-1)*window._realRhythm*60000);
    }
  }

  // 3. Default: use calc() time (departure + n × mn)
  return mc.time;
}

function parseTimeToMs(timeStr){
  const tp=timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if(!tp) return null;
  let h=parseInt(tp[1]),m=parseInt(tp[2]);
  if(tp[3].toUpperCase()==='PM'&&h<12)h+=12;
  if(tp[3].toUpperCase()==='AM'&&h===12)h=0;
  const d=new Date();d.setHours(h,m,0,0);
  return d.getTime();
}

function fmtClock(ts){
  const d=new Date(ts);
  let h=d.getHours(),m=d.getMinutes();
  let h12=((h-1)%12)+1;if(h12<=0)h12+=12;
  return h12+':'+String(m).padStart(2,'0')+' '+(h>=12&&h<24?'PM':'AM');
}

// Debounce + skip-if-unchanged wrapper around the heavy renderLiveImpl.
// renderLive is called from many sources (Firebase listeners, polls, intervals);
// coalescing close calls and skipping equal HTML cuts CPU/repaint cost on mobile.
let _renderLiveTimer = null;
let _renderLiveLastHTML = '';
function renderLive(){
  if(_renderLiveTimer) return;
  _renderLiveTimer = setTimeout(function(){
    _renderLiveTimer = null;
    renderLiveImpl();
  }, 80);
}
function renderLiveImmediate(){
  if(_renderLiveTimer){ clearTimeout(_renderLiveTimer); _renderLiveTimer = null; }
  renderLiveImpl();
}
function renderLiveImpl(){
  // Always update banners first
  updateBanners();
  // Wait for changes to be calculated
  if(!changes||changes.length===0){
    _renderLiveLastHTML='<<loading>>';
    $('livePanel').innerHTML='<div class="live-card"><p style="color:#aaa">Cargando datos...</p></div>';
    return;
  }
  // Check if this day is in the past
  var isPastDay=isDayPast(currentDay);

  // For past days with no carries, show banners only
  if(isPastDay&&changes.length>0&&!myCarries.length){
    _renderLiveLastHTML='<<empty>>';
    $('livePanel').innerHTML='';
    return;
  }

  if(!myCarries.length&&!isPastDay){_renderLiveLastHTML='<<no-carries>>';$('livePanel').innerHTML='<div class="live-card"><p style="color:#aaa">No hay cargadas. Verificá la configuración.</p></div>';return;}
  
  var isPastDay=isDayPast(currentDay);
  
  // For past days, auto-set grupo actual to last cambio
  if(isPastDay&&changes.length>0){
    var sacaPD=daySaca[currentDay]||17;
    var totPD=changes.length;
    var lastGrpPD=((sacaPD-1+totPD-1)%getHomCount())+1;
    currentGrupoActual=totPD;
    liveGrupoData={cambio:totPD,grp:lastGrpPD,nombre:(totPD<=changes.length&&changes[totPD-1])?changes[totPD-1].n||'':'',tot:totPD,desfase:0,movidos:0,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  }

  const total=myCarries.length;
  const manualDone=doneCount();
  var effCambio=getEffCambio();
  // Past days: all carries are done
  if(isPastDay) effCambio=changes.length;
  const grupoDone=effCambio>0?myCarries.filter(mc=>mc.num<=effCambio).length:0;
  const done=Math.max(manualDone,grupoDone);
  const pending=myCarries.filter(mc=>!isDone(mc.ci)&&!(effCambio>0&&mc.num<=effCambio));
  const nextCarry=pending[0];
  const pct=total>0?Math.round(done/total*100):0;

  let h='';

  const lastGrpLive=changes.length>0?changes[changes.length-1].grp:'?';
  const cc=cfg();const isMuj=cc.t===27;
  const coloresH=['🟡','🔴','🔵'];
  const grupoInfo='#'+cc.g+(isMuj?' '+coloresH[cc.color]:'');
  const cargaInfo=isMuj?total+'×2':total;
  const cargaLabel=isMuj?'Cambios':'Cargadas';

  // Procession complete only when ALL cambios are done or past day
  var procComplete=(done>=total&&total>0)||isPastDay||(liveGrupoData&&liveGrupoData.cambio>=total&&total>0);

  // Banners always updated (updateBanners handles isPastDay styling)
  updateBanners();

  // Admin grupo +/- moved to stickyInfo
  // Chronometer (everyone sees, not past days)
  if(!isPastDay){
    h+='<div style="text-align:center;margin-bottom:8px"><span id="grupoCrono" style="font-size:18px;font-weight:700;color:#ff9800;font-family:monospace">⏱ 0:00</span><br><span id="grupoLastUpdate" style="font-size:10px;color:#888"></span></div>';
  }

  // Progress
  h+='<div class="live-progress"><div class="live-progress-bar" style="width:'+pct+'%">'+done+'/'+total+'</div></div>';

  // Cortesías banner for Viernes (only when NOT complete)
  if(currentDay===3&&!procComplete){
    var cortChangeNum=getCortesiasChange();
    var cortChangeObj=changes.find(function(ch){return ch.num===cortChangeNum;});
    if(cortChangeObj){
      var sacaCort=daySaca[currentDay]||17;
      var cortGrp=((sacaCort-1+cortChangeNum-1)%getHomCount())+1;
      var cortDone=cortChangeNum<=Math.max.apply(null,myCarries.filter(function(mc2){return isDone(mc2.ci);}).map(function(mc2){return mc2.num;}).concat([0]));
      var cortTime=cortChangeObj.time;
      var cortStatus=cortDone?'✅ Cortesías completadas':'✝️ Cortesías · Grupo #'+cortGrp+' (~'+cortTime+')';
      h+='<div style="text-align:center;padding:8px;margin-bottom:8px;border-radius:8px;background:rgba(255,152,0,.12);border:1px solid rgba(255,152,0,.3)"><span style="font-size:13px;color:#ff9800;font-weight:700">'+cortStatus+'</span><br><span style="font-size:11px;color:#ccc">Encuentro de las imágenes · ~'+VIER_CORTESIAS_MIN+' min pausa</span>';
      if(isMuj) h+='<br><span style="font-size:10px;color:#f59e0b">⚠️ Cargadoras: las cortesías aplican al Nazareno</span>';
      h+='</div>';
    }
  }

  if(procComplete&&!isPastDay){
    // Your carries are done
    if(!(liveGrupoData&&liveGrupoData.cambio>0&&liveGrupoData.cambio>=(positions.length||changes.length))){
      h+='<div style="text-align:center;padding:12px;margin-bottom:8px;border-radius:10px;background:rgba(76,175,80,.1);border:1px solid rgba(76,175,80,.3)">';
      h+='<div style="font-size:16px;font-weight:700;color:#4CAF50">✅ ¡Completaste todas tus cargadas!</div>';
      h+='</div>';
    }
    const times=[];
    myCarries.forEach(mc=>{const e=getEntry(mc.ci);if(e)times.push({ci:mc.ci,num:mc.num,t:e.t,colorIcon:mc.colorIcon||''});});
    times.sort((a,b)=>a.num-b.num);
    if(times.length>=2){
      const firstT=times[0].t,lastT=times[times.length-1].t;
      const totalMin=Math.round((lastT-firstT)/60000);
      const totalHrs=Math.floor(totalMin/60),totalMins=totalMin%60;
      const avg=getRealAvg();
      let durs='';
      for(let i=1;i<times.length;i++){
        const dur=((times[i].t-times[i-1].t)/60000).toFixed(1);
        durs+='<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>'+times[i-1].colorIcon+' #'+times[i-1].ci+' → #'+times[i].ci+'</span><span style="color:#4CAF50;font-weight:700">'+dur+' min</span></div>';
      }
      h+='<div style="background:rgba(76,175,80,.08);border:1px solid rgba(76,175,80,.2);border-radius:10px;padding:12px;margin-bottom:10px">';
      h+='<div style="text-align:center;font-size:14px;font-weight:700;color:#4CAF50;margin-bottom:8px">📊 Resumen Final</div>';
      h+='<div style="display:flex;justify-content:space-around;margin-bottom:10px">';
      h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+totalHrs+'h '+totalMins+'m</div><div style="font-size:10px;color:#aaa">Tiempo total</div></div>';
      if(avg) h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+avg.toFixed(1)+'</div><div style="font-size:10px;color:#aaa">Min/cambio</div></div>';
      h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+total+'</div><div style="font-size:10px;color:#aaa">Cargadas</div></div>';
      h+='</div>';
      h+='<div style="font-size:12px;color:#ccc;margin-bottom:4px"><b>Detalle:</b></div>';
      h+=durs;
      h+='<div style="margin-top:8px;font-size:11px;color:#aaa">Primera: '+fmtClock(firstT)+' · Última: '+fmtClock(lastT)+'</div>';
      h+='</div>';
    }
  } else if(nextCarry) {
    const ref=nextCarry.n||nearWP(nextCarry);
    const estTime=getEstimate(nextCarry);
    const realAvg=getRealAvg();

    h+='<div class="live-next" onclick="zoomTo('+(nextCarry.ci-1)+')" style="cursor:pointer;'+(nextCarry.colorHex?'border-color:'+nextCarry.colorHex:'')+'\">';
    h+='<div class="ln-label">Próxima cargada · tocá para ver en mapa</div>';
    h+='<div class="ln-num"'+(nextCarry.colorHex?' style="color:'+nextCarry.colorHex+'"':'')+'>#'+nextCarry.ci+'</div>';
    if(nextCarry.carryLabel) h+='<div style="font-size:14px;margin:4px 0">'+nextCarry.carryLabel+'</div>';
    h+='<div class="ln-ref">📍 '+ref+'</div>';
    h+='<div class="ln-time">~'+estTime+'</div>';
    h+='<div id="countdownText" style="font-size:13px;margin-top:4px"></div>';
    if(realAvg) h+='<div style="font-size:11px;color:#4CAF50;margin-top:2px">⏱ Ritmo real: '+realAvg.toFixed(1)+' min/cambio</div>';
    h+='<div style="font-size:10px;color:#aaa;margin-top:2px">Cambio #'+nextCarry.num+'</div>';
    h+='</div>';

    // Compact register buttons
    h+='<div style="display:flex;gap:4px;margin-bottom:4px">';
    h+='<button onclick="markDone('+nextCarry.ci+')" style="flex:3;padding:8px;border:none;border-radius:8px;background:#4CAF50;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">✅ Registrar #'+nextCarry.ci+'</button>';
    h+='<button onclick="markDoneWithTime('+nextCarry.ci+')" style="flex:1;padding:6px;border:1px solid #555;border-radius:8px;background:none;color:#888;font-size:9px;font-family:inherit;cursor:pointer">🕐</button>';
    h+='</div>';
  }

  // Undo
  if(done>0){
    h+='<button class="live-btn live-btn-undo" onclick="undoLast()">↩️ Deshacer última</button>';
  }

  // Carry list
  h+='<div style="margin-top:12px">';
  myCarries.forEach((mc,idx)=>{
    // Insert cortesías separator between carries that span the cortesías change
    if(currentDay===3 && idx>0){
      const prevNum=myCarries[idx-1].num;
      if(prevNum<=getCortesiasChange() && mc.num>getCortesiasChange()){
        h+='<div style="text-align:center;padding:8px;margin:4px 0;border-radius:6px;background:rgba(255,152,0,.1);border:1px dashed rgba(255,152,0,.4)"><span style="font-size:12px;color:#ff9800">✝️ — CORTESÍAS — ✝️</span></div>';
      }
    }
    const mcDone=isDone(mc.ci);
    const passedByGrupo=!mcDone&&effCambio>0&&mc.num<=effCambio;
    const isCurrent=nextCarry&&mc.ci===nextCarry.ci;
    const cls=mcDone?'done':(passedByGrupo?'done':(isCurrent?'current':'pending'));
    const ref=_escapeHtml(getCarryRef(mc));
    const label=_escapeHtml(mc.carryLabel||'');
    const icon=mcDone?'✅':(passedByGrupo?'☑️':(isCurrent?'✝️':'⏳'));
    const entry=getEntry(mc.ci);
    const realT=entry?_escapeHtml(fmtClock(entry.t)):'';
    const estT=_escapeHtml(mcDone?realT:getEstimate(mc));
    const colorHexSafe=/^#[0-9a-fA-F]{3,8}$/.test(mc.colorHex||'')?mc.colorHex:'#c084fc';
    const borderColor=mc.colorHex&&isCurrent?'border-color:'+colorHexSafe:'';
    h+='<div class="live-carry '+cls+'" style="'+borderColor+'" onclick="zoomTo('+(mc.ci-1)+')">';
    h+='<div class="lc-num">'+icon+'</div>';
    h+='<div class="lc-info"><div class="lc-ref">Cargada #'+mc.ci+' — '+ref+'</div><div class="lc-sub">Cambio #'+mc.num+(label?' · '+label:'')+(realT?' · '+realT:'')+'</div></div>';
    h+='<div class="lc-time" style="color:'+(mcDone?'#4CAF50':colorHexSafe)+';'+(isSEMode?'font-size:11px;':'')+'">'+estT+'</div>';
    h+='</div>';
  });
  h+='</div>';

  h+='<div style="text-align:center;margin-top:12px"><button onclick="resetLive()" style="background:none;border:1px solid #914444;color:#e08080;padding:6px 14px;border-radius:5px;font-size:11px;cursor:pointer;font-family:inherit">🗑️ Reiniciar cargadas</button></div>';

  // Skip the DOM write if nothing changed since the last render
  if(h === _renderLiveLastHTML) return;
  _renderLiveLastHTML = h;
  $('livePanel').innerHTML=h;
  // Populate sticky info panel
  var si='';
  // Stats row
  si+='<div style="display:flex;justify-content:space-around;padding:4px 0;margin-bottom:3px;border-bottom:1px solid rgba(255,255,255,.06)">';
  si+='<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#c084fc">'+grupoInfo+'</div><div style="font-size:10px;color:#888">Mi grupo</div></div>';
  si+='<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#fff">'+cargaInfo+'</div><div style="font-size:10px;color:#888">'+cargaLabel+'</div></div>';
  si+='<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:#fff">#'+lastGrpLive+'</div><div style="font-size:10px;color:#888">Asienta</div></div>';
  si+='<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:'+(done>=total?'#4CAF50':'#ff9800')+'">'+done+'/'+total+'</div><div style="font-size:10px;color:#888">Avance</div></div>';
  si+='</div>';
  // Grupo +/- for editor
  if(!isShared&&!isPastDay){
    var sacaDef2=daySaca[currentDay]||16;
    var adminG2='#'+sacaDef2;
    if(liveGrupoData&&liveGrupoData.cambio>0){
      var at2=positions.length||changes.length;
      if(liveGrupoData.cambio>=at2){adminG2='✅';}
      else{adminG2='#'+(((sacaDef2-1+liveGrupoData.cambio-1)%getHomCount())+1);}
    }
    si+='<div style="display:flex;gap:6px;margin-bottom:4px;align-items:center;justify-content:center">';
    si+='<span style="font-size:10px;color:#888">Carga:</span>';
    si+='<button onclick="advanceGrupo(-1)" style="padding:6px 14px;border:1px solid #666;border-radius:8px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;font-weight:700;cursor:pointer">−</button>';
    si+='<span onclick="setGrupoManual()" style="font-size:20px;font-weight:700;color:#c084fc;min-width:45px;text-align:center;cursor:pointer">'+adminG2+'</span>';
    si+='<button onclick="advanceGrupo(1)" style="padding:6px 14px;border:1px solid #7c3aed;border-radius:8px;background:rgba(124,58,237,.3);color:#c084fc;font-size:16px;font-weight:700;cursor:pointer">+</button>';
    si+='</div>';
  }
  // Compact próxima cargada
  if(nextCarry&&!procComplete){
    var ref2=nextCarry.n||nearWP(nextCarry);
    var est2=getEstimate(nextCarry);
    si+='<div onclick="zoomTo('+(nextCarry.ci-1)+')" style="cursor:pointer;display:flex;align-items:center;gap:6px;padding:6px 8px;background:rgba(192,132,252,.08);border:1px solid rgba(192,132,252,.2);border-radius:8px;margin-bottom:2px">';
    si+='<span style="font-size:20px;font-weight:700;color:#c084fc">#'+nextCarry.ci+'</span>';
    si+='<span style="font-size:12px;color:#ccc;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">📍 '+ref2+'</span>';
    si+='<span style="font-size:14px;font-weight:700;color:#c084fc">~'+est2+'</span>';
    si+='<span id="stickyCountdown" style="font-size:11px;color:#ff9800;min-width:40px;text-align:right"></span>';
    si+='</div>';
  } else if(procComplete){
    si+='<div style="text-align:center;padding:4px;font-size:13px;color:#4CAF50;font-weight:700">✅ Procesión completada</div>';
  }
  var stickyEl=$('stickyInfo');
  if(stickyEl) stickyEl.innerHTML=si;
  updateCountdown();
  if(typeof updateGrupoUI==='function') updateGrupoUI();
  if(typeof startCrono==='function') startCrono();
}
function nearWP(p){
  const wps = getWPs();
  let b='Punto',bd=1e9;
  wps.forEach(w=>{const d=hd(p,w);if(d<bd){bd=d;b=w.n;}});
  return b;
}
function zoomTo(i){
  if(!myCarries[i])return;
  showView(0);
  const mc=myCarries[i];
  gmap.setCenter({lat:mc.lat,lng:mc.lng});
  gmap.setZoom(20);
  setTimeout(function(){
    const t=allMarkers.find(m=>{const p=m.getPosition();return Math.abs(p.lat()-mc.lat)<.0001&&Math.abs(p.lng()-mc.lng)<.0001;});
    if(t) google.maps.event.trigger(t,'click');
  },300);
}

// ========== UI ==========
let editMode=false;
function toggleEdit(){
  if(isShared) return;
  editMode=!editMode;
  $('mapEditBar').style.display=editMode?'none':'flex';
  $('mapEditTools').style.display=editMode?'flex':'none';
  if(!editMode&&dragMode) toggleDrag();
}
function toggleDrag(){
  dragMode=!dragMode;
  $('bDrag').style.background=dragMode?'rgba(76,175,80,.8)':'rgba(0,0,0,.7)';
  $('bDrag').style.borderColor=dragMode?'#4CAF50':'#666';
  if(editingWomen){renderMarkersW();}else{renderMarkers();}
  renderWPmarkers();
}
function toggleAll(){showAll=!showAll;$('bAll').textContent=showAll?'👥 Ver otros grupos':'👤 Solo mis cargadas';$('bAll').style.background=showAll?'rgba(0,0,0,.75)':'rgba(76,175,80,.8)';renderMarkers();}
function showView(n){document.querySelectorAll('.vtab').forEach((t,i)=>t.classList.toggle('a',i===n));document.querySelectorAll('.pnl').forEach((p,i)=>p.classList.toggle('a',i===n));}

// ========== GPS TRACKING ==========
let gpsMarker=null, gpsCircle=null, gpsWatchId=null, gpsOn=false;

function toggleGps(){
  if(gpsOn){
    if(gpsWatchId!==null){navigator.geolocation.clearWatch(gpsWatchId);gpsWatchId=null;}
    if(gpsMarker){gpsMarker.setMap(null);gpsMarker=null;}
    if(gpsCircle){gpsCircle.setMap(null);gpsCircle=null;}
    gpsOn=false;
    $('bGps').style.background='rgba(0,0,0,.75)';
    $('noti').classList.remove('show');
    calc(); // restore footer
    return;
  }
  if(!navigator.geolocation){
    $('noti').textContent='❌ Tu navegador no soporta GPS';
    $('noti').classList.add('show');
    return;
  }
  gpsOn=true;
  $('bGps').style.background='rgba(66,133,244,.8)';
  $('noti').textContent='📍 Buscando ubicación...';
  $('noti').classList.add('show');

  gpsWatchId=navigator.geolocation.watchPosition(
    function(pos){
      const lat=pos.coords.latitude, lng=pos.coords.longitude, acc=pos.coords.accuracy;
      const ll={lat,lng};
      $('noti').classList.remove('show');
      if(!gpsMarker){
        gpsMarker=new google.maps.Marker({
          position:ll, map:gmap, zIndex:9000,
          icon:{path:google.maps.SymbolPath.CIRCLE,scale:10,fillColor:'#4285F4',fillOpacity:1,strokeColor:'#fff',strokeWeight:3}
        });
        gpsCircle=new google.maps.Circle({
          center:ll,radius:acc,map:gmap,fillColor:'#4285F4',fillOpacity:.12,strokeColor:'#4285F4',strokeOpacity:.3,strokeWeight:1
        });
        gmap.setCenter(ll);
        gmap.setZoom(17);
      } else {
        gpsMarker.setPosition(ll);
        gpsCircle.setCenter(ll);
        gpsCircle.setRadius(acc);
      }
      // Info about nearest change
      let nearIdx=0,nearD=Infinity;
      changes.forEach((ch,i)=>{const d=hd(ll,ch);if(d<nearD){nearD=d;nearIdx=i;}});
      const near=changes[nearIdx];
      if(near){
        const nextMine=myCarries.find(mc=>mc.num>near.num);
        let info='📍 Cerca del cambio #'+(+near.num||0)+' (Grp #'+(+near.grp||0)+')';
        if(near.n) info+=' · '+_escapeHtml(near.n);
        if(nextMine) info+='<br>Próxima cargada: #'+(+nextMine.ci||0)+' (~'+_escapeHtml(nextMine.time||'')+')';
        $('noti').innerHTML='<b style="color:#4285F4">'+info+'</b>';
        $('noti').classList.add('show');
      }
    },
    function(err){
      gpsOn=false;
      $('bGps').style.background='rgba(0,0,0,.75)';
      if(err.code===1){
        $('noti').innerHTML='❌ Permiso denegado.<br>Si abriste el archivo descargado, el GPS no funciona por seguridad del navegador.<br><b>Solución:</b> Abrí la app desde Claude (sin descargar) o subila a un hosting HTTPS.';
      } else if(err.code===2){
        $('noti').textContent='❌ GPS no disponible. Activá la ubicación en Ajustes del cel.';
      } else {
        $('noti').textContent='❌ Tiempo agotado. Asegurate de tener GPS activado.';
      }
      $('noti').classList.add('show');
    },
    {enableHighAccuracy:true, maximumAge:5000, timeout:10000}
  );
}
// ========== COUNTDOWN TIMER ==========
let countdownInterval=null;
function startCountdown(){
  if(countdownInterval) clearInterval(countdownInterval);
  countdownInterval=setInterval(updateCountdown,30000); // every 30s
  // Also refresh projected times every 60s
  setInterval(function(){if(myCarries.length>0)renderLive();},60000);
  updateCountdown();
}
function updateCountdown(){
  const el=document.getElementById('countdownText');
  if(!el||!myCarries.length) return;
  var effCambio=getEffCambio();
  const pending=myCarries.filter(mc=>!isDone(mc.ci)&&!(effCambio>0&&mc.num<=effCambio));
  if(pending.length===0){el.textContent='';hideAlert();return;}
  const next=pending[0];
  const est=getEstimate(next);
  const tp=est.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if(!tp){el.textContent='';return;}
  let h=parseInt(tp[1]),m=parseInt(tp[2]);
  if(tp[3].toUpperCase()==='PM'&&h<12)h+=12;
  if(tp[3].toUpperCase()==='AM'&&h===12)h=0;
  const now=new Date();
  const estDate=new Date();estDate.setHours(h,m,0,0);
  if(estDate<now&&(now-estDate)>12*3600000) estDate.setDate(estDate.getDate()+1);
  const diffMin=Math.round((estDate-now)/60000);
  if(diffMin<=0){
    el.innerHTML='<span style="color:#c084fc;font-weight:700">⏰ Cargada en curso</span>';
    if(navigator.vibrate&&lastAlertCi!==next.ci){navigator.vibrate([300,100,300,100,500]);lastAlertCi=next.ci;}
  } else if(diffMin<=5){
    el.innerHTML='<span style="color:#ff9800;font-weight:700">⚠️ ¡Faltan <b>~'+diffMin+' min</b>! Preparáte</span>';
    if(navigator.vibrate&&lastAlertCi!==next.ci){navigator.vibrate([200,100,200]);lastAlertCi=next.ci;}
  } else if(diffMin<=60){
    el.innerHTML='<span style="color:#c084fc">⏳ Faltan <b>~'+diffMin+' min</b> para tu cargada</span>';

  } else {
    const hrs=Math.floor(diffMin/60),mins=diffMin%60;
    el.innerHTML='<span style="color:#aaa">⏳ Faltan ~'+hrs+'h '+mins+'min</span>';

  }
}

// ========== CARRY ALERT (vibration + flash) ==========
let lastAlertCi=0, lastAlertType='';
function triggerAlert(ci,type){
  const key=ci+'-'+type;
  if(lastAlertCi===ci&&lastAlertType===type) return; // already alerted
  lastAlertCi=ci;lastAlertType=type;
  // Vibrate
  if(navigator.vibrate){
    if(type==='now') navigator.vibrate([300,100,300,100,500]); // strong
    else navigator.vibrate([200,100,200]); // medium
  }
  // Show flash banner
  const banner=document.getElementById('alertBanner');
  if(banner){
    if(type==='now'){
      banner.innerHTML='⏰ <b>¡CARGADA #'+ci+' EN CURSO!</b>';
      banner.style.background='rgba(192,132,252,.2)';
      banner.style.borderColor='#c084fc';
    } else {
      banner.innerHTML='⚠️ <b>¡Preparáte! Cargada #'+ci+' en menos de 5 min</b>';
      banner.style.background='rgba(255,152,0,.2)';
      banner.style.borderColor='#ff9800';
    }
    banner.style.display='block';
    banner.classList.add('flash');
    setTimeout(function(){banner.classList.remove('flash');},5000);
  }
}
function hideAlert(){
  const banner=document.getElementById('alertBanner');
  if(banner){banner.style.display='none';banner.classList.remove('flash');}
}
startCountdown();

// ========== INSTALL BANNER ==========
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  deferredPrompt=e;
  showInstallBanner();
});
function showInstallBanner(){
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
  const dismissed=localStorage.getItem('installDismissed');
  if(!isStandalone&&!dismissed){
    $('installBanner').style.display='block';
  }
}
function installApp(){
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result){
      if(result.outcome==='accepted') $('installBanner').style.display='none';
      deferredPrompt=null;
    });
  } else {
    // Fallback: show manual instructions
    alert('Tocá los 3 puntos (⋮) arriba a la derecha → "Agregar a pantalla de inicio"');
  }
}
function dismissInstall(){
  $('installBanner').style.display='none';
  localStorage.setItem('installDismissed','1');
}
// Also show if no prompt captured after 3s (for browsers that don't fire beforeinstallprompt)
setTimeout(function(){
  if(!deferredPrompt) showInstallBanner();
},3000);

// ========== SERVICE WORKER - DISABLED FOR SYNC RELIABILITY ==========
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(reg){
    console.log('SW registered',reg.scope);
  }).catch(function(err){console.log('SW error',err);});
}

// ========== Block 2: Firebase init, auth, push, GPS ==========
// ========== URNA GPS TRACKING ==========
const firebaseConfig = {
  apiKey: "AIzaSyCxQxXH4qihmmjiGTVdWC7QnBfdbklfcU8",
  authDomain: "procesion-sonsonate.firebaseapp.com",
  databaseURL: "https://procesion-sonsonate-default-rtdb.firebaseio.com",
  projectId: "procesion-sonsonate",
  storageBucket: "procesion-sonsonate.firebasestorage.app",
  messagingSenderId: "972231146098",
  appId: "1:972231146098:web:fedd850a29d974484520eb"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ========== ADMIN AUTH (Google Identity Services + Firebase) ==========
// We use GIS instead of Firebase signInWithRedirect because the firebaseapp.com
// auth handler fails on mobile due to third-party cookie restrictions when the
// app is hosted cross-origin (GitHub Pages).
// Super-admins are hardcoded. They can manage the editors list via UI.
// Other editors live at /admins/{email-with-dots-as-commas} in Firebase.
const ADMIN_SUPER_EMAILS = [
  'njrmancia@gmail.com'
];
const ADMIN_OAUTH_CLIENT_ID = '972231146098-2q1titms75k7mfdvsu2l5upmrb73ltcm.apps.googleusercontent.com';
const auth = firebase.auth();
let isAdmin = false;
let isSuperAdmin = false;
let authResolved = false;
let _gisInitialized = false;
let _adminListFromDB = [];
let _adminListLoaded = false;

function _emailToKey(email){
  return (email||'').toLowerCase().trim().replace(/\./g,',');
}
function _keyToEmail(key){
  return (key||'').replace(/,/g,'.');
}
function _isSuperAdmin(email){
  if(!email) return false;
  return ADMIN_SUPER_EMAILS.indexOf(email.toLowerCase().trim()) !== -1;
}
function _isAdminEmail(email){
  if(!email) return false;
  email = email.toLowerCase().trim();
  if(_isSuperAdmin(email)) return true;
  return _adminListFromDB.indexOf(email) !== -1;
}

// Live editor list from Firebase
db.ref('admins').on('value', function(snap){
  var d = snap.val() || {};
  _adminListFromDB = Object.keys(d).filter(function(k){return d[k]===true;}).map(_keyToEmail);
  _adminListLoaded = true;
  renderAdminList();
  _recheckCurrentUser();
}, function(err){
  console.warn('Cannot read /admins:', err && err.code);
  _adminListLoaded = true;
  _adminListFromDB = [];
  _recheckCurrentUser();
});

function _recheckCurrentUser(){
  var user = auth.currentUser;
  if(!user) return;
  var nowAdmin = _isAdminEmail(user.email);
  if(nowAdmin === isAdmin) return;
  if(!nowAdmin && isAdmin){
    // Was admin, now revoked
    isAdmin = false; isShared = true;
    try{ alert('Tu acceso de editor fue revocado.'); }catch(e){_logErr("swallow",e);}
    auth.signOut().then(function(){ window.location.href = window.location.pathname; });
    return;
  }
  // Newly admin (e.g., list loaded after auth)
  isAdmin = true; isShared = false;
  _cleanEditParam();
  applyAuthMode();
}

auth.onAuthStateChanged(function(user){
  authResolved = true;
  if(user && _isSuperAdmin(user.email)){
    isAdmin = true; isShared = false;
    _cleanEditParam();
  } else if(user){
    if(!_adminListLoaded){
      // List not loaded yet — public UI for now; _recheckCurrentUser will flip it
      isAdmin = false; isShared = true;
    } else if(_isAdminEmail(user.email)){
      isAdmin = true; isShared = false;
      _cleanEditParam();
    } else {
      isAdmin = false; isShared = true;
      auth.signOut();
      try{ alert('Esta cuenta de Google no está autorizada para editar.'); }catch(e){_logErr("swallow",e);}
    }
  } else {
    isAdmin = false; isShared = true;
  }
  applyAuthMode();
});

function _cleanEditParam(){
  try{
    var u=new URL(window.location.href);
    if(u.searchParams.has('edit')){
      u.searchParams.delete('edit');
      window.history.replaceState({}, '', u.pathname + (u.search?u.search:'') + u.hash);
    }
  }catch(e){_logErr("swallow",e);}
}

function _waitForGIS(timeoutMs){
  return new Promise(function(resolve, reject){
    var start = Date.now();
    (function check(){
      if(typeof google!=='undefined' && google.accounts && google.accounts.id){
        return resolve();
      }
      if(Date.now()-start > timeoutMs) return reject(new Error('GIS load timeout'));
      setTimeout(check, 100);
    })();
  });
}

function _initGIS(){
  if(_gisInitialized) return;
  google.accounts.id.initialize({
    client_id: ADMIN_OAUTH_CLIENT_ID,
    callback: handleGoogleCredential,
    auto_select: false,
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true
  });
  _gisInitialized = true;
}

function handleGoogleCredential(response){
  if(!response||!response.credential){
    try{ alert('No se recibió credencial de Google.'); }catch(e){_logErr("swallow",e);}
    return;
  }
  // Exchange the Google id_token for a Firebase credential
  var credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
  auth.signInWithCredential(credential).then(function(result){
    if(result && result.user && _isAdminEmail(result.user.email)){
      // Reload to clean URL so admin-only init runs from a fresh state
      window.location.href = window.location.pathname;
    }
    // Wrong account is handled by onAuthStateChanged (signs out + alert)
  }).catch(function(err){
    console.error('signInWithCredential error:', err);
    try{ alert('Error al iniciar sesión: '+(err.message||err.code||'desconocido')); }catch(e){_logErr("swallow",e);}
  });
}

function loginAsAdmin(){
  _waitForGIS(8000).then(function(){
    _initGIS();
    _showGoogleLoginModal();
  }).catch(function(err){
    console.error('GIS not loaded:', err);
    try{ alert('La librería de Google no se cargó. Refrescá la página y probá de nuevo.'); }catch(e){_logErr("swallow",e);}
  });
}

function _showGoogleLoginModal(){
  var modal = document.getElementById('googleLoginModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'googleLoginModal';
    modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px';
    modal.innerHTML='<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:24px;text-align:center;max-width:340px;width:100%"><div style="font-size:14px;color:#c084fc;font-weight:700;margin-bottom:8px">🔐 Acceso administrador</div><div style="font-size:12px;color:#aaa;margin-bottom:20px">Iniciá sesión con la cuenta autorizada</div><div id="googleSignInButton" style="display:flex;justify-content:center;margin-bottom:16px"></div><button onclick="document.getElementById(\'googleLoginModal\').remove()" style="background:none;border:1px solid #666;color:#aaa;padding:8px 16px;border-radius:6px;font-size:12px;cursor:pointer;font-family:inherit">Cancelar</button></div>';
    document.body.appendChild(modal);
  } else {
    modal.style.display='flex';
  }
  google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    {type:'standard', theme:'filled_blue', size:'large', text:'signin_with', shape:'rectangular', logo_alignment:'left', width:280}
  );
}

function logoutAdmin(){
  // Sign out of Firebase + revoke GIS auto-select to force account picker next time
  if(typeof google!=='undefined' && google.accounts && google.accounts.id){
    try{ google.accounts.id.disableAutoSelect(); }catch(e){_logErr("swallow",e);}
  }
  auth.signOut().then(function(){
    // Redirect to clean public URL
    window.location.href = window.location.pathname;
  });
}

function applyAuthMode(){
  // Toggle UI between admin (editor) and public (shared) mode
  var eb = document.getElementById('mapEditBar');
  var cfgBtn = document.getElementById('btnConfig');
  var modal = document.getElementById('sharedModal');
  var glModal = document.getElementById('googleLoginModal');
  var loginBtn = document.getElementById('btnAdminLogin');
  var logoutBtn = document.getElementById('btnAdminLogout');
  isSuperAdmin = isAdmin && !!auth.currentUser && _isSuperAdmin(auth.currentUser.email);
  if(isAdmin){
    if(eb) eb.style.display='flex';
    document.querySelectorAll('.adminOnly').forEach(function(el){el.style.display='';});
    document.querySelectorAll('.superAdminOnly').forEach(function(el){el.style.display=isSuperAdmin?'':'none';});
    if(cfgBtn) cfgBtn.onclick = function(){openCfg();};
    if(modal) modal.style.display='none';
    if(glModal) glModal.remove();
    if(loginBtn) loginBtn.style.display='none';
    if(logoutBtn) logoutBtn.style.display='';
    if(isSuperAdmin) renderAdminList();
  } else {
    if(eb) eb.style.display='none';
    document.querySelectorAll('.adminOnly').forEach(function(el){el.style.display='none';});
    document.querySelectorAll('.superAdminOnly').forEach(function(el){el.style.display='none';});
    if(cfgBtn) cfgBtn.onclick = function(){reopenGroupSelector();};
    if(loginBtn) loginBtn.style.display='';
    if(logoutBtn) logoutBtn.style.display='none';
  }
}

// ========== ADMIN LIST MANAGEMENT (super-admin only) ==========
function renderAdminList(){
  var container = document.getElementById('adminListContainer');
  if(!container) return;
  var html = '';
  ADMIN_SUPER_EMAILS.forEach(function(email){
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);border-radius:6px;margin-bottom:4px"><span style="font-size:12px;color:#d4af37;word-break:break-all">👑 '+_escapeHtml(email)+'</span><span style="font-size:9px;color:#aaa;flex-shrink:0;margin-left:6px">super-admin</span></div>';
  });
  _adminListFromDB.forEach(function(email){
    if(_isSuperAdmin(email)) return;
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.3);border-radius:6px;margin-bottom:4px"><span style="font-size:12px;color:#c084fc;word-break:break-all">'+_escapeHtml(email)+'</span><button onclick="removeAdminEmail(\''+email.replace(/'/g,"\\'")+'\')" style="background:none;border:none;color:#c0392b;font-size:14px;cursor:pointer;flex-shrink:0;margin-left:6px">🗑️</button></div>';
  });
  if(_adminListFromDB.filter(function(e){return !_isSuperAdmin(e);}).length === 0){
    html += '<div style="font-size:11px;color:#888;text-align:center;padding:8px;font-style:italic">Sin editores adicionales</div>';
  }
  container.innerHTML = html;
}

function addAdminEmail(){
  var input = document.getElementById('newAdminEmail');
  if(!input) return;
  var email = (input.value||'').toLowerCase().trim();
  if(!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)){
    alert('Email inválido. Tiene que ser un correo de Google (gmail.com o Workspace).');
    return;
  }
  if(_isSuperAdmin(email)){ alert('Ese email ya es super-admin.'); input.value=''; return; }
  if(_adminListFromDB.indexOf(email) !== -1){ alert('Ese email ya es editor.'); input.value=''; return; }
  db.ref('admins/' + _emailToKey(email)).set(true).then(function(){
    input.value='';
  }).catch(function(err){
    alert('Error al agregar: '+(err.message||err.code||'desconocido'));
  });
}

async function removeAdminEmail(email){
  if(!await customConfirm('¿Quitar a '+email+' como editor?\n\nVa a perder acceso de edición la próxima vez que use la app.')) return;
  db.ref('admins/' + _emailToKey(email)).remove().catch(function(err){
    alert('Error al quitar: '+(err.message||err.code||'desconocido'));
  });
}

// If URL has ?edit=1 and user isn't already authenticated, auto-open the login modal
(function(){
  var p = new URLSearchParams(window.location.search);
  if(!p.has('edit')) return;
  setTimeout(function(){
    if(!auth.currentUser) loginAsAdmin();
  }, 1500);
})();

// ========== PUSH NOTIFICATIONS (FCM) ==========
var fcmMessaging=null;
var pushSubscribed=false;
var VAPID_KEY='BCTlwjihU000PcnYjnMlRlbZFgG5bo88aTbk-P9gaYflY_xncobn9b85FiWV1RaEKgUxTUTgtF_vTzbjoP_gAMc';

function initPush(){
  try{
    fcmMessaging=firebase.messaging();
    // Foreground message handler
    fcmMessaging.onMessage(function(payload){
      var data=payload.data||{};
      var title=data.title||'Procesión Sonsonate';
      var body=data.body||'Grupo actualizado';
      // Show in-app notification
      var notDiv=document.getElementById('pushNotiBanner');
      if(notDiv){
        notDiv.innerHTML='<b>'+_escapeHtml(title)+'</b><br>'+_escapeHtml(body);
        notDiv.style.display='block';
        setTimeout(function(){notDiv.style.display='none';},5000);
      }
      // Also vibrate
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
    });
  }catch(e){console.log('FCM init error',e);}
}

function subscribePush(){
  if(!('Notification' in window)){alert('Tu navegador no soporta notificaciones');return;}
  // Already denied by browser - show instructions
  if(Notification.permission==='denied'){
    showPermissionHelp();
    return;
  }
  // Already granted - just get token
  if(Notification.permission==='granted'){
    getPushToken();
    return;
  }
  // Never asked - show custom dialog first
  showPushPreDialog();
}

function showPushPreDialog(){
  var d=document.createElement('div');
  d.id='pushPreDialog';
  d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';
  d.innerHTML='<div style="background:#1a1a2e;border:2px solid #7c3aed;border-radius:14px;padding:20px;max-width:300px;text-align:center">'
    +'<div style="font-size:40px;margin-bottom:10px">🔔</div>'
    +'<div style="font-size:16px;font-weight:700;color:#c084fc;margin-bottom:8px">¿Querés recibir alertas?</div>'
    +'<div style="font-size:13px;color:#ccc;margin-bottom:16px">Te avisamos cuando tu grupo esté por cargar, aunque la app esté cerrada.</div>'
    +'<button onclick="closePushPreDialog();requestBrowserPush()" style="width:100%;padding:12px;border:none;border-radius:8px;background:#7c3aed;color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:8px;font-family:inherit">Sí, activar alertas</button>'
    +'<button onclick="closePushPreDialog()" style="width:100%;padding:10px;border:1px solid #666;border-radius:8px;background:none;color:#888;font-size:13px;cursor:pointer;font-family:inherit">Ahora no</button>'
    +'</div>';
  document.body.appendChild(d);
}
function closePushPreDialog(){
  var d=document.getElementById('pushPreDialog');if(d)d.remove();
}
function requestBrowserPush(){
  Notification.requestPermission().then(function(perm){
    if(perm==='granted'){
      getPushToken();
    } else {
      showPermissionHelp();
    }
  });
}
function getPushToken(){
  navigator.serviceWorker.ready.then(function(reg){
    return fcmMessaging.getToken({vapidKey:VAPID_KEY,serviceWorkerRegistration:reg});
  }).then(function(token){
    if(!token) return;
    pushSubscribed=true;
    try{localStorage.setItem('pushToken',token);}catch(e){_logErr("swallow",e);}
    updatePushToken();
    updatePushUI();
    alert('✅ ¡Notificaciones activadas! Te avisaremos cuando tu grupo esté por cargar.');
  }).catch(function(err){
    console.log('Push token error',err);
    alert('Error: '+err.message);
  });
}
function showPermissionHelp(){
  var msg='⚠️ Las notificaciones están bloqueadas.\n\n';
  msg+='Para activarlas:\n';
  msg+='1. Tocá el candado 🔒 junto a la URL\n';
  msg+='2. Tocá "Permisos" o "Configuración del sitio"\n';
  msg+='3. Cambiá Notificaciones a "Permitir"\n';
  msg+='4. Recargá la página y volvé a intentar';
  alert(msg);
}

function updatePushToken(){
  var token;try{token=localStorage.getItem('pushToken');}catch(e){_logErr("swallow",e);}
  if(!token) return;
  var grupo=+document.getElementById('cG').value||5;
  var tipo=+document.getElementById('cType').value||21;
  var saca=daySaca[currentDay]||19;
  var watchSel=document.getElementById('pushWatchGrp');
  var watchGrp=watchSel?(+watchSel.value||0):0;
  var actualWatch=watchGrp||grupo;
  var grpCount=(tipo===27)?getMujCount():getHomCount();
  var alertBefore=+(document.getElementById('pushAlertBefore')?document.getElementById('pushAlertBefore').value:3);
  var tot=positions.length||44;
  
  // Find ALL cambios where this grupo carries
  var misCambios=[];
  for(var c=1;c<=tot;c++){
    var grpAtC=((saca-1+c-1)%grpCount)+1;
    if(grpAtC===actualWatch) misCambios.push(c);
  }
  
  // Find the NEXT cambio that hasn't passed yet
  var currentCambio=currentGrupoActual||0;
  var nextCambio=0;
  for(var j=0;j<misCambios.length;j++){
    if(misCambios[j]>currentCambio){
      nextCambio=misCambios[j];
      break;
    }
  }
  // If all passed, no alert needed
  var alertAtCambio=nextCambio>0?Math.max(1,nextCambio-alertBefore):0;
  
  db.ref('pushTokens/'+token.substring(0,20)).set({
    token:token,
    grupo:grupo,
    tipo:tipo,
    watchGrp:actualWatch,
    alertAtCambio:alertAtCambio,
    alertCambio:nextCambio,
    alertBefore:alertBefore,
    allCambios:misCambios,
    day:currentDay,
    t:Date.now()
  });
  try{localStorage.setItem('pushWatchGrp',watchGrp);localStorage.setItem('pushAlertBefore',alertBefore);}catch(e){_logErr("swallow",e);}
}

function updatePushUI(){
  var btn=document.getElementById('pushSubBtn');
  if(!btn) return;
  if(pushSubscribed||localStorage.getItem('pushToken')){
    btn.textContent='🔕 Desactivar notificaciones';
    btn.style.background='rgba(244,67,54,.15)';
    btn.style.borderColor='#f44336';
    btn.style.color='#f44336';
    btn.onclick=unsubscribePush;
    pushSubscribed=true;
    var ps=document.getElementById('pushSettings');
    if(ps) ps.style.display='block';
    // Populate watch group selector
    var sel=document.getElementById('pushWatchGrp');
    if(sel&&sel.options.length<=1){
      var grpCount=(+document.getElementById('cType').value===27)?getMujCount():getHomCount();
      for(var g=1;g<=grpCount;g++){
        var opt=document.createElement('option');
        opt.value=g;opt.textContent='Grupo #'+g;
        sel.appendChild(opt);
      }
      var saved=localStorage.getItem('pushWatchGrp');
      if(saved) sel.value=saved;
    }
    var abSel=document.getElementById('pushAlertBefore');
    var savedAb=localStorage.getItem('pushAlertBefore');
    if(abSel&&savedAb) abSel.value=savedAb;
  } else {
    btn.textContent='🔔 Activar notificaciones push';
    btn.style.background='rgba(124,58,237,.15)';
    btn.style.borderColor='#7c3aed';
    btn.style.color='#c084fc';
    btn.onclick=subscribePush;
    var ps2=document.getElementById('pushSettings');
    if(ps2) ps2.style.display='none';
  }
}

function unsubscribePush(){
  var token;try{token=localStorage.getItem('pushToken');}catch(e){_logErr("swallow",e);}
  if(token){
    db.ref('pushTokens/'+token.substring(0,20)).remove();
  }
  try{
    localStorage.removeItem('pushToken');
    localStorage.removeItem('pushWatchGrp');
    localStorage.removeItem('pushAlertBefore');
  }catch(e){_logErr("swallow",e);}
  pushSubscribed=false;
  updatePushUI();
  alert('✅ Notificaciones desactivadas');
}

function syncPushPrefs(){updatePushToken();}

// Auto-init push
setTimeout(function(){
  initPush();
  // Check if already subscribed
  if(localStorage.getItem('pushToken')) pushSubscribed=true;
},2000);

// ========== LIVE BROADCAST (runs first for everyone) ==========
db.ref('broadcast').on('value',function(snap){
  var d=snap.val();
  var banner=document.getElementById('broadcastBanner');
  if(!banner) return;
  if(!d||!d.text){
    banner.style.display='none';
    return;
  }
  document.getElementById('broadcastText').textContent='📢 '+d.text;
  var ago=Math.round((Date.now()-d.t)/60000);
  document.getElementById('broadcastTime').textContent=ago<1?'Ahora mismo':ago<60?'Hace '+ago+' min':'Hace '+Math.floor(ago/60)+'h '+ago%60+'m';
  banner.style.display='block';
});

let urnaMarkers={jesus:null,virgen:null};
let urnaActive={jesus:false,virgen:false};
let urnaWatchIds={jesus:null,virgen:null};
let wakeLock=null;

function showUrnaButton(){
  if(!isShared){
    document.getElementById('bUrna').style.display='block';
    document.getElementById('bUrnaV').style.display='block';
  }
}

async function requestWakeLock(){
  try{if('wakeLock' in navigator){wakeLock=await navigator.wakeLock.request('screen');}}catch(e){_logErr("swallow",e);}
}
function releaseWakeLock(){
  if(wakeLock){wakeLock.release();wakeLock=null;}
}

function toggleUrna(tipo){
  const btnId=tipo==='jesus'?'bUrna':'bUrnaV';
  const label=tipo==='jesus'?'✝️ Anda Jesús':'👑 Anda Virgen';
  const activeLabel=tipo==='jesus'?'✝️ Jesús ACTIVA':'👑 Virgen ACTIVA';
  const bgOff=tipo==='jesus'?'rgba(220,38,38,.8)':'rgba(59,130,246,.8)';
  const bgOn=tipo==='jesus'?'rgba(220,38,38,1)':'rgba(59,130,246,1)';

  if(urnaActive[tipo]){
    if(urnaWatchIds[tipo]!==null){navigator.geolocation.clearWatch(urnaWatchIds[tipo]);urnaWatchIds[tipo]=null;}
    db.ref(tipo).remove();
    urnaActive[tipo]=false;
    saveUrnaState();
    if(!urnaActive.jesus&&!urnaActive.virgen){releaseWakeLock();stopKeepAlive();}
    document.getElementById(btnId).style.background=bgOff;
    document.getElementById(btnId).textContent=label;
    return;
  }
  if(!navigator.geolocation){alert('GPS no disponible');return;}
  
  db.ref(tipo).once('value',async function(snap){
    const d=snap.val();
    if(d&&d.t&&Date.now()-d.t<120000){
      if(!await customConfirm('⚠️ '+label+' ya está siendo rastreada. ¿Tomar control?')) return;
    }
    urnaActive[tipo]=true;
    saveUrnaState();
    requestWakeLock();
    startKeepAlive();
    document.getElementById(btnId).style.background=bgOn;
    document.getElementById(btnId).textContent=activeLabel;
    startGPSWatch(tipo);
  });
}

function startGPSWatch(tipo){
  if(urnaWatchIds[tipo]!==null){navigator.geolocation.clearWatch(urnaWatchIds[tipo]);}
  var lastWrite={};
  urnaWatchIds[tipo]=navigator.geolocation.watchPosition(function(pos){
    var now=Date.now();
    if(lastWrite[tipo]&&now-lastWrite[tipo]<8000) return;
    lastWrite[tipo]=now;
    if(tipo==='jesus') window._lastRealGPS=now;
    db.ref(tipo).set({lat:pos.coords.latitude,lng:pos.coords.longitude,t:now});
  },function(err){
    console.log(tipo+' GPS error',err);
    // Auto-retry on error
    setTimeout(function(){
      if(urnaActive[tipo]) startGPSWatch(tipo);
    },5000);
  },{enableHighAccuracy:true, maximumAge:10000, timeout:15000});
}

// Save/restore GPS tracking state
function saveUrnaState(){
  try{localStorage.setItem('urnaActive',JSON.stringify(urnaActive));}catch(e){_logErr("swallow",e);}
}

function restoreUrnaState(){
  try{
    var saved=localStorage.getItem('urnaActive');
    if(!saved) return;
    var state=JSON.parse(saved);
    if(state.jesus){
      urnaActive.jesus=true;
      requestWakeLock();
      startKeepAlive();
      startGPSWatch('jesus');
      var btn=document.getElementById('bUrna');
      if(btn){btn.style.background='rgba(220,38,38,1)';btn.textContent='✝️ Jesús ACTIVA';}
    }
    if(state.virgen){
      urnaActive.virgen=true;
      requestWakeLock();
      startKeepAlive();
      startGPSWatch('virgen');
      var btn2=document.getElementById('bUrnaV');
      if(btn2){btn2.style.background='rgba(59,130,246,1)';btn2.textContent='👑 Virgen ACTIVA';}
    }
  }catch(e){_logErr("swallow",e);}
}

// Keep-alive: prevent browser from killing the tab when screen is off
var _keepAliveTimer=null;
function startKeepAlive(){
  if(_keepAliveTimer) return;
  // Ping Firebase every 30s to keep connection alive
  _keepAliveTimer=setInterval(function(){
    if(!urnaActive.jesus&&!urnaActive.virgen){stopKeepAlive();return;}
    db.ref('online/gps_'+Date.now()%10000).set(Date.now());
  },30000);
  // Show persistent notification to keep service worker alive
  if('Notification' in window&&Notification.permission==='granted'){
    navigator.serviceWorker.ready.then(function(reg){
      reg.showNotification('📡 Rastreando procesión',{
        body:'GPS activo — no cierre la app',
        icon:'./icon-192.png',
        tag:'gps-active',
        requireInteraction:true,
        silent:true
      });
    }).catch(function(){});
  }
  showBlackScreenBtn();
}
function showBlackScreenBtn(){
  if(document.getElementById('blackScreenBtn')) return;
  var btn=document.createElement('div');
  btn.id='blackScreenBtn';
  btn.innerHTML='🌑 Pantalla negra';
  btn.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);z-index:3002;background:rgba(0,0,0,.9);color:#4CAF50;font-size:13px;font-weight:700;padding:10px 20px;border-radius:22px;border:2px solid #4CAF50;cursor:pointer';
  btn.onclick=toggleBlackScreen;
  document.body.appendChild(btn);
}
function removeBlackScreenBtn(){
  var btn=document.getElementById('blackScreenBtn');if(btn)btn.remove();
  var ov=document.getElementById('blackScreenOverlay');if(ov)ov.remove();
}
function toggleBlackScreen(){
  var ov=document.getElementById('blackScreenOverlay');
  if(ov){ov.remove();return;}
  ov=document.createElement('div');
  ov.id='blackScreenOverlay';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent';
  ov.innerHTML='<div style="text-align:center;color:#222;font-size:11px"><div style="font-size:20px;margin-bottom:6px">📡</div>GPS activo<br><span style="font-size:9px">Tocá para volver</span></div>';
  ov.onclick=function(){ov.remove();};
  document.body.appendChild(ov);
}
function stopKeepAlive(){
  if(_keepAliveTimer){clearInterval(_keepAliveTimer);_keepAliveTimer=null;}
  // Remove persistent notification
  if(navigator.serviceWorker&&navigator.serviceWorker.ready){
    navigator.serviceWorker.ready.then(function(reg){
      reg.getNotifications({tag:'gps-active'}).then(function(notifs){
        notifs.forEach(function(n){n.close();});
      });
    }).catch(function(){});
  removeBlackScreenBtn();
  }
}

document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='visible'){
    if(urnaActive.jesus||urnaActive.virgen){
      requestWakeLock();
      // Re-check GPS watches are alive
      if(urnaActive.jesus&&urnaWatchIds.jesus===null) startGPSWatch('jesus');
      if(urnaActive.virgen&&urnaWatchIds.virgen===null) startGPSWatch('virgen');
    }
  }
});

// Auto-restore GPS on page load
setTimeout(function(){if(typeof restoreUrnaState==='function')restoreUrnaState();},3000);

function buscarAnda(tipo){
  const m=urnaMarkers[tipo];
  const nombre=tipo==='jesus'?'Jesús':'Virgen';
  const icon=tipo==='jesus'?'🔴':'🔵';
  if(!m){
    alert('⏳ La anda de '+nombre+' no está conectada en este momento');
    return;
  }
  showView(0);
  gmap.setCenter(m.getPosition());gmap.setZoom(18);
  const noti=document.getElementById('noti');
  noti.textContent=icon+' '+nombre+' localizada';
  noti.classList.add('show');
  setTimeout(()=>noti.classList.remove('show'),2000);
}

// ========== GPS AUTO-ADVANCE ==========
var autoAdvanceGPS=false;

// Track progress along the route as a "rail"
var railProgress=0;
var lastAutoAdvance=0;
var aheadCount=0;
var gpsReadings=[];
var virgenCambioGPS=0;
var virgenAheadCount=0;
var virgenLastAdvance=0;
var virgenGpsReadings=[];
var virgenGPSLastUpdate=0;
var jesusCambioGPS=0;
var jesusAheadCount=0;
var jesusGpsReadings=[]; // Independent Virgen tracking from GPS // collect readings during cooldown for averaging

function getRouteDistances(){
  var dists=[0];
  for(var i=1;i<positions.length;i++){
    var dlat=(positions[i].lat-positions[i-1].lat)*111320;
    var dlng=(positions[i].lng-positions[i-1].lng)*111320*Math.cos(positions[i].lat*Math.PI/180);
    dists.push(dists[i-1]+Math.sqrt(dlat*dlat+dlng*dlng));
  }
  return dists;
}

function projectOnRail(lat,lng){
  if(positions.length<2) return {dist:0,cambio:0};
  var cosLat=Math.cos(lat*Math.PI/180);
  var startSeg=Math.max(0,currentGrupoActual);
  var endSeg=Math.min(positions.length,currentGrupoActual+3);
  var bestDist=Infinity,bestCambio=startSeg;
  for(var i=startSeg;i<endSeg;i++){
    var distM=Math.sqrt(Math.pow((lat-positions[i].lat)*111320,2)+Math.pow((lng-positions[i].lng)*111320*cosLat,2));
    if(distM<bestDist){bestDist=distM;bestCambio=i+1;}
  }
  if(bestDist>80) return {dist:-1,cambio:-1};
  return {dist:bestCambio,cambio:bestCambio,distFromRoute:bestDist};
}

function findNearestCambio(lat,lng){
  if(positions.length<2) return -1;
  gpsReadings.push({lat:lat,lng:lng,t:Date.now()});
  if(gpsReadings.length>20) gpsReadings.shift();
  var recent=gpsReadings.slice(-3);
  var avgLat=0,avgLng=0;
  for(var r=0;r<recent.length;r++){avgLat+=recent[r].lat;avgLng+=recent[r].lng;}
  avgLat/=recent.length;avgLng/=recent.length;
  var cosLat2=Math.cos(avgLat*Math.PI/180);
  var startK=Math.max(0,currentGrupoActual-2);
  var endK=Math.min(positions.length,currentGrupoActual+5);
  var bestD=Infinity,bestP=-1;
  for(var k=startK;k<endK;k++){
    var dk=Math.sqrt(Math.pow((avgLat-positions[k].lat)*111320,2)+Math.pow((avgLng-positions[k].lng)*111320*cosLat2,2));
    if(dk<bestD){bestD=dk;bestP=k;}
  }
  if(bestD>50) return -1;
  if(bestP+1<=currentGrupoActual){aheadCount=0;return -1;}
  aheadCount++;
  if(aheadCount<3) return -1; // 3 confirmations (~30 sec)
  aheadCount=0;
  gpsReadings=[];
  return bestP+1;
}

var rawGpsDots={};
var _smoothTimers={};
function smoothMove(tipo,target){
  var marker=urnaMarkers[tipo];
  if(!marker) return;
  if(_smoothTimers[tipo]) cancelAnimationFrame(_smoothTimers[tipo]);
  var start=marker.getPosition();
  if(!start) return;
  var sLat=start.lat(),sLng=start.lng();
  var tLat=target.lat,tLng=target.lng;
  var dist=Math.abs(tLat-sLat)+Math.abs(tLng-sLng);
  if(dist<0.000001) return;
  // If jump is too big (>500m), skip animation
  if(dist>0.005){marker.setPosition(target);if(marker._ring)marker._ring.setCenter(target);return;}
  var duration=800;
  var startTime=performance.now();
  function step(now){
    if(!urnaMarkers[tipo]){_smoothTimers[tipo]=null;return;}
    var t=Math.min((now-startTime)/duration,1);
    t=1-Math.pow(1-t,2);
    var lat=sLat+(tLat-sLat)*t;
    var lng=sLng+(tLng-sLng)*t;
    urnaMarkers[tipo].setPosition({lat:lat,lng:lng});
    if(urnaMarkers[tipo]._ring) urnaMarkers[tipo]._ring.setCenter({lat:lat,lng:lng});
    if(t<1) _smoothTimers[tipo]=requestAnimationFrame(step);
    else _smoothTimers[tipo]=null;
  }
  _smoothTimers[tipo]=requestAnimationFrame(step);
}
function getAndaIcon(tipo){
  if(tipo==='jesus') return isSEMode?'se-entierro-marker.png':'jesus-marker.png';
  return isSEMode?'se-virgen-marker.png':'maria-marker.png';
}
function getAndaColor(tipo){
  if(isSEMode) return '#d4af37';
  return tipo==='jesus'?'#dc2626':'#3b82f6';
}
function listenAnda(tipo,imgUrl,color,zIdx){
  db.ref(tipo).on('value',function(snap){
    const d=snap.val();
    if(!d||!d.lat||!d.lng||Date.now()-d.t>120000){
      if(urnaMarkers[tipo]){
        if(urnaMarkers[tipo]._ring){urnaMarkers[tipo]._ring.setMap(null);}
        urnaMarkers[tipo].setMap(null);urnaMarkers[tipo]=null;
      }
      if(rawGpsDots[tipo]){rawGpsDots[tipo].setMap(null);rawGpsDots[tipo]=null;}
      return;
    }
    const raw={lat:d.lat,lng:d.lng};
    var isRealGPS=(Date.now()-window._lastRealGPS<GPS_TIMEOUT);
    const ll=isRealGPS?snapToRoute(raw):raw;
    var curIcon=getAndaIcon(tipo);
    var curColor=getAndaColor(tipo);

    if(!urnaMarkers[tipo]&&gmap){
      urnaMarkers[tipo]=new google.maps.Marker({
        position:ll, map:gmap, zIndex:zIdx,
        icon:{
          url:curIcon,
          scaledSize:new google.maps.Size(54,66),
          anchor:new google.maps.Point(27,66)
        }
      });
      urnaMarkers[tipo]._iconUrl=curIcon;
      urnaMarkers[tipo]._ring=new google.maps.Circle({
        center:ll,map:gmap,radius:15,
        fillColor:curColor,fillOpacity:0.25,
        strokeColor:curColor,strokeWeight:5,strokeOpacity:0.9,
        zIndex:zIdx-1
      });
    } else if(urnaMarkers[tipo]){
      smoothMove(tipo,ll);
      // Update icon if SE mode changed
      if(urnaMarkers[tipo]._iconUrl!==curIcon){
        urnaMarkers[tipo].setIcon({url:curIcon,scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)});
        urnaMarkers[tipo]._iconUrl=curIcon;
        if(urnaMarkers[tipo]._ring){urnaMarkers[tipo]._ring.setOptions({fillColor:curColor,strokeColor:curColor});}
      }
    }
    // Show small raw GPS dot when real GPS is active (to see if drifting)
    if(isRealGPS&&tipo==='jesus'&&!isShared){
      if(!rawGpsDots[tipo]&&gmap){
        rawGpsDots[tipo]=new google.maps.Circle({
          center:raw,map:gmap,radius:4,
          fillColor:'#ff0',fillOpacity:0.8,
          strokeColor:'#ff0',strokeWeight:1,strokeOpacity:0.6,
          zIndex:zIdx+1
        });
      } else if(rawGpsDots[tipo]){
        rawGpsDots[tipo].setCenter(raw);
        rawGpsDots[tipo].setMap(gmap);
      }
    } else if(rawGpsDots[tipo]){
      rawGpsDots[tipo].setMap(null);
    }
    // GPS Auto-advance: if this is the main anda (jesus) and auto is on
    if(tipo==='jesus'&&autoAdvanceGPS&&!isShared){
      window._lastRealGPS=Date.now();
      var nearCambio=findNearestCambio(ll.lat,ll.lng);
      if(nearCambio>0&&nearCambio>currentGrupoActual){
        // Track real rhythm (for display only, doesn't overwrite cMn)
        if(!window._grupoTimestamps) window._grupoTimestamps=[];
        window._grupoTimestamps.push({cambio:nearCambio,t:Date.now()});
        if(window._grupoTimestamps.length>=3){
          var ts=window._grupoTimestamps;
          var totalTime=ts[ts.length-1].t-ts[0].t;
          var totalCambios=ts[ts.length-1].cambio-ts[0].cambio;
          if(totalCambios>0){
            window._realRhythm=Math.round((totalTime/(totalCambios*60000))*10)/10;
          }
          if(window._grupoTimestamps.length>10) window._grupoTimestamps=window._grupoTimestamps.slice(-5);
        }
        currentGrupoActual=nearCambio;
        var sacaH=daySaca[currentDay]||16;
        var tot=positions.length;
        var grp=((sacaH-1+nearCambio-1)%getHomCount())+1;
        var nombre=nearCambio<=changes.length?changes[nearCambio-1].n||'':'';
        liveGrupoData={cambio:nearCambio,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
        try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
        saveAll();
        updateGrupoUI();
        db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
        if(typeof renderLive==='function') renderLive();
        // Sync auto-time offset so it continues from here if GPS drops
        if(window._autoTimeRunning){
          var _stG=getStartTime();
          var mnG=+$('cMn').value||6;
          var dateStrG=dayDates[currentDay]||localDateStr(new Date());
          var startTimeG=new Date(dateStrG+'T'+String(_stG.h).padStart(2,'0')+':'+String(_stG.m).padStart(2,'0')+':00').getTime();
          var shouldBeG=startTimeG+(nearCambio-1)*mnG*60000;
          window._autoTimeOffset=Math.round((shouldBeG-Date.now())/60000);
          if(typeof syncAutoState==='function') syncAutoState();
        }
      }
    }
  });
}
listenAnda('jesus',isSEMode?'se-entierro-marker.png':'jesus-marker.png',isSEMode?'#d4af37':'#dc2626',10000);
listenAnda('virgen',isSEMode?'se-virgen-marker.png':'maria-marker.png',isSEMode?'#d4af37':'#3b82f6',9998);

// AHSEC GPS tracking for SE mode
// ========== VIBRATION ALERTS ==========
var vibrateBeforeN=+(localStorage.getItem('vibrateBeforeN')||0);
function setVibrateN(n){
  vibrateBeforeN=n;
  localStorage.setItem('vibrateBeforeN',n);
}
function populateAlertSelects(){
  // Populate vibrate select
  var vSel=document.getElementById('vibrateCfg');
  if(vSel&&vSel.options.length<=1){
    for(var vn=1;vn<=10;vn++){
      var opt=document.createElement('option');opt.value=vn;opt.textContent=vn+' cambio'+(vn>1?'s':'')+' antes';
      vSel.appendChild(opt);
    }
  }
  if(vSel) vSel.value=vibrateBeforeN;
  // Populate watch group select
  var wSel=document.getElementById('watchGrpCfg');
  var maxGrp=(+$('cType').value===27)?getMujCount():getHomCount();
  if(wSel){
    var curVal=+(localStorage.getItem('watchGroup')||0);
    while(wSel.options.length>1) wSel.remove(1);
    for(var wg=1;wg<=maxGrp;wg++){
      var opt2=document.createElement('option');opt2.value=wg;opt2.textContent='Grupo #'+wg;
      wSel.appendChild(opt2);
    }
    wSel.value=curVal;
  }
}
function checkVibrate(cambio){
  if(!window.myCarries||!myCarries.length) return;
  // 1. Carry alert
  if(vibrateBeforeN){
    var effC=cambio;
    for(var i=0;i<myCarries.length;i++){
      if(myCarries[i].num>effC){
        var diff=myCarries[i].num-effC;
        if(diff<=vibrateBeforeN){
          if(navigator.vibrate) navigator.vibrate([300,100,300,100,500]);
          if('Notification' in window){
            if(Notification.permission==='granted'){
              try{new Notification('🔔 ¡Prepárate!',{body:'Tu cargada #'+myCarries[i].ci+' está a '+diff+' cambio'+(diff>1?'s':'')+' · Grupo #'+myCarries[i].grp,icon:isSEMode?'se-icon-192.png':'icon-192.png',tag:'cargada-'+myCarries[i].ci,renotify:true});}catch(e){_logErr("swallow",e);}
            } else if(Notification.permission!=='denied'){
              Notification.requestPermission();
            }
          }
        }
        break;
      }
    }
  }
  // 2. Watch group alert
  var watchGrp=+(localStorage.getItem('watchGroup')||0);
  if(watchGrp>0&&changes.length>0){
    var saca=isSEMode?5:(window.daySaca?window.daySaca[window.currentDay]:16);
    var grupoCnt=isSEMode?getHomCount():getHomCount();
    var currentGrp=((saca-1+cambio-1)%grupoCnt)+1;
    // How many cambios until watchGrp appears
    var found=false;
    for(var w=cambio;w<Math.min(cambio+10,changes.length+1);w++){
      var wGrp=((saca-1+w-1)%grupoCnt)+1;
      if(wGrp===watchGrp){
        var wDiff=w-cambio;
        if(wDiff<=10&&wDiff>=0){
          if(navigator.vibrate) navigator.vibrate([200,100,200,100,200,100,400]);
          if('Notification' in window&&Notification.permission==='granted'){
            try{new Notification('👁️ Grupo #'+watchGrp+(wDiff===0?' ¡AHORA!':' en '+wDiff+' cambio'+(wDiff>1?'s':'')),{body:wDiff===0?'El grupo que vigilás está cargando ahora':'Faltan '+wDiff+' cambio'+(wDiff>1?'s':'')+' para el Grupo #'+watchGrp,icon:isSEMode?'se-icon-192.png':'icon-192.png',tag:'watch-'+watchGrp,renotify:true});}catch(e){_logErr("swallow",e);}
          }
          found=true;
          break;
        }
      }
    }
  }
}
// Request notification permission on first interaction
document.addEventListener('click',function _reqNot(){
  if('Notification' in window&&Notification.permission==='default') Notification.requestPermission();
  document.removeEventListener('click',_reqNot);
},{once:true});

var _isSE=new URLSearchParams(window.location.search).has('se');
if(_isSE){
  // Fetch GPS positions only (not full database)
  function fetchAHSECGPS(){
    try{
      // Fetch SE position
      var xhr=new XMLHttpRequest();
      xhr.open('GET','https://bd-recorrido-ahsec-default-rtdb.firebaseio.com/latitud.json?_='+Date.now(),true);
      xhr.timeout=5000;
      xhr.onload=function(){
        if(xhr.status!==200){var el=document.getElementById('ahsecStatus');if(el) el.textContent='⚰️ AHSEC HTTP:'+xhr.status;return;}
        var lat=JSON.parse(xhr.responseText);
        var el0=document.getElementById('ahsecStatus');
        if(!lat||lat===0){if(el0) el0.textContent='⚰️ SE: sin señal GPS (lat='+lat+')';return;}
        // Now fetch longitude
        var xhr2=new XMLHttpRequest();
        xhr2.open('GET','https://bd-recorrido-ahsec-default-rtdb.firebaseio.com/longitud.json?_='+Date.now(),true);
        xhr2.timeout=5000;
        xhr2.onload=function(){
          if(xhr2.status!==200) return;
          var lng=JSON.parse(xhr2.responseText);
          if(!lng) return;
          var ll={lat:+lat,lng:+lng};
          // Update SE marker
          if(gmap){
            if(!urnaMarkers.jesus){
              urnaMarkers.jesus=new google.maps.Marker({position:ll,map:gmap,zIndex:10000,icon:{url:'se-entierro-marker.png',scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)}});
              urnaMarkers.jesus._ring=new google.maps.Circle({center:ll,map:gmap,radius:15,fillColor:'#d4af37',fillOpacity:0.25,strokeColor:'#d4af37',strokeWeight:5,strokeOpacity:0.9,zIndex:9999});
            } else {
              urnaMarkers.jesus.setPosition(ll);
              if(urnaMarkers.jesus._ring) urnaMarkers.jesus._ring.setCenter(ll);
            }
            // GPS tracking for banner (only when GPS Auto is ON)
            if(autoAdvanceGPS&&positions.length>2){
              jesusGpsReadings.push({lat:ll.lat,lng:ll.lng});
              if(jesusGpsReadings.length>20) jesusGpsReadings.shift();
              var jRecent=jesusGpsReadings.slice(-3);
              var jAvgLat=0,jAvgLng=0;
              for(var jr=0;jr<jRecent.length;jr++){jAvgLat+=jRecent[jr].lat;jAvgLng+=jRecent[jr].lng;}
              jAvgLat/=jRecent.length;jAvgLng/=jRecent.length;
              if(jesusCambioGPS===0){
                var cosLatJI=Math.cos(jAvgLat*Math.PI/180);
                var bestJI=Infinity,bestJCI=0;
                for(var jii=0;jii<positions.length;jii++){
                  var dji=Math.sqrt(Math.pow((jAvgLat-positions[jii].lat)*111320,2)+Math.pow((jAvgLng-positions[jii].lng)*111320*cosLatJI,2));
                  if(dji<bestJI){bestJI=dji;bestJCI=jii+1;}
                }
                if(bestJI<80){
                  jesusCambioGPS=bestJCI;
                  if(!isShared){
                    currentGrupoActual=bestJCI;
                    var sacaH=5;var tot=positions.length;
                    var grp=((sacaH-1+bestJCI-1)%getHomCount())+1;
                    var nombre=bestJCI<=changes.length?changes[bestJCI-1].n||'':'';
                    liveGrupoData={cambio:bestJCI,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[4]||6,t:Date.now()};
                    currentDay=4;
                    db.ref('grupoActual/day4').set(liveGrupoData);
                  }
                  if(typeof renderLive==='function') renderLive();
                }
              } else {
                var nextJIdx=jesusCambioGPS;
                if(nextJIdx<positions.length){
                  var cosLatJ2=Math.cos(jAvgLat*Math.PI/180);
                  var bestJD=Infinity,bestJP=nextJIdx;
                  for(var jk=nextJIdx;jk<Math.min(positions.length,nextJIdx+3);jk++){
                    var djk=Math.sqrt(Math.pow((jAvgLat-positions[jk].lat)*111320,2)+Math.pow((jAvgLng-positions[jk].lng)*111320*cosLatJ2,2));
                    if(djk<bestJD){bestJD=djk;bestJP=jk;}
                  }
                  if(bestJD<=50&&bestJP>=nextJIdx){
                    jesusAheadCount++;
                    if(jesusAheadCount>=2){
                      jesusCambioGPS=bestJP+1;
                      jesusAheadCount=0;
                      jesusGpsReadings=[];
                      if(!isShared){
                        currentGrupoActual=bestJP+1;
                        var sacaH2=5;var tot2=positions.length;
                        var grp2=((sacaH2-1+jesusCambioGPS-1)%getHomCount())+1;
                        var nombre2=jesusCambioGPS<=changes.length?changes[jesusCambioGPS-1].n||'':'';
                        liveGrupoData={cambio:jesusCambioGPS,grp:grp2,nombre:nombre2,tot:tot2,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[4]||6,t:Date.now()};
                        currentDay=4;
                        db.ref('grupoActual/day4').set(liveGrupoData);
                        updateGrupoUI();
                      }
                      if(typeof renderLive==='function') renderLive();
                    }
                  } else { jesusAheadCount=0; }
                }
              }
            }
          }
          var el=document.getElementById('ahsecStatus');
          if(el) el.textContent='⚰️ SE: '+lat.toFixed(4)+','+lng.toFixed(4);
        };
        xhr2.send();
      };
      xhr.send();
      // Fetch Virgen position
      var xhrV=new XMLHttpRequest();
      xhrV.open('GET','https://bd-recorrido-ahsec-default-rtdb.firebaseio.com/latitud_V.json?_='+Date.now(),true);
      xhrV.timeout=5000;
      xhrV.onload=function(){
        if(xhrV.status!==200) return;
        var latV=JSON.parse(xhrV.responseText);
        if(!latV) return;
        var xhrV2=new XMLHttpRequest();
        xhrV2.open('GET','https://bd-recorrido-ahsec-default-rtdb.firebaseio.com/longitud_V.json?_='+Date.now(),true);
        xhrV2.timeout=5000;
        xhrV2.onload=function(){
          if(xhrV2.status!==200) return;
          var lngV=JSON.parse(xhrV2.responseText);
          if(!lngV) return;
          var llV={lat:+latV,lng:+lngV};
          if(gmap){
            if(!urnaMarkers.virgen){
              urnaMarkers.virgen=new google.maps.Marker({position:llV,map:gmap,zIndex:9998,icon:{url:'se-virgen-marker.png',scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)}});
              urnaMarkers.virgen._ring=new google.maps.Circle({center:llV,map:gmap,radius:15,fillColor:'#3b82f6',fillOpacity:0.25,strokeColor:'#3b82f6',strokeWeight:5,strokeOpacity:0.9,zIndex:9997});
            } else {
              urnaMarkers.virgen.setPosition(llV);
              if(urnaMarkers.virgen._ring) urnaMarkers.virgen._ring.setCenter(llV);
            }
          }
          // Track Virgen GPS (same logic as Jesus)
          if(positions.length>2){
            virgenGpsReadings.push({lat:llV.lat,lng:llV.lng});
            if(virgenGpsReadings.length>20) virgenGpsReadings.shift();
            var vRecent2=virgenGpsReadings.slice(-3);
            var vAvgLat2=0,vAvgLng2=0;
            for(var vr2=0;vr2<vRecent2.length;vr2++){vAvgLat2+=vRecent2[vr2].lat;vAvgLng2+=vRecent2[vr2].lng;}
            vAvgLat2/=vRecent2.length;vAvgLng2/=vRecent2.length;
            if(virgenCambioGPS===0){
              // Init: find nearest point in entire route
              var cosLatVI2=Math.cos(vAvgLat2*Math.PI/180);
              var bestVI2=Infinity,bestVCI2=0;
              for(var vii2=0;vii2<positions.length;vii2++){
                var dvi2=Math.sqrt(Math.pow((vAvgLat2-positions[vii2].lat)*111320,2)+Math.pow((vAvgLng2-positions[vii2].lng)*111320*cosLatVI2,2));
                if(dvi2<bestVI2){bestVI2=dvi2;bestVCI2=vii2+1;}
              }
              if(bestVI2<80){
                virgenCambioGPS=bestVCI2;
                if(typeof renderLive==='function') renderLive();
              }
            } else {
              // Advance: search next 3 points
              var nextVI2=virgenCambioGPS;
              if(nextVI2<positions.length){
                var cosLatV3=Math.cos(vAvgLat2*Math.PI/180);
                var bestVD3=Infinity,bestVP3=nextVI2;
                for(var vk3=nextVI2;vk3<Math.min(positions.length,nextVI2+3);vk3++){
                  var dvk3=Math.sqrt(Math.pow((vAvgLat2-positions[vk3].lat)*111320,2)+Math.pow((vAvgLng2-positions[vk3].lng)*111320*cosLatV3,2));
                  if(dvk3<bestVD3){bestVD3=dvk3;bestVP3=vk3;}
                }
                if(bestVD3<=50&&bestVP3>=nextVI2){
                  virgenAheadCount++;
                  if(virgenAheadCount>=2){
                    virgenCambioGPS=bestVP3+1;
                    virgenAheadCount=0;
                    virgenGpsReadings=[];
                    if(typeof renderLive==='function') renderLive();
                  }
                } else { virgenAheadCount=0; }
              }
            }
          }
          var el=document.getElementById('ahsecStatus');
          if(el) el.textContent=(el.textContent||'')+' · 👑 V: '+latV.toFixed(4)+','+lngV.toFixed(4);
        };
        xhrV2.send();
      };
      xhrV.send();
    }catch(e){_logErr("swallow",e);}
  }
  var ahsEl=document.getElementById('ahsecStatus');if(ahsEl)ahsEl.style.display='block';
  fetchAHSECGPS();
  setInterval(fetchAHSECGPS,10000);
}

// ========== ONLINE COUNTER ==========
// Register presence with heartbeat
const myPresRef=db.ref('online/'+Math.random().toString(36).substr(2,9));
db.ref('.info/connected').on('value',function(snap){
  if(snap.val()===true){
    myPresRef.set(Date.now());
    myPresRef.onDisconnect().remove();
  }
});
// Heartbeat: update timestamp every 30 seconds
setInterval(function(){myPresRef.set(Date.now());},30000);
// Clean stale entries (older than 2 minutes)
function cleanStaleOnline(){
  db.ref('online').once('value',function(snap){
    var d=snap.val();
    if(!d) return;
    var now=Date.now();
    Object.keys(d).forEach(function(k){
      if(now-d[k]>60000){
        try{db.ref('online/'+k).remove();}catch(e){_logErr("swallow",e);}
      }
    });
  });
}
cleanStaleOnline();
setInterval(cleanStaleOnline,30000);
// Listen for count
function showAdminTools(){
  if(!isShared){
    document.getElementById('broadcastInput').style.display='block';
    document.getElementById('onlineCounter').style.display='block';
    var es=document.getElementById('editorStatus');if(es) es.style.display='block';
    db.ref('online').on('value',function(snap){
      var d=snap.val();
      if(!d){document.getElementById('onlineCounter').textContent='👥 0 conectados';return;}
      var now=Date.now();
      var count=Object.keys(d).filter(function(k){return now-d[k]<60000;}).length;
      document.getElementById('onlineCounter').textContent='👥 '+count+' conectado'+(count!==1?'s':'')+' ahora';
    });
  }
}

// ========== LIVE BROADCAST ==========
function sendBroadcast(){
  const msg=document.getElementById('broadcastMsg').value.trim();
  if(!msg) return;
  db.ref('broadcast').set({text:msg,t:Date.now()});
  document.getElementById('broadcastMsg').value='';
}
function clearBroadcast(){
  db.ref('broadcast').remove();
}

// ========== GRUPO ACTUAL (admin marks current group) ==========
let currentGrupoActual=0;
var liveGrupoData=null;
var virgenDesfase=5;
var virgenMovidos=0;
var virgenMn=0; // 0 = same as Jesus, >0 = independent rhythm

function changeVirgenMn(delta){
  var current=virgenMn||+$('cMn').value||6;
  virgenMn=Math.max(1,Math.min(20,current+delta));
  if(liveGrupoData){liveGrupoData.virgenMn=virgenMn;}
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  if(typeof renderLive==='function') renderLive();
}
var daySacaMuj=[19,27,13,22,6]; // saca de mujeres por día

function loadGrupoFromStorage(){
  try{
    var savedGrupo=localStorage.getItem('grupoActual_day'+currentDay);
    if(savedGrupo){
      var sg=JSON.parse(savedGrupo);
      if(sg&&sg.cambio){currentGrupoActual=sg.cambio;liveGrupoData=sg;}
      if(sg&&sg.desfase!==undefined) virgenDesfase=sg.desfase;
      if(sg&&sg.movidos!==undefined) virgenMovidos=sg.movidos;
      if(sg&&sg.virgenMn) virgenMn=sg.virgenMn;
    }
  }catch(e){_logErr("swallow",e);}
}

var cronoInterval=null;

function updateCrono(){
  var el=document.getElementById('grupoCrono');
  var upEl=document.getElementById('grupoLastUpdate');
  if(!el) return;
  if(!liveGrupoData||!liveGrupoData.t||liveGrupoData.cambio===0){
    el.textContent='⏱ 0:00';
    if(upEl) upEl.textContent='';
    return;
  }
  var elapsed=Math.floor((Date.now()-liveGrupoData.t)/1000);
  var min=Math.floor(elapsed/60);
  var sec=elapsed%60;
  el.textContent='⏱ '+min+':'+(sec<10?'0':'')+sec;
  if(upEl){
    var d=new Date(liveGrupoData.t);
    var h=d.getHours(),m=d.getMinutes();
    var h12=((h-1)%12)+1;if(h12<=0)h12+=12;
    var ampm=h>=12&&h<24?'PM':'AM';
    upEl.textContent='Última actualización: '+h12+':'+(m<10?'0':'')+m+' '+ampm;
  }
}

function startCrono(){
  if(cronoInterval) clearInterval(cronoInterval);
  cronoInterval=setInterval(updateCrono,1000);
}
startCrono();

function advanceGrupo(delta){
  if(changes.length===0&&positions.length>0) calc();
  var tot=changes.length;
  if(tot===0) tot=positions.length;
  if(tot===0) return;
  var maxCambio=tot+virgenDesfase;
  currentGrupoActual=Math.max(0,Math.min(maxCambio,currentGrupoActual+delta));
  var sacaH=daySaca[currentDay]||17;
  var grp=0,nombre='';
  if(currentGrupoActual>0&&currentGrupoActual<=changes.length){
    grp=((sacaH-1+currentGrupoActual-1)%getHomCount())+1;
    nombre=(currentGrupoActual<=changes.length&&changes[currentGrupoActual-1])?changes[currentGrupoActual-1].n||'':'';
  } else if(currentGrupoActual>0){
    grp=((sacaH-1+Math.min(currentGrupoActual,tot)-1)%getHomCount())+1;
  }
  liveGrupoData={cambio:currentGrupoActual,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
  saveAll();
  updateGrupoUI();
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  // Recalculate auto-time offset so auto follows from this position
  if(window._autoTimeRunning&&currentGrupoActual>0){
    var _stA=getStartTime();var h2=_stA.h;
    var mn2=+$('cMn').value||6;
    var dateStr2=dayDates[currentDay]||new Date().toISOString().slice(0,10);
    var startTime2=new Date(dateStr2+'T'+String(_stA.h).padStart(2,'0')+':'+String(_stA.m).padStart(2,'0')+':00').getTime();
    // What time SHOULD it be for this cambio?
    var shouldBeTime=startTime2+(currentGrupoActual-1)*mn2*60000;
    // Offset = difference between "should be" and actual now
    window._autoTimeOffset=Math.round((shouldBeTime-Date.now())/60000);
    if(typeof syncAutoState==='function') syncAutoState();
  }
}

async function setGrupoManual(){
  var tot=changes.length;
  if(tot===0) tot=positions.length;
  var input=await customPrompt('En que cambio van? (1 al '+tot+')');
  if(!input) return;
  var num=parseInt(input);
  if(isNaN(num)||num<0||num>tot){alert('Numero invalido');return;}
  currentGrupoActual=num;
  var sacaH=daySaca[currentDay]||17;
  var grp=0,nombre='';
  if(num>0&&num<=changes.length){grp=((sacaH-1+num-1)%getHomCount())+1;nombre=changes[num-1].n||'';}
  liveGrupoData={cambio:num,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
  saveAll();
  updateGrupoUI();
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  if(typeof renderLive==='function') renderLive();
  if(window._autoTimeRunning&&num>0){
    var _stB=getStartTime();var h3=_stB.h;
    var mn3=+$('cMn').value||6;
    var dateStr3=dayDates[currentDay]||localDateStr(new Date());
    var startTime3=new Date(dateStr3+'T'+String(_stB.h).padStart(2,'0')+':'+String(_stB.m).padStart(2,'0')+':00').getTime();
    var shouldBeTime3=startTime3+(num-1)*mn3*60000;
    window._autoTimeOffset=Math.round((shouldBeTime3-Date.now())/60000);
    if(typeof syncAutoState==='function') syncAutoState();
  }
}

function changeDesfase(delta){
  virgenDesfase=Math.max(1,Math.min(30,virgenDesfase+delta));
  if(liveGrupoData){liveGrupoData.desfase=virgenDesfase;}
  var el=document.getElementById('desfaseNum');
  if(el) el.textContent=virgenDesfase;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  updateGrupoUI();
  if(typeof renderLive==='function') renderLive();
}

function changeMovidos(delta){
  virgenMovidos=virgenMovidos+delta;
  if(liveGrupoData){liveGrupoData.movidos=virgenMovidos;}
  var el=document.getElementById('movidosNum');
  if(el) el.textContent=(virgenMovidos>0?'+':'')+virgenMovidos;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  updateGrupoUI();
  setTimeout(function(){if(typeof renderLive==='function') renderLive();},100);
}

function updateGrupoUI(){
  if(!changes||changes.length===0) return;
  var tot=changes.length;
  // Update popup controls if open
  if($('cfgP')&&$('cfgP').style.display==='block'){
    updateAdminLiveControls();
  }
  updateCrono();
  updateBanners();
}
// ========== SINGLE BANNER WRITER ==========
function updateBanners(){
  var container=document.getElementById('bannersContainer');
  if(!container) return;
  var cambio=(liveGrupoData&&liveGrupoData.cambio)?liveGrupoData.cambio:0;
  var tot=positions.length||changes.length||147;
  var isMuj=(+$('cType').value===27);
  var isPast=isDayPast(currentDay);
  var procDone=(cambio>=tot&&tot>0)||isPast;
  
  // Create banner HTML if not exists or mode changed
  var existingBanner=document.getElementById('grupoActualBanner');
  if(existingBanner&&window._bannerSEMode!==isSEMode){
    container.innerHTML='';existingBanner=null;
  }
  if(!existingBanner){
    window._bannerSEMode=isSEMode;
    var jLabel1=isSEMode?'Santo Entierro':'Jesús Nazareno';
    var vLabel=isSEMode?'Virgen Dolorosa':'María Santísima';
    var jImg=isSEMode?'se-entierro.jpg':'jesus.jpg';
    var vImg=isSEMode?'se-virgen.jpg':'maria.jpg';
    // Main banner = user's type (full with image)
    // Secondary = other type (slim line)
    var mainLabel=isMuj?vLabel:jLabel1;
    var mainImg=isMuj?vImg:jImg;
    var mainColor=isMuj?'59,130,246':'192,132,252';
    var mainTextColor=isMuj?'#93c5fd':'#c084fc';
    var mainId=isMuj?'Virgen':'Actual';
    var secId=isMuj?'Actual':'Virgen';
    var secLabel=isMuj?jLabel1:vLabel;
    var secIcon=isMuj?'\u271d\ufe0f':'\ud83d\udc51';
    var secColor=isMuj?'#c084fc':'#93c5fd';
    var mainHtml='<div id="grupo'+mainId+'Banner" onclick="buscarAnda(\''+(isMuj?'virgen':'jesus')+'\'" style="cursor:pointer;display:flex;align-items:stretch;border-radius:8px;overflow:hidden;background:rgba('+mainColor+',.12);border:1px solid rgba('+mainColor+',.3);margin-bottom:3px">'
      +'<img src="'+mainImg+'" style="width:50px;object-fit:cover;flex-shrink:0" onerror="this.style.display=\'none\'">'
      +'<div style="flex:1;padding:4px 8px;display:flex;flex-direction:column;justify-content:center">'
      +'<div style="display:flex;align-items:center;gap:4px"><span style="font-size:11px;color:#aaa">'+mainLabel+'</span></div>'
      +'<div style="display:flex;align-items:baseline;gap:4px"><div id="grupo'+mainId+'Text" style="font-size:22px;font-weight:700;color:'+mainTextColor+';line-height:1.1"></div><span id="grupo'+mainId+'Status" style="font-size:10px;color:#aaa"></span></div>'
      +'<div id="grupo'+mainId+'Progress" style="font-size:10px;color:#aaa"></div>'
      +'</div></div>';
    var secHtml='<div id="grupo'+secId+'Banner" onclick="buscarAnda(\''+(isMuj?'jesus':'virgen')+'\'" style="cursor:pointer;display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)">'
      +'<span style="font-size:11px;color:'+secColor+'">'+secIcon+' '+secLabel+'</span>'
      +'<span id="grupo'+secId+'Status" style="font-size:10px;color:#888"></span>'
      +'<span id="grupo'+secId+'Text" style="font-size:15px;font-weight:700;color:'+secColor+'"></span>'
      +'<span id="grupo'+secId+'Progress" style="font-size:9px;color:#666;flex:1;text-align:right"></span>'
      +'</div>';
    container.innerHTML=mainHtml+secHtml;
  }
  
  // Jesus/SE banner
  var jEl=document.getElementById('grupoActualText');
  var jProg=document.getElementById('grupoActualProgress');
  var jLabel2=document.getElementById('grupoActualStatus');
  var jBanner=document.getElementById('grupoActualBanner');
  if(jEl){
    var sacaJ=daySaca[currentDay]||16;
    if(procDone){
      var lastJ=((sacaJ-1+Math.min(cambio,tot)-1)%getHomCount()+1);
      jEl.textContent='✅ Asentó Grupo #'+lastJ;
      if(jProg) jProg.textContent=(currentDay>=3)?((isSEMode)?'Hasta el próximo año, Santo Entierro de Cristo':'Hasta el próximo año, Jesús Nazareno'):'Procesión completada';
      if(jLabel2) jLabel2.textContent='✅ Asentó';
      if(jBanner){jBanner.style.background='rgba(76,175,80,.12)';jBanner.style.borderColor='rgba(76,175,80,.4)';}
    } else if(cambio>0){
      jEl.textContent='Grupo #'+((sacaJ-1+cambio-1)%getHomCount()+1);
      if(jProg) jProg.textContent=(liveGrupoData&&liveGrupoData.nombre||'').replace(/^Grupo\s*\d+\s*/i,'');
      if(jLabel2) jLabel2.textContent='· carga ahora';
      if(jBanner){jBanner.style.background='rgba(192,132,252,.12)';jBanner.style.borderColor='rgba(192,132,252,.3)';}
    } else {
      jEl.textContent='Grupo #'+sacaJ;
      if(jProg) jProg.textContent='Esperando inicio';
      if(jLabel2) jLabel2.textContent='· saca';
      if(jBanner){jBanner.style.background='rgba(192,132,252,.12)';jBanner.style.borderColor='rgba(192,132,252,.3)';}
    }
  }
  // Virgen banner
  var vEl=document.getElementById('grupoVirgenText');
  var vProg2=document.getElementById('grupoVirgenProgress');
  var vBanner=document.getElementById('grupoVirgenBanner');
  var vLabel2=document.getElementById('grupoVirgenStatus');
  if(vEl){
    if(procDone){
      var sacaM2=liveGrupoData?liveGrupoData.sacaMuj||daySacaMuj[currentDay]:daySacaMuj[currentDay]||22;
      var mov2=liveGrupoData?liveGrupoData.movidos||0:0;
      var lastM2=(((sacaM2-1+Math.min(cambio,tot)-1-mov2)%getMujCount())+getMujCount())%getMujCount()+1;
      vEl.textContent='✅ Asentó Grupo #'+lastM2;
      if(vProg2) vProg2.textContent=(currentDay>=3)?'Hasta el próximo año':'Procesión completada';
      if(vLabel2) vLabel2.textContent='✅';
      if(vBanner){vBanner.style.background='rgba(76,175,80,.12)';vBanner.style.borderColor='rgba(76,175,80,.4)';}
    } else if(cambio>0&&liveGrupoData){
      var desf=liveGrupoData.desfase||0;
      var sacaM=liveGrupoData.sacaMuj||daySacaMuj[currentDay]||6;
      var mov=liveGrupoData.movidos||0;
      var vCambio=Math.max(1,cambio-desf);
      var vCambioGrp=Math.max(1,vCambio-mov);
      if(vCambio>=tot){
        var lastM=(((sacaM-1+tot-1-mov)%getMujCount())+getMujCount())%getMujCount()+1;
        vEl.textContent='✅ Asentó Grupo #'+lastM;
        if(vProg2) vProg2.textContent=(currentDay>=3)?'Hasta el próximo año':'Procesión completada';
        if(vLabel2) vLabel2.textContent='✅';
        if(vBanner){vBanner.style.background='rgba(76,175,80,.12)';vBanner.style.borderColor='rgba(76,175,80,.4)';}
      } else {
        var grpM=(((sacaM-1+vCambioGrp-1)%getMujCount())+getMujCount())%getMujCount()+1;
        vEl.textContent='Grupo #'+grpM;
        if(vProg2) vProg2.textContent='⚠️ Estimado';
        if(vLabel2) vLabel2.textContent='·';
        if(vBanner){vBanner.style.background='rgba(59,130,246,.08)';vBanner.style.borderColor='rgba(59,130,246,.3)';}
      }
    } else {
      vEl.textContent='Grupo #'+(daySacaMuj[currentDay]||22);
      if(vProg2) vProg2.textContent='Esperando inicio';
      if(vLabel2) vLabel2.textContent='Saca';
      if(vBanner){vBanner.style.background='rgba(59,130,246,.08)';vBanner.style.borderColor='rgba(59,130,246,.3)';}
    }
  }
  var jLabel1El=document.getElementById('grupoActualLabel1');
  if(jLabel1El) jLabel1El.textContent=isSEMode?'Santo Entierro de Cristo':'Venerada Imagen de Jesús Nazareno';
  var vLabel1El=document.getElementById('grupoVirgenLabel1');
  if(vLabel1El) vLabel1El.textContent=isSEMode?'Virgen Dolorosa':'María Santísima';
}
// ========== STREET VIEW ==========
var streetViewPano=null;
function openStreetView(lat,lng){
  var sv=document.getElementById('streetView');
  var mapEl=document.getElementById('map');
  var btn=document.getElementById('bStreet');
  if(!sv||!mapEl) return;
  mapEl.style.display='none';
  sv.style.display='block';
  btn.style.display='block';
  if(!streetViewPano){
    streetViewPano=new google.maps.StreetViewPanorama(sv,{
      position:{lat:lat,lng:lng},
      pov:{heading:0,pitch:0},
      zoom:1,
      addressControl:false,
      fullscreenControl:true,
      motionTracking:false,
      motionTrackingControl:false
    });
  } else {
    streetViewPano.setPosition({lat:lat,lng:lng});
  }
  infoWin.close();
}
function closeStreetView(){
  var sv=document.getElementById('streetView');
  var mapEl=document.getElementById('map');
  var btn=document.getElementById('bStreet');
  if(sv) sv.style.display='none';
  if(mapEl) mapEl.style.display='block';
  if(btn) btn.style.display='none';
}

// ========== CONFIG SYNC ==========
function syncConfig(){
  if(isShared) return;
  var st=getStartTime();
  var cfgData={
    s:+document.getElementById('cS').value,
    h:st.h,
    hm:st.m,
    mn:+document.getElementById('cMn').value,
    date:dayDates[currentDay]||'',
    autoOffset:window._autoTimeOffset||0,
    mapLock:mapLocked[currentDay]?mapSavedView[currentDay]:null,
    t:Date.now()
  };
  if(currentDay===3){
    cfgData.cortH=VIER_CORTESIAS_CHANGE;
    cfgData.cortM=VIER_CORTESIAS_CHANGE_M;
    cfgData.cortMin=VIER_CORTESIAS_MIN;
  }
  db.ref('config/day'+currentDay).set(cfgData);
  db.ref('config/dates').set(dayDates);
}

// ========== MAP POSITIONS SYNC ==========
var syncTimer=null;
function syncPositions(){
  if(isShared) return;
  clearTimeout(syncTimer);
  syncTimer=setTimeout(function(){
    var pts=positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    db.ref('positions/day'+currentDay).set(pts);
  },500);
}

// ========== START ALL DAY-DEPENDENT LISTENERS (called after initMap) ==========
var activeDayRefs=[];
function stopDayListeners(){
  activeDayRefs.forEach(function(r){r.off();});
  activeDayRefs=[];
}

function startDayListeners(){
  stopDayListeners();
  if(typeof loadGrupoFromStorage==='function') loadGrupoFromStorage();
  if(typeof loadAutoState==='function') loadAutoState();
  // Grupo actual
  var gaRef=db.ref('grupoActual/day'+currentDay);
  activeDayRefs.push(gaRef);
  gaRef.on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    // Reject snapshots older than what we already have (race-condition guard)
    if(liveGrupoData && d.t && liveGrupoData.t && d.t < liveGrupoData.t) return;
    // Check for stale auto-completed data: if today and cambio>=tot, reset
    var nowDateGA=localDateStr(new Date());
    if(dayDates[currentDay]===nowDateGA&&d.cambio>0){
      var totGA=positions.length||changes.length||44;
      if(d.cambio>=totGA&&!isShared){
        var resetD={cambio:0,grp:0,nombre:'',tot:totGA,desfase:d.desfase||0,movidos:d.movidos||0,sacaMuj:d.sacaMuj||daySacaMuj[currentDay],t:Date.now()};
        db.ref('grupoActual/day'+currentDay).set(resetD);
        currentGrupoActual=0;
        liveGrupoData=resetD;
        if(typeof renderLive==='function') renderLive();
        updateBanners();
        return;
      }
    }
    currentGrupoActual=d.cambio||0;
    liveGrupoData=d;
    if(d.desfase!==undefined) virgenDesfase=d.desfase;
    if(d.movidos!==undefined) virgenMovidos=d.movidos;
    if(d.virgenMn) virgenMn=d.virgenMn;
    if(d.sacaMuj) daySacaMuj[currentDay]=d.sacaMuj;
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(d));}catch(e){_logErr("swallow",e);}
    try{updateGrupoUI();}catch(e8){_logErr('updateGrupoUI',e8);}
    try{if(typeof renderLive==='function') renderLive();}catch(e9){_logErr('renderLive',e9);}
    if(d.cambio!==window._lastSyncCambio){
      window._lastSyncCambio=d.cambio;
      try{checkVibrate(d.cambio);}catch(e10){_logErr('checkVibrate',e10);}
    }
  });
  // Defensive backup poll on top of the realtime listener; covers cases
  // where the Firebase websocket drops silently. fetch + AbortController
  // replaces the earlier XMLHttpRequest-with-callbacks plumbing.
  async function syncGrupo(){
    var ss = document.getElementById('editorStatus');
    var setStatus = function(text){ if(ss) ss.textContent = text; };
    var ctrl = new AbortController();
    var timer = setTimeout(function(){ ctrl.abort(); }, 5000);
    try{
      var resp = await fetch('https://procesion-sonsonate-default-rtdb.firebaseio.com/grupoActual/day'+currentDay+'.json?t='+Date.now(), {signal: ctrl.signal});
      if(!resp.ok){ setStatus('❌ HTTP '+resp.status); return; }
      var d = await resp.json();
      if(!d) return;
      // Reject responses older than what we already have
      if(liveGrupoData && d.t && liveGrupoData.t && d.t < liveGrupoData.t) return;
      var now = new Date();
      window._lastSync = '🟢 '+now.getHours()+':'+String(now.getMinutes()).padStart(2,'0')+':'+String(now.getSeconds()).padStart(2,'0')+' · FB:'+d.cambio+' Local:'+currentGrupoActual;
      setStatus(window._lastSync);
      currentGrupoActual = d.cambio || 0;
      liveGrupoData = d;
      if(d.desfase !== undefined) virgenDesfase = d.desfase;
      if(d.movidos !== undefined) virgenMovidos = d.movidos;
      if(d.virgenMn) virgenMn = d.virgenMn;
      if(d.sacaMuj) daySacaMuj[currentDay] = d.sacaMuj;
      try{updateGrupoUI();}catch(e7){_logErr('updateGrupoUI',e7);}
      try{if(typeof renderLive==='function') renderLive();}catch(e9){_logErr('renderLive',e9);}
    }catch(err){
      if(err && err.name === 'AbortError') setStatus('❌ Timeout');
      else setStatus('❌ '+(err && err.message ? err.message : 'Sin conexión'));
    }finally{
      clearTimeout(timer);
    }
  }
  syncGrupo();
  setInterval(syncGrupo,10000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)syncGrupo();});
  // Config sync
  if(!isShared){
    ['cS','cHour','cMin','cMn'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.addEventListener('change',function(){setTimeout(syncConfig,100);});
    });
  }
  // Config sync - ALL users listen (not just shared)
  var cfgRef=db.ref('config/day'+currentDay);
  activeDayRefs.push(cfgRef);
  cfgRef.on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    var changed=false;
    if(d.s&&+document.getElementById('cS').value!==d.s){document.getElementById('cS').value=d.s;daySaca[currentDay]=d.s;changed=true;}
    if(d.h!==undefined){var curSt=getStartTime();if(curSt.h!==d.h||curSt.m!==(d.hm||0)){setStartTimeUI(d.h,d.hm||0);changed=true;}}
    if(d.mn&&+document.getElementById('cMn').value!==d.mn){document.getElementById('cMn').value=d.mn;changed=true;}
    if(d.date&&dayDates[currentDay]!==d.date){dayDates[currentDay]=d.date;if($('cDate'))$('cDate').value=d.date;detectToday();changed=true;}
    if(d.autoOffset!==undefined) window._autoTimeOffset=d.autoOffset;
    if(d.mapLock){
      mapLocked[currentDay]=true;
      mapSavedView[currentDay]=d.mapLock;
      restoreMapView();
    } else if(d.mapLock===null&&mapLocked[currentDay]){
      mapLocked[currentDay]=false;
      mapSavedView[currentDay]=null;
      restoreMapView();
    }
    if(d.cortH) VIER_CORTESIAS_CHANGE=d.cortH;
    if(d.cortM) VIER_CORTESIAS_CHANGE_M=d.cortM;
    if(d.cortMin) VIER_CORTESIAS_MIN=d.cortMin;
    if(changed) calc();
  });
  // Listen for dates sync
  var datesRef=db.ref('config/dates');
  activeDayRefs.push(datesRef);
  datesRef.on('value',function(snap){
    var d=snap.val();
    if(!d||!Array.isArray(d)) return;
    var changed2=false;
    for(var di=0;di<d.length;di++){
      if(d[di]&&dayDates[di]!==d[di]){dayDates[di]=d[di];changed2=true;}
    }
    if(changed2){
      var newToday=detectToday();
      if($('cDate'))$('cDate').value=dayDates[currentDay];
      // Shared users: auto-switch to today's day
      if(isShared&&newToday>=0&&newToday!==currentDay){
        switchDay(newToday);
      }
    }
  });
  // Positions sync - ALL users listen
  var posRef=db.ref('positions/day'+currentDay);
  activeDayRefs.push(posRef);
  posRef.on('value',function(snap){
    var d=snap.val();
    if(!d||!d.length) return;
    var newPos=d.filter(function(p){return p&&p.lat&&p.lng;}).map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    // Only update if different
    if(JSON.stringify(newPos)!==JSON.stringify(positions)){
      var wasEmpty=positions.length<2;
      positions=newPos;
      drawRouteLine();
      calc();
      if(wasEmpty&&positions.length>=2) fitBounds();
    }
  });
  // Women's positions sync
  var posRefW=db.ref('positions_w/day'+currentDay);
  activeDayRefs.push(posRefW);
  posRefW.on('value',function(snap){
    var d=snap.val();
    if(!d||!d.length){positionsW=[];return;}
    var newPosW=d.filter(function(p){return p&&p.lat&&p.lng;}).map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    if(JSON.stringify(newPosW)!==JSON.stringify(positionsW)){
      positionsW=newPosW;
      drawRouteLine();
    }
  });
}


// ========== Block 3: auto-advance time ==========
// Sync: fetch Firebase and UPDATE UI every 10 seconds
// ========== AUTO-AVANCE POR TIEMPO ==========
window._autoTimeRunning=false;
window._autoTimeTimer=null;
window._autoTimeOffset=0;
window._lastRealGPS=0;
var GPS_TIMEOUT=120000; // 2 min — GPS can drop briefly between buildings

function startAutoIfNeeded(){
  if(isShared) return;
  if(window._autoTimeRunning) return;
  // Consider past midnight: before 5 AM = still previous day
  var now=new Date();
  var checkDate=new Date(now);
  if(now.getHours()<5) checkDate.setDate(checkDate.getDate()-1);
  var todayStr=localDateStr(checkDate);
  if(dayDates[currentDay]!==todayStr) return;
  // Don't start if procession already finished (past 3:30 AM next day)
  if(isDayPast(currentDay)) return;
  var _stA=getStartTime();
  var startMs=new Date(dayDates[currentDay]+'T'+String(_stA.h).padStart(2,'0')+':'+String(_stA.m).padStart(2,'0')+':00').getTime();
  var diff=now.getTime()-startMs;
  if(diff>-1800000){
    toggleAutoTime();
  }
}

function toggleAutoTime(){
  window._autoTimeRunning=!window._autoTimeRunning;
  window._autoRemote=false;
  if(window._autoTimeRunning){
    if(currentGrupoActual>0){
      var _stI=getStartTime();
      var mnI=+$('cMn').value||6;
      var dateStrI=dayDates[currentDay]||localDateStr(new Date());
      var startTimeI=new Date(dateStrI+'T'+String(_stI.h).padStart(2,'0')+':'+String(_stI.m).padStart(2,'0')+':00').getTime();
      var shouldBeI=startTimeI+(currentGrupoActual-1)*mnI*60000;
      window._autoTimeOffset=Math.round((shouldBeI-Date.now())/60000);
    }
    autoTimeStep();
    window._autoTimeTimer=setInterval(autoTimeStep,3000);
    startHeartbeat();
  } else {
    if(window._autoTimeTimer) clearInterval(window._autoTimeTimer);
    window._autoTimeTimer=null;
    stopHeartbeat();
  }
  syncAutoState();
  if(typeof renderLive==='function') renderLive();
}

function syncAutoState(){
  if(isShared) return;
  db.ref('config/auto/day'+currentDay).set({
    running:window._autoTimeRunning,
    offset:window._autoTimeOffset,
    owner:window._autoTimeRunning?window._deviceId:'',
    heartbeat:Date.now(),
    t:Date.now()
  });
}

// Unique device ID
window._deviceId=localStorage.getItem('deviceId');
if(!window._deviceId){window._deviceId='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);localStorage.setItem('deviceId',window._deviceId);}

// Heartbeat: owner pings every 30s
var _heartbeatTimer=null;
function startHeartbeat(){
  if(_heartbeatTimer) return;
  _heartbeatTimer=setInterval(function(){
    if(window._autoTimeRunning&&!window._autoRemote&&!isShared){
      db.ref('config/auto/day'+currentDay+'/heartbeat').set(Date.now());
    }
  },15000);
}
function stopHeartbeat(){
  if(_heartbeatTimer){clearInterval(_heartbeatTimer);_heartbeatTimer=null;}
}

function loadAutoState(){
  db.ref('config/auto/day'+currentDay).on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    if(d.offset!==undefined) window._autoTimeOffset=d.offset;
    
    if(d.running){
      var isMyOwn=(!d.owner||d.owner===window._deviceId);
      var ownerDead=(d.heartbeat&&(Date.now()-d.heartbeat>30000));
      
      if(isMyOwn||ownerDead){
        // This device runs Auto (owns it or owner died)
        if(ownerDead&&!isMyOwn){
          console.log('Auto owner died, taking over');
          window._deviceId=window._deviceId; // keep own ID
          if(!isShared) db.ref('config/auto/day'+currentDay+'/owner').set(window._deviceId);
        }
        window._autoRemote=false;
        if(!window._autoTimeRunning||!window._autoTimeTimer){
          window._autoTimeRunning=true;
          autoTimeStep();
          window._autoTimeTimer=setInterval(autoTimeStep,3000);
          startHeartbeat();
        }
      } else {
        // Another device owns it and is alive
        window._autoTimeRunning=true;
        window._autoRemote=true;
        if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
        stopHeartbeat();
      }
      if(typeof renderLive==='function') renderLive();
    } else if(!d.running&&window._autoTimeRunning){
      window._autoTimeRunning=false;
      window._autoRemote=false;
      if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
      stopHeartbeat();
      if(typeof renderLive==='function') renderLive();
    }
  });
}

function autoTimeStep(){
  if(!positions.length) return;
  var tot=positions.length;
  var gpsActive=(Date.now()-window._lastRealGPS<GPS_TIMEOUT);

  var _stC=getStartTime();
  var mn=window._realRhythm||(+$('cMn').value)||6; // prefer real GPS rhythm
  var dateStr=dayDates[currentDay]||localDateStr(new Date());
  var startTime=new Date(dateStr+'T'+String(_stC.h).padStart(2,'0')+':'+String(_stC.m).padStart(2,'0')+':00').getTime();
  var now=Date.now()+(window._autoTimeOffset*60000);
  var elapsed=now-startTime;

  if(elapsed<0){
    if(!gpsActive){
      db.ref('jesus').set({lat:positions[0].lat,lng:positions[0].lng,t:Date.now()});
      var vRoute0=(positionsW.length>=2)?positionsW:positions;
      db.ref('virgen').set({lat:vRoute0[0].lat,lng:vRoute0[0].lng,t:Date.now()});
    }
    updateBanners();
    return;
  }

  var mnMs=mn*60000;
  var exactPos=elapsed/mnMs;
  var currentCambio=Math.floor(exactPos)+1;
  var fraction=exactPos-Math.floor(exactPos);
  currentCambio=Math.min(currentCambio,tot);
  currentCambio=Math.max(1,currentCambio);
  var procFinished=(currentCambio>=tot);
  if(procFinished) fraction=1;

  // Auto-stop when procession is done
  if(procFinished&&window._autoTimeRunning){
    // Ensure final cambio is written
    if(currentGrupoActual<tot){
      currentGrupoActual=tot;
      var sacaF=daySaca[currentDay]||16;
      var grpF=((sacaF-1+tot-1)%getHomCount())+1;
      var nombreF=(tot<=changes.length&&changes[tot-1])?changes[tot-1].n||'':'';
      liveGrupoData={cambio:tot,grp:grpF,nombre:nombreF,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
      try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
      saveAll();
      db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
    }
    // Wait for virgen to finish too
    var vRoute2=(positionsW.length>=2)?positionsW:positions;
    var vExact2=Math.max(0,exactPos-virgenDesfase);
    if(vExact2>=vRoute2.length){
      window._autoTimeRunning=false;
      if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
      syncAutoState();
      if(typeof renderLive==='function') renderLive();
      updateBanners();
      return;
    }
  }

  // Update grupo when cambio changes (only if GPS not active)
  if(!gpsActive&&currentCambio!==currentGrupoActual&&currentCambio>0){
    currentGrupoActual=currentCambio;
    var sacaH=daySaca[currentDay]||16;
    var grp=((sacaH-1+currentCambio-1)%getHomCount())+1;
    var nombre=(currentCambio<=changes.length&&changes[currentCambio-1])?changes[currentCambio-1].n||'':'';
    liveGrupoData={cambio:currentCambio,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
    if(typeof renderLive==='function') renderLive();
  }

  // Animate Jesus marker (only if real GPS not active)
  if(!gpsActive){
    var idxA=Math.min(currentCambio-1,tot-1);
    var idxB=Math.min(currentCambio,tot-1);
    if(procFinished){idxA=tot-1;idxB=tot-1;fraction=0;}
    var ptA=positions[idxA],ptB=positions[idxB];
    var jLat=ptA.lat+(ptB.lat-ptA.lat)*fraction;
    var jLng=ptA.lng+(ptB.lng-ptA.lng)*fraction;
    db.ref('jesus').set({lat:jLat,lng:jLng,t:Date.now()});
  }
  // Always animate Virgen (she doesn't have her own GPS usually)
  var virgenHasGPS=(urnaActive&&urnaActive.virgen);
  if(!virgenHasGPS){
    var vRoute=(positionsW.length>=2)?positionsW:positions;
    var vTot=vRoute.length;
    var vDesfaseMin=Math.max(virgenDesfase,1);
    // Virgen's own rhythm when she has her own route
    var vMn=(positionsW.length>=2&&virgenMn>0)?virgenMn:mn;
    var vMnMs=vMn*60000;
    var vStartDelay=vDesfaseMin*mnMs; // she starts desfase*jesus_mn later
    var vElapsed=elapsed-vStartDelay;
    var vExactPos=vElapsed>0?(vElapsed/vMnMs):0;
    var vCambio=Math.floor(vExactPos);
    var vFrac=vExactPos-vCambio;
    var vFinished=(vCambio>=vTot-1);
    if(vFinished){vCambio=vTot-1;vFrac=0;}
    if(vElapsed<0){vCambio=0;vFrac=0;}
    var vIdxA=Math.min(Math.max(vCambio,0),vTot-1);
    var vIdxB=Math.min(vCambio+1,vTot-1);
    var vPtA=vRoute[vIdxA],vPtB=vRoute[vIdxB];
    var vLat=vPtA.lat+(vPtB.lat-vPtA.lat)*vFrac;
    var vLng=vPtA.lng+(vPtB.lng-vPtA.lng)*vFrac;
    db.ref('virgen').set({lat:vLat,lng:vLng,t:Date.now()});
  }

  updateBanners();
}

function adjustAutoTime(delta){
  window._autoTimeOffset+=delta;
  autoTimeStep();
  syncAutoState();
  if(typeof syncConfig==='function') syncConfig();
  if(typeof renderLive==='function') renderLive();
}

