import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkService } from '../../services/link.service';
import { Estatisticas } from '../../models/link.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  estatisticas: Estatisticas | null = null;
  carregando = true;

  constructor(
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas(): void {
    this.linkService.buscarEstatisticas().subscribe({
      next: (res) => {
        this.estatisticas = res;
        this.carregando = false;
      },
      error: () => this.carregando = false
    });
  }

  calcularPorcentagem(total: number): number {
    if (!this.estatisticas?.totalCliques) return 0;
    return Math.round((total / this.estatisticas.totalCliques) * 100);
  }
}