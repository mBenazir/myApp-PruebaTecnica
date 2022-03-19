
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { OrdenComponent } from './components/orden/orden.component';
import { OrdenFormComponent } from './components/orden/orden-form/orden-form.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';


const APP_ROUTES: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'mi-tienda'},
{path: 'mi-tienda', component: HomeComponent,
      children:[
        {path: 'clientes', component: ClienteComponent,
        children:[
          {path: 'agregar', component: ClienteFormComponent},
          {path: 'mostrar/:id', component: ClienteFormComponent}
        ]
      },
        {path: 'ordenes', component: OrdenComponent,
        children:[
          {path: 'agregar', component: OrdenFormComponent},
          {path: 'mostrar/:id', component: OrdenFormComponent}
        ]},
        {path: 'productos', component: ProductoComponent,
          children:[
            {path: 'agregar', component: ProductoFormComponent},
            {path: 'mostrar/:id', component: ProductoFormComponent}
          ]
        }
      ]
},
{path: '**', pathMatch: 'full', redirectTo: 'mi-tienda'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
