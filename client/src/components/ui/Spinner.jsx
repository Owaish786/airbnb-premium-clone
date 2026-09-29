import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <TailSpin
        height={48}
        width={48}
        color="#FF385C"
        radius="1"
        visible={true}
      />
      <p className="mt-4 text-sm text-gray-400 animate-pulse">Loading...</p>
    </div>
  );
};

export default Spinner;
