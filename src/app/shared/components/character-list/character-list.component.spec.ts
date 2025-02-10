import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [ CharacterListComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit loadMore event on scroll down if infinite scroll is enabled', () => {
    jest.spyOn(component.loadMore, 'emit');
    component.enableInfiniteScroll = true;
    component.onScrollDown();
    expect(component.loadMore.emit).toHaveBeenCalledWith(component.characters);
  });

  it('should not emit loadMore event on scroll down if infinite scroll is disabled', () => {
    jest.spyOn(component.loadMore, 'emit');
    component.enableInfiniteScroll = false;
    component.onScrollDown();
    expect(component.loadMore.emit).not.toHaveBeenCalled();
  });

  it('should emit toggleFavorite event with correct id and isFavorite false when removeFavorite is called', () => {
    jest.spyOn(component.toggleFavorite, 'emit');
    const characterId = 1;
    component.removeFavorite(characterId);
    expect(component.toggleFavorite.emit).toHaveBeenCalledWith({ id: characterId, isFavorite: false });
  });

  it('should return true if there are favorite characters', () => {
    component.characters = {
      info: { count: 1, pages: 1, next: '', prev: '' },
      results: [{
        id: 1,
        name: 'Character 1',
        isFavorite: true,
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
    expect(component.hasFavorites()).toBe(true);
  });

  it('should return false if there are no favorite characters', () => {
    component.characters = {
      info: { count: 1, pages: 1, next: '', prev: '' },
      results: [{
        id: 1,
        name: 'Character 1',
        isFavorite: false,
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
    expect(component.hasFavorites()).toBeFalsy();
  });

  it('should navigate to home when goToHome is called', () => {
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
