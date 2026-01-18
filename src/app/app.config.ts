import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-cf6f2", "appId": "1:1006417964411:web:e19932bbd15e7da04321de", "storageBucket": "ring-of-fire-cf6f2.firebasestorage.app", "apiKey": "AIzaSyBB6dt-oMsE19vUYSWxUkVvtOK9XYHtr_E", "authDomain": "ring-of-fire-cf6f2.firebaseapp.com", "messagingSenderId": "1006417964411" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    importProvidersFrom(
      AngularFireModule.initializeApp({ "projectId": "ring-of-fire-cf6f2", "appId": "1:1006417964411:web:e19932bbd15e7da04321de", "storageBucket": "ring-of-fire-cf6f2.firebasestorage.app", "apiKey": "AIzaSyBB6dt-oMsE19vUYSWxUkVvtOK9XYHtr_E", "authDomain": "ring-of-fire-cf6f2.firebaseapp.com", "messagingSenderId": "1006417964411" }),
      AngularFirestoreModule
    )
  ]
};