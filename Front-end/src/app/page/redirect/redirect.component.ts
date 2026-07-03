import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent {
  @Input() codigo = '';
  @Output() fechar = new EventEmitter<void>();

  senha = '';
  erro = '';
  carregando = false;

  constructor(private linkService: LinkService) {}


  verificarSenha(): void {
    this.carregando = true;
    this.linkService.verificarSenha(this.codigo, this.senha).subscribe({
      next: (res) => {
        window.location.href = res.urlOriginal;
      },
      error: (err) => {
        this.erro = err.error?.error || 'Senha incorreta!';
        this.carregando = false;
      },
    });
  }

  fecharModal(): void {
    this.fechar.emit()
  }
}
