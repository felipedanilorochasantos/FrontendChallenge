import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICharactersResponse } from 'src/app/shared/interfaces/characters.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(public httpClient: HttpClient) { }

  private readonly charactersSubject = new BehaviorSubject<ICharactersResponse | null>(null);
  public characters$ = this.charactersSubject.asObservable();

  public setCharacters(characters: ICharactersResponse): void {
    this.charactersSubject.next(characters);
    localStorage.setItem('charactersData', JSON.stringify(characters));
  }

  public getAllCharacters(): void {
    if (localStorage.getItem('charactersData')) {
      const data = JSON.parse(localStorage.getItem('charactersData') || '');
      this.setCharacters(data);
    } else {
      this.httpClient.get<ICharactersResponse>(`${environment.apiUrl}/character`).subscribe(
        data => this.setCharacters(data),
        error => this.setCharacters({ info: { count: 0, next: null, pages: 0, prev: null }, results: [] })
      );
    }
  }

  public getMoreCharacters(urlNext: string): void {
    this.httpClient.get<ICharactersResponse>(urlNext).subscribe(
      data => {
        const currentData = this.charactersSubject.value;
        if (currentData) {
          this.setCharacters({
            ...data,
            results: [...currentData.results, ...data.results]
          });
        }
      },
      error => this.setCharacters({ info: { count: 0, next: null, pages: 0, prev: null }, results: [] })
    );
  }

  public searchCharacters(name: string): void {
    this.httpClient.get<ICharactersResponse>(`${environment.apiUrl}/character/?name=${name}`).subscribe(
      data => this.setCharacters(data),
      error => this.setCharacters({ info: { count: 0, next: null, pages: 0, prev: null }, results: [] })
    );
  }

  public updateFavoriteStatus(characterId: number, isFavorite: boolean): void {
    const currentData = this.charactersSubject.value;
    if (currentData) {
      const updatedResults = currentData.results.map(character =>
        character.id === characterId ? { ...character, isFavorite } : character
      );
      this.setCharacters({ ...currentData, results: updatedResults });
    }
  }

}
