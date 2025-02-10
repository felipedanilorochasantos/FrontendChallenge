import { Component, OnInit } from '@angular/core';
import { ICharactersResponse } from 'src/app/shared/interfaces/characters.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CharactersService } from 'src/app/core/services/characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listCharacters!: ICharactersResponse;
  characters$ = this.charactersService.characters$;
  searchForm!: FormGroup;
  modalScrollDistance = 2;
  modalScrollThrottle = 50;



  constructor(private readonly charactersService: CharactersService, private readonly fb: FormBuilder) {
    this.createForm();
    this.verifyChangeSearch();
  }


  ngOnInit(): void {
    this.getAllCharacters();
  }

  onScrollDown (characters: ICharactersResponse) {
    if (characters.info.next) {
      this.charactersService.getMoreCharacters(characters.info.next);
    }
  }

  getAllCharacters(): void {
    this.charactersService.getAllCharacters();
  }

  createForm(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  verifyChangeSearch(): void {
    this.searchForm.controls['search'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(
        (value) => {
          if (value) {
            this.charactersService.searchCharacters(value);
          } else {
            this.charactersService.getAllCharacters();
          }
        }
    )
  }

  toggleFavorite(characterId: number, isFavorite?: boolean): void {
    this.charactersService.updateFavoriteStatus(characterId, !isFavorite);
  }
}
