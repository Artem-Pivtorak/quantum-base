import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredFramesBySection } from '../../redux/frames/framesSlice';
import Frame from '../Frame/Frame';
import css from './FrameList.module.css';

const FrameList = () => {
  const frames = useSelector(selectFilteredFramesBySection);

  if (frames.length === 0) {
    return <div className={css.empty}>no info</div>;
  }

  return (
    <div className={css.list}>
      {frames.map(frame => (
        <Frame key={frame.id} data={frame} />
      ))}
    </div>
  );
};

export default FrameList;