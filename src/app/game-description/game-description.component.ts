import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-description',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-description.component.html',
  styleUrl: './game-description.component.scss'
})
export class GameDescriptionComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Komme mit einer Kategorie (z.B. Farben). Jeder Spieler muss einen Gegenstand aus der Kategorie nennen.' },
    { title: 'Bust a jive', description: 'Spieler 1 macht einen Tanzschritt. Spieler 2 wiederholt den Tanzschritt und fügt einen zweiten hinzu.' },
    { title: 'Chicks', description: 'Alle Frauen trinken einen Schluck Wasser.' },
    { title: 'Heaven', description: 'Hände hoch! Die letzte Person trinkt einen Schluck Wasser.' },
    { title: 'Mate', description: 'Such dir einen Mate aus. Ihr macht Aufgaben oder trinkt Wasser immer gemeinsam.' },
    { title: 'Thumbmaster', description: 'Du bist der Thumbmaster. Wer zuletzt den Daumen auf den Tisch legt, trinkt einen Schluck Wasser.' },
    { title: 'Men', description: 'Alle Männer trinken einen Schluck Wasser.' },
    { title: 'Quizmaster', description: 'Du bist der Quizmaster. Wer deine Fragen falsch beantwortet, trinkt einen Schluck Wasser.' },
    { title: 'Never have i ever...', description:  'Sag etwas, das du noch nie getan hast. Alle, die es schon getan haben, trinken einen Schluck Wasser.' },
    { title: 'Rule', description: 'Erfinde eine freundliche Regel. Wer sie vergisst, trinkt einen Schluck Wasser.' },
  ];

  title = '';
  description = '';
  @Input() card: string = '';

  ngOnChanges(): void {
    if (this.card) {
      console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
