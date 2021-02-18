import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  // injetar o metodo MatSnackBar e HttpClient
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  // showMessage é o nome da função, do método que estou criando para usar no product-create.component.ts, para fazer aparecer um alert informando que o produto foi criado
  // showMessage recebe uma msg do tipo string, e que retorna void
  // recebeu um novo parâmetro de erro do tipo boolean e com valor padrão false
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      // classe que foi feita no styles.css para mudar a cor
      // se for erro mostrar essa classe css de erro, caso contrário mostrar a outra
      // como por padrão o isError é falso, ele vai continuar mandando o de sucesso, até que seja passado um valor true para o isError
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  // função criada para adicionar produtos na api (post)
  // o product: Product é justamente o product.model que foi criado
  // vai retornar um observable de produto, e quer dizer que, como eu estou fazendo um requisição para o backend, quando a resposta chegar (evento), chame a função que eu vou passar
  create(product: Product): Observable<Product> {
    // foi criado um pipe para erro (ex: caso o backend não esteja rodando e eu tente criar um novo produto, ele vai mostrar uma mensagem de erro), usando o operador map, que vai retornar o próprio objeto
    // foi feito o catch para poder tratar o erro
    // PODE COLOCAR O PIPE EM TODOS OS MÉTODOS
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      // poderia usar direto o this.errorHandler, mas por garantia foi usado uma arrow function
      catchError(e => this.errorHandler(e))
    );
  }

  // vai receber um erro do tipo any, e vai retornar um observable vazio do tipo EMPTY 
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  // função criada para ler as informações do backend (get)
  // o observable vai ler um array de produtos (uma lista de produtos)
  // nao precisa de nenhum parâmetro para essa requisição
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  // função criada para ler um elemento a partir do id (get)
  // o método recebe como parâmetro o id como uma string, pois vai ser concatenado como uma string, que é a url
  // o get recebe como parâmetro a url + o id
  readById(id: string): Observable<Product> {
    // constante url que recebe uma template string (tem que ser entre crase)
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }

  // função criada para atualizar os produtos (put)
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  // so precisa passar o id para excluir o produto
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
  }
}
