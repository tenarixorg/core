import { Page } from "puppeteer";
import { load } from "cheerio";

export interface Opts {
  action?: (page: Page) => Promise<void>;
  scripts?: boolean;
  imgs?: boolean;
  headers?: Record<string, string>;
}

export interface ContentResult {
  innerHTML: string;
  current_url: string;
}

export type Parser = typeof load;

export type GetContent = (
  url: string,
  execPath: string,
  opts?: Opts
) => Promise<ContentResult>;

export interface ChapterInfo {
  src: string;
  id: string;
}

export interface PageBase {
  img: string;
  title: string;
  type: string;
  route: string;
}

export interface Chapter {
  title: string;
  links: ChapterInfo[];
}

export interface Details {
  title: string;
  description: string;
  status: string;
  img: string;
  type: string;
  genres: string[];
  chapters: Chapter[];
}

export interface Library {
  items: PageBase[];
}

export interface Filters {
  title?: string;
}

interface Img {
  url: string;
  page: number;
}

export interface Read {
  id: string;
  title: string;
  info: string;
  pages: number;
  imgs: Img[];
}

export interface Home {
  popular: PageBase[];
}

export interface AppContent {
  name: string;
  lang: string;
  home: (execPath: string) => Promise<Home>;
  details: (route: string, execPath: string) => Promise<Details>;
  library: (
    page: string,
    execPath: string,
    filters?: Filters
  ) => Promise<Library>;
  read: (id: string, execPath: string) => Promise<Read>;
  opts?: {
    headers: Record<string, string>;
    refererRule?: (r: string) => string;
  };
}

export type Extension = (content: GetContent, parser: Parser) => AppContent;

export interface Language {
  id: string;
  name: string;
  home: {
    head: string;
  };
  library: {
    head: string;
  };
  favorites: {
    head: string;
  };
  extensions: {
    pin_option_text: string;
    search_placeholder: string;
    select_title: string;
  };
  details: {
    genders: string;
    status: string;
    chapters: string;
  };
  settings: {
    options_1: {
      head: string;
      appearance: {
        option_text: string;
        content: {
          head_text: string;
          sub_text1: string;
          radios: {
            text1: string;
            text2: string;
          };
          sub_text2: string;
          btn_text1: string;
          btn_text2: string;
        };
      };
      advanced: {
        option_text: string;
      };
      language: {
        option_text: string;
        content: {
          head_text: string;
          sub_text: string;
        };
      };
    };
  };
}

export interface BaseTheme {
  primary: string;
  secondary: string;
  background1: string;
  background2: string;
  fontPrimary: string;
  fontSecondary: string;
  navbar: {
    background: string;
    buttons: {
      background: string;
      color: string;
      hover: string;
    };
  };
  buttons: {
    background: string;
    hover: string;
    color: string;
    border: string;
  };
}

export interface Theme {
  dark: BaseTheme;
  light: BaseTheme;
}
