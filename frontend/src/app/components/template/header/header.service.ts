import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from './header-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  // a classe BehaviorSubject emite eventos sempre que houver uma mudança nos dados
  // clicar ctrl + BehaviorSubject para ver o código ts da classe
  // foi colocado um _ na frente do headerData pois é privado
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  })
    
  constructor() { }

  // foi criado métodos get e set para acessar o _headerData

  get headerData(): HeaderData {
    // o .value é para pegar o valor do _headerData
    return this._headerData.value
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
