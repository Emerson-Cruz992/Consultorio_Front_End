import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8081/pessoa';

  constructor(private http: HttpClient) { }

  // Listar todas as pessoas
  listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar pessoa por ID
  buscarPorId(id: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Criar nova pessoa
  criarPessoa(pessoa: Pessoa): Observable<string> {
    return this.http.post<string>(this.apiUrl, pessoa, {
      responseType: 'text' as any  // Para receber string do Spring Boot
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Atualizar pessoa
  atualizarPessoa(id: string, pessoa: Pessoa): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, pessoa, {
      responseType: 'text' as any  // Para receber string do Spring Boot
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Deletar pessoa
  deletarPessoa(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {
      responseType: 'text' as any  // Para receber string do Spring Boot
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Dados inválidos enviados';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado';
          break;
        case 409:
          errorMessage = error.error || 'CPF já cadastrado';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = error.error || `Erro ${error.status}: ${error.statusText}`;
      }
    }
    
    console.error('Erro na API:', error);
    return throwError(() => ({ 
      message: errorMessage, 
      status: error.status,
      error: error.error 
    }));
  }
}