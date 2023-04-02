import {BtnLoadMore} from "./Button.styled";

const Button = ({onClick}) => {
  return (
    <BtnLoadMore type="button" onClick ={onClick}>
      Load More
    </BtnLoadMore>
  );
};

export default Button;