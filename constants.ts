import { Organisation } from './types';

/**
 * Utility to convert a standard Google Drive share link into a direct image link.
 * Extracts the ID and uses the Google Thumbnail API.
 */
export const getDirectDriveUrl = (url: string): string => {
  if (!url) return ""; 
  const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
  const id = idMatch ? idMatch[1] : null;
  if (!id) return "";
  return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
};

export const ORGANISATIONS: Organisation[] = [
  {
    id: 'accra-animal-save',
    name: 'Accra Animal Save',
    logo: 'https://drive.google.com/open?id=1ZKpBVfBdtLivx_E4eConD3Z3CnfXfjoZ',
    address: '',
    country: 'Ghana',
    email: 'accraanimalsave@gmail.com',
    social: 'https://www.instagram.com/accraanimalsave/',
    website: '',
    species: ['Cephalopods (octopus, squid, cuttlefish)', 'Chickens (broilers and laying hens)', 'Crustaceans (shrimp/prawns, crabs, lobsters)', 'Farmed finfish (tilapia, catfish, carp, salmon)', 'Insects (black soldier flies, crickets, mealworms)', 'Large ruminants (cattle for beef and dairy, buffalo)', 'Other farmed mammals (rabbits, guinea pigs, region-specific species)', 'Other poultry (turkeys, ducks, geese, guinea fowl, quail)', 'Pigs', 'Small ruminants (sheep, goats)', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'aifaw',
    name: 'African institute for animal welfare',
    logo: 'https://drive.google.com/open?id=15NM1to2uL_lfvQCEUpppWF2UCtNbvSUs',
    address: 'Entebbe, Nkumba',
    country: 'Uganda',
    email: 'aifaworg@gmail.com',
    social: 'https://www.linkedin.com/company/african-institute-for-animal-welfare/',
    website: 'https://aifaw.org',
    species: ['Chickens (broilers and laying hens)', 'Farmed finfish (tilapia, catfish, carp, salmon)', 'Pigs', 'Cross-species advocacy'],
    focus: ['Corporate & institutional engagement', 'Policy & legal advocacy', 'Research, investigation & evidence generation']
  },
  {
    id: 'amaf-benin',
    name: "Amis de l'Afrique Francophone- Benin (AMAF-BENIN)",
    logo: 'https://drive.google.com/open?id=1m_THv3MughAls7Ebz29epjgZ544cZVKV',
    address: 'Carre No 2158, Kindonou, Cotonou',
    country: 'Benin',
    email: 'amafbenin@yahoo.fr',
    social: 'https://web.facebook.com/AMAF-Benin-1786597534766973/',
    website: 'https://amafbenin.org/',
    species: ['Chickens (broilers and laying hens)', 'Large ruminants (cattle for beef and dairy, buffalo)', 'Other farmed mammals (rabbits, guinea pigs, region-specific species)', 'Other poultry (turkeys, ducks, geese, guinea fowl, quail)', 'Pigs', 'Small ruminants (sheep, goats)', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Direct animal assistance', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'angolan-veg',
    name: 'Angolan Vegetarian Association',
    logo: 'https://drive.google.com/open?id=1jgOLjkuBMG3R1yaBbfxnlZ6pXhZc011j',
    address: 'Rua Comandante Gika, Luanda, Angola',
    country: 'Angola',
    email: 'info@associacaovegangolana.com',
    social: 'https://www.instagram.com/associacaovegangolana',
    website: 'https://www.associacaovegangolana.com',
    species: ['Cross-species advocacy'],
    focus: ['Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Protest & disruptive activism']
  },
  {
    id: 'aaa',
    name: 'Animal Advocacy Africa',
    logo: 'https://drive.google.com/open?id=1farMnYN8rmdABfQjO6gFWAtaNi5anHSL',
    address: '1007 N Market St Ste G20, Wilmington, DE 19801',
    country: 'Pan-African',
    email: 'admin@animaladvocacyaafrica.org',
    social: 'https://www.linkedin.com/company/animaladvocacyafrica/',
    website: 'https://www.animaladvocacyaafrica.org/',
    species: ['Cross-species advocacy'],
    focus: ['Movement & capacity building']
  },
  {
    id: 'alr-sa',
    name: 'Animal Law Reform South Africa',
    logo: 'https://drive.google.com/open?id=12twF5vioTe-lQ_It5CBgvbJnOWQXX5r-',
    address: '115 Catalina, 285 Corlett Drive Kew, Johannesburg',
    country: 'South Africa',
    email: 'contact@animallawreform.org',
    social: 'https://www.facebook.com/AnimalLawReform/',
    website: 'https://www.animallawreform.org/',
    species: ['Cephalopods', 'Chickens', 'Crustaceans', 'Farmed finfish', 'Large ruminants', 'Other farmed mammals', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'apon',
    name: 'Animal Protection Organization of Nigeria',
    logo: 'https://drive.google.com/open?id=1bbK1DwKwU6LirDXFdb7ElPlhBm9mTyHA',
    address: 'Center Point House, Bank Road, Dugbe, Ibadan',
    country: 'Nigeria',
    email: 'info@aponwelfare.org',
    social: 'https://www.facebook.com/aponwelfare',
    website: 'https://www.aponwelfare.org',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Other farmed mammals', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation', 'Protest & disruptive activism']
  },
  {
    id: 'awanet',
    name: 'Animal Welfare and Environment Network for Tanzania',
    logo: 'https://drive.google.com/open?id=1azHY2SGiBhzLX79g68GIusd5NpQRoldS',
    address: 'P.O.Box 1121, Arusha',
    country: 'Tanzania',
    email: 'info@awanet.org',
    social: 'https://www.facebook.com/awenettanzania',
    website: 'https://www.awanet.org',
    species: ['Chickens', 'Farmed finfish', 'Pigs'],
    focus: ['Alternative proteins & food system innovation', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'awl',
    name: 'Animal Welfare League',
    logo: 'https://drive.google.com/open?id=16tk8TDiPt_XMlf_bWqBBOlS5D7_BZq2D',
    address: 'GE-215-6837 Agbogba, Accra - Ghana',
    country: 'Ghana',
    email: 'info@animalwelfareleague.org',
    social: 'https://www.linkedin.com/company/animal-welfare-league/',
    website: 'https://www.animalwelfareleague.org/',
    species: ['Chickens', 'Farmed finfish', 'Insects'],
    focus: ['Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation', 'Protest & disruptive activism']
  },
  {
    id: 'ashers',
    name: "Asher's Farm Sanctuary",
    logo: 'https://drive.google.com/open?id=1gmdiiUMTxtFDZR9LkEzWkgwqqWRHQiFe',
    address: 'Plot 37 - Tweedragt Pretoria South Africa',
    country: 'South Africa',
    email: 'info@ashersfarmsanctuary.org',
    social: 'https://www.facebook.com/ashersfarmsanctuary',
    website: 'https://www.ashersfarmsanctuary.org',
    species: ['Chickens', 'Large ruminants', 'Other farmed mammals', 'Other poultry', 'Pigs', 'Small ruminants'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Public & consumer outreach']
  },
  {
    id: 'ippe',
    name: 'Association IPPE/Asbl',
    logo: 'https://drive.google.com/open?id=16u7AVXfX2vyjQK93r65O1xcoyTl06UJr',
    address: 'Goma, North Kivu, DR Congo',
    country: 'Democratic Republic of the Congo',
    email: 'info.ippeasbl@gmail.com',
    social: '',
    website: 'https://www.association-ippe.org/',
    species: ['Chickens', 'Other farmed mammals', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'ciwf-africa',
    name: 'Compassion in World Farming Africa',
    logo: 'https://drive.google.com/open?id=1JJES3tCC6TXuTg_cgGZU9EaZqVHyglDl',
    address: 'Godalming, Surrey, UK (Int HQ)',
    country: 'South Africa, Pan-African',
    email: 'compassion@ciwf.org',
    social: 'https://www.linkedin.com/company/compassion-in-world-farming/',
    website: 'https://www.ciwf.org/za/',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Pigs', 'Cross-species advocacy'],
    focus: ['Corporate & institutional engagement', 'Policy & legal advocacy', 'Research, investigation & evidence generation']
  },
  {
    id: 'esr',
    name: 'Ethical Seafood Research',
    logo: 'https://drive.google.com/open?id=1VhmfQemm7u9Ozlh8kMwK2IU0b9XxgW7p',
    address: 'Glasgow, UK',
    country: 'Egypt, Ghana, Kenya, Morocco, Nigeria, South Africa, Tanzania, Uganda, Pan-African',
    email: 'hello@ethicalseafoodresearch.org',
    social: 'https://www.linkedin.com/company/ethical-seafood-research',
    website: 'https://ethicalseafoodresearch.org',
    species: ['Cephalopods', 'Crustaceans', 'Farmed finfish', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Policy & legal advocacy', 'Research, investigation & evidence generation']
  },
  {
    id: 'greyton',
    name: 'Greyton Farm Animal Sanctuary',
    logo: 'https://drive.google.com/open?id=1ahFL576ayqGLsmr7E1dL4cYoJt0tZWuo',
    address: 'Greyton 7233, Western Cape, South Africa',
    country: 'South Africa',
    email: 'info@greytonfarmanimalsanctuary.com',
    social: 'https://www.facebook.com/greytonfarmanimalsanctuary',
    website: 'https://greytonfarmsanctuary.org/',
    species: ['Chickens', 'Large ruminants', 'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Policy & legal advocacy', 'Public & consumer outreach']
  },
  {
    id: 'lapa',
    name: 'Lawyers for Animal Protection in Africa',
    logo: 'https://drive.google.com/open?id=1yY10oGZdJmP-e2cxAyU5EsjnHhqTgjwV',
    address: '',
    country: 'Kenya, Uganda',
    email: 'judymuriithi@lapa.africa',
    social: 'https://www.linkedin.com/company/lawyers-for-animal-protection-in-africa-lapa/',
    website: 'https://www.lapa.africa',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Other poultry', 'Pigs', 'Small ruminants'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'lawcs',
    name: 'Liberia Animal Welfare and Conservation Society',
    logo: '',
    address: 'Voinjama City, Lofa County, Liberia',
    country: 'Liberia',
    email: 'lawcs001@gmail.com',
    social: 'https://www.facebook.com/liberiaanimal',
    website: 'https://www.liberiaanimalwelfaresociety.org',
    species: ['Chickens', 'Large ruminants', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Direct animal assistance', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'luv4all',
    name: 'Luv4all Uganda Foundation',
    logo: 'https://drive.google.com/open?id=1DzWWGUoWfEK5H6QWsQljEz2vAMkecyZr',
    address: 'Kassanda, Uganda',
    country: 'Uganda',
    email: 'Info@lfaufoundation.org',
    social: 'https://www.linkedin.com/in/musisi-mike-2a1242156',
    website: 'https://www.lfaufoundation.org',
    species: ['Farmed finfish', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'mparo',
    name: "MPARO PEOPLE'S PROJECTS UGANDA",
    logo: 'https://drive.google.com/open?id=1W69sneP7AmKB-pR_V79BRQ_A3FKp4KdR',
    address: 'P.O.Box 217, Kabale Uganda',
    country: 'Uganda',
    email: 'info@mparopeoplesprojects.org',
    social: '',
    website: 'https://www.mparopeoplesprojects.org',
    species: ['Chickens', 'Farmed finfish', 'Other farmed mammals', 'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Direct animal assistance', 'Movement & capacity building', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'nurture-imvelo',
    name: 'Nurture Imvelo Trust',
    logo: 'https://drive.google.com/open?id=1Yon6bP01YidgAfgoXKKU88mb3dirk9N1',
    address: 'Habane Township, Esigodini, Zimbabwe',
    country: 'Zimbabwe',
    email: 'nurtureimvelozw@gmail.com',
    social: 'https://www.facebook.com/share/1BAsCdjj7d/',
    website: 'https://nurtureimveloorg.wordpress.com/',
    species: ['Chickens'],
    focus: ['Corporate & institutional engagement', 'Movement & capacity building']
  },
  {
    id: 'nuru',
    name: 'NURU ANIMAL WELWARE ORGANIZATION',
    logo: 'https://drive.google.com/open?id=11QIG2_NBz405vwEDv99BFqnEOAIdq9F2',
    address: 'NJORO, NAKURU COUNTY, KENYA',
    country: 'Kenya',
    email: 'nuruanimalkenya@gmail.com',
    social: '',
    website: 'https://www.nuruanimalwelfare.org/',
    species: ['Chickens', 'Farmed finfish'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Direct animal assistance', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'oci',
    name: 'Organization for Creative Impact (OCI)',
    logo: 'https://drive.google.com/open?id=1N_MccQzdndZBjKk8zEosQ_Uj-JYGLmKu',
    address: 'P.O.Box 2274, Dodoma Tanzania',
    country: 'Tanzania',
    email: 'info@orgcreativeimpact.com',
    social: 'https://www.linkedin.com/company/organization-for-creative-impact/',
    website: 'https://orgcreativeimpact.com/',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Other farmed mammals'],
    focus: ['Direct animal assistance', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'pan-sa',
    name: 'Physicians Association for Nutrition (PAN) South Africa',
    logo: 'https://drive.google.com/open?id=1vhHtU1LkT8zccassIkEY0QTFvoBIAu7J',
    address: '',
    country: 'South Africa',
    email: 'info@pan-sa.org',
    social: 'https://www.linkedin.com/company/physicians-association-for-nutrition-south-africa/',
    website: 'https://www.pan-sa.org',
    species: ['Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'pigs-n-paws',
    name: "Pigs n' Paws",
    logo: 'https://drive.google.com/open?id=1N0x0OnN77PFEuqrMBsh-UYtk0OUDdiwI',
    address: 'Plot 15 Zonkolol, Cullinan, South Africa',
    country: 'South Africa',
    email: 'contact@pigsnpaws.co.za',
    social: 'https://www.facebook.com/share/1CGdbrCUcF/',
    website: 'https://www.pigsnpaws.co.za/',
    species: ['Chickens', 'Large ruminants', 'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Direct animal assistance', 'Policy & legal advocacy', 'Public & consumer outreach', 'Protest & disruptive activism']
  },
  {
    id: 'podrska',
    name: 'Podrska foundation',
    logo: 'https://drive.google.com/open?id=1_yu6YpeBVS9autZ4IKYu3bMHakyxcPJE',
    address: 'Nansana west 2, Uganda',
    country: 'Uganda',
    email: 'Info@podrskafoundation.org',
    social: 'https://www.instagram.com/podrskafoundation/',
    website: 'https://podrskafoundation.org/',
    species: ['Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Public & consumer outreach', 'Protest & disruptive activism']
  },
  {
    id: 'qlwb',
    name: 'QUALITY LIFE WITHOUT BORDERS',
    logo: 'https://drive.google.com/open?id=1lkqQOtkizal2Epq2Df0TRF-qJNaI_Acx',
    address: 'Nyeri, Kenya',
    country: 'Kenya',
    email: 'qualitylifewithoutborders@gmail.com',
    social: '',
    website: 'https://www.qualitylifewithoutborders.org/',
    species: ['Chickens', 'Farmed finfish', 'Insects', 'Large ruminants', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'rawo',
    name: 'Rwanda Animal Welfare Organization',
    logo: 'https://drive.google.com/open?id=1pPwtoBf1MBKbvSMruRKm3RCFBGN1PEWy',
    address: 'Musanze, Rwanda',
    country: 'Rwanda',
    email: 'jclaude@rawo.org.rw',
    social: 'https://www.facebook.com/animalwelfarerw',
    website: 'https://rawo.org.rw/',
    species: ['Chickens'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'sentient-care',
    name: 'Sentient Care Foundation',
    logo: 'https://drive.google.com/open?id=1gIBSOHu6gWhRa_nKb1xDgaT1DyOOESZi',
    address: 'Yaba, Lagos',
    country: 'Nigeria',
    email: 'Sentientcarefoundation@gmail.com',
    social: 'https://www.linkedin.com/in/sentient-care-foundation',
    website: '',
    species: ['Chickens', 'Farmed finfish', 'Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Movement & capacity building', 'Policy & legal advocacy']
  },
  {
    id: 'shared',
    name: 'SHARED',
    logo: 'https://drive.google.com/open?id=1tjWms1JMjW8mehnJc_aSdLl_12E7BvkK',
    address: 'Accra, Ghana',
    country: 'Ghana',
    email: 'emmanuel@sharedafrica.org',
    social: '',
    website: 'https://www.sharedafrica.org',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Pigs', 'Small ruminants'],
    focus: ['Policy & legal advocacy']
  },
  {
    id: 'sibanye',
    name: 'Sibanye Animal Welfare and Conservancy',
    logo: 'https://drive.google.com/open?id=19lImY7ZvUDdBGSaMPlgBbMPlXN73wBLC',
    address: 'Lupane Zimbabwe',
    country: 'Botswana, Zambia, Zimbabwe',
    email: 'sibanyectrust@gmail.com',
    social: 'https://www.facebook.com/sawcconservation',
    website: 'https://www.sibanyezim.org',
    species: ['Chickens', 'Farmed finfish', 'Insects', 'Large ruminants', 'Other farmed mammals', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Corporate & institutional engagement', 'Direct animal assistance', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'humanetrust',
    name: 'The Humane Education Trust',
    logo: 'https://drive.google.com/open?id=1KNn6D943Un_sT-W07c1aAy10nHsv2d0Y',
    address: 'Cape Town, South Africa',
    country: 'South Africa',
    email: 'avoice@yebo.co.za',
    social: 'https://www.facebook.com/compassion.za/',
    website: 'https://www.animalvoice.org/',
    species: ['Chickens', 'Crustaceans', 'Large ruminants', 'Pigs', 'Small ruminants'],
    focus: ['Policy & legal advocacy', 'Public & consumer outreach']
  },
  {
    id: 'vegannigerian',
    name: 'The Vegan Nigerian',
    logo: 'https://drive.google.com/open?id=1RCptUiJfgfidQn9bjlY8Lsqeb3rJoKy5',
    address: '',
    country: 'Nigeria',
    email: 'vegannigerian@gmail.com',
    social: 'https://www.instagram.com/vegannigerian',
    website: 'https://www.vegannigerian.com',
    species: ['Cross-species advocacy'],
    focus: ['Public & consumer outreach']
  },
  {
    id: 'thrive',
    name: 'Thrive Philanthropy | Thrive Africa',
    logo: 'https://drive.google.com/open?id=1ApiYA17inIseAu2vl4eBO-0r8vYYqXbp',
    address: 'Albany, NY USA',
    country: 'Pan-African',
    email: 'info@thrivephilanthropy.org',
    social: 'https://www.linkedin.com/company/thrivephilanthropy/',
    website: 'https://www.thrivephilanthropy.org',
    species: ['Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'vibrantvegan',
    name: 'Vibrant Vegan Society of Ghana',
    logo: 'https://drive.google.com/open?id=1vicRiFfZNnARCVLBkldm_DoCnUEehfhF',
    address: '',
    country: 'Ghana',
    email: 'vvesog@gmail.com',
    social: 'https://www.facebook.com/vibrantvegansocietyofghana/',
    website: '',
    species: ['Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'viva-uganda',
    name: 'Viva! Uganda',
    logo: 'https://drive.google.com/open?id=1e5WaMm3EM2dcrzyhz3QDJqcof4kkhGC3',
    address: 'Kampala, Uganda',
    country: 'Uganda',
    email: 'kerry@viva.ug',
    social: 'https://www.instagram.com/viva.uganda',
    website: 'https://www.viva.ug',
    species: ['Chickens', 'Large ruminants'],
    focus: ['Alternative proteins & food system innovation', 'Public & consumer outreach']
  },
  {
    id: 'sanuvia',
    name: 'Sanuvia',
    logo: 'https://drive.google.com/open?id=1ezj-VcEYn327OfBOH0xV4Us7jvG9vJrK',
    address: 'Kubwa, Abuja, Nigeria',
    country: 'Nigeria',
    email: 'ayindedaniel009@gmail.com',
    social: 'https://linkedin.com/company/sanuvia',
    website: 'https://sanuvia.org',
    species: ['Chickens', 'Crustaceans', 'Farmed finfish', 'Large ruminants', 'Other farmed mammals', 'Other poultry', 'Pigs', 'Small ruminants'],
    focus: ['Policy & legal advocacy', 'Research, investigation & evidence generation']
  },
  {
    id: 'veghub-zim',
    name: 'The VegHub Zimbabwe',
    logo: 'https://drive.google.com/open?id=15M20AFFVheQQWZhwn7ZJ-J_dVmVMKcv4',
    address: 'Bulawayo Zimbabwe',
    country: 'Zimbabwe',
    email: 'veghub.info@gmail.com',
    social: 'https://www.facebook.com/share/1FMTHhoRgN/',
    website: 'https://www.veghubzimbabwe.rf.gd',
    species: ['Cross-species advocacy'],
    focus: ['Movement & capacity building', 'Public & consumer outreach']
  },
  {
    id: 'pamoja',
    name: 'Rukungiri Pamoja Farmers Association',
    logo: 'https://drive.google.com/open?id=1SAzBuecioCEQIbJSPY5q3K_9_Zj_b94a',
    address: 'Rukungiri District, Uganda',
    country: 'Uganda',
    email: 'info@rupfauganda.org',
    social: 'https://x.com/RUPFAUGANDA',
    website: 'https://rupfauganda.org',
    species: ['Cross-species advocacy'],
    focus: ['Direct animal assistance', 'Public & consumer outreach']
  },
  {
    id: 'icarefish',
    name: 'iCare-Fish',
    logo: 'https://drive.google.com/open?id=1-9KGjir8KRDUtZfsiwu4MD8piezwu_Y-',
    address: 'Benin City, Nigeria',
    country: 'Nigeria',
    email: 'icarefish@gmail.com',
    social: 'https://www.linkedin.com/company/icare-fish/',
    website: 'https://icare-fish.org/',
    species: ['Farmed finfish'],
    focus: ['Corporate & institutional engagement', 'Direct animal assistance', 'Movement & capacity building', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'caawo',
    name: 'Coalition of African Animal Welfare Organisations',
    logo: 'https://drive.google.com/open?id=1MYoCp81fUC-izGjIZHpt9jCUfX2Dp7oZ',
    address: 'Gordons Bay, South Africa',
    country: 'Botswana, Kenya, Malawi, Rwanda, South Africa, Tanzania, Zambia, Zimbabwe',
    email: 'info@caawo.org',
    social: 'https://www.linkedin.com/company/caawo',
    website: 'https://www.caawo.org',
    species: ['Chickens', 'Farmed finfish', 'Large ruminants', 'Pigs'],
    focus: ['Corporate & institutional engagement', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'ssi',
    name: 'Sustainable Synergy Initiative',
    logo: 'https://drive.google.com/open?id=1wUthH4hFLzOih7OqOYOgvpIQumxRPPUS',
    address: 'Jinja, Uganda',
    country: 'Uganda',
    email: 'sustainablesynergyinitiative@gmail.com',
    social: '',
    website: 'https://www.sustainablesynergyinitiative.org',
    species: ['Chickens', 'Farmed finfish'],
    focus: ['Policy & legal advocacy']
  },
  {
    id: 'earn-africa',
    name: 'EARN AFRICA',
    logo: 'https://drive.google.com/open?id=1ImM0leEtkImrHXgdnisCL5gfKlkwuGig',
    address: 'South Africa',
    country: 'Pan-African',
    email: 'emmanuel@sharedafrica.org',
    social: 'https://www.linkedin.com/company/earn-africa/',
    website: '',
    species: ['Cephalopods', 'Chickens', 'Crustaceans', 'Farmed finfish', 'Insects', 'Large ruminants', 'Other farmed mammals', 'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Research, investigation & evidence generation']
  },
  {
    id: 'arog',
    name: 'Animal Rights Organization Of Ghana',
    logo: 'https://drive.google.com/open?id=1Y4ombuXtIo1LIqgjLdlBPq4FDxUXbT6r',
    address: '',
    country: 'Ghana',
    email: 'animalrightsghana@gmail.com',
    social: '',
    website: '',
    species: ['Cephalopods', 'Chickens', 'Crustaceans', 'Farmed finfish', 'Insects', 'Large ruminants', 'Other farmed mammals', 'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'],
    focus: ['Direct animal assistance', 'Movement & capacity building', 'Policy & legal advocacy', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  },
  {
    id: 'pvm',
    name: 'Plantbased Vegan Market',
    logo: 'https://drive.google.com/open?id=1Npgts5SJAHe2RWYDDdy_m-x7axdHBeCp',
    address: '',
    country: 'Ghana',
    email: 'pbvmgh@gmail.com',
    social: 'https://m.facebook.com/p/Plantbased-Vegan-Market-61553883823741/',
    website: '',
    species: ['Cross-species advocacy'],
    focus: ['Alternative proteins & food system innovation', 'Corporate & institutional engagement', 'Public & consumer outreach', 'Research, investigation & evidence generation']
  }
];

export const REGIONS: string[] = [
  'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Chad', 
  'Democratic Republic of the Congo', 'Egypt', 'Eritrea', 'Ethiopia', 'Gabon', 
  'Gambia', 'Ghana', 'Guinea-Bissau', 'Kenya', 'Liberia', 'Libya', 'Malawi', 
  'Mali', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Pan-African', 
  'Republic of the Congo', 'Rwanda', 'Senegal', 'Somalia', 'South Africa', 
  'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe'
].sort();

export const FOCI: string[] = [
  'Alternative proteins & food system innovation',
  'Corporate & institutional engagement',
  'Direct animal assistance',
  'Movement & capacity building',
  'Policy & legal advocacy',
  'Public & consumer outreach',
  'Research, investigation & evidence generation',
  'Protest & disruptive activism'
].sort();

export const SPECIES: string[] = [
  'Cephalopods', 'Chickens', 'Crustaceans', 'Farmed finfish', 
  'Insects', 'Large ruminants', 'Other farmed mammals', 
  'Other poultry', 'Pigs', 'Small ruminants', 'Cross-species advocacy'
].sort();

export const BRAND_TEAL = '#1db4ab';
export const BRAND_PURPLE = '#7970af';
export const BRAND_GOLD = '#b2a942';
export const BRAND_DARK = '#282e3e';
export const BRAND_OFFWHITE = '#e1e9de';