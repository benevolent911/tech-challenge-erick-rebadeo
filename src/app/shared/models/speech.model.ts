export class Speech {
  _id: string;
  author: string;
  keywords: string[];
  emailAddress: string[];
  body: string;
  date: string;

  constructor() {
    this._id = '';
    this.author = '';
    this.keywords = [];
    this.emailAddress = [];
    this.body = '';
    this.date = '';
  }
}
