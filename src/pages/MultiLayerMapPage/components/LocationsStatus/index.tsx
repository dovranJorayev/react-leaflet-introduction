import React from 'react';
import { css } from '@emotion/css';
import { useLeafletContext } from '@react-leaflet/core';
import { MarkerItem } from 'api/getMarkers';
import { LatLng, LatLngExpression } from 'leaflet';

interface LocationsStatusProps {
  currentPosition: LatLngExpression | null;
  markers: MarkerItem[];
  deleteMarker: (marker: MarkerItem) => void;
  addMarker: (marker: MarkerItem) => void;
}

const eventCatcher = (event: React.SyntheticEvent) => {
  event.nativeEvent.preventDefault();
  event.nativeEvent.stopPropagation();
} 
function LocationsStatus({ markers, addMarker, deleteMarker, currentPosition }: LocationsStatusProps): JSX.Element {
  const [addedTitle, setAddedTitle] = React.useState('');
  const context = useLeafletContext();

  return (
    <div
      id='LocationsStatus'
      className={
        css({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          backgroundColor: 'rgb(0 0 0 / 65%)',
          zIndex: 999,
          paddingTop: '40px'
        })
      }
      onClickCapture={e => {
        e.nativeEvent.stopImmediatePropagation();
      }}
      onDoubleClickCapture={e => {
        e.nativeEvent.preventDefault();
        e.nativeEvent.stopPropagation();
      }}
    >
      { markers.length > 0 && <h5
        className={
          css({
            margin: '3% 4%',
            fontSize: '12px',
            color: 'white'
          })
        }
      >
        Locations list:
      </h5> }

      <div
        className={
          css({
            flexWrap: 'wrap',
            padding: '2% 4%',
            width: '92%',
            color: 'white',
          
          })
        }
      >
        {
          markers.map(marker => (
            <div
              key={marker.id}
              className={
                css({
                  backgroundColor: '#141414',
                  flex: '0 0 100%',
                  margin: '2% 0',
                  padding: '4%',
                  position: 'relative',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                })
              }
              onClickCapture={e => {
                context.map.flyTo(
                  marker.coords, 
                  context.map.getZoom()
                );
                eventCatcher(e);
              }}
            >
              { marker.title }

              <div
                className={
                  css({
                    position: 'absolute',
                    right: '4%',
                    top: '30%',
                    opacity: 0.65,
                    '&:hover': {
                      opacity: 1
                    }
                  })
                }
                onClickCapture={e => {
                  deleteMarker(marker);
                  eventCatcher(e);
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                x
              </div>
            </div>
          ))
        }
      </div>
      
      <form
        id={'add-marker-form'}
        onSubmit={e => {
          e.preventDefault();
          addMarker({
            id: Math.random(),
            title: addedTitle,
            coords: currentPosition!
          });
          setAddedTitle('');
        }}
        className={
          css({
            boxSizing: 'border-box',
            margin: '3% 4%',
            width: '92%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            '& input': {
              flex: '0 0 80%'
            },
            '& button': {
              backgroundColor: '#1773bf',
              padding: '4%',
              border: 'none',
              borderRadius: '5px',
              color: '#def',
              cursor: 'pointer',
              flex: '0 0 16%',
              '&:active': {
                opacity: 0.7
              },
              '&:disabled': {
                backgroundColor: 'grey'
              }
            },
            '& span': {
              marginTop: '5px',
              color: 'white'
            }
          })
        }
      >
        <input 
          type='text' 
          name='title' 
          id='title' 
          value={addedTitle}
          onChange={e => {
            setAddedTitle(e.target.value)
          }}
        />

        <button
          type={'submit'}
          form={'add-marker-form'}
          disabled={
            currentPosition === null ||
            addedTitle === ''
          }
        >
          Add
        </button>

        <span>
          { currentPosition ? (currentPosition as LatLng ).lat: null }
        </span>

        <span>
          { currentPosition ? (currentPosition as LatLng ).lng: null }
        </span>
      </form>
    </div>
  );
}

export default LocationsStatus;