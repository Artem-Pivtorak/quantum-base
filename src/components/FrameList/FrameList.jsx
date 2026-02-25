import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFrame } from '../../redux/frames/framesSlice';
import { selectFilteredFrames } from '../../redux/frames/framesSlice';
import Frame from '../Frame/Frame';

const FrameList = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const frames = useSelector(selectFilteredFrames);

  const handleDelete = (id) => {
    dispatch(deleteFrame(id));
  };

  return (
    <div>
      {frames.map(frame => (
        <Frame
          key={frame.id}
          data={frame}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default FrameList;