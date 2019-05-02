# Angular-tranlsate-loader-for-runtime-config-app
HttpTranslateLoader for runtime config Angular apps

app.module.ts

add factory function after module import before AppModule class delcareted

```
export function createTranslateLoader(http: HttpClient, configLoader: RuntimeConfigLoaderService) {
 return new TranslateBrowserLoader(http, configLoader);
}

```

add to imports array

```
TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, RuntimeConfigLoaderService]
      }
    }),
```