import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';

@Component({
  selector: 'app-editar-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-pessoa.component.html',
  styleUrl: './editar-pessoa.component.css'
})
export class EditarPessoaComponent implements OnInit {
  pessoaForm: FormGroup;
  loading = false;
  saving = false;
  deleting = false;
  showDeleteModal = false;
  pessoa: Pessoa | null = null;
  pessoaId: string = '';

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      dataNascimento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.pessoaId) {
      this.carregarPessoa();
    } else {
      this.router.navigate(['/']);
    }
  }

  carregarPessoa(): void {
    this.loading = true;
    this.pessoaService.buscarPorId(this.pessoaId).subscribe({
      next: (pessoa) => {
        this.pessoa = pessoa;
        this.preencherFormulario(pessoa);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoa:', error);
        this.showErrorMessage('Pessoa não encontrada');
        this.router.navigate(['/']);
      }
    });
  }

  preencherFormulario(pessoa: Pessoa): void {
    // Formatar CPF para exibição
    const cpfFormatado = this.formatarCpfDisplay(pessoa.cpf);
    
    // Formatar telefone para exibição
    const telefoneFormatado = this.formatarTelefoneDisplay(pessoa.telefone);
    
    this.pessoaForm.patchValue({
      nome: pessoa.nome,
      cpf: pessoa.cpf, // Manter valor raw no FormControl
      telefone: pessoa.telefone, // Manter valor raw no FormControl
      dataNascimento: pessoa.dataNascimento
    });

    // Atualizar os campos visuais
    setTimeout(() => {
      const cpfInput = document.getElementById('cpf') as HTMLInputElement;
      const telefoneInput = document.getElementById('telefone') as HTMLInputElement;
      
      if (cpfInput) cpfInput.value = cpfFormatado;
      if (telefoneInput) telefoneInput.value = telefoneFormatado;
    }, 0);
  }

  formatarCpfDisplay(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefoneDisplay(telefone: string): string {
    const cleaned = telefone.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pessoaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.pessoaForm.get(fieldName);
    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} é obrigatório`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} deve ter pelo menos ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      nome: 'Nome',
      cpf: 'CPF',
      telefone: 'Telefone',
      dataNascimento: 'Data de nascimento'
    };
    return displayNames[fieldName] || fieldName;
  }

  formatarCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      event.target.value = value;
      
      const rawValue = value.replace(/\D/g, '');
      this.pessoaForm.patchValue({ cpf: rawValue });
    }
  }

  formatarTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
      }
      event.target.value = value;
      
      const rawValue = value.replace(/\D/g, '');
      this.pessoaForm.patchValue({ telefone: rawValue });
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      this.saving = true;
      
      const pessoaAtualizada = {
        nome: this.pessoaForm.value.nome.trim(),
        cpf: this.pessoaForm.value.cpf.replace(/\D/g, ''),
        telefone: this.pessoaForm.value.telefone.replace(/\D/g, ''),
        dataNascimento: this.pessoaForm.value.dataNascimento
      };

      this.pessoaService.atualizarPessoa(this.pessoaId, pessoaAtualizada).subscribe({
        next: () => {
          this.showSuccessMessage('Pessoa atualizada com sucesso!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.saving = false;
          console.error('Erro ao atualizar pessoa:', error);
          if (error.status === 409) {
            this.showErrorMessage('CPF já cadastrado para outra pessoa.');
          } else {
            this.showErrorMessage('Erro ao atualizar pessoa. Tente novamente.');
          }
        }
      });
    } else {
      this.pessoaForm.markAllAsTouched();
    }
  }

  confirmarExclusao(): void {
    this.showDeleteModal = true;
  }

  excluirPessoa(): void {
    this.deleting = true;
    
    this.pessoaService.deletarPessoa(this.pessoaId).subscribe({
      next: () => {
        this.showSuccessMessage('Pessoa excluída com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.deleting = false;
        this.showDeleteModal = false;
        console.error('Erro ao excluir pessoa:', error);
        this.showErrorMessage('Erro ao excluir pessoa. Tente novamente.');
      }
    });
  }

  fecharModal(): void {
    if (!this.deleting) {
      this.showDeleteModal = false;
    }
  }

  // Método adicional para quando clicado no backdrop do modal
  fecharModalBackdrop(event: Event): void {
    event.stopPropagation();
    this.fecharModal();
  }

  private showSuccessMessage(message: string): void {
    alert(message);
  }

  private showErrorMessage(message: string): void {
    alert(message);
  }

  getInitials(nome: string): string {
    if (!nome) return '';
    const names = nome.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  // Métodos auxiliares para formatação no template
  formatarCpfParaTemplate(cpf: string): string {
    return this.formatarCpfDisplay(cpf);
  }

  formatarTelefoneParaTemplate(telefone: string): string {
    return this.formatarTelefoneDisplay(telefone);
  }
}