import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const TaskWindow = ({ socket }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    function fetchTasks() {
      // const userId = localStorage.getItem("userId");
      fetch(`http://localhost:4000/home`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched tasks:", data);
          setTasks(data);
        });
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data) => {
      console.log("Received updated tasks:", data);
      setTasks(data);
    });
  }, [socket]);


  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    socket.emit("taskDragged", {
      source,
      destination,
    });
  };

  if (!tasks) {
    return <div style={{textAlign:'center'}}>Loading tasks...</div>;
  }

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div
            className={`${task[1].title.toLowerCase()}__wrapper`}
            key={task[1].title}
          >
            <div className={`${task[1].title.toLowerCase()}__head head`}>

            <h3>{task[1].title} tasks</h3>
            </div>
            <div className={`${task[1].title.toLowerCase()}__container cardcontainer`}>
              <Droppable droppableId={task[1].title}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {task[1].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${task[1].title.toLowerCase()}__items`}
                          >
                            <p>{item.title}</p>
                            <p className="comment">
                              <Link
                                to={`/comments/${task[1].title}/${item.id}`}
                              >
                                {item.comments.length > 0
                                  ? `View Comments`
                                  : "Add Comment"}
                              </Link>
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskWindow;
