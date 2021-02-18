import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // alterei o nome do selector de appFor para myFor
  selector: '[myFor]'
})

// implementar o clico de vida de inicialização OnInit
export class ForDirective implements OnInit{

  // o Em vem do let a em [1, 2, 3], e quer dizer que ele vai pegar aquilo que vem depois da palavra chave Em (pode usar qualquer outra palavra)
  @Input('myForEm') numbers: number[]

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) { }

  ngOnInit(): void {
    for (let number of this.numbers) {
      // o implicit é para que os numeros sejam mostrados na tela (se tornem visíveis)
      this.container.createEmbeddedView(this.template, { $implicit: number })
    }
    // console.log(this.numbers)
  }
}
