import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-criar-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './criar-pessoa.component.html',
  styleUrl: './criar-pessoa.component.css'
})
export class CriarPessoaComponent {
  pessoaForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      dataNascimento: ['', Validators.required]
    });
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
      
      // Atualiza o valor no FormControl apenas com números
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
      
      // Atualiza o valor no FormControl apenas com números
      const rawValue = value.replace(/\D/g, '');
      this.pessoaForm.patchValue({ telefone: rawValue });
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      this.loading = true;
      
      const pessoa = {
        nome: this.pessoaForm.value.nome.trim(),
        cpf: this.pessoaForm.value.cpf.replace(/\D/g, ''),
        telefone: this.pessoaForm.value.telefone.replace(/\D/g, ''),
        dataNascimento: this.pessoaForm.value.dataNascimento
      };

      this.pessoaService.criarPessoa(pessoa).subscribe({
        next: (response) => {
          this.showSuccessMessage(response || 'Pessoa cadastrada com sucesso!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.showErrorMessage(error.message || 'Erro ao cadastrar pessoa. Tente novamente.');
          console.error('Erro ao criar pessoa:', error);
        }
      });
    } else {
      // Marca todos os campos como touched para mostrar os erros
      this.pessoaForm.markAllAsTouched();
    }
  }

  private showSuccessMessage(message: string): void {
    // Implementação simples - você pode substituir por um toast/notification
    alert(message);
  }

  private showErrorMessage(message: string): void {
    // Implementação simples - você pode substituir por um toast/notification
    alert(message);
  }

  resetForm(): void {
    this.pessoaForm.reset();
    this.loading = false;
  }
}