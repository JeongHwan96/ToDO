import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, toDoState, IToDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 300px;

  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  padding: 3%;
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#a59bdd"
      : props.isDraggingFromThis
      ? "#87c5e0"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  display: flex;
  width: 100%;
  input {
    margin: 0 auto;
    width: 70%;
    border: none;
    border-bottom: 3px solid black;
    background: none;
  }
  input:focus {
    outline: none;
  }
`;

const Div = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.headerColor};
  font-size: 18px;
`;
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  // useEffect(() => {
  //   localStorage.setItem("ToDo", setToDos);
  // });

  return (
    <Wrapper>
      <Div>
        <Title>{boardId}</Title>
      </Div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task `}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
