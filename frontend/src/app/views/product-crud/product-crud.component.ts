import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
// outra alternativa para se fazer uma rota
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  // importando o HeaderService, para alterar o título ao mudar a página
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create'])
    // console.log('Navegando...')
  }

}
