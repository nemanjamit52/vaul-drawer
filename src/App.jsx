import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import "./style.scss";
import Counter from "./Info";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [transitionTime] = useState(300);
  const [borderRadius] = useState(8);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (bgRef.current) {
      const scaleX = isOpen ? 1 - 0.055 : 1;
      const scaleY = isOpen ? 1 - 0.035 : 1;

      Object.assign(bgRef.current.style, {
        transform: `perspective(1000px) scale3d(${scaleX}, ${scaleY}, 1)`,
        borderRadius: isOpen ? `${borderRadius}px` : "0",
      });
    }
  }, [isOpen]);

  return (
    <Drawer.Root
      onOpenChange={setIsOpen}
      onDrag={(_, progress) => {
        setProgress(progress > 0 ? progress : 0);
        bgRef.current.style.transition = "0s";
        bgRef.current.style.borderRadius = `${(1 - progress) * borderRadius}px`;
      }}
      onRelease={() => {
        if (isOpen) {
          bgRef.current.style.transform = `perspective(1000px) scale3d(${1 - 1 * 0.055}, ${1 - 1 * 0.035}, 1)`;
          bgRef.current.style.borderRadius = `${borderRadius}px`;
        }
        bgRef.current.style.transition = `${transitionTime}ms`;
      }}
      closeThreshold={0.5}
    >
      <div
        ref={bgRef}
        className="vaul"
        style={{
          transition: `${transitionTime}ms`,
          transform: `perspective(1000px) scale3d(${1 - (1 - progress) * 0.055}, ${1 - (1 - progress) * 0.035}, 1)`,
          padding: "1rem",
        }}
      >
        <h2 className="title">Get Started</h2>
        <p className="description">
          Vaul is an unstyled drawer component for React that can be used as a Dialog replacement on tablet and mobile devices. You can read about why
          and how it was built.
        </p>
        <Drawer.Trigger className="openVaul">Open Drawer</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Title></Drawer.Title>
          <Drawer.Overlay ref={overlayRef} style={{ background: "rgba(0,0,0, .5)" }} className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            aria-describedby=""
            className="bg-gray-100 fixed bottom-0 left-0 right-0 outline-none transition-all"
            style={{ height: "50vh", borderRadius: "1rem 1rem 0 0" }}
          >
            <Counter />
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  );
};

export default App;
