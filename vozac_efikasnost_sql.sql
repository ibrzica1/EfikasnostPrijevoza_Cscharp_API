use master;
go
drop database if exists vozac_efikasnost;
go
create database vozac_efikasnost collate Croatian_CI_AS;
go

use vozac_efikasnost;

create table tura(
tura_id int not null primary key identity(1,1),
relacija varchar(50) not null,
udaljenost decimal(10,2) not null,
prijedeni_km decimal (10,2)not null,
potrosnja_goriva decimal (6,2) not null,
kamion_id int not null,
vozac_id int not null,
datum_pocetak datetime not null,
datum_zavrsetak datetime not null
);

create table kamioni(
kamion_id int not null primary key identity(1,1),
reg_oznaka varchar(15) not null,
marka varchar(35) not null,
istek_registracije datetime null,
godina_proizvodnje int not null,
prosjecna_potrosnja_goriva decimal (4,2) not null
);

create table vozaci(
vozac_id int not null primary key identity(1,1),
ime varchar(20) not null,
prezime varchar(20) not null,
datum_rodenja datetime null,
istek_ugovora datetime not null
);


alter table tura add foreign key (kamion_id) references kamioni(kamion_id);
alter table tura add foreign key (vozac_id)  references vozaci(vozac_id);


insert into vozaci (ime,prezime,datum_rodenja,istek_ugovora) values 
('Ivan','Šućur','1984-04-25','2026-06-28'),
('Antonio','Šulmajster','1984-07-22','2025-01-05'),
('Ivan','Matković','1965-02-16','2025-03-14'),
('Petar','Cerovšek','1974-04-22','2026-05-19'),
('Ivan','Spajić','1984-03-16','2026-08-14'),
('Mario','Hanak','1978-11-23','2026-09-22'
);

insert into kamioni (reg_oznaka,marka,godina_proizvodnje,
prosjecna_potrosnja_goriva,istek_registracije) values
('OS2265PK','Scania R500',2019,23.56,'2024-11-02'),
('OS7754OT','Scania R500 V8',2010,30.11,'2025-05-22'),
('OS8657IH','Man TG 420',2010,29.13,'2025-02-12'),
('OS1145TU','Man TGX 460',2018,27.50,'2024-10-25'),
('OS3764RR','Volvo FH500',2015,25.88,'2025-04-11'),
('OS8847EH','Volvo FH460',2012,26.90,'2025-02-12'
);

insert into tura (relacija,datum_pocetak,datum_zavrsetak,udaljenost,
prijedeni_km,potrosnja_goriva,kamion_id,vozac_id) values
('osijek-zagreb','2024-03-15','2024-03-15', 223.34,230.12,68.20,6,1),
('osijek-split','2024-04-16','2024-04-17',687.09,695.55,215.55,3,1),
('osijek-čakovec','2024-03-17','2024-03-17', 242.45,244.34,70.22,2,2),
('osijek-rijeka','2024-04-13','2024-04-13',444.67,447.21,120.11,5,2),
('osijek-zagreb','2024-03-14','2024-03-14',223.34,240.25,65.58,1,3),
('osijek-rijeka','2024-04-09','2024-04-10',444.67,470.77,137.55,4,3),
('osijek-sl.brod','2024-03-20','2024-03-20',94.67,100.45,37.54,3,4),
('osijek-čakovec','2024-04-09','2024-04-09',242.45,257.45,77.23,5,4),
('osijek-split','2024-03-13','2024-03-14',687.09,689.22,197.34,2,5),
('osijek-zagreb','2024-04-23','2024-04-23',223.34,224.67,59.91,3,5),
('osijek-sl.brod','2024-03-08','2024-03-08',94.67,96.02,27.46,6,6),
('osijek-split','2024-04-15','2024-04-16',687.09,691.11,196.11,4,6
);