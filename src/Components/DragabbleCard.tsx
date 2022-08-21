import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import cancel from "../Components/images/cancel.png";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const Del = styled.button`
  background: none;
  border: none;
  img {
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
`;

interface IDdragabbleCardPros {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DragabbleCard({ toDoId, toDoText, index }: IDdragabbleCardPros) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic) => (
        <>
          <Card
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
            <Del>
              <img src={cancel} alt="" />
            </Del>
          </Card>
        </>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
