START TRANSACTION;

INSERT INTO addresses (id, street, city, "state", postal_code, country) VALUES ('01HN5GQWZ5SCVN4K8HTQS42X9P', 'street1', 'city1', 'state1', '123456', 'country1');

INSERT INTO hospitals (id, "name", address_id, email, phone_number, code) VALUES ('01HN5GQWZ5SCVN4K8HTQS42X9Q', 'Dhwani Hospital', '01HN5GQWZ5SCVN4K8HTQS42X9P', 'admin@dhwani.com', '1234567890', 'dhwani');

INSERT INTO users (id, "name", email, hash_password, "role") VALUES ('01HN5GQWZ5SCVN4K8HTQS42X9R', 'Admin User', 'admin@dhwani.com', '$2b$10$u65xr4QbvEvuWRUmMFZjGu8a9BiJFlVzyKjp5cZwCDFaXfMHjrsQW', "ADMIN");

INSERT INTO supervisors (id, user_id, user_code, hospital_id) VALUES ('01HN5GQWZ5SCVN4K8HTQS42X9S', '01HN5GQWZ5SCVN4K8HTQS42X9R', 'admin', '01HN5GQWZ5SCVN4K8HTQS42X9Q');

COMMIT;

-- Credentials are admin@dhwani and password is 'password'