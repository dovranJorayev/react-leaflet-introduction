import { css } from '@emotion/react';

interface LocationsStatusProps {

}
function LocationsStatus(props: LocationsStatusProps): JSX.Element {
  return (
    <div
      id='LocationsStatus'
      css={css({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        display: 'flex',
      })}
    >


    </div>
  );
}

export default LocationsStatus;