import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PipesModule } from './pipe/pipes.module';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { FormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from './directive/directives.module';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { OrdenComponent } from './components/orden/orden.component';
import { OrdenFormComponent } from './components/orden/orden-form/orden-form.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    ClienteFormComponent,
    ProductoComponent,
    ProductoFormComponent,
    OrdenComponent,
    OrdenFormComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    PipesModule,
    DirectivesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
