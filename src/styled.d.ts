import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    tickerColor: string;
    nameColor: string;
    lightBlackWhite: string;
    littleBlackWhite: string;
    accentColor?: string;
  }
}
