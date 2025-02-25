import {Component, OnInit} from '@angular/core';
import {Phrase} from '../../interfaces/phrase';
import {PhraseService} from '../../services/phrase.service';
import {Router, RouterLink} from '@angular/router';
import {AccordionComponent} from '../../accordion/accordion.component';

@Component({
  selector: 'app-database',
  imports: [
    RouterLink,
    AccordionComponent
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})
export class DatabaseComponent implements OnInit {

  phrases:Phrase[] = [];

  constructor(private phraseService:PhraseService,private router: Router) {
  }

  ngOnInit() {
    this.phrases=this.phraseService.getPhrases();
  }

  toggleAccordion(index: number) {
    this.phrases[index].isOpen = this.phrases[index].isOpen?!this.phrases[index].isOpen:true;
  }

  deletePhrase($event: string) {
    this.phraseService.deletePhrase($event)
    this.phrases = this.phrases.filter(phrase => phrase.id !== $event);
  }
}
