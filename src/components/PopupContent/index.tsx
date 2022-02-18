interface PopupContentProps {
  text: string;
  className?: string;
}

function PopupContent({className, text}: PopupContentProps): JSX.Element {
  return (
    <div className={className}>
      <div data-popup-content='popup-text'>
        { text }
      </div>
    </div>
  )
}

export default PopupContent;