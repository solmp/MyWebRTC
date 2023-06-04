import styled, {css} from 'styled-components';

const focused = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-width: 300px;
  height: calc(100% - 160px);
  margin: auto 0 auto 20px;
  overflow-y: auto;
`;

const Videos = styled.div`
  ${(props) => {
    const {isFocused, videoCount} = props;
    const normal = css`
      margin: 0 auto;
      display: grid;
      width: 100%;
      height: 90%;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 20px;
      justify-items: center;
      ${videoCount <= 2 ? 'grid-template-rows: 100%;' : 'grid-template-rows: 50% 50%;'}
      ${videoCount <= 4
              ? 'max-width: 900px; grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));'
              : 'max-width: 1500px; grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));'}
    `;
    return css`${isFocused ? focused : normal}`;
  }}`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 0;
  padding-bottom: 56.25%;
  margin-bottom: 10px;

  & p {
    position: absolute;
    bottom: 0;
    left: 10px;
    padding: 3px 8px;
    border-radius: 5px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .saying {
    border: 3px solid #0055FB;
  }
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SelectVideoIndicator = styled(ThumbnailWrapper)`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  svg {
    width: 50px;
    height: 50px;

    path {
      fill: #EBEDEF;
    }
  }
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
  background-color: black;
`;

const DeviceStatus = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;

const VideoSection = styled.section`
  position: relative;
  display: flex;
  justify-content: end;
  background-color: #EBEDEF;
  width: 100%;
  height: 100%;
`;

export {
    Videos,
    VideoWrapper,
    Video,
    VideoSection,
    DeviceStatus,
    SelectVideoIndicator,
};
