/** @jsxImportSource theme-ui */
import React, {
  Context,
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './styles'

interface IOverlayContext {
  overlayItem?: JSX.Element;
  setOverlayItem?: Dispatch<SetStateAction<JSX.Element>>;
  overlayActive?: boolean;
  setOverlayActive?: Dispatch<SetStateAction<boolean>>;
}
export const OverlayContext: Context<IOverlayContext> = createContext({});

//eslint-disable-next-line
const Overlay: FC<PropsWithChildren<any>> = ({ children }) => {
  const [overlayActive, setOverlayActive] = useState<boolean>(false);
  const [overlayItem, setOverlayItem] = useState<JSX.Element>();

  useEffect(() => {
    if (overlayActive) document.body.style.overflow = 'hidden';
    if (!overlayActive) document.body.style.overflow = 'visible';
  }, [overlayActive]);

  return (
    <OverlayContext.Provider value={{ overlayItem, setOverlayItem, overlayActive, setOverlayActive }}>
      <div className={`overlay_wrap${overlayActive ? ' active' : ''}`} sx={styles}>
        {
          <div
            className="overlay_bg"
            onClick={() => {
              setOverlayActive(false);
            }}
          >
            {overlayItem}
          </div>
        }
        {children}
      </div>
    </OverlayContext.Provider>
  );
};

export default Overlay;
