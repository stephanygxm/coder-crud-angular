import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    // para a partir da rota conseguir pegar o parâmetro id
    private route: ActivatedRoute
  ) { }

  // quando entrar na inicialização do component já vai estar com os dados preenchidos
  ngOnInit(): void {
    // com isso consegue receber o id a partir da navegação
    // explicando o método: a partir do id que eu recebi pela rota, eu consigo pegar os parâmetros via snapshot
    const id = this.route.snapshot.paramMap.get('id')
    // chama o subscribe e espera receber como resposta o product já com id, name e price
    this.productService.readById(id).subscribe(product => {
      this.product = product
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }

}
