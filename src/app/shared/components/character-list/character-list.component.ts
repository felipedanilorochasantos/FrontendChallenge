import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Character, ICharactersResponse } from '../../interfaces/characters.interface';
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  @Input() characters: ICharactersResponse = { info: { count: 0, pages: 0, next: '', prev: '' }, results: [] };
  @Input() isFavoritesPage = false;
  @Input() enableInfiniteScroll = true;

  @Output() loadMore = new EventEmitter();
  @Output() toggleFavorite = new EventEmitter<{ id: number, isFavorite?: boolean }>();

  constructor(private router: Router) { }

  removeFavorite(id: number) {
    this.toggleFavorite.emit({ id, isFavorite: false });
  }

  onScrollDown() {
    if (this.enableInfiniteScroll) {
      this.loadMore.emit(this.characters);
    }
  }
  hasFavorites(): boolean {
    return this.characters.results.some((character: Character) => character.isFavorite);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
