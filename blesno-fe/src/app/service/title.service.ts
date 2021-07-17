import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    emitter = new EventEmitter<string>();

    emit = this.emitter.emit;

    subscribe = this.emitter.subscribe;

}
