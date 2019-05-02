import {Injectable, Injector} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RuntimeConfigLoaderService} from '../runtime-config-loader/runtime-config-loader-lib.service';

@Injectable()
export class TranslateBrowserLoader implements TranslateLoader {
  constructor(private http: HttpClient, private appConfigLoader: RuntimeConfigLoaderService) {
  }


  getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      let appConfig = this.appConfigLoader.getConfig();
      let result;
      if (appConfig) {
        this.http.get(`${appConfig.ssr.symphonyApiUrl}/cms/locale/${lang}.json`).subscribe(
          (translate) => {
            result = translate;
            observer.next(result);
            observer.complete();
          }
        );
      } else {
        this.appConfigLoader.configSubject.subscribe((res) => {
          appConfig = res;
          this.http.get(`${appConfig.ssr.symphonyApiUrl}/cms/locale/${lang}.json`).subscribe(
            (translate) => {
              result = translate;
              observer.next(result);
              observer.complete();
            }
          );

        });
      }
    });
  }
}
