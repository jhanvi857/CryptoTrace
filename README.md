# CryptoTrace : Crypto Entity & Address Intelligence System

### Problem Statement 🔍
Cryptocurrency has become the de-facto currency in modern criminal activities — from simple illegal transactions to grave crimes such as drug trafficking, money laundering, and terror financing.  
Due to its **pseudo-anonymous nature**, there is a growing need to **collect, contextualize, and analyze cryptocurrency addresses** associated with suspicious entities.

---

## Objective 🎯
To develop an **end-to-end autonomous system** for:
- Collecting cryptocurrency addresses and associated entity information from surface and deep web sources.
- Validating, contextualizing, and storing them in a secure database.
- Providing an interactive **dashboard** for analysis, visualization, and export.

---
## Architecture Overview 🧩  
| Component | Description |
|------------|--------------|
| **Scraper Module** | Continuously scrapes surface and deep web sources (via Tor), extracts cryptocurrency addresses and associated PII such as name, email, phone, bank details, and source URLs. |
| **Database Layer (Supabase)** | Stores validated crypto address records with metadata like crypto type, last scan date, and source. Prevents duplication before insertion. |
| **Entity Analyzer** | Clusters related addresses, flags suspicious patterns, and tags associated entities for analytical insights. |
| **Authentication System** | Implements secure login/signup using JWT. Only verified users can access the dashboard. |
| **Dashboard (Frontend)** | Search and filter by entity/wallet, view results in tabular form, visualize relationships via entity graph, export data as JSON, and manage saved searches. |
| **APIs & Docs** | REST APIs for fetching data, exporting JSON/CSV, and user operations, along with API documentation. |

---

## Tech Stack ⚙️ 
| Layer | Technology Used |
|--------|----------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Supabase) |
| **Web Scraping** | Node-Fetch, JSDOM, Cron Jobs, Tor Proxy |
| **Security** | Helmet, JWT, bcrypt.js |
| **Visualization** | react-force-graph |

---

##  Core Features 🧠  
-  Automated scraping of surface & dark web forums for crypto-related data  
-  Entity contextualization: link PII (emails, phones, banks) with crypto addresses  
-  Graph-based clustering for fraud, scam, or illicit fund detection  
-  Secure user authentication and access control  
-  Dashboard with search, filters, graph view & export options  
-  Cron-based scheduled scraping and data refresh  

---

## Team members and contributionss 
| Team Member | Role | Contribution |
|--------------|------|--------------|
| **[Jhanvi patel](https://github.com/jhanvi857)** | Backend Developer | integrated APIs with React components, created secure REST APIs for search, export, and saved data, designed interactive analytics view using react-graph. |
| **[Dhruv rathod](https://github.com/dhruv45396)** | Scraper & Validator Developer | Built and scheduled scraping system using `node-fetch` and `jsdom`, implemented PII validation and duplicate removal logic. |
| **[Darshi prajapati](https://github.com/darshi1707)** |Frontend developer | Designed workflow, demo page for users and features page UI with responsive design.  |
| **[Ved chaudhary](https://github.com/VDChaudhary)** | Frontend Developer | Designed dashboard, about page and API docs page UI with responsive layout. |
| **[Divyesh sathwara](https://github.com/Divyesh7s)** | Blockchain & Authentication Specialist | Integrated blockchain verification APIs, implemented JWT authentication, password encryption using bcrypt.js. |
| **[Sanket patel](https://github.com/SanketPatel2007)** | Database & Schema Designer | Designed Supabase schema, created optimized queries, managed relationships and indexing for crypto records. |

---

## How It Works 🧾 
1. **Scraper** runs every 50 minutes (via cron) to fetch JSON/HTML from listed sources.  
2. Extracted entities (wallets, names, PII) are stored in Supabase after deduplication.  
3. **Analyzer** clusters data and flags suspicious patterns.  
4. **Frontend Dashboard** visualizes connections and enables search/export.  

---
