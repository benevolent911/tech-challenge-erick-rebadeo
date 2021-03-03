export class Speech {
  id: number;
  author: string;
  keywords: string[];
  emailAddress: string[];
  body: string;
  date: string;

  constructor() {
    this.id = null;
    this.author = '';
    this.keywords = [];
    this.emailAddress = [];
    this.body = '';
    this.date = '';
  }
}
