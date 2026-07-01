import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';

import { LinkService } from '../../services/link.service';
import { LinkResponse } from '../../models/link.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    CardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  urlOriginal = '';
  codigoPersonalizado = '';
  personalizar = false;
  carregando = false;
  linkGerado: LinkResponse | null = null;
  copiado = false;
  erro = '';

  constructor(private linkService: LinkService) {}

  get btnDesabilitado(): boolean {
    if (!this.urlOriginal.trim()) return true;
    if (this.personalizar && !this.codigoPersonalizado.trim()) return true;
    return false;
  }

  gerarLink(): void {
    this.carregando = true;
    this.erro = '';

    const payload = {
      urlOriginal: this.urlOriginal,
      ...(this.personalizar && { codigo: this.codigoPersonalizado }),
    };

    this.linkService.encurtarLink(payload).subscribe({
      next: (res)=>{
        this.linkGerado = res;
        this.carregando =false;
      },
      error: (err)=>{
        this.erro = err.error?.error || 'Erro ao gearar link. Tente novamente!';
        this.carregando = false;
      }
    })
  }

  copiarLink(): void{
    const url = `menoslink.com/${this.linkGerado?.codigo}`;
    navigator.clipboard.writeText(url);
    this.copiado = true;
    setTimeout(()=> this.copiado = false, 2000);
  }

  novoLink(): void{
    this.urlOriginal = '';
    this.codigoPersonalizado = '';
    this.personalizar = false;
    this.carregando = false;
    this.linkGerado = null;
    this.copiado = false;
    this.erro = '';
  }



}
