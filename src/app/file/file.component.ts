import { Component, OnInit } from '@angular/core';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  text = '';

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.getMockText().then((result) => this.text = result);
  }

  applyRemoveFormat(aText:string,aWord:string,beginTag:string,endTag:string){
    let formatWord = beginTag+aWord+endTag;
    let indexOfFormat = aText.indexOf(formatWord);
    if(indexOfFormat>=0){
       aText = aText.replace(new RegExp(formatWord,'g'),aWord);
      }else{
        // this.text = '<span><b>'+this.text+'</b></span>';
        aText = aText.replace(new RegExp(aWord,'g'),formatWord);
    }
    console.log(aText);
    return aText;
  }

  
  formatText(beginTag:string,endTag:string){
    let wordToChange = this.detectSelection();
    if(wordToChange !=''){
      this.text = this.applyRemoveFormat(this.text,wordToChange,beginTag,endTag);
    }
  }

  detectSelection(){
    let text = '';
    if (window.getSelection) {
        text = window.getSelection().toString().trim();
    }
    return text;
  }
}
