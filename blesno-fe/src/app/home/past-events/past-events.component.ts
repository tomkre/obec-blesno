import { Component } from '@angular/core';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss']
})
export class PastEventsComponent {

	pastEvents: any[];

	constructor() {
		this.initPastEvents();
	}

	initPastEvents() {
		this.pastEvents = [
			{ id: 'detsky-den', title: 'Dětský den'},
			{ id: 'mikulasska-nadilka', title: 'Mikulášská nadílka'},
			{ id: 'myslivecke-odpoledne', title: 'Myslivecké odpoledne'},
			{ id: 'nohejbalovy-turnaj', title: 'Nohejbalový turnaj'},
			{ id: 'otevreni-pristaviste', title: 'Otevření přístaviště'},
			{ id: 'vitani-obcanku', title: 'Vítání občánků'}
		]
	}

}
