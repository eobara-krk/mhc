import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterModule } from '@angular/router';
// Typy dla linków i itemów
interface Link {
  name: string;
  url?: string;
  text?: string;
  protected?: boolean;
  show?: boolean;
  type?: string;
}

interface Meeting {
  date: string;
  show: boolean;
  links?: Link[];     // dla zwykłych sekcji
  meetings?: Meeting[]; // dla spotkań z podziałem na daty
}

interface Item {
  title: string;
  show: boolean;
  image?: string;       // 🆕 obrazek JPG lub PNG
  fullscreen?: boolean; // 🆕 tryb pełnoekranowy po kliknięciu
  links?: Link[];
  meetings?: Meeting[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // <-- potrzebne do date pipe i dyrektyw typu ngSwitch
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDateTime: Date = new Date(); // <-- dodaj to
  items: Item[] = [
    { 
      title: 'MHC -2025', 
      show: false,
      links: [
        { name: 'session1', url:'https://drive.google.com/file/d/1H0cTDqysNiiCtY_hRWk0jY8VLLrkUga6/view?usp=sharing', type: 'film'},
        { name: 'session2', url:'https://drive.google.com/file/d/1O2ylBRWHc4yQV_onOpcO3yyYJOW-IPAK/view?usp=sharing', type: 'film'},
        { name: 'session3', url:'https://drive.google.com/file/d/1GOIjlohVvt0_PHo3wvnhALm7hCygz-cf/view?usp=sharing', type: 'film'},
        { name: 'session4', url:'https://drive.google.com/file/d/1NFEPaYpCQdTNajy8rTSu9G6q49SGgfYY/view?usp=sharing', type: 'film'},

        { name: 'EngageCX', url:'https://drive.google.com/file/d/15QjjYz9tr3mk1hia9oewoXi9nET4WLCm/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 1', url:'https://drive.google.com/file/d/1h6r9K6Cdy3GRQJKvczQK8wbG2H3ziPdY/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 2', url:'https://drive.google.com/file/d/1_ea95gBkfmQYTJ5R5a4336m6b2-qCWhZ/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 3', url:'https://drive.google.com/file/d/15swS1OBRWYVxAqLUGBereTyh0wwv6LDg/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 4', url:'https://drive.google.com/file/d/1fldrHh25zfUqyLu5MJr4Z9jsOmsKNNni/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 5', url:'https://drive.google.com/file/d/1InQLYPtqgdXEEsnF12iEK-4KwHOhsPaD/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 6', url:'https://drive.google.com/file/d/1GtN0IA8ODU5vymC4Cbho0VhjMGq8TE3Z/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 7', url:'https://drive.google.com/file/d/1FxIIy3gAhLn2MerujOUJ0SEsprbY4hC3/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 8a', url:'https://drive.google.com/file/d/1iBAcKEog30Uf75YOqOOx_a4JKvkmAZFP/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 8b', url:'https://drive.google.com/file/d/16qucFJyZaqHOiz8qkPHOV8s8JbsuVo1r/view?usp=sharing', type: 'pdfy'},
        { name: 'exercise 8c', url:'https://drive.google.com/file/d/1NxTPKMB_Bt2NUI6QtpyUg9xTjyThazbN/view?usp=sharing', type: 'pdfy'},    
       
        { name: 'instalacja', url:'https://drive.google.com/file/d/1D21XtIlQ_QEhq-p5P-tMLflPUQDuSAdV/view?usp=sharing', type: 'exec'},
        { name: 'Logowanie', url:'https://photos.app.goo.gl/fS8FrRoGhrEWHvkF9', type: 'photo'},

        { name: 'klucz', 
          text: `Login:elzbieta.obara@kruksa.pl; Hasło:1234567ABcd`,
          show: false,
          protected: true,
          type: 'opis'
        },
         { name: 'Tomek01', url:'https://drive.google.com/file/d/1p9TIDkvwhFM0wgQ76h9f_mZS723ATw5V/view?usp=sharing', type: 'film'},
         { name: 'MM01', url:'https://drive.google.com/file/d/1lbGgR-Msi2Tr6NcyBgAEFod6yElmkz3o/view?usp=sharing', type: 'film'},
         { name: 'MM02', url:'https://drive.google.com/file/d/1xR4a3pVDW19CwSUP2qjW089EDE_TRcJD/view?usp=sharing', type: 'film'},
         { name: '1015-12-08', url:'https://krukeu-my.sharepoint.com/:v:/r/personal/alexandru_oprea_kruk_com_ro/Documents/%C3%8Enregistr%C4%83ri/DEMO%20-%20Legal%20%26%20Automation%20Tribe%20Products-20251208_100202-Meeting%20Recording.mp4?csf=1&web=1&e=pJ3fWy&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D', type: 'film'},

      ]
    }
        
  ];

 private readonly summaryPassword = 'syn';

  // --- OTWIERANIE LINKÓW ---
  openLink(link: Link) {
    if (!link.url) return;

    // jeśli link kończy się na .m4a, otwórz w nowym oknie z odtwarzaczem
    if (link.url.endsWith('.m4a')) {
      const audioWindow = window.open('', '_blank');
      if (audioWindow) {
        audioWindow.document.write(`
          <html>
            <body style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;">
              <h3>${link.name}</h3>
              <audio controls autoplay style="width:90%;">
                <source src="${link.url}" type="audio/mp4">
              </audio>
            </body>
          </html>
        `);
        audioWindow.document.close();
      }
    } else {
      // zwykły link do filmu/albumu
      window.open(link.url, '_blank');
    }
  }

// --- ROZWIJANIE EVENTÓW ---
toggle(obj: { show: boolean }) {
  obj.show = !obj.show;
}


  // --- CHRONIONE TEKSTY ---
 toggleLink(link: Link) {
  if (link.protected) {
    // jeśli jest widoczny → schowaj bez pytania o hasło
    if (link.show) {
      link.show = false;
      return;
    }

    // jeśli nie jest widoczny → pytaj o hasło
    const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
    if (password === this.summaryPassword) {
      link.show = true;
    } else {
      alert('Błędne hasło!');
    }

  } else {
    link.show = !link.show;
  }
}


  trackByTitle(index: number, item: Item) {
    return item.title;
  }

  trackByName(index: number, link: Link) {
    return link.name;
  }

toggleImage(item: Item) {
  item.fullscreen = !item.fullscreen;
}

closePage() {
  // Próba zamknięcia okna
  window.close();

  // Jeśli okno nadal jest otwarte (np. nie zostało otwarte przez JS),
  // to przekieruj na pustą stronę
  setTimeout(() => {
    window.location.href = 'about:blank';
  }, 100);
}}