import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent {

	eventsMenu: MenuItem[];

	events: MenuItem[];

	eventPosters: any[] = [];

	constructor() {
		this.initEvents();
		this.initEventPosters();
		this.initTimer();
	}
	
	initEvents() {
		this.events = [
			{ url: 'mikulasska-nadilka', label: 'Mikulášská nadílka', styleClass: 'highlight' },
			{ url: 'rozsviceni-vanocniho-stromecku', label: 'Rozsvícení vánočního stromečku' },
			{ url: 'novorocni-ohnostroj', label: 'Novoroční ohňostroj' },
			{ url: 'myslivecky-ples', label: 'Myslivecký ples' },
			{ url: 'rybarsky-ples', label: 'Rybářský ples' }
		]
		this.eventsMenu = [
			{ label: 'Tipy na akce', items: this.events }
		];
	}
	
	initEventPosters() {
		this.events.forEach(e => this.eventPosters.push({ source: `assets/events/${e.url}.jpg`}));
	}

	initTimer() {
		let currentEventIndex = 0;
		setInterval(() => {
			this.events[currentEventIndex % 5].styleClass = '';
			currentEventIndex++;
			this.events[currentEventIndex % 5].styleClass = 'highlight';
		}, 10000);
	}

}
