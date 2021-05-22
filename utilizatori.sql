CREATE TYPE roluri AS ENUM('admin', 'comun');

CREATE TABLE IF NOT EXISTS utilizatori (
    id serial PRIMARY KEY, 
    --rol roluri  NOT NULL DEFAULT 'comun',
    username VARCHAR(50) UNIQUE NOT NULL, 
    nume VARCHAR(100) NOT NULL, 
    prenume VARCHAR(100) NOT NULL,
    parola VARCHAR(100) NOT NULL, 
    culoare_chat VARCHAR(50) NOT NULL,
    data_adaugare TIMESTAMP DEFAULT current_timestamp
);