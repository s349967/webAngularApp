﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using webAppBillett.Contexts;
using webAppBillett.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace webAppBillett.DAL
{

    public class AdminRepository : IAdminRepository
    {
        private readonly BillettContext _lugDb;

        public AdminRepository(BillettContext db)
        {
            _lugDb = db;

        }

        public static byte[] lagHash(string passord, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                                password: passord,
                                salt: salt,
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 1000,
                                numBytesRequested: 32);
        }

        public static byte[] lagSalt()
        {
            var csp = new RNGCryptoServiceProvider();
            var salt = new byte[24];
            csp.GetBytes(salt);
            return salt;
        }

        public async void registrerBruker(Bruker bruker)
        {
            byte[] salt = lagSalt();
            byte[] hash = lagHash(bruker.passord, salt);
            bruker.passord = Encoding.Default.GetString(hash);
            bruker.salt = salt;
            _lugDb.Add(bruker);
            _lugDb.SaveChanges();
        }

        public async Task<bool> loggInn(Bruker bruker)
        {
            try
            {
                Bruker brukeren = await _lugDb.brukere.FirstOrDefaultAsync(x =>x.brukernavn == bruker.brukernavn);
  
                byte[] hash = lagHash(bruker.passord, brukeren.salt);
                bool ok = hash.SequenceEqual(Encoding.ASCII.GetBytes(brukeren.passord));
                if (ok)
                {
    
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
    
                return false;
            }
        }
        public async Task<List<Person>> hentPersoner()
        {


            return await _lugDb.personer.ToListAsync();

        }
        public async Task<List<Betaling>> hentBetalinger()
        {


            return await _lugDb.betaling.ToListAsync();

        }
        public async Task<List<Reservasjon>> hentReservasjoner()
        {
            return await _lugDb.reservasjon.ToListAsync();
        }

        public async Task<List<Rute>> hentRutere()
        {


            return await _lugDb.ruter.ToListAsync();

        }


        public async Task<List<Billett>> hentBilletter()
        {
            return await _lugDb.billetter.ToListAsync();
        }

        public async Task<List<BillettPerson>> hentBillettpersoner()
        {
            return await _lugDb.billettPerson.ToListAsync();
        }

        public async Task<List<Havn>> hentHavner()
        {
            return await _lugDb.havn.ToListAsync();
        }

        public async Task<List<Lugar>> hentLugarer()
        {
            return await _lugDb.lugarer.ToListAsync();
        }



        public async Task<List<RuteForekomstDato>> hentRuteforekomstdatoer()
        {
            return await _lugDb.ruteForekomstDato.ToListAsync();
        }

        public async Task<List<RuteForekomstDatoTid>> hentRuteforekomstdatotider()
        {
            return await _lugDb.ruteForekomstDatoTid.ToListAsync();
        }

        public void lagrePerson(Person person)
        {
            _lugDb.personer.Add(person);
            _lugDb.SaveChanges();
        }

        public void lagreBetaling(Betaling betaling)
        {
            _lugDb.betaling.Add(betaling);
            _lugDb.SaveChanges();
        }

        public void lagreHavn(Havn havn)
        {
            _lugDb.havn.Add(havn);
            _lugDb.SaveChanges();
        }

        public void lagreReservasjon(Reservasjon reservasjon)
        {
            _lugDb.reservasjon.Add(reservasjon);
            _lugDb.SaveChanges();
        }

        public void lagreRuter(Rute rute)
        {
            _lugDb.ruter.Add(rute);
            _lugDb.SaveChanges();
        }

        public void lagreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            _lugDb.ruteForekomstDatoTid.Add(ruteForekomstDatotid);
            _lugDb.SaveChanges();
        }

        public void lagreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            _lugDb.ruteForekomstDato.Add(ruteForekomstDato);
            _lugDb.SaveChanges();
        }

        public void lagreLugar(Lugar lugar)
        {
            _lugDb.lugarer.Add(lugar);
            _lugDb.SaveChanges();
        }

        public void lagreBillettperson(BillettPerson billettPerson)
        {
            _lugDb.billettPerson.Add(billettPerson);
            _lugDb.SaveChanges();
        }

        public void lagreBillett(Billett billett)
        {
            _lugDb.billetter.Add(billett);
            _lugDb.SaveChanges();
        }

        public void endrePerson(Person person)
        {
            Person personen = _lugDb.personer.Find(person.personId);
            personen.fornavn = person.fornavn;
            personen.etternavn = person.etternavn;
            personen.telefon = person.telefon;
            _lugDb.SaveChanges();
      
        }

        public void endreBetaling(Betaling betaling)
        {
            Betaling betalingen = _lugDb.betaling.Find(betaling.betalingsId);
            betalingen.pris = betaling.pris;
            betalingen.adresse = betaling.adresse;
            betalingen.csv = betaling.csv;
            betalingen.email = betaling.email;
            betalingen.kortholderNavn = betaling.kortholderNavn;
            betalingen.kortnummer = betaling.kortnummer;
            betalingen.postnr = betaling.kortnummer;
            betalingen.poststed = betaling.poststed;
            betalingen.telefon = betaling.telefon;
            betalingen.utloper = betaling.utloper;
            _lugDb.SaveChanges();
        }

        public void endreHavn(Havn havn)
        {
            Havn havnen = _lugDb.havn.Find(havn.havnId);
            havnen.navn = havn.navn;
            havnen.ruteFra = havn.ruteFra;
            havnen.ruteTil = havn.ruteTil;
            _lugDb.SaveChanges();
            throw new NotImplementedException();
        }

        public void endreReservasjon(Reservasjon reservasjon)
        {
            throw new NotImplementedException();
        }

        public void endreRute(Rute rute)
        {
            throw new NotImplementedException();
        }

        public void endreRuteforekomstdatotid(RuteForekomstDatoTid ruteForekomstDatotid)
        {
            throw new NotImplementedException();
        }

        public void endreRuteforekomstdato(RuteForekomstDato ruteForekomstDato)
        {
            throw new NotImplementedException();
        }

        public void endreLugar(Lugar lugar)
        {
            throw new NotImplementedException();
        }

        public void endreBillettperson(BillettPerson billettPerson)
        {
            throw new NotImplementedException();
        }

        public void endreBillett(Billett billett)
        {
            throw new NotImplementedException();
        }






        public void slettPerson(int id)
        {
            Person person = _lugDb.personer.Find(id);
            _lugDb.personer.Remove(person);
            _lugDb.SaveChanges();
        }

        public void slettBetaling(int id)
        {
           
            
        }

        public void slettHavn(int id)
        {
            throw new NotImplementedException();
        }

        public void slettReservasjon(int id)
        {
            throw new NotImplementedException();
        }

        public void slettRute(int id)
        {
            throw new NotImplementedException();
        }

        public void slettRuteforekomstdatotid(int id)
        {
            throw new NotImplementedException();
        }

        public void slettRuteforekomstdato(int id)
        {
            throw new NotImplementedException();
        }

        public void slettLugar(int id)
        {
            throw new NotImplementedException();
        }

        public void slettBillettperson(int id)
        {
            throw new NotImplementedException();
        }

        public void sletteBillett(int id)
        {
            throw new NotImplementedException();
        }
    }

}