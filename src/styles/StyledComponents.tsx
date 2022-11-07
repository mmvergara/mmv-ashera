import styled from "@emotion/styled";

export const HeaderNav = styled.header`
  height: 60px;
  position: fixed;
  padding-inline: 5%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px,
    rgb(0 0 0 / 12%) 0px 1px 10px 0px;
`;

//TASKS
export const AllTasksSectionContainer = styled.div`
  height: 100%;
  width: 100%;
  flex-wrap: nowrap;
  display: flex;
  overflow-x: scroll;
`;
export const TasksMainContainer = styled.div`
  border-style: solid;
  border-width: 2px;
  border-color: rgba(123, 123, 123, 0.001) !important;
  :hover {
    border-color: #959595 !important;
  }
  transition: all 0.3s ease;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
  height: 80vh;
  margin-bottom: 0;
  margin: 1em;
  padding: 1em;
`;
export const TaskContainer = styled.div`
  border: 2px solid #8f8f8f5d;
  border-radius: 5px;
  width: 95%;
  min-height: 40px;
  display: flex;
  word-wrap: break-word;
`;
export const MenuDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  a {
    height: 100%;
    padding: 1em;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    gap: 2px;
    align-items: center;
  }

  a:hover {
    border-bottom: 7px solid hsl(293, 64%, 40%);
  }
`;
