import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ICharactersResponse } from 'src/app/shared/interfaces/characters.interface';
import { CharactersService } from 'src/app/core/services/characters.service';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, tick } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let charactersServiceMock: any;

  beforeEach(async () => {
    charactersServiceMock = {
      characters$: of({ info: { count: 0, pages: 0, next: '', prev: '' }, results: [] }),
      getAllCharacters: jest.fn(),
      getMoreCharacters: jest.fn(),
      searchCharacters: jest.fn(),
      updateFavoriteStatus: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: CharactersService, useValue: charactersServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllCharacters on init', () => {
    expect(charactersServiceMock.getAllCharacters).toHaveBeenCalled();
  });

  it('should call getMoreCharacters on scroll down if next page exists', () => {
    const charactersResponse = { info: { next: 'nextPageUrl' } } as ICharactersResponse;
    component.onScrollDown(charactersResponse);
    expect(charactersServiceMock.getMoreCharacters).toHaveBeenCalledWith('nextPageUrl');
  });

  it('should not call getMoreCharacters on scroll down if next page does not exist', () => {
    const charactersResponse = { info: { next: null } } as ICharactersResponse;
    component.onScrollDown(charactersResponse);
    expect(charactersServiceMock.getMoreCharacters).not.toHaveBeenCalled();
  });

  it('should call searchCharacters when search value changes', fakeAsync(() => {
    component.searchForm.controls['search'].setValue('test');
    tick(300);
    expect(charactersServiceMock.searchCharacters).toHaveBeenCalledWith('test');
  }));

  it('should call updateFavoriteStatus with correct parameters', () => {
    component.toggleFavorite(1, true);
    expect(charactersServiceMock.updateFavoriteStatus).toHaveBeenCalledWith(1, false);
  });
});
