import React, { useEffect, useState, useRef } from 'react';

export default function WithHeightValueDiv({ children, containerClass }) {
  const container = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    let content = container.current?.firstElementChild;
    let height = content ? getComputedStyle(content).height : 0;
    setContentHeight(height);
  }, [])
  return (
    <div ref={container} className={containerClass} style={{ ['--target-height']: contentHeight}}>
      <div>{children}</div>
    </div>
  )
}