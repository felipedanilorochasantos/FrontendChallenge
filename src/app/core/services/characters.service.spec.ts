import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersService } from './characters.service';
import { ICharactersResponse } from 'src/app/shared/interfaces/characters.interface';
import { environment } from 'src/environments/environment';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService]
    });
    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear(); // Limpa o localStorage antes de cada teste
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set characters and store in localStorage', () => {
    const characters: ICharactersResponse = { info: { count: 1, next: null, pages: 1, prev: null }, results: [] };
    service.setCharacters(characters);
    expect(service.characters$).toBeTruthy();
    expect(localStorage.getItem('charactersData')).toEqual(JSON.stringify(characters));
  });

  it('should get all characters from API if localStorage is empty', (done) => {
    const characters: ICharactersResponse = { 
      info: { count: 1, next: null, pages: 1, prev: null }, 
      results: [] 
    };

    service.getAllCharacters();
    
    const req = httpMock.expectOne(`${environment.apiUrl}/character`);
    expect(req.request.method).toBe('GET');
    req.flush(characters);

    service.characters$.subscribe(data => {
      expect(data).toEqual(characters);
      done();
    });
  });

  it('should get all characters from localStorage if available', () => {
    const characters: ICharactersResponse = { info: { count: 1, next: null, pages: 1, prev: null }, results: [] };
    localStorage.setItem('charactersData', JSON.stringify(characters));
    service.getAllCharacters();
    expect(service.characters$).toBeTruthy();
  });

  it('should get more characters from API and append to existing data', () => {
    const initialCharacters: ICharactersResponse = {
      info: { count: 1, next: null, pages: 1, prev: null },
      results: [{
        id: 1,
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: ''
      }]
    };
    const moreCharacters: ICharactersResponse = {
      info: { count: 2, next: null, pages: 1, prev: null },
      results: [{
        id: 2,
        name: 'Morty',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: ''
      }]
    };
    service.setCharacters(initialCharacters);
    service.getMoreCharacters('nextUrl');
    const req = httpMock.expectOne('nextUrl');
    expect(req.request.method).toBe('GET');
    req.flush(moreCharacters);
    expect(service.characters$).toBeTruthy();
  });

  it('should get character by name from API', () => {
    const characters: ICharactersResponse = { info: { count: 1, next: null, pages: 1, prev: null }, results: [] };
    service.searchCharacters('Rick');
    const req = httpMock.expectOne(`${environment.apiUrl}/character/?name=Rick`);
    expect(req.request.method).toBe('GET');
    req.flush(characters);
    expect(service.characters$).toBeTruthy();
  });

  it('should update favorite status of a character', () => {
    const characters: ICharactersResponse = {
      info: { count: 1, next: null, pages: 1, prev: null },
      results: [{
        id: 1,
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: '',
        episode: [],
        url: '',
        created: '',
        isFavorite: false
      }]
    };
    service.setCharacters(characters);
    service.updateFavoriteStatus(1, true);
    expect(service.characters$).toBeTruthy();
    const updatedCharacter = service.characters$.subscribe(data => {
      expect(data?.results[0].isFavorite).toBe(true);
    });
  });

  it('should search characters', () => {
    service.searchCharacters('Rick');
    const req = httpMock.expectOne(`${environment.apiUrl}/character/?name=Rick`);
    expect(req.request.method).toBe('GET');
    req.flush({ info: { count: 1, next: null, pages: 1, prev: null }, results: [] });
    expect(service.characters$).toBeTruthy();
  });
});
