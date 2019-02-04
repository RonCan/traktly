import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, PreloadAllModules, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {Secrets} from './typings/secrets';
import {DataService} from './services/data.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SecretsResolver implements Resolve<Secrets> {
  constructor(private data: DataService) {}

  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.data.getSecrets().pipe(map(secrets => {
      if (!this.data.secrets$.value) {
        this.data.secrets$.next(secrets);
        return secrets;
      }
      return secrets;
    }));
  }
}

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    resolve: {
      secrets: SecretsResolver
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [SecretsResolver]
})
export class AppRoutingModule {}
