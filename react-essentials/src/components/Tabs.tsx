import { ReactElement } from "react";
import Section from './Section';

function Tabs({ children, buttons, ButtonsContainer = "menu" }: { children: any, buttons: any, ButtonsContainer?: ReactElement<unknown> | typeof Section | Element | string }) {
    // const ButtonsContainer = buttonsContainer;
    return <>
    <ButtonsContainer>
        {buttons}
    </ButtonsContainer>
     {children}
    </>

}

export default Tabs;