export interface Label {
  en: string;
  ja: string;
}

// * Each Question consists of image url, name and anime they are from in
// * both english and japanese
interface Question {
  image: string;
  name: Label;
  anime: Label;
  // * True if User should select the Image
  answer: boolean;
}

// * This is the type of JSON File * //
export interface CaptchaType {
  // * Title of Captcha (the one appearing on top)
  title: string;
  // * Questions
  questions: Question[];
  // * Things to show when user fails the Captcha
  onFail: {
    text: string;
    image: string;
  };
}
