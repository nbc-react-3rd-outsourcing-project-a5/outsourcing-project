import { ko } from 'date-fns/locale';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useInput, useDate, useImageFile, useFestival } from 'hooks';
import uuid from 'react-uuid';
import { uploadFiles } from 'utils/fireStorage';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Container from 'components/common/StContainer';

export default function FestivalRegistrationForm({ children }) {
  // TODO : organizer 정보 가져오기

  const [name, handleChangeName] = useInput();
  const [address, handleChangeAddress] = useInput();
  const [description, handleChangeDescription] = useInput();
  const [startDate, handleChangeStartDate] = useDate();
  const [endDate, handleChangeEndDate] = useDate();
  const [localImageFiles, handleUploadImageFiles] = useImageFile();
  const organizerProfile = useSelector((state) => state.auth.targetUser);
  const organizer = { id: uuid(), name: organizerProfile?.name };
  const navigate = useNavigate();

  const handleCreate = useFestival();

  // TODO : 수정하기에서 사용할 것
  // const [data2, handle2] = useFestival('get');
  // const handle4 = useFestival('update');

  const handleSummit = async (e) => {
    e.preventDefault();
    const docID = uuid();
    try {
      const image = await uploadFiles(
        'festival',
        docID,
        localImageFiles.map((n) => n.file)
      );

      //TODO : 빈 데이터 추가하기
      // overlayType, overlay, organizerID
      const newFestival = {
        docID,
        data: {
          name,
          organizerID: organizer.id,
          address,
          description,
          startDate,
          endDate,
          image,
          overlayType: null,
          overlay: []
        }
      };

      handleCreate.create(newFestival);
      toast.success('축제가 업로드 되었습니다!');
      navigate('/');
    } catch (error) {
      toast.error('축제 업로드에 실패했습니다.');
      navigate('/');
    }
  };

  const handleCancel = () => {
    if (window.confirm('나가시겠습니까? 변경한 내용이 저장되지 않을 수 있습니다.')) {
      navigate('/');
    }
  };

  return (
    <Container>
      <StForm onSubmit={handleSummit}>
        <StTitle>축제 등록하기</StTitle>

        <StRow>
          <StLabel htmlFor="organizer__name">업체 이름</StLabel>
          <StInput type="text" className="readOnly" defaultValue={organizer.name} readOnly id="organizer__name" />
        </StRow>
        <StRow>
          <StLabel>축제 날짜</StLabel>
          <StDatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={(date) => handleChangeStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <span>~</span>
          <StDatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={endDate}
            onChange={(date) => handleChangeEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </StRow>
        <StRow>
          <StLabel htmlFor="festival__name">축제 이름</StLabel>
          <StInput type="text" value={name} onChange={handleChangeName} id="festival__name" />
        </StRow>
        <StRow>
          <StLabel htmlFor="festival__address">축제 주소</StLabel>
          <StInput type="text" value={address} onChange={handleChangeAddress} id="festival__address" />
        </StRow>

        <StRow>
          <StLabel htmlFor="festival__description">축제 설명</StLabel>
          <StTextarea
            placeholder="당신이 개최하는 축제를 소개해주세요!"
            value={description}
            onChange={handleChangeDescription}
            id="festival__description"
          />
        </StRow>

        <StRow>
          <StLabel htmlFor="festival__image">사진 업로드</StLabel>
          이미지를 선택해주세요!! (최대 10개까지)
          <input
            type="file"
            accept=".jpg, .png, .jpeg, .webp"
            multiple
            onChange={handleUploadImageFiles}
            id="festival__image"
          />
        </StRow>
        <StRow>
          <StImageContainer>
            {localImageFiles?.map((image) => {
              return <StImage key={uuid()} src={image.preview} alt="이미지 미리보기" />;
            })}
          </StImageContainer>
        </StRow>

        {children}

        <StRow className="center">
          <StButton className="cancel" type="button" onClick={handleCancel}>
            취소하기
          </StButton>
          <StButton className="summit" type="submit">
            등록하기
          </StButton>
        </StRow>
      </StForm>
    </Container>
  );
}

const StTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1em 0;
`;

const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
`;

const StRow = styled.div`
  display: flex;
  align-items: center;

  &.center {
    margin-top: 3rem;
    justify-content: center;
    gap: 3rem;
  }
`;

const StLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
  min-width: 8rem;
`;

const StDatePicker = styled(DatePicker)`
  font-size: small;
  width: 10rem;
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 3px solid transparent;
  background-color: #d3d3d367;
  transition: 0.15s;
  outline: none;
  cursor: pointer;

  &:active,
  &:focus {
    background-color: white;
  }
`;

const StInput = styled.input`
  outline: none;
  border: white;
  border-radius: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #d3d3d367;
  transition: 0.15s;
  &:active,
  &:focus {
    background-color: white;
  }
  &.readOnly {
    border: none;
    background-color: transparent;
  }
`;

const StTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1rem;
  resize: none;
  outline: none;
  border: none;
  background-color: #d3d3d367;
  border-radius: 10px;
  transition: 0.15s;

  &:active,
  &:focus {
    background-color: white;
  }
`;

const StButton = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  outline: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.cancel {
    background-color: #dc1920;
  }

  &.summit {
    background-color: #126136;
  }
`;

const StImage = styled.img`
  width: 100px;
`;

const StImageContainer = styled.div`
  display: flex;
`;
