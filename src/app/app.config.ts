import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';    
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";
import { environment } from "../environment";
import { getFirestore } from "firebase/firestore";
import { provideFirestore } from "@angular/fire/firestore";
import { provideAuth } from "@angular/fire/auth";
import { getAuth } from "firebase/auth";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), NG_EVENT_PLUGINS, NG_EVENT_PLUGINS,
     provideHttpClient(),
     provideRouter([]), 
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
     provideFirestore(() => getFirestore()), provideAuth(() => getAuth()), NG_EVENT_PLUGINS]
};
