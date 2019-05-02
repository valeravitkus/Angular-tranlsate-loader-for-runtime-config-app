# Angular-tranlsate-loader-for-runtime-config-app
HttpTranslateLoader for runtime config Angular apps

app.module.ts
add to imports 

```
TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, RuntimeConfigLoaderService]
      }
    }),
```