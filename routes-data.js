// ==================== routes-data.js ====================
// ==================== app.js ====================
// ========== Block 1: main app + route data ==========
// ========== MIÉRCOLES: 130 puntos exactos del KML ==========
var MIER_PTS=[
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
var MIER_WP_REF=[
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
var LUN_PTS=[
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
var LUN_WP_REF=[
{n:"Catedral",lat:13.7205038,lng:-89.7268142},
{n:"Veracruz",lat:13.7182537,lng:-89.7291377},
{n:"Megaplaza",lat:13.7175267,lng:-89.7295749},
{n:"Sensunapán",lat:13.7110173,lng:-89.7302323},
{n:"COED Brito",lat:13.7177813,lng:-89.7261697},
{n:"Selectos",lat:13.7192706,lng:-89.7253634},
{n:"IPS",lat:13.7210786,lng:-89.7243618},
];

// ========== VIERNES MAÑANA: 44 puntos exactos del KML ==========
var VIER_PTS=[
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
var VIER_WP_REF=[
{n:"Iglesia El Pilar",lat:13.7236207,lng:-89.7273996},
{n:"San Vicente de Paul",lat:13.7246585,lng:-89.7287919},
{n:"Hospital",lat:13.7231312,lng:-89.7289419},
{n:"Banco Hipotecario",lat:13.7214234,lng:-89.728034},
{n:"Ermita Veracruz",lat:13.7182706,lng:-89.7291447},
{n:"Catedral",lat:13.7206883,lng:-89.7275023},
];

var SE_PTS=[
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
var SE_WP_REF=[
{n:'Catedral',lat:13.7205,lng:-89.7272},
{n:'Sto Domingo',lat:13.7212,lng:-89.7266}
];

// ========== STATE ==========
var gmap, infoWin, routeLine, routeClickLine;
var currentDay = 0; // 0=lunes,1=martes,2=miercoles,3=viernes,4=santo_entierro
window.currentDay = 0;
var positions = [];
var changes = [], myCarries = [];
var allMarkers = [], wpMarkers = [], showAll = true, dragMode = false;
var dayNames = ['Lunes Santo','Martes Santo','Miércoles Santo','Viernes Mañana','Santo Entierro'];
var dayDates = ['2026-03-30','2026-03-31','2026-04-01','2026-04-03','2026-04-03']; // Semana Santa 2026
var dayHours = [15, 15, 15, 6, 17];
var daySaca = [19, 17, 13, 16, 5];
var daySacaManual = [true, true, false, false, true];

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

var savedPositions = [null, null, null, null, null];
var savedPositionsW = [null, null, null, null, null];
var positionsW = []; // women's route (only when different from men)
var routeLineW = null;
var editingWomen = false; // toggle in editor
var savedRefs = [null, null, null, null, null];

// ========== MARTES: 80 puntos exactos del KML ==========
var MART_PTS=[
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

var MART_WP_REF = [
{n:"Iglesia El Ángel",lat:13.7196467,lng:-89.7232526},
{n:"Pizza Cristian",lat:13.7179834,lng:-89.7224636},
{n:"COED Thomas Jefferson",lat:13.7184811,lng:-89.7233434},
{n:"Ermita Veracruz",lat:13.7182351,lng:-89.7291543},
{n:"Hotel Sol y Luna",lat:13.7189961,lng:-89.7302739},
{n:"C.E. Rep. de Haití",lat:13.7211851,lng:-89.7328611},
{n:"Little Caesars",lat:13.7216379,lng:-89.7297548},
{n:"Catedral",lat:13.7205435,lng:-89.7271543},
];
