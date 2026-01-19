import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameDescriptionComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game;
  currentGameId: string | null = null;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(params => {
      const gameId = params['id'];
      this.currentGameId = gameId;
      console.log('Game ID from route:', gameId);
      this.firestore.collection('games') // wenn player timmy auf firebase dann muss er auf spiel sein
      .doc(gameId)
      .valueChanges()
      .subscribe((game: any) => {
        console.log('Game update', game);
        if (game) {
          this.game.players = game.players || [];
          this.game.currentPlayerIndex = game.currentPlayerIndex ?? 0;
          this.game.playedCards = game.playedCards || [];
          this.game.stack = game.stack || this.game.stack;
        }
      });
    });
  }

  newGame() {
    this.game = new Game();

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;

      this.game.currentPlayerIndex = (this.game.currentPlayerIndex + 1) % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        if (this.currentGameId) {
          this.firestore.collection('games').doc(this.currentGameId).update({ players: this.game.players })
            .then(() => console.log('Player added to firestore'))
            .catch(err => console.error('Error updating players in firestore', err));
        } else {
          console.warn('No currentGameId - player only added locally');
        }
      }
    });
  }

}
