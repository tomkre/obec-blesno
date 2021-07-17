import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

	getOfficeMenu(): MenuItem[] {
		const menuItems: MenuItem[] = [
            { url: '/kontakty', label: 'Kontakty' },
            { url: '/struktura-obecniho-uradu', label: 'Struktura obecního úřadu' },
			{ url: '/uredni-deska', label: 'Úřední deska' },
			{ url: '/dokumenty', label: 'Dokumenty', items: [
                { url: '/obecni-urad/usneseni-zastupitelstva', label: 'Usnesení zastupitelstva' },
                { url: '/obecni-urad/vyhlasky-a-zarizeni', label: 'Vyhlášky a zařízení' },
                { url: '/obecni-urad/rozpocty', label: 'Rozpočty' },
                { url: '/obecni-urad/kontrolni-vybor', label: 'Kontrolní výbor' },
                { url: '/obecni-urad/prehled-vsech-dokumentu', label: 'Přehled všech dokumentů' }
            ] },
			{ url: '/povinne-zverejnovane-informace', label: 'Povinně zveřejňované informace' },
			{ url: '/dalsi-povinne-informace', label: 'Další povinné informace' },
			{ url: '/registr-oznameni', label: 'Registr oznámení' },
			{ url: '/verejne-zakazky', label: 'Veřejné zakázky' },
			{ url: '/czechpoint', label: 'CZECHPOINT' },
			{ url: '/formulare', label: 'Formuláře', items: [
                { label: 'Formuláře ke stažení', items: [
                    { url: 'http://localhost:8080/articles/formulare-ke-stazeni/assets/zadost-o-povoleni-kaceni-drevin.rtf',
                        label: 'Žádost o povolení kácení dřevin', target: '_blank' },
                    { url: 'http://localhost:8080/articles/formulare-ke-stazeni/assets/zadost-o-povoleni-k-odberu-podzemnich-vod-pro-obcany.rtf',
                        label: 'Žádost o povolení k odběru podzemních vod pro občany', target: '_blank' },
                    { url: 'http://localhost:8080/articles/formulare-ke-stazeni/assets/zadost-o-overeni-dokumentace-skutecneho-provedeni-stavby-studny.rtf',
                        label: 'Žádost o ověření dokumentace skutečného provedení stavby studny', target: '_blank' },
                    { url: '#',
                        label: 'Žádost o prodloužení platnosti povolení k odběru povrchových nebo podzemních vod',
                        target: '_blank' },
                    { url: 'http://localhost:8080/articles/formulare-ke-stazeni/assets/cestne-prohlaseni-k-existenci-studny-vybudovane-do-01-01-1955.rtf',
                        label: 'Čestné prohlášení k existenci studny vybudované do 1. 1. 1955', target: '_blank' },
                    { url: '#',
                        label: 'Žádost o povolení k vypouštění odpadnich vod do vodo povrchových nebo podzemních - domácnost',
                        target: '_blank' },
                    { url: 'http://localhost:8080/articles/formulare-ke-stazeni/assets/zadost-o-prodlouzeni-platnosti-povoleni-k-vypousteni-odpadnich-vod-do-vod-povrchovych-domacnosti.rtf',
                        label: 'Žádost o prodloužení platnosti povolení k vypouštění odpadnich vod do vod povrchových - domácnosti',
                        target: '_blank' }
                ] },
                { url: 'http://www.statnisprava.cz/ebe/redakce.nsf/i/formulare', label: 'Formuláře státní správy' },
                { url: 'http://www.formulare-ke-stazeni.cz/', label: 'Ostatní formuláře' },
                { url: 'http://www.vzory-online.cz/', label: 'Vzory smluv zdarma' }
            ] },
		];
		return [
			{ label: 'Obecní úřad', items: menuItems }
		];
	}

	getMunicipalityMenu(): MenuItem[] {
		const menuItems: MenuItem[] = [
            { url: '/blesno-v-odkazech', label: 'Blešno v odkazech', items: [
                { url: 'https://cs.wikipedia.org/wiki/Ble%C5%A1no', label: 'Blešno na Wikipedii' },
                { url: 'http://www.virtualtravel.cz/export/blesno', label: 'Panoramatická prohlídka 2018' },
                { url: 'http://localhost:4200/assets/documents/studie-rekonstrukce-budovy-obecniho-uradu.pdf',
				    label: 'Studie rekonstrukce budovy obecního úřadu [PDF, 887 kB]' }
            ] },
			{ url: '/kanalizace', label: 'Kanalizace' },
			{ url: '/historie-a-soucasnost', label: 'Historie a současnost' },
			{ url: '/uzemni-plan', label: 'Územní plán' },
			{ url: '/dopravni-obsluznost', label: 'Dopravní obslužnost' },
			{ url: '/odpad', label: 'Odpad' },
			{ url: '/zastupitelstvo', label: 'Zastupitelstvo' },
			{ url: '/blesno-v-mediich', label: 'Blešno v médiích' },
			{ url: '/blesno-na-mape', label: 'Blešno na mapě', items: [
                { url: 'http://www.katastr2.cz/?lat=50.214347316541264&lng=15.930334031581879&zoom=19',
                    label: 'Katastrální mapa Blešno'},
                { url: 'http://mapy.cz/#mm=PA@x=136529536@y=136408576@z=13', label: 'Blešno na historické mapě'}
            ] },
			{ url: '/kroniky-obce-blesno', label: 'Kroniky obce Blešno' },
			{ url: '/vybrane-statistiky', label: 'Vybrané statistiky' },
			{ url: '/nas-mapovy-portal', label: 'Náš mapový portál' },
			{ url: '/volby', label: 'Volby' },
			{ url: '/dulezite-odkazy', label: 'Důležité odkazy', items: [
                { url: 'http://portal.gov.cz/portal/obcan/situace/', label: 'Životní situace' },
                { url: 'http://www.ochranaobyvatel.cz/', label: 'Ochrana obyvatel' },
                { url: 'http://www.trebechovicko.cz/', label: 'Mikroregion Třebechovicko' },
                { url: 'http://www.smocr.cz/', label: 'Svaz měst a obcí ČR' },
                { url: 'http://www.asociacekraju.cz/', label: 'Asociace krajů ČR' },
                { url: 'http://mesta.obce.cz/', label: 'Města a obce online' },
                { url: 'http://www.cuzk.cz/', label: 'Katastrální úrad' }
            ] }
		];
		return [
			{ label: 'Obec Blešno', items: menuItems }
		];
	}

	getLifeMenu(): MenuItem[] {
		const menuItems: MenuItem[] = [
			{ url: '/zahradkari', label: 'Zahrádkáři' },
			{ url: '/sport', label: 'Sport', items: [
                { url: '/zivot-v-obci/fotbal', label: 'Fotbal' },
                { url: '/zivot-v-obci/ostatni-sportovni-aktivity', label: 'Ostatní sportovní aktivity' }
            ] },
            { url: '/pozvanka-na-kulturni-a-sportovni-akce',
                label: 'Pozvánka na kulturní a sportovní akce' },
			{ url: '/posta', label: 'Pošta' },
			{ url: '/obchod-a-stravovani', label: 'Obchod a stravování' },
			{ url: '/veterinarni-ordinace', label: 'Veterinární ordinace' },
			{ url: '/podnikatele-a-firmy', label: 'Podnikatelé a firmy' },
			{ url: '/informacni-noviny', label: 'Informační noviny' },
			{ url: '/obecni-knihovna', label: 'Obecní knihovna' },
			{ url: '/diskuzni-forum', label: 'Diskuzní fórum' },
			{ url: '/fotogalerie', label: 'Fotogalerie' },
			{ url: '/kalendar-akci', label: 'Kalendář akcí' },
			{ url: '/mas-nad-orlici', label: 'MAS Nad Orlicí' }
		];
		return [
			{ label: 'Život v obci', items: JSON.parse(JSON.stringify(menuItems)) }
		];
	}

	getMenu(id: string, firstLevel = false, icon = null): MenuItem[] {
		const menuMap = new Map<string, MenuItem[]>();
		menuMap.set('obecni-urad', this.getOfficeMenu());
		menuMap.set('obec-blesno', this.getMunicipalityMenu());
        menuMap.set('zivot-v-obci', this.getLifeMenu());
        const menuItems = menuMap.get(id);
        menuItems[0].items.forEach(mi => {
            mi.url = id + mi.url;
            if (!!mi.items && firstLevel) {
                delete mi.items;
            } else if (mi.items && !firstLevel) {
                delete mi.url;
            }
            if (!!icon) {
                mi.icon = icon;
            }
        });
		return  menuItems;
	}

}
