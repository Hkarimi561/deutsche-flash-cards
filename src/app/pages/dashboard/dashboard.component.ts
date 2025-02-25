import {Component, OnInit} from '@angular/core';
import {PhraseService} from '../../services/phrase.service';
import {Phrase} from '../../interfaces/phrase';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  phrases:Phrase[]|undefined;
  constructor(private phraseService:PhraseService) {
  }
  ngOnInit() {
    this.phrases = this.phraseService.getPhrases();
  }

  goPrevSlide() {

  }

  goNextSlide() {

  }

  reviewAgain(phrase: Phrase) {
    phrase.needToReview=!phrase.needToReview;
    this.phraseService.updatePhrase(phrase);
  }

  hidePhrase(phrase: Phrase) {
    phrase.hide=!phrase.hide;
    this.phraseService.updatePhrase(phrase);
  }
}
