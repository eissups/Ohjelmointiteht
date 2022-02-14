namespace Ennakkotehtava.Model
{
    /**
     * Asiakas, nimi ja íd
     */
    public class Asiakas : Osoite
    {
        public int id { get; set; }
        public string name { get; set; }
        //public Osoite address { get; set; }
        //public Osoite address { get; set; }

    }

    /**
     * Osoitetiedot
     */
    public class Osoite

    {
        public int id { get; set; }
        public string streetaddress { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }


    }

}
