import ReactDom from "react-dom";
export default function Modal(): JSX.Element {
  //   const modal = document.getElementById("modal") as HTMLElement;
  return ReactDom.createPortal(
    <h1>modal</h1>,
    document.getElementById("modal")!
  );
}
