import { addDoc, deleteDoc, updateDoc, collection, getDocs, orderBy, query, doc } from '@firebase/firestore';
import StContainer from 'components/common/StContainer';
import { db } from 'fb/firebase';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import styled from 'styled-components';

export default function Comments() {
  const user = useSelector((state) => state.auth.targetUser);
  const { isLoading } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [comments, setComments] = useState('');
  const [isLoding, setIsLoding] = useState(true);
  const [editComments, setEditComments] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [findComments, setFindComments] = useState([]);
  const handleOnchangeComments = (e) => setComments(e.target.value);
  const handleOnchangeEditComments = (e) => setEditComments(e.target.value);
  const filterComments = allComments.filter((item) => item.festivalId === id);
  // console.log(filterComments);
  console.log(user);
  useEffect(() => {
    if (!isLoading) {
      getDocs(query(collection(db, 'comments'), orderBy('createdAt', 'desc')))
        .then((res) => {
          return res.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
        })
        .then((data) => {
          setAllComments(data);
        });
      setIsLoding(false);
    }
  }, []);
  console.log(allComments);

  const handleSubmitComments = async (e) => {
    e.preventDefault();
    const newComment = {
      name: user.name,
      email: user.email,
      uuid: uuid(),
      comments: comments,
      festivalId: id,
      createdAt: new Date().toISOString(),
      edit: false
    };

    const collectionRef = collection(db, 'comments');
    const res = await addDoc(collectionRef, newComment);
    toast.success('리뷰가 등록되었습니다!');
    setComments('');
    setAllComments([
      {
        ...newComment,
        id: res.id
      },
      ...allComments
    ]);
  };

  const handleDeleteComment = async (id) => {
    const comments = allComments.filter((item) => item.id !== id);

    if (!window.confirm('리뷰를 삭제하시겠습니까?')) return;
    toast.success('삭제되었습니다.');
    const commentRef = doc(db, 'comments', id);
    await deleteDoc(commentRef);
    setAllComments(comments);
  };

  const handleEditComment = (uuid) => {
    const comment = allComments.find((item) => item.uuid === uuid);
    const clickedComment = allComments.map((item) => (item.uuid === uuid ? { ...item, edit: !item.edit } : item));
    setFindComments(comment);
    setEditComments(comment.comments);
    setAllComments(clickedComment);
  };

  const handleCompletionComment = async (id) => {
    try {
      const completion = { ...findComments, edit: false, comments: editComments };
      // console.log(completion);
      const changeComment = allComments.map((item) => {
        return item.id === id ? { ...item, edit: !item.edit, comments: editComments } : item;
      });
      const collectionRef = doc(db, 'comments', id);
      await updateDoc(collectionRef, completion);

      setAllComments(changeComment);
      toast.success('리뷰 수정을 완료했습니다.');
    } catch (error) {
      toast.error('리뷰 수정에 실패했습니다.');
    }
  };

  if (isLoding) {
    return <div>로딩 중...</div>;
  }
  return (
    <StContainer>
      <StCommentsContainer>
        <StComment>후기</StComment>
        <form onSubmit={handleSubmitComments}>
          {user?.organizer || !user ? (
            ''
          ) : (
            <>
              <input placeholder="후기를 입력해주세요!" value={comments} onChange={handleOnchangeComments} />
              <StCommentBtn $padding="20px" type="submit">
                등록
              </StCommentBtn>
            </>
          )}
        </form>
        {filterComments.length === 0 ? (
          <div>아직 등록된 리뷰가 없습니다!</div>
        ) : (
          <ul>
            {filterComments.map((item) => {
              return (
                <li key={item.uuid}>
                  <StUserName>{item.name}</StUserName>
                  <StCommentDate>
                    {item.edit ? (
                      <StTextarea rows={4} value={editComments} onChange={handleOnchangeEditComments}></StTextarea>
                    ) : (
                      <p>{item.comments}</p>
                    )}
                    <p>
                      {new Date(item.createdAt).toLocaleDateString('ko', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </StCommentDate>
                  {user?.email === item.email && user !== null ? (
                    <StDelEditBtn>
                      {item.edit ? (
                        <StCommentBtn onClick={() => handleCompletionComment(item.id)} $padding="10px" type="button">
                          완료
                        </StCommentBtn>
                      ) : (
                        <>
                          <StCommentBtn onClick={() => handleEditComment(item.uuid)} $padding="10px" type="button">
                            수정
                          </StCommentBtn>
                          <StCommentBtn
                            onClick={() => {
                              handleDeleteComment(item.id);
                            }}
                            $padding="10px"
                            type="button"
                          >
                            삭제
                          </StCommentBtn>
                        </>
                      )}
                    </StDelEditBtn>
                  ) : (
                    ''
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </StCommentsContainer>
    </StContainer>
  );
}

const StCommentsContainer = styled.div`
  border-radius: 15px;
  width: 100%;
  padding: 20px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  text-align: center;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    width: 80%;
    height: 100%;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
    border: 2px solid #126136;
  }

  form {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    grid-template-areas: '. input input btn';
    grid-template-columns: max-content;
  }

  input {
    border-radius: 10px;
    border: 2px solid #126136;
    font-weight: 600;
    font-size: large;
    width: 70%;
    padding: 20px;
    grid-area: input;
  }
`;

const StCommentBtn = styled.button`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 10px;
  background-color: #126136;
  color: white;
  grid-area: btn;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 700;
  width: 9%;

  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    background-color: #dc1920;
  }
`;

const StUserName = styled.p`
  font-weight: 600;
  font-size: 20px;
  text-align: start;
`;

const StCommentDate = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px 15px 0px;

  p {
    font-size: 17px;
  }
`;

const StComment = styled.p`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 2px;

  margin-bottom: 20px;
`;

const StDelEditBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StTextarea = styled.textarea`
  width: 70%;
  resize: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 10px;
`;
