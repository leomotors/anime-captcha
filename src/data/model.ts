export interface Label {
  en: string;
  ja: string;
}

// * Each Question consists of image url, name and anime they are from in
// * both english and japanese
export interface Question {
  image: string;
  name: Label;
  anime: Label;
  // * True if User should select the Image
  answer: boolean;
}

// * This is the type of JSON File * //
export interface CaptchaTypeJSON {
  // * Title of Captcha (the one appearing on top)
  title: string;
  // * Questions
  questions: Question[];
  // * Things to show when user fails the Captcha
  onFail: {
    text: string;
    // * ID of YouTube Video with ?start={start}
    ytid: string;
  };
}

export interface CaptchaType extends CaptchaTypeJSON {
  // * Short name of Title
  category: string;
}

export type CaptchaGetAll = { [category: string]: CaptchaTypeJSON };
