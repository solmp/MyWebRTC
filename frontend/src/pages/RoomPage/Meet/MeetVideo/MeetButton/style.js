import styled from 'styled-components';

const MeetButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const MeetButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;
`;

const GrayButton = styled(MeetButton)`
  background-color: rgb(68, 68, 72);
`;
const GreenButton = styled(MeetButton)`
  background-color: #3BA55D;
`;

const DarkRedButton = styled(MeetButton)`
  background-color: #AB342E;
`;

const YellowButton = styled(MeetButton)`
  background-color: #F8B301;
`;

export {MeetButtonWrapper, GreenButton, DarkRedButton, YellowButton, GrayButton};
