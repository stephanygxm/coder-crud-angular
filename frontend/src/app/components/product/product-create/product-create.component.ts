import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
// importar a rota
import { Router } from '@angular/router'
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  
  // parâmetro de produto para o método create
  product: Product = {
    name: '',
    price: null
  }

  // importando o ProductService e o Router
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // botão de salvar (criar produto)
  // o método subscribe é para ser notificado quando a resposta chegar
  createProduct(): void {
    this.productService.create(this.product).subscribe (() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })
  }

  // botão de cancelar 
  cancel(): void {
    this.router.navigate(['/products'])
  }

}
