import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/core/services/characters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  numberFavorites = 0;

  constructor(private readonly charactersService: CharactersService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.verifyNumberFavorites();
  }

  verifyNumberFavorites(): void {
    this.charactersService.characters$.subscribe(characters => {
      if (characters && characters.results) {
        this.numberFavorites = characters.results.filter(character => character.isFavorite).length;
      }
    });
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
