import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api'; // Add this import statement
import { AppService } from 'src/app/demo/service/app.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  providers: [AppService, MessageService],
})
export class ResenaComponent implements OnInit {
  
  results: any;
  iniciado: boolean = false;
  vSearch: any;
  isStoppedAutomatically = true;
  tempWords: any;

  constructor(private service: AppService, private msgService: MessageService) { }

  ngOnInit(): void {
    if ('webkitSpeechRecognition' in window) {
      this.vSearch = new webkitSpeechRecognition()
      this.vSearch.continuous = false;
      this.vSearch.interimresults = false;
      this.vSearch.lang = 'es-GT';
      this.vSearch.continuous = true;
      this.vSearch.interimResults = true;
      this.vSearch.onresult = (e:any) => {
        this.tempWords = e;
      };

    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

  startListening() {
    this.iniciado = true;
    this.vSearch.start();
  }

  stopListening() {
    this.iniciado = false;
    this.vSearch.stop();
    this.isStoppedAutomatically = false;
    this.getResult();
  }

  getResult(){
    let text = '';
    for (let i =0; i < this.tempWords?.results?.length; i++){
      text = text + this.tempWords.results[i][0].transcript;
    }

    if (text.length > 0){
      let body = {text: text}
      this.service.analizarTexto(body).subscribe((res: any) => {
        this.msgService.add({ key: 'tst', severity: 'success', summary: 'Reseña guardada con éxito', detail: 'Gracias por dejar tu reseña.' });

      })
  }
  }
}
