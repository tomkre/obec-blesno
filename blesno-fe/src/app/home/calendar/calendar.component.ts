import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import csLocale from '@fullcalendar/core/locales/cs';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
	
	events: any[];
	
	options: any;
	
	constructor() { 
		this.options = {
			plugins: [dayGridPlugin],
			locales: [csLocale],
			height: 278
		}
	}
	
}
