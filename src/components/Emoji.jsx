import React, { memo } from 'react';

const Emoji = memo(({ className, label = 'emoji', symbol }) => {
  console.log('emoji', symbol);
  return (
    <span className={className} role='img' aria-label={label}>
      {symbol}
    </span>
  );
});

export default Emoji;
