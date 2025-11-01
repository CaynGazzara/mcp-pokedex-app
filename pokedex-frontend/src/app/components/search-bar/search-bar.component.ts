import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query.trim()) {
        this.search.emit(query.trim());
      } else {
        this.clear.emit();
      }
    });
  }

  onInputChange() {
    this.searchSubject.next(this.searchQuery);
  }

  onClear() {
    this.searchQuery = '';
    this.clear.emit();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClear();
    }
  }
}