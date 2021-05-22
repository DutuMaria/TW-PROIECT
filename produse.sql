CREATE DATABASE proiect_TW ENCODING 'UTF-8' LC_COLLATE 'en_US' LC_CTYPE  'en_US' TEMPLATE template0;

CREATE USER maria WITH ENCRYPTED PASSWORD 'maria';
GRANT ALL PRIVILEGES ON DATABASE proiect_TW to maria;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO maria;


DROP TYPE IF EXISTS categ_produse;
DROP TYPE IF EXISTS brand_produse;

CREATE TYPE categ_produse AS ENUM('haine', 'adidasi');
CREATE TYPE brand_produse AS ENUM('Babolat', 'Yonex', 'FZ Forza');


CREATE TABLE IF NOT EXISTS ECHIPAMENT (
   id serial PRIMARY KEY,
   nume VARCHAR(100) NOT NULL,
   descriere TEXT,
   pret NUMERIC(4) NOT NULL,
   marime VARCHAR [] NOT NULL,
   rating_score  INT NOT NULL CHECK (rating_score<6), 
   gen VARCHAR(15) NOT NULL,
   brand brand_produse NOT NULL,
   categorie categ_produse NOT NULL,
   in_stoc BOOLEAN NOT NULL DEFAULT TRUE,
   data_adaugare TIMESTAMP DEFAULT current_timestamp,
   imagine VARCHAR(300)
);

INSERT into ECHIPAMENT (nume,descriere,pret,gen,marime,categorie,brand,imagine,rating_score, in_stoc) VALUES 

('YONEX SHB AERUS Z INDOOR SHOES - BLUE', 'The Yonex indoor badminton shoe SHB AERUS Z is Yonex`s lightest badminton shoe with great progress in terms of comfort and resistance compared to the 3 versions, while offering extreme lightness (250g) and greater flexibility. It makes no compromise on cushioning and foot support, ensuring the player: lightness, stability and an accurate fit.', 125, 'Femei', '{"36","37","38"}','adidasi', 'Yonex', '1.jpg', 5, TRUE),
('YONEX PC ECLIPSION Z SHOES BLACK', 'Badminton continues to become a faster and faster game and players need shoes that are adapted to the evolving footwork demands and high intensity. Yonex has thus innovated the top of the range Yonex Power Cushion Eclipsion Z Indoor shoe to respond to these requirements.', 80, 'Femei', '{"35","37","38","39"}','adidasi',  'Yonex', '2.jpg', 4, TRUE),
('BABOLAT INDOOR SHADOW TOUR SHOES - VIOLET', 'The innovative graphic and the integrated technologies of the Babolat Shadow Tour shoes will be your allies on the court.', 55, 'Femei', '{"36","37","38"}','adidasi', 'Babolat', '3.jpg', 4, TRUE),
('FORZA VIBRA INDOOR SHOES', 'These women`s Forza Vibra Indoor badminton shoes are ideal for players who are looking for a top of the range shoe that is of very high quality. This pair of Forza badminton shoes is light and will correctly adjust to the shape of your foot as it possesses a thermofusible vamp.', 90, 'Femei', '{"35","37","38"}','adidasi',  'FZ Forza', '4.jpg', 5, FALSE),
('BABOLAT SHADOW TOUR BADMINTON SHOES', 'These women`s Babolat Shadow Tour badminton sheos are ideal for competitive players. The soles were designed by Michelin and were inspired by rally tyres. These shoes will last a long time and will enable you to perform at a high level.', 95, 'Femei', '{"36","37","38","39"}','adidasi',  'Babolat', '5.jpg', 3, TRUE),
('YONEX PC-65 Z2 BLACK-BLUE INDOOR SHOES', 'These men`s Yonex PC 65Z 2 indoor shoes are a top of the range shoe from Yonex. This model offers an excellent combination of stability, cushioning and lightweight.', 90, 'Barbati', '{"39","40","41"}','adidasi', 'Yonex', '6.jpg', 5, TRUE),
('YONEX INDOOR AERUS 3 SHOES SHB BLACK', 'The Yonex Indoor Aerus 3 shoes SHB is the lightest Yonex shoe with a great deal of progess in terms of comfort and resistance compared to the first two versions. Indeed, this model offers extreme lightness (270g). This product does not make any compromise regarding the cushioning and foot support as it offers the following characteristics to the player : light weight, stability and precise adjustment.', 98, 'Barbati', '{"39", "40", "42"}','adidasi',  'Yonex', '7.jpg', 3, FALSE),
('BABOLAT INDOOR SHADOW TOUR SHOES - RED', 'These men`s Babolat Indoor Shadow Tour shoes have struck once again with a stylish design. The innovative graphic and the integrated technologies of the Babolat Shadow Tour shoes will be your allies on the court.', 60, 'Barbati', '{"40", "41", "42"}','adidasi',  'Babolat', '8.jpg', 5, TRUE),
('FORZA INDOOR COURT FLYER BLUE SHOES', 'The men’s Forza Court Flyer shoes are ideal for players who are looking for durability and stability on indoor courts.', 30, 'Barbati', '{"39", "42", "43"}','adidasi',  'FZ Forza', '9.jpg', 3, FALSE),
('BABOLAT INDOOR SHADOW TOUR SHOES - BLACK-BLUE', 'These men`s Babolat Indoor Shadow Tour shoes have struck once again with a stylish design. The innovative graphic and the integrated technologies of the Babolat Shadow Tour shoes will be your allies on the court. This top of the range 2019 model will go well with many other outfits.', 60, 'Barbati', '{"40", "42", "43"}','adidasi',  'Babolat', '10.jpg', 4, TRUE),
('Forza Blues T-Shirt', 'This women`s Forza BLUES t-shirt has an exclusive sporty look and is incredibly comfortable. It`s collaris different which makes it stand out from other models.', 10, 'Femei', '{"36","37","38"}','haine', 'FZ Forza', '11.jpg', 4, FALSE),
('FORZA GAIL POLO - BLUE', 'The women`s Forza Gail blue polo is in 100% polyester and is light and tightened. This model is very stylish.', 7, 'Femei', '{"35","37","38"}','haine', 'FZ Forza', '12.jpg', 3, TRUE),
('FORZA RIETI SKIRT', 'The Forza RIETI skirt offers exceptional comfort. This model possesses integrated tight shorts.', 6, 'Femei', '{"36","37","39"}','haine', 'FZ Forza', '13.jpg', 4, FALSE),
('YONEX SKIRT 26049EX', 'This women`s Yonex skirt 26049EX is made of soft and light textile.', 21, 'Femei', '{"35","36","38"}','haine', 'Yonex', '14.jpg', 3, TRUE),
('YONEX TOUR ELITE 20478EX T-SHIRT', 'This Yonex t-shirt is very light and comfortable. This model derives from the Tour Elite range.', 16, 'Femei', '{"36","37","39"}','haine', 'Yonex', '15.jpg', 4, TRUE),
('YONEX TOUR ELITE T-SHIRT 16517EX', 'The Yonex women`s 16517EX is a super light and very comfortable t-shirt. It is part of the Tour Elite range.', 28, 'Femei', '{"36","37","38","39"}','haine', 'Yonex', '16.jpg', 5, TRUE),
('BABOLAT PLAY T-SHIRT FOR WOMEN', 'This Babolat t-shirt with its simplistic and colorful design is a must-have for the courts. Designed to provide players with optimal well-being in play, it is the garment you need to perform effectively on the court. Featuring Fiber Dry technology, it wicks away the sweat stored during your effort to keep you cool and dry in all circumstances.', 23, 'Femei', '{"35","36","38"}','haine', 'Babolat', '17.jpg', 5, TRUE),
('BABOLAT EXERCISE GLITTER T-SHIRT', 'This Babolat women`s exercise glitter t-shirt is a must-have for your future training sessions and matches. This product is both soft and light, so as to offer you comfort and optimal freedom of movement.', 18, 'Femei', '{"37","38"}','haine', 'Babolat', '18.jpg', 4, TRUE),
('BABOLAT PLAY SKIRT', 'The Babolat Play skirt, part of the new Play range which replaces the Core range, has a thin and light fabric to ensure freedom of movement thanks to the 360° Motion technology.', 28, 'Femei', '{"36","39"}','haine', 'Babolat', '19.jpg', 4, TRUE),
('YONEX TOUR ELITE YM0015EX SHORTS', 'This Men`s Yonex Tour Elite YM0015EX Shorts are made of fibers that will leave you with a pleasant feeling of softness.', 20, 'Barbati', '{"38","39", "40"}','haine', 'Yonex', '20.jpg', 4, False),
('YONEX TOUR ELITE LIN DAN T-SHIRT 16505EX', 'The Yonex Men`s 16505EX is a super light and very comfortable t-shirt. It is part of the Tour Elite range.', 28, 'Barbati', '{"38","39", "41"}','haine', 'Yonex', '21.jpg', 4, TRUE),
('YONEX TOUR ELITE SHORTS - 15075EX', 'These men`s Yonex Tour Elite shorts (ref : 15075EX) are very well fit. This light model is made of 100% polyester and does not include additional underwear.', 15, 'Barbati', '{"39","40", "41"}','haine', 'Yonex', '22.jpg', 3, TRUE),
('BABOLAT PLAY CREW SHORTS', 'Babolat Play shorts, from the new Play range which replaces the Core range, have a thin and light fabric to ensure freedom of movement thanks to 360 ° Motion technology. These Babolat shorts dry quickly thanks to Fiber Dry technology and provide maximum comfort on the court. The waist is elastic with internal drawstrings for good support and there are two large pockets on the sides which is really practical.', 27, 'Barbati', '{"38","40", "41"}','haine', 'Babolat', '23.jpg', 5, TRUE),
('BABOLAT PLAY CREW T-SHIRT', 'This Babolat play crew t-shirt for men is a must-have for your future training sessions and matches. This product is both soft and light, in order to offer you comfort and optimal freedom of movement.', 23, 'Barbati', '{"38","39", "40"}','haine', 'Babolat', '24.jpg', 5, TRUE);

