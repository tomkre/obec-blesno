import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  prefixes = ['', 'k', 'M', 'G'];

  transform(value: any, ...args: any[]): any {
	let size = +value;
	let level = 0;
	while ((size / 1000) > 1) {
		size /= 1000;
		level++;
	}
	return `${Math.round(size)} ${this.prefixes[level]}B`;
  }

}
