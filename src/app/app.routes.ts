import { Routes } from '@angular/router';
import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.component';
import { CriarPessoaComponent } from './components/criar-pessoa/criar-pessoa.component';
import { EditarPessoaComponent } from './components/editar-pessoa/editar-pessoa.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaPessoasComponent,
    title: 'Lista de Pessoas'
  },
  {
    path: 'criar',
    component: CriarPessoaComponent,
    title: 'Cadastrar Pessoa'
  },
  {
    path: 'editar/:id',
    component: EditarPessoaComponent,
    title: 'Editar Pessoa'
  },
  {
    path: '**',
    redirectTo: ''
  }
];