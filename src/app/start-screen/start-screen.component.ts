import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }


  newGame() {
    let game = new Game();
    this.firestore.collection('games').add(Object.assign({}, game)).then((docRef) => {
      console.log('New game created with ID: ', docRef.id);
      this.router.navigateByUrl(`/game/${docRef.id}`);
    }).catch(err => {
      console.error('Error creating new game', err);
    });
  }


}

