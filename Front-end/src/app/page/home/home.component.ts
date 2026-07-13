import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { LinkService } from '../../services/link.service';
import { LinkResponse } from '../../models/link.model';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RedirectComponent } from '../redirect/redirect.component';
import { environment } from '../../environments/environment';

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
    DashboardComponent,
    RedirectComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  urlOriginal = '';
  codigoPersonalizado = '';
  personalizar = false;
  carregando = false;
  linkGerado: LinkResponse | null = null;
  copiado = false;
  erro = '';
  protegerComSenha = false;
  senha = '';
  temSenha: boolean = false;
  totalCliques: number = 0 

  expiraEm: number | null = null;

  modalSenhaVisivel = false;
  codigoProtegido = '';

  opcoesExpiracao = [
    { label: 'nunca', value: null },
    { label: '24 horas', value: 1 },
    { label: '7 dias', value: 7 },
    { label: '30 dias', value: 30 },
  ];

  qrcode: string | null = null;
  exibirQrcode = false;

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigoProtegido = codigo;
      this.verificarSeTemSenha(codigo);
    }
  }

  get btnDesabilitado(): boolean {
    if (!this.urlOriginal.trim()) return true;
    if (this.personalizar && !this.codigoPersonalizado.trim()) return true;
    if (this.protegerComSenha && !this.senha.trim()) return true;

    return false;
  }

  gerarLink(): void {
    this.carregando = true;
    this.erro = '';

    const payload = {
      urlOriginal: this.urlOriginal,
      ...(this.personalizar && { codigo: this.codigoPersonalizado }),
      ...(this.expiraEm && { expiraEm: this.expiraEm }),
      ...(this.protegerComSenha && { senha: this.senha }),
    };

    this.linkService.encurtarLink(payload).subscribe({
      next: (res) => {
        this.linkGerado = res;
        this.carregando = false;
      },
      error: (err) => {
        this.erro = err.error?.error || 'Erro ao gerar link. Tente novamente!';
        this.carregando = false;
      },
    });
  }

  verQrcode(): void {
    if (this.exibirQrcode) {
      this.exibirQrcode = false;
      return;
    }
    if (this.qrcode) {
      this.exibirQrcode = true;
      return;
    }
    this.linkService.gerarQrcode(this.linkGerado!.codigo).subscribe({
      next: (res) => {
        this.qrcode = res.qrcode;
        this.exibirQrcode = true;
      },
      error: () => {
        this.erro = 'Erro ao gerar QR Code';
      },
    });
  }

  copiarLink(): void {
    const url = `${environment.appUrl}/${this.linkGerado?.codigo}`;
    navigator.clipboard.writeText(url);
    this.copiado = true;
    setTimeout(() => (this.copiado = false), 2000);
  }

  novoLink(): void {
    this.urlOriginal = '';
    this.codigoPersonalizado = '';
    this.personalizar = false;
    this.carregando = false;
    this.linkGerado = null;
    this.copiado = false;
    this.erro = '';
    this.qrcode = null;
    this.exibirQrcode = false
  }

  verificarSeTemSenha(codigo: string): void {
    this.linkService.acessarLink(codigo).subscribe({
      next: (res) => {
        this.temSenha = res.temSenha
        this.totalCliques = res.totalCliques
        this.modalSenhaVisivel = true
      },
      error: () => {
       this.erro = "Erro ao acessar URl"
      },
    });
  }

  abrirModalSenha(codigo: string): void {
    this.codigoProtegido = codigo;
    this.modalSenhaVisivel = true;
  }

  fecharModalSenha(): void {
    this.modalSenhaVisivel = false;
    this.codigoProtegido = '';
  }
}
