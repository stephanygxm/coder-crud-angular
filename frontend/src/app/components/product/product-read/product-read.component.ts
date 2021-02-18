import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  // atributo
  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action']

  // injetar o produto service para poder usar o método read
  constructor(private productService: ProductService) { }

  // subscrevendo eu vou receber os products e como resposta da requisição eu vou ter os produtos
  // apertar ctrl + clicar no nome products para saber de onde veio cada um
  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products
      // quando está dentro da função não precisa colocar o this. 
      // console.log(products)
    })
  }
}
