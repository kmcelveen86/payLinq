import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export interface HideOnScrollProps {
  children: React.ReactElement<any>;
}

export function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
