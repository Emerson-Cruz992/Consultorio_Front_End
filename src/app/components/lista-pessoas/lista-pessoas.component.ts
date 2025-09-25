import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pessoa } from '../../models/pessoa.model';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-lista-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-pessoas.component.html',
  styleUrl: './lista-pessoas.component.css'
})
export class ListaPessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  filteredPessoas: Pessoa[] = [];
  loading = false;
  searchTerm = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.loading = true;
    this.pessoaService.listarPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
        this.filteredPessoas = pessoas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        this.loading = false;
        alert('Erro ao carregar a lista de pessoas');
      }
    });
  }

  filterPessoas(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPessoas = this.pessoas;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredPessoas = this.pessoas.filter(pessoa =>
      pessoa.nome.toLowerCase().includes(term) ||
      pessoa.cpf.includes(term) ||
      pessoa.telefone.includes(term)
    );
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '';
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getInitials(nome: string): string {
    const names = nome.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  trackByPessoa(index: number, pessoa: Pessoa): string {
    return pessoa.id || index.toString();
  }

  getPessoas(): Pessoa[] {
    return this.filteredPessoas;
  }
}