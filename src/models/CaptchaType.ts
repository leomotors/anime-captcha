interface Label {
  en: string;
  jp: string;
}

interface Question {
  image: string;
  name: Label;
  anime: Label;
}

export interface CaptchaType {
  title: string;
  questions: Question[];
  onFail: {
    text: string;
    image: string;
  };
}
