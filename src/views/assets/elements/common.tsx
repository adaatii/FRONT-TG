import styled from "styled-components";

export const Section = styled.div<{}>`
  height: 100dvh;
  overflow: hidden;
`;

export const Divider = styled.div<{
  $primary?: boolean;
  $colorBG?: any;
  $width?: string;
  $height?: string;
  $padding?: string;
  $opacity?: string;
  $radius?: string;
}>`
  width: ${(props) => (props.$width !== "" ? props.$width : "auto")};
  height: ${(props) => (props.$height !== "" ? props.$height : "auto")};
  align-self: center;
  opacity: ${(props) => (props.$opacity !== "" ? props.$opacity : "1")};
  background-color: ${(props) =>
    props.$colorBG ? props.$colorBG : "var(--primary)"};
  border-radius: ${(props) => (props.$radius !== "" ? props.$radius : "0")};
`;