import { getMarkers, MarkerItem } from 'api/getMarkers';
import React from 'react';

interface MarkersData {
  isError: boolean;
  isLoading: boolean;
  data?: MarkerItem[];
  error?: Error;
}
export const useMarkersData = () => {
  const [markersData, setMarkersData] = React.useState<MarkersData>({
    isError: false,
    isLoading: true
  });  

  React.useEffect(() => {
    const callGetMarkers = async function() {
      try {
        const markers = await getMarkers();
        setMarkersData({
          isLoading: false,
          isError: false,
          data: markers
        });
      } catch (error) {
        setMarkersData({
          isLoading: false,
          isError: true,
          error: error as Error
        });
      }
    }

    callGetMarkers();
  }, []);

  const mutateMarkers = (data: MarkerItem[]) => {
    setMarkersData(prev => ({
      ...prev,
      data
    }));
  };

  return {
    ...markersData,
    mutateMarkers
  };
};