import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesComponent } from './favorites.component';
import { of } from 'rxjs';
import { Character } from 'src/app/shared/interfaces/characters.interface';
import { CharactersService } from 'src/app/core/services/characters.service';
import { SharedModule } from 'src/app/shared/components/shared.module';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let charactersServiceStub: Partial<CharactersService>;

  beforeEach(async () => {
    charactersServiceStub = {
      characters$: of({ info: { count: 0, pages: 0, next: '', prev: '' }, results: [] }),
      updateFavoriteStatus: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        SharedModule
      ],
      declarations: [FavoritesComponent],
      providers: [
        { provide: CharactersService, useValue: charactersServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateFavoriteStatus on removeFavorite', () => {
    const characterId = 1;
    const isFavorite = false;
    component.removeFavorite(characterId, isFavorite);
    expect(charactersServiceStub.updateFavoriteStatus).toHaveBeenCalledWith(characterId, isFavorite);
  });

  it('should return true if there are favorite characters', () => {
    const characters: Character[] = [
      { id: 1, name: 'Character 1', isFavorite: true, status: '', species: '', type: '', gender: '', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: '', episode: [], url: '', created: '' },
      { id: 2, name: 'Character 2', isFavorite: false, status: '', species: '', type: '', gender: '', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: '', episode: [], url: '', created: '' }
    ];
    expect(component.verifyFavorites(characters)).toBe(true);
  });

  it('should return false if there are no favorite characters', () => {
    const characters: Character[] = [
      { id: 1, name: 'Character 1', isFavorite: false, status: '', species: '', type: '', gender: '', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: '', episode: [], url: '', created: '' },
      { id: 2, name: 'Character 2', isFavorite: false, status: '', species: '', type: '', gender: '', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: '', episode: [], url: '', created: '' }
    ];
    expect(component.verifyFavorites(characters)).toBe(false);
  });
});
