import { Component } from '@angular/core';
import { CharactersService } from 'src/app/core/services/characters.service';
import { Character } from 'src/app/shared/interfaces/characters.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent {
  characters$ = this.charactersService.characters$;

  constructor(private readonly charactersService: CharactersService) { }
  removeFavorite(characterId: number, isFavorite: boolean): void {
    this.charactersService.updateFavoriteStatus(characterId, isFavorite);
  }

  verifyFavorites(characters: Character[]): boolean {
    return characters.some(character => character.isFavorite)
  }

}
