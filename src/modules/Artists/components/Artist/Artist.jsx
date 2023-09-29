export const Artist = ({ id, name, surname, nickname, city, handleClick }) => {
  return <div onClick={() => handleClick(id)}>{nickname}</div>;
};
