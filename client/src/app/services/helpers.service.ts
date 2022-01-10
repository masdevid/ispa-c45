import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }
  parseSort(active: string, direction: string): string | undefined {
    if (active && direction) {
      return `${direction === 'asc' ? '' : '-'}${active}`;
    }
    return undefined;
  }
}
