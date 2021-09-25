interface Label {
  en: string;
  jp: string;
}

interface Question {
  image: string;
  name: Label;
  anime: Label;
  answer: boolean;
}

export interface CaptchaType {
  title: string;
  questions: Question[];
  onFail: {
    text: string;
    image: string;
  };
}
