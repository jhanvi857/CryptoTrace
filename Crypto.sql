CREATE TABLE crypto_addresses (
  address_id SERIAL PRIMARY KEY,
  address TEXT NOT NULL UNIQUE,
  crypto_type VARCHAR(20),
  first_seen DATE,
  last_seen DATE,
  status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE entities (
  entity_id SERIAL PRIMARY KEY,
  name TEXT,
  entity_type VARCHAR(20),
  phone TEXT,
  email TEXT,
  bank_details TEXT,
  notes TEXT
);

CREATE TABLE sources (
  source_id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  source_type VARCHAR(50),
  reliability_score INT,
  last_scan DATE
);

CREATE TABLE address_mentions (
  mention_id SERIAL PRIMARY KEY,
  address_id INT REFERENCES crypto_addresses(address_id),
  source_id INT REFERENCES sources(source_id),
  snippet TEXT,
  found_date DATE
);

CREATE TABLE entity_address_links (
  link_id SERIAL PRIMARY KEY,
  entity_id INT REFERENCES entities(entity_id),
  address_id INT REFERENCES crypto_addresses(address_id),
  relationship_type VARCHAR(50),
  confidence NUMERIC(4,2)
);

CREATE TABLE clusters (
  cluster_id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT
);

CREATE TABLE cluster_members (
  cluster_id INT REFERENCES clusters(cluster_id),
  member_type VARCHAR(20),
  member_id INT,
  PRIMARY KEY (cluster_id, member_type, member_id)
);

TRUNCATE TABLE cluster_members,
               clusters,
               entity_address_links,
               address_mentions,
               sources,
               entities,
               crypto_addresses
RESTART IDENTITY CASCADE;


INSERT INTO crypto_addresses (address, crypto_type, first_seen, last_seen, status) VALUES
('1BoatSLRHtKNngkdXEeobR76b53LETtpyT', 'BTC', '2023-01-10', '2023-05-20', 'active'),
('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', 'BTC', '2023-02-01', '2023-05-01', 'inactive'),
('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7k9g0d5', 'BTC', '2023-03-15', '2023-06-20', 'active'),
('0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 'ETH', '2022-11-15', '2023-06-01', 'active'),
('0x53d284357ec70cE289D6D64134DfAc8E511c8a3D', 'ETH', '2023-01-20', '2023-06-25', 'active');

INSERT INTO entities (name, entity_type, phone, email, bank_details, notes) VALUES
('John Doe', 'person', '+91-9876543210', 'johndoe@mail.com', 'HDFC-1234567890', 'Darknet vendor'),
('DarkMarket Ltd.', 'org', NULL, 'admin@darkmarket.onion', 'ICICI-987654321', 'Drug marketplace operator'),
('Ali Khan', 'person', '+44-7722334455', NULL, NULL, 'Possible money mule'),
('CryptoExchangeX', 'org', NULL, 'support@cexchange.com', 'SBI-5566778899', 'Exchange used in laundering'),
('Maria Silva', 'person', '+55-21-99887766', 'maria@protonmail.com', NULL, 'Reported scammer');

INSERT INTO sources (url, source_type, reliability_score, last_scan) VALUES
('https://darkforum.onion/thread/crypto-deals', 'forum', 80, '2023-06-10'),
('https://newsportal.com/crypto-crime-article', 'news', 95, '2023-06-12'),
('http://marketxyz.onion/sell-drugs', 'deepweb', 70, '2023-06-15'),
('https://pastebin.com/abcd1234', 'paste', 60, '2023-06-18'),
('http://drugstore.onion/payment-info', 'deepweb', 75, '2023-06-20');

INSERT INTO address_mentions (address_id, source_id, snippet, found_date) VALUES
(1, 1, 'BTC address for drug payments: 1Boat...', '2023-06-10'),
(2, 2, 'Wallet linked to scam activity', '2023-06-12'),
(3, 3, 'Customer must pay to bc1qw508...', '2023-06-15'),
(4, 4, 'ETH wallet exposed: 0x742d35...', '2023-06-18'),
(5, 5, 'Send to 0x53d284 for laundering', '2023-06-20');

INSERT INTO entity_address_links (entity_id, address_id, relationship_type, confidence) VALUES
(1, 1, 'seller', 0.90),
(2, 2, 'operator', 0.85),
(3, 3, 'mule', 0.70),
(4, 4, 'exchange', 0.95),
(5, 5, 'scammer', 0.80);

INSERT INTO clusters (name, description) VALUES
('Drug Sales', 'Addresses/entities linked to drug trafficking'),
('Money Laundering', 'Funds moved to hide illicit origins'),
('Scams', 'Online scam operations'),
('Terror Financing', 'Funding terror cells'),
('Ransomware', 'Ransomware payments');

INSERT INTO cluster_members (cluster_id, member_type, member_id) VALUES
(1, 'address', 1),
(1, 'entity', 1),
(2, 'address', 3),
(2, 'entity', 3),
(3, 'entity', 5);

SELECT * FROM crypto_addresses;
SELECT * FROM entities;
SELECT * FROM sources;
SELECT * FROM address_mentions;
SELECT * FROM entity_address_links;
SELECT * FROM clusters;
SELECT * FROM cluster_members;

--Show all entities with their linked crypto addresses
SELECT e.name AS entity_name, e.entity_type, c.address, c.crypto_type, l.relationship_type, l.confidence
FROM entity_address_links l
JOIN entities e ON l.entity_id = e.entity_id
JOIN crypto_addresses c ON l.address_id = c.address_id;

--Show all addresses with their mention sources
SELECT c.address, c.crypto_type, s.url AS source_url, s.source_type, m.snippet, m.found_date
FROM address_mentions m
JOIN crypto_addresses c ON m.address_id = c.address_id
JOIN sources s ON m.source_id = s.source_id;
